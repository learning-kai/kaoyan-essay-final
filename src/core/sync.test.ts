import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { buildBackupPayload, type BackupPayload } from './backup';
import { createInitialCard, reviewCard } from './scheduler';
import {
  areSyncPayloadsEqual,
  buildSyncPairingUrl,
  decodeSyncPairing,
  encodeSyncPairing,
  mergeSyncPayloads,
} from './sync';
import { serializeCard } from '../store/useProgress';

function makeBaseSettings(
  overrides: Partial<BackupPayload['settings']> = {}
): BackupPayload['settings'] {
  return {
    dailyNewLimit: 8,
    requestRetention: 0.9,
    examDate: null,
    strictPunctuation: false,
    practiceMode: 'framework',
    inputMode: 'typing',
    theme: 'light',
    unlockAllLessons: false,
    bodyFontSize: 19,
    ...overrides,
  };
}

describe('GitHub 私有 Gist 多端同步：智能合并与配对码单元测试', () => {
  it('合并手机和电脑各自背诵的不同卡片、复习记录、实战记录与每日计数', () => {
    const t1 = new Date('2026-11-23T08:00:00Z');
    const t2 = new Date('2026-11-23T09:00:00Z');
    const cardA = serializeCard(reviewCard(createInitialCard(t1), Rating.Good, t1));
    const cardB = serializeCard(reviewCard(createInitialCard(t2), Rating.Good, t2));

    const desktop = buildBackupPayload(
      {
        cards: { 'shared.closing': cardA },
        reviews: [
          {
            sentenceId: 'shared.closing',
            rating: Rating.Good,
            accuracy: 1,
            timestamp: t1.toISOString(),
          },
        ],
        dailyLearnedCount: { '2026-11-23': 3 },
        examRecords: [
          {
            id: 'exam-1',
            promptId: 'suggest-1',
            templateId: 'suggest',
            identifiedCorrectly: true,
            durationSec: 520,
            wordCount: 112,
            overallAccuracy: 0.95,
            timestamp: t1.toISOString(),
          },
        ],
        idRecords: [],
      },
      makeBaseSettings({ examDate: '2026-12-20' }),
      t1,
      { updatedAt: t1.toISOString(), settingsUpdatedAt: t1.toISOString() }
    );

    const phone = buildBackupPayload(
      {
        cards: { 'suggest.body1': cardB },
        reviews: [
          {
            sentenceId: 'shared.closing',
            rating: Rating.Good,
            accuracy: 1,
            timestamp: t1.toISOString(),
          },
          {
            sentenceId: 'suggest.body1',
            rating: Rating.Easy,
            accuracy: 1,
            timestamp: t2.toISOString(),
          },
        ],
        dailyLearnedCount: { '2026-11-23': 5 },
        examRecords: [],
        idRecords: [
          {
            promptId: 'invite-1',
            expected: 'invite',
            chosen: 'invite',
            correct: true,
            timestamp: t2.toISOString(),
          },
        ],
      },
      makeBaseSettings(),
      t2,
      { updatedAt: t2.toISOString(), settingsUpdatedAt: null }
    );

    const merged = mergeSyncPayloads(phone, desktop, t2);
    expect(Object.keys(merged.progress.cards).sort()).toEqual([
      'shared.closing',
      'suggest.body1',
    ]);
    expect(merged.progress.reviews).toHaveLength(2);
    expect(merged.progress.dailyLearnedCount['2026-11-23']).toBe(5);
    expect(merged.progress.examRecords).toHaveLength(1);
    expect(merged.progress.idRecords).toHaveLength(1);
    // Desktop had newer settingsUpdatedAt so examDate is preserved
    expect(merged.settings.examDate).toBe('2026-12-20');
  });

  it('同一张卡片在两端均有复习记录时，保留 last_review 更新的状态', () => {
    const t1 = new Date('2026-11-23T08:00:00Z');
    const t2 = new Date('2026-11-23T12:00:00Z');
    const first = reviewCard(createInitialCard(t1), Rating.Good, t1);
    const second = reviewCard(first, Rating.Easy, t2);

    const older = buildBackupPayload(
      {
        cards: { 'shared.closing': serializeCard(first) },
        reviews: [],
        dailyLearnedCount: {},
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t1,
      { updatedAt: t1.toISOString() }
    );

    const newer = buildBackupPayload(
      {
        cards: { 'shared.closing': serializeCard(second) },
        reviews: [],
        dailyLearnedCount: {},
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t2,
      { updatedAt: t2.toISOString() }
    );

    const merged = mergeSyncPayloads(older, newer, t2);
    expect(merged.progress.cards['shared.closing'].last_review).toBe(
      t2.toISOString()
    );
    expect(merged.progress.cards['shared.closing'].reps).toBe(second.reps);
  });

  it('显式重置进度后不会被旧设备的旧数据复活', () => {
    const t1 = new Date('2026-11-23T08:00:00Z');
    const tReset = new Date('2026-11-23T10:00:00Z');
    const oldCard = serializeCard(reviewCard(createInitialCard(t1), Rating.Good, t1));

    const oldDevice = buildBackupPayload(
      {
        cards: { 'shared.closing': oldCard },
        reviews: [
          {
            sentenceId: 'shared.closing',
            rating: Rating.Good,
            accuracy: 1,
            timestamp: t1.toISOString(),
          },
        ],
        dailyLearnedCount: { '2026-11-23': 1 },
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t1,
      { updatedAt: t1.toISOString() }
    );

    const resetDevice = buildBackupPayload(
      {
        cards: {},
        reviews: [],
        dailyLearnedCount: {},
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      tReset,
      { updatedAt: tReset.toISOString(), resetAt: tReset.toISOString() }
    );

    const mergedFromReset = mergeSyncPayloads(resetDevice, oldDevice, tReset);
    expect(Object.keys(mergedFromReset.progress.cards)).toHaveLength(0);
    expect(mergedFromReset.resetAt).toBe(tReset.toISOString());

    const mergedFromOld = mergeSyncPayloads(oldDevice, resetDevice, tReset);
    expect(Object.keys(mergedFromOld.progress.cards)).toHaveLength(0);
    expect(mergedFromOld.resetAt).toBe(tReset.toISOString());
  });

  it('空白新设备首次连接云端时自动继承云端设置，且相同内容判等忽略 exportedAt', () => {
    const t1 = new Date('2026-11-23T08:00:00Z');
    const t2 = new Date('2026-11-23T09:00:00Z');
    const c = serializeCard(reviewCard(createInitialCard(t1), Rating.Good, t1));

    const cloud = buildBackupPayload(
      {
        cards: { 'shared.closing': c },
        reviews: [],
        dailyLearnedCount: { '2026-11-23': 1 },
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings({ theme: 'dark', dailyNewLimit: 12 }),
      t1,
      { updatedAt: t1.toISOString() }
    );

    const blankPhone = buildBackupPayload(
      {
        cards: {},
        reviews: [],
        dailyLearnedCount: {},
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t2
    );

    const merged = mergeSyncPayloads(blankPhone, cloud, t2);
    expect(merged.settings.theme).toBe('dark');
    expect(merged.settings.dailyNewLimit).toBe(12);
    expect(areSyncPayloadsEqual(merged, cloud)).toBe(true);
  });

  it('配对码与配对链接正确编解码，非法输入返回明确错误', () => {
    const cfg = { token: 'ghp_exampleToken123456', gistId: 'abcdef1234567890' };
    const code = encodeSyncPairing(cfg);
    expect(code.startsWith('kaoyan-sync:')).toBe(true);

    const parsedCode = decodeSyncPairing(code);
    expect(parsedCode).toEqual({ ok: true, config: cfg });

    const url = buildSyncPairingUrl(
      cfg,
      'https://learning-kai.github.io/kaoyan-essay-final/#/settings'
    );
    expect(url).toContain('#/settings?sync=');
    const parsedUrl = decodeSyncPairing(url);
    expect(parsedUrl).toEqual({ ok: true, config: cfg });

    const invalid = decodeSyncPairing('not-a-valid-code');
    expect(invalid.ok).toBe(false);
  });

  it('公式默写进度支持双向智能合并（熟记与收藏按时间戳 LWW）且独立重置不影响小作文', () => {
    const t1 = new Date('2026-11-23T08:00:00Z');
    const t2 = new Date('2026-11-23T09:00:00Z');
    const t3 = new Date('2026-11-23T10:00:00Z');

    const essayCard = serializeCard(reviewCard(createInitialCard(t1), Rating.Good, t1));
    const fCard1 = serializeCard(reviewCard(createInitialCard(t1), Rating.Good, t1));
    const fCard2 = serializeCard(reviewCard(createInitialCard(t2), Rating.Easy, t2));

    const desktop = buildBackupPayload(
      {
        cards: { 'shared.closing': essayCard },
        reviews: [],
        dailyLearnedCount: { '2026-11-23': 1 },
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t1,
      {
        updatedAt: t1.toISOString(),
        formulaProgress: {
          cards: { 'f-010': fCard1 },
          reviews: [{ formulaId: 'f-010', rating: Rating.Good, timestamp: t1.toISOString() }],
          dailyLearnedCount: { '2026-11-23': 4 },
          mastered: {
            'f-003': { value: true, updatedAt: t1.toISOString() },
            'f-004': { value: true, updatedAt: t1.toISOString() },
          },
          starred: {
            'f-290': { value: true, updatedAt: t1.toISOString() },
          },
          dailyNewLimit: 15,
          updatedAt: t1.toISOString(),
          resetAt: null,
        },
      }
    );

    const phone = buildBackupPayload(
      {
        cards: {},
        reviews: [],
        dailyLearnedCount: {},
        examRecords: [],
        idRecords: [],
      },
      makeBaseSettings(),
      t2,
      {
        formulaProgress: {
          cards: { 'f-290': fCard2 },
          reviews: [{ formulaId: 'f-290', rating: Rating.Easy, timestamp: t2.toISOString() }],
          dailyLearnedCount: { '2026-11-23': 6 },
          mastered: {
            // Phone later unmarked f-004
            'f-004': { value: false, updatedAt: t2.toISOString() },
            'f-005': { value: true, updatedAt: t2.toISOString() },
          },
          starred: {
            'f-134': { value: true, updatedAt: t2.toISOString() },
          },
          dailyNewLimit: 20,
          updatedAt: t2.toISOString(),
          resetAt: null,
        },
      }
    );

    const merged = mergeSyncPayloads(phone, desktop, t2);
    expect(Object.keys(merged.progress.cards)).toEqual(['shared.closing']);
    expect(Object.keys(merged.formulaProgress!.cards).sort()).toEqual(['f-010', 'f-290']);
    expect(merged.formulaProgress!.mastered['f-003'].value).toBe(true);
    expect(merged.formulaProgress!.mastered['f-004'].value).toBe(false);
    expect(merged.formulaProgress!.mastered['f-005'].value).toBe(true);
    expect(merged.formulaProgress!.starred['f-290'].value).toBe(true);
    expect(merged.formulaProgress!.starred['f-134'].value).toBe(true);
    expect(merged.formulaProgress!.dailyLearnedCount['2026-11-23']).toBe(6);
    expect(merged.formulaProgress!.dailyNewLimit).toBe(20);

    // Independent formula reset at t3 clears formulaProgress without wiping essay cards
    const formulaResetPhone = buildBackupPayload(
      merged.progress,
      merged.settings,
      t3,
      {
        updatedAt: merged.updatedAt,
        formulaProgress: {
          cards: {},
          reviews: [],
          dailyLearnedCount: {},
          mastered: {},
          starred: {},
          dailyNewLimit: 20,
          updatedAt: t3.toISOString(),
          resetAt: t3.toISOString(),
        },
      }
    );

    const afterReset = mergeSyncPayloads(formulaResetPhone, desktop, t3);
    expect(Object.keys(afterReset.progress.cards)).toEqual(['shared.closing']);
    expect(Object.keys(afterReset.formulaProgress!.cards)).toHaveLength(0);
    expect(Object.keys(afterReset.formulaProgress!.mastered)).toHaveLength(0);
  });
});
