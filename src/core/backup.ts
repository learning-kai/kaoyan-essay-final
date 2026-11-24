import type { ReviewRecord } from './mistakes';
import type { FormulaBackupData } from '../store/useFormulaProgress';
import {
  EMPTY_DRILL_STATS,
  type PoliticsBackupData,
} from '../store/usePoliticsProgress';
import type {
  BigEssayBackupData,
  ExamRecord,
  IdentificationRecord,
  SerializedCard,
} from '../store/useProgress';
import { migrateProgressCards } from '../store/useProgress';
import type { InputMode, ThemeMode } from '../store/useSettings';
import type { PracticeMode } from './grader';

export interface BackupPayload {
  app: 'kaoyan-essay';
  schemaVersion: number;
  exportedAt: string;
  updatedAt?: string | null;
  settingsUpdatedAt?: string | null;
  resetAt?: string | null;
  progress: {
    cards: Record<string, SerializedCard>;
    reviews: ReviewRecord[];
    dailyLearnedCount: Record<string, number>;
    examRecords: ExamRecord[];
    idRecords: IdentificationRecord[];
  };
  settings: {
    dailyNewLimit: number;
    bigDailyNewLimit?: number;
    enableBigPackCards?: boolean;
    requestRetention: number;
    examDate: string | null;
    strictPunctuation: boolean;
    practiceMode: PracticeMode;
    inputMode: InputMode;
    theme: ThemeMode;
    unlockAllLessons: boolean;
    bodyFontSize: number;
  };
  bigEssayProgress?: BigEssayBackupData;
  formulaProgress?: FormulaBackupData;
  politicsProgress?: PoliticsBackupData;
}

export interface BackupMeta {
  updatedAt?: string | null;
  settingsUpdatedAt?: string | null;
  resetAt?: string | null;
  bigEssayProgress?: BigEssayBackupData;
  formulaProgress?: FormulaBackupData;
  politicsProgress?: PoliticsBackupData;
}

export function buildBackupPayload(
  progress: BackupPayload['progress'],
  settings: BackupPayload['settings'],
  now = new Date(),
  meta?: BackupMeta
): BackupPayload {
  const payload: BackupPayload = {
    app: 'kaoyan-essay',
    schemaVersion: 4,
    exportedAt: now.toISOString(),
    updatedAt: meta?.updatedAt ?? null,
    settingsUpdatedAt: meta?.settingsUpdatedAt ?? null,
    resetAt: meta?.resetAt ?? null,
    progress,
    settings,
  };
  if (meta?.bigEssayProgress) {
    payload.bigEssayProgress = meta.bigEssayProgress;
  }
  if (meta?.formulaProgress) {
    payload.formulaProgress = meta.formulaProgress;
  }
  if (meta?.politicsProgress) {
    payload.politicsProgress = meta.politicsProgress;
  }
  return payload;
}

export function serializeBackup(
  progress: BackupPayload['progress'],
  settings: BackupPayload['settings'],
  now = new Date(),
  meta?: BackupMeta
): string {
  return JSON.stringify(buildBackupPayload(progress, settings, now, meta), null, 2);
}

function normalizeBigEssayBackup(raw: unknown): BigEssayBackupData | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const b = raw as Partial<BigEssayBackupData>;
  return {
    bigDailyLearnedCount:
      b.bigDailyLearnedCount && typeof b.bigDailyLearnedCount === 'object'
        ? b.bigDailyLearnedCount
        : {},
    bigPlanRecords: Array.isArray(b.bigPlanRecords) ? b.bigPlanRecords : [],
    bigExamRecords: Array.isArray(b.bigExamRecords) ? b.bigExamRecords : [],
    bigPackIdRecords: Array.isArray(b.bigPackIdRecords) ? b.bigPackIdRecords : [],
    bigChartRecords: Array.isArray(b.bigChartRecords) ? b.bigChartRecords : [],
  };
}

function normalizeFormulaBackup(raw: unknown): FormulaBackupData | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const f = raw as Partial<FormulaBackupData>;
  return {
    cards: f.cards && typeof f.cards === 'object' ? f.cards : {},
    reviews: Array.isArray(f.reviews) ? f.reviews : [],
    dailyLearnedCount:
      f.dailyLearnedCount && typeof f.dailyLearnedCount === 'object'
        ? f.dailyLearnedCount
        : {},
    mastered: f.mastered && typeof f.mastered === 'object' ? f.mastered : {},
    starred: f.starred && typeof f.starred === 'object' ? f.starred : {},
    dailyNewLimit:
      typeof f.dailyNewLimit === 'number' ? f.dailyNewLimit : 15,
    updatedAt: f.updatedAt ?? null,
    resetAt: f.resetAt ?? null,
  };
}

function normalizePoliticsBackup(raw: unknown): PoliticsBackupData | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const p = raw as Partial<PoliticsBackupData>;
  return {
    cards: p.cards && typeof p.cards === 'object' ? p.cards : {},
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    dailyLearnedCount:
      p.dailyLearnedCount && typeof p.dailyLearnedCount === 'object'
        ? p.dailyLearnedCount
        : {},
    mastered: p.mastered && typeof p.mastered === 'object' ? p.mastered : {},
    starred: p.starred && typeof p.starred === 'object' ? p.starred : {},
    drillStats: {
      ...EMPTY_DRILL_STATS,
      ...(p.drillStats && typeof p.drillStats === 'object' ? p.drillStats : {}),
    },
    dailyNewLimit:
      typeof p.dailyNewLimit === 'number' ? p.dailyNewLimit : 10,
    updatedAt: p.updatedAt ?? null,
    resetAt: p.resetAt ?? null,
  };
}

export function parseBackup(jsonText: string): { ok: true; data: BackupPayload } | { ok: false; error: string } {
  try {
    const raw = JSON.parse(jsonText) as Partial<BackupPayload>;
    if (!raw || raw.app !== 'kaoyan-essay' || !raw.progress || typeof raw.progress !== 'object') {
      return { ok: false, error: '文件格式无效：不是小作文背诵网站导出的 JSON 备份。' };
    }
    if (!raw.progress.cards || typeof raw.progress.cards !== 'object') {
      return { ok: false, error: '备份文件中缺少卡片进度数据。' };
    }
    const bigEssayProgress = normalizeBigEssayBackup(raw.bigEssayProgress);
    const formulaProgress = normalizeFormulaBackup(raw.formulaProgress);
    const politicsProgress = normalizePoliticsBackup(raw.politicsProgress);
    const settingsObj: BackupPayload['settings'] = {
      dailyNewLimit: raw.settings?.dailyNewLimit ?? 8,
      requestRetention: raw.settings?.requestRetention ?? 0.9,
      examDate: raw.settings?.examDate ?? null,
      strictPunctuation: raw.settings?.strictPunctuation ?? false,
      practiceMode: raw.settings?.practiceMode ?? 'framework',
      inputMode: raw.settings?.inputMode ?? 'typing',
      theme: raw.settings?.theme ?? 'light',
      unlockAllLessons: raw.settings?.unlockAllLessons ?? false,
      bodyFontSize: raw.settings?.bodyFontSize ?? 19,
    };
    if (typeof raw.settings?.bigDailyNewLimit === 'number') {
      settingsObj.bigDailyNewLimit = raw.settings.bigDailyNewLimit;
    }
    if (typeof raw.settings?.enableBigPackCards === 'boolean') {
      settingsObj.enableBigPackCards = raw.settings.enableBigPackCards;
    }

    const data: BackupPayload = {
      app: 'kaoyan-essay',
      schemaVersion: raw.schemaVersion ?? 4,
      exportedAt: raw.exportedAt ?? new Date().toISOString(),
      updatedAt: raw.updatedAt ?? null,
      settingsUpdatedAt: raw.settingsUpdatedAt ?? null,
      resetAt: raw.resetAt ?? null,
      progress: {
        cards: migrateProgressCards(raw.progress.cards),
        reviews: Array.isArray(raw.progress.reviews) ? raw.progress.reviews : [],
        dailyLearnedCount: raw.progress.dailyLearnedCount ?? {},
        examRecords: Array.isArray(raw.progress.examRecords) ? raw.progress.examRecords : [],
        idRecords: Array.isArray(raw.progress.idRecords) ? raw.progress.idRecords : [],
      },
      settings: settingsObj,
    };
    if (bigEssayProgress) {
      data.bigEssayProgress = bigEssayProgress;
    }
    if (formulaProgress) {
      data.formulaProgress = formulaProgress;
    }
    if (politicsProgress) {
      data.politicsProgress = politicsProgress;
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: 'JSON 解析失败，请确认文件未损坏。' };
  }
}
