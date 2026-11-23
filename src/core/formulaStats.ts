import { Rating } from 'ts-fsrs';
import { formatLocalDateKey } from './mistakes';
import {
  FORMULA_IDS,
  FORMULA_MAP,
  FORMULA_SECTIONS,
  FORMULA_SUBJECTS,
  type FormulaSubjectId,
} from '../data/formulas';
import type {
  FormulaReviewRecord,
  TimestampedFlag,
} from '../store/useFormulaProgress';
import type { SerializedCard } from '../store/useProgress';

export type FormulaMasteryLevel =
  | 'unlearned'
  | 'learning'
  | 'familiar'
  | 'mastered';

export function isFormulaDirectMastered(
  id: string,
  mastered: Record<string, TimestampedFlag>
): boolean {
  return Boolean(mastered[id]?.value);
}

export function isFormulaStarred(
  id: string,
  starred: Record<string, TimestampedFlag>
): boolean {
  return Boolean(starred[id]?.value);
}

export function getFormulaMasteryLevel(
  id: string,
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>
): FormulaMasteryLevel {
  if (isFormulaDirectMastered(id, mastered)) return 'mastered';
  const card = cards[id];
  if (!card) return 'unlearned';
  if (card.stability >= 21) return 'mastered';
  if (card.stability >= 7) return 'familiar';
  return 'learning';
}

export function getDueFormulaIds(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  now = new Date(),
  subject?: FormulaSubjectId
): string[] {
  const nowMs = now.getTime();
  return Object.entries(cards)
    .filter(([id, card]) => {
      if (!FORMULA_MAP[id]) return false;
      if (isFormulaDirectMastered(id, mastered)) return false;
      if (subject && FORMULA_MAP[id].subject !== subject) return false;
      return new Date(card.due).getTime() <= nowMs;
    })
    .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
    .map(([id]) => id);
}

export function getUnlearnedFormulaIds(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  options?: { subject?: FormulaSubjectId; sectionIds?: string[] }
): string[] {
  const secSet = options?.sectionIds ? new Set(options.sectionIds) : null;
  return FORMULA_IDS.filter((id) => {
    if (isFormulaDirectMastered(id, mastered)) return false;
    if (cards[id]) return false;
    const item = FORMULA_MAP[id];
    if (options?.subject && item.subject !== options.subject) return false;
    if (secSet && !secSet.has(item.sectionId)) return false;
    return true;
  });
}

export function getStarredFormulaIds(
  starred: Record<string, TimestampedFlag>,
  subject?: FormulaSubjectId
): string[] {
  return FORMULA_IDS.filter((id) => {
    if (!isFormulaStarred(id, starred)) return false;
    if (subject && FORMULA_MAP[id].subject !== subject) return false;
    return true;
  });
}

export interface FormulaMistakeItem {
  formulaId: string;
  totalReviews: number;
  againCount: number;
  errorRate: number;
  lastReviewAt: string;
}

export function collectFormulaMistakes(
  reviews: FormulaReviewRecord[],
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): FormulaMistakeItem[] {
  const cutoffMs = now.getTime() - 30 * 86400 * 1000;
  const byId = new Map<
    string,
    { total: number; again: number; recentAgain: boolean; lastAt: string }
  >();

  for (const r of reviews) {
    if (!FORMULA_MAP[r.formulaId]) continue;
    const entry = byId.get(r.formulaId) ?? {
      total: 0,
      again: 0,
      recentAgain: false,
      lastAt: r.timestamp,
    };
    entry.total += 1;
    if (r.rating === Rating.Again) {
      entry.again += 1;
      if (new Date(r.timestamp).getTime() >= cutoffMs) {
        entry.recentAgain = true;
      }
    }
    if (r.timestamp > entry.lastAt) entry.lastAt = r.timestamp;
    byId.set(r.formulaId, entry);
  }

  const out: FormulaMistakeItem[] = [];
  for (const [formulaId, entry] of byId.entries()) {
    if (isFormulaDirectMastered(formulaId, mastered)) continue;
    const errorRate = entry.total > 0 ? entry.again / entry.total : 0;
    if (entry.recentAgain || errorRate > 0.3) {
      out.push({
        formulaId,
        totalReviews: entry.total,
        againCount: entry.again,
        errorRate,
        lastReviewAt: entry.lastAt,
      });
    }
  }

  return out.sort(
    (a, b) =>
      b.againCount - a.againCount ||
      b.errorRate - a.errorRate ||
      b.lastReviewAt.localeCompare(a.lastReviewAt)
  );
}

export interface FormulaSubjectMasteryRow {
  subject: FormulaSubjectId;
  name: string;
  fullName: string;
  total: number;
  directMastered: number;
  fsrsMastered: number;
  familiar: number;
  learning: number;
  unlearned: number;
  doneCount: number;
}

export function computeFormulaSubjectMastery(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>
): FormulaSubjectMasteryRow[] {
  return FORMULA_SUBJECTS.map((subj) => {
    let total = 0;
    let directMastered = 0;
    let fsrsMastered = 0;
    let familiar = 0;
    let learning = 0;
    let unlearned = 0;

    for (const id of FORMULA_IDS) {
      if (FORMULA_MAP[id].subject !== subj.id) continue;
      total += 1;
      if (isFormulaDirectMastered(id, mastered)) {
        directMastered += 1;
      } else {
        const level = getFormulaMasteryLevel(id, cards, mastered);
        if (level === 'mastered') fsrsMastered += 1;
        else if (level === 'familiar') familiar += 1;
        else if (level === 'learning') learning += 1;
        else unlearned += 1;
      }
    }

    return {
      subject: subj.id,
      name: subj.name,
      fullName: subj.fullName,
      total,
      directMastered,
      fsrsMastered,
      familiar,
      learning,
      unlearned,
      doneCount: directMastered + fsrsMastered,
    };
  });
}

export interface FormulaSectionProgress {
  sectionId: string;
  subject: FormulaSubjectId;
  code: string;
  title: string;
  total: number;
  directMastered: number;
  fsrsMastered: number;
  inProgress: number;
  unlearned: number;
  dueCount: number;
}

export function computeFormulaSectionProgress(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): FormulaSectionProgress[] {
  const nowMs = now.getTime();
  return FORMULA_SECTIONS.map((sec) => {
    let directMastered = 0;
    let fsrsMastered = 0;
    let inProgress = 0;
    let unlearned = 0;
    let dueCount = 0;

    for (const id of sec.questionIds) {
      if (isFormulaDirectMastered(id, mastered)) {
        directMastered += 1;
      } else {
        const card = cards[id];
        if (!card) {
          unlearned += 1;
        } else {
          if (new Date(card.due).getTime() <= nowMs) dueCount += 1;
          if (card.stability >= 21) fsrsMastered += 1;
          else inProgress += 1;
        }
      }
    }

    return {
      sectionId: sec.id,
      subject: sec.subject,
      code: sec.code,
      title: sec.title,
      total: sec.questionIds.length,
      directMastered,
      fsrsMastered,
      inProgress,
      unlearned,
      dueCount,
    };
  });
}

export interface FormulaForecastPoint {
  dateKey: string;
  label: string;
  dueCount: number;
}

export function computeFormula14DayForecast(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): FormulaForecastPoint[] {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days: FormulaForecastPoint[] = [];
  const indexMap = new Map<string, number>();

  for (let i = 0; i < 14; i++) {
    const d = new Date(startOfToday);
    d.setDate(startOfToday.getDate() + i);
    const key = formatLocalDateKey(d);
    const label = i === 0 ? '今天' : i === 1 ? '明天' : `${d.getMonth() + 1}/${d.getDate()}`;
    indexMap.set(key, i);
    days.push({ dateKey: key, label, dueCount: 0 });
  }

  for (const [id, card] of Object.entries(cards)) {
    if (!FORMULA_MAP[id]) continue;
    if (isFormulaDirectMastered(id, mastered)) continue;
    const dueDate = new Date(card.due);
    if (dueDate.getTime() <= startOfToday.getTime() + 86400000 - 1) {
      days[0].dueCount += 1;
    } else {
      const idx = indexMap.get(formatLocalDateKey(dueDate));
      if (idx !== undefined) days[idx].dueCount += 1;
    }
  }

  return days;
}

export interface FormulaDayActivity {
  dateKey: string;
  weekdayLabel: string;
  count: number;
  level: 0 | 1 | 2 | 3;
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export function getFormulaWeeklyHeatmap(
  reviews: FormulaReviewRecord[],
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): FormulaDayActivity[] {
  const counts = new Map<string, number>();
  for (const r of reviews) {
    const key = formatLocalDateKey(new Date(r.timestamp));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  for (const flag of Object.values(mastered)) {
    if (!flag.value) continue;
    const key = formatLocalDateKey(new Date(flag.updatedAt));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const days: FormulaDayActivity[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    const key = formatLocalDateKey(d);
    const count = counts.get(key) ?? 0;
    const level: 0 | 1 | 2 | 3 =
      count === 0 ? 0 : count < 6 ? 1 : count < 15 ? 2 : 3;
    days.push({
      dateKey: key,
      weekdayLabel: offset === 0 ? '今' : `周${WEEKDAY_LABELS[d.getDay()]}`,
      count,
      level,
    });
  }
  return days;
}
