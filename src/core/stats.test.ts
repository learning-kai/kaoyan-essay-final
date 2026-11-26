import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { parseBackup, serializeBackup } from './backup';
import { createInitialCard, reviewCard } from './scheduler';
import {
  compute14DayForecast,
  computeExamTimeSeries,
  computeIdentificationStats,
  computeTemplateMastery,
} from './stats';
import { serializeCard } from '../store/useProgress';

describe('第四阶段：统计聚合与 JSON 备份恢复单元测试', () => {
  it('模板掌握度统计覆盖全部 12 套模板并正确分类稳定度', () => {
    const now = new Date('2026-11-23T10:00:00Z');
    const c1 = reviewCard(createInitialCard(now), Rating.Good, now);
    const cards = { 'shared.closing': serializeCard(c1) };
    const rows = computeTemplateMastery(cards);
    expect(rows).toHaveLength(12);
    // shared.closing is used by all 11 letter templates
    const suggestRow = rows.find((r) => r.templateId === 'suggest')!;
    expect(suggestRow.learning + suggestRow.familiar + suggestRow.mastered).toBe(1);
    const complaintRow = rows.find((r) => r.templateId === 'complaint')!;
    expect(complaintRow.learning + complaintRow.familiar + complaintRow.mastered).toBe(1);
  });

  it('未来 14 天复习量预测返回 14 天并把已到期卡归入今天', () => {
    const now = new Date('2026-11-23T10:00:00Z');
    const dueCard = createInitialCard(new Date('2026-11-22T10:00:00Z'));
    const forecast = compute14DayForecast(
      { 'shared.emotion.good': serializeCard(dueCard) },
      now
    );
    expect(forecast).toHaveLength(14);
    expect(forecast[0].label).toBe('今天');
    expect(forecast[0].dueCount).toBe(1);
  });

  it('实战用时序列与题型识别正确率计算准确', () => {
    const series = computeExamTimeSeries([
      {
        id: '1',
        promptId: 'suggest-1',
        templateId: 'suggest',
        identifiedCorrectly: true,
        durationSec: 540,
        wordCount: 108,
        overallAccuracy: 0.96,
        timestamp: '2026-11-23T10:00:00Z',
      },
    ]);
    expect(series[0].minutes).toBe(9);
    expect(series[0].accuracyPct).toBe(96);

    const idStats = computeIdentificationStats([
      { promptId: 'a', expected: 'suggest', chosen: 'suggest', correct: true, timestamp: '' },
      { promptId: 'b', expected: 'intro', chosen: 'suggest', correct: false, timestamp: '' },
    ]);
    expect(idStats.accuracyPct).toBe(50);
  });

  it('JSON 导出再导入完整恢复全部卡片、记录与设置，非法 JSON 返回错误', () => {
    const now = new Date('2026-11-23T10:00:00Z');
    const c = reviewCard(createInitialCard(now), Rating.Good, now);
    const json = serializeBackup(
      {
        cards: { 'shared.closing': serializeCard(c) },
        reviews: [
          {
            sentenceId: 'shared.closing',
            rating: Rating.Good,
            accuracy: 1,
            timestamp: now.toISOString(),
          },
        ],
        dailyLearnedCount: { '2026-11-23': 3 },
        examRecords: [],
        idRecords: [],
      },
      {
        dailyNewLimit: 10,
        requestRetention: 0.92,
        examDate: '2026-12-20',
        strictPunctuation: true,
        practiceMode: 'fill',
        inputMode: 'paper',
        theme: 'dark',
        unlockAllLessons: true,
        bodyFontSize: 20,
      },
      now
    );

    const parsed = parseBackup(json);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.data.progress.cards['shared.closing']).toBeDefined();
      expect(parsed.data.settings.examDate).toBe('2026-12-20');
      expect(parsed.data.settings.theme).toBe('dark');
    }

    const bad = parseBackup('{"hello":"world"}');
    expect(bad.ok).toBe(false);
  });
});
