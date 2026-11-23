import type { ReviewRecord } from './mistakes';
import type { FormulaBackupData } from '../store/useFormulaProgress';
import type { ExamRecord, IdentificationRecord, SerializedCard } from '../store/useProgress';
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
    requestRetention: number;
    examDate: string | null;
    strictPunctuation: boolean;
    practiceMode: PracticeMode;
    inputMode: InputMode;
    theme: ThemeMode;
    unlockAllLessons: boolean;
    bodyFontSize: number;
  };
  formulaProgress?: FormulaBackupData;
}

export interface BackupMeta {
  updatedAt?: string | null;
  settingsUpdatedAt?: string | null;
  resetAt?: string | null;
  formulaProgress?: FormulaBackupData;
}

export function buildBackupPayload(
  progress: BackupPayload['progress'],
  settings: BackupPayload['settings'],
  now = new Date(),
  meta?: BackupMeta
): BackupPayload {
  const payload: BackupPayload = {
    app: 'kaoyan-essay',
    schemaVersion: 3,
    exportedAt: now.toISOString(),
    updatedAt: meta?.updatedAt ?? null,
    settingsUpdatedAt: meta?.settingsUpdatedAt ?? null,
    resetAt: meta?.resetAt ?? null,
    progress,
    settings,
  };
  if (meta?.formulaProgress) {
    payload.formulaProgress = meta.formulaProgress;
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

export function parseBackup(jsonText: string): { ok: true; data: BackupPayload } | { ok: false; error: string } {
  try {
    const raw = JSON.parse(jsonText) as Partial<BackupPayload>;
    if (!raw || raw.app !== 'kaoyan-essay' || !raw.progress || typeof raw.progress !== 'object') {
      return { ok: false, error: '文件格式无效：不是小作文背诵网站导出的 JSON 备份。' };
    }
    if (!raw.progress.cards || typeof raw.progress.cards !== 'object') {
      return { ok: false, error: '备份文件中缺少卡片进度数据。' };
    }
    const formulaProgress = normalizeFormulaBackup(raw.formulaProgress);
    const data: BackupPayload = {
      app: 'kaoyan-essay',
      schemaVersion: raw.schemaVersion ?? 3,
      exportedAt: raw.exportedAt ?? new Date().toISOString(),
      updatedAt: raw.updatedAt ?? null,
      settingsUpdatedAt: raw.settingsUpdatedAt ?? null,
      resetAt: raw.resetAt ?? null,
      progress: {
        cards: raw.progress.cards ?? {},
        reviews: Array.isArray(raw.progress.reviews) ? raw.progress.reviews : [],
        dailyLearnedCount: raw.progress.dailyLearnedCount ?? {},
        examRecords: Array.isArray(raw.progress.examRecords) ? raw.progress.examRecords : [],
        idRecords: Array.isArray(raw.progress.idRecords) ? raw.progress.idRecords : [],
      },
      settings: {
        dailyNewLimit: raw.settings?.dailyNewLimit ?? 8,
        requestRetention: raw.settings?.requestRetention ?? 0.9,
        examDate: raw.settings?.examDate ?? null,
        strictPunctuation: raw.settings?.strictPunctuation ?? false,
        practiceMode: raw.settings?.practiceMode ?? 'framework',
        inputMode: raw.settings?.inputMode ?? 'typing',
        theme: raw.settings?.theme ?? 'light',
        unlockAllLessons: raw.settings?.unlockAllLessons ?? false,
        bodyFontSize: raw.settings?.bodyFontSize ?? 19,
      },
    };
    if (formulaProgress) {
      data.formulaProgress = formulaProgress;
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: 'JSON 解析失败，请确认文件未损坏。' };
  }
}
