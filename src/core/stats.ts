import { formatLocalDateKey } from './mistakes';
import { getMasteryLevel } from './scheduler';
import { BIG_SENTENCES } from '../data/bigEssay';
import { SENTENCES, TEMPLATES } from '../data/templates';
import {
  deserializeCard,
  type BigExamRecord,
  type ExamRecord,
  type IdentificationRecord,
  type SerializedCard,
} from '../store/useProgress';
import type { TemplateId } from '../data/types';

export interface TemplateMasteryRow {
  templateId: TemplateId;
  name: string;
  total: number;
  unlearned: number;
  learning: number;
  familiar: number;
  mastered: number;
}

export function computeTemplateMastery(
  cards: Record<string, SerializedCard>
): TemplateMasteryRow[] {
  return TEMPLATES.map((tpl) => {
    const studyIds = tpl.sentenceIds.filter(
      (id) => SENTENCES[id].role !== 'heading' && SENTENCES[id].role !== 'signoff'
    );
    let unlearned = 0;
    let learning = 0;
    let familiar = 0;
    let mastered = 0;

    for (const sid of studyIds) {
      const raw = cards[sid];
      const level = getMasteryLevel(raw ? deserializeCard(raw) : undefined);
      if (level === 'unlearned') unlearned++;
      else if (level === 'learning') learning++;
      else if (level === 'familiar') familiar++;
      else mastered++;
    }

    return {
      templateId: tpl.id,
      name: tpl.name.replace('（备用）', ''),
      total: studyIds.length,
      unlearned,
      learning,
      familiar,
      mastered,
    };
  });
}

export interface BigParagraphMasteryRow {
  paragraph: 1 | 2 | 3;
  name: string;
  total: number;
  unlearned: number;
  learning: number;
  familiar: number;
  mastered: number;
}

export function computeBigParagraphMastery(
  cards: Record<string, SerializedCard>
): BigParagraphMasteryRow[] {
  const specs: { paragraph: 1 | 2 | 3; name: string }[] = [
    { paragraph: 1, name: '第一段（描述与意义）' },
    { paragraph: 2, name: '第二段（价值与变化）' },
    { paragraph: 3, name: '第三段（关键与行动）' },
  ];
  return specs.map((spec) => {
    const sents = BIG_SENTENCES.filter((s) => s.paragraph === spec.paragraph);
    let unlearned = 0;
    let learning = 0;
    let familiar = 0;
    let mastered = 0;
    for (const s of sents) {
      const raw = cards[s.id];
      const level = getMasteryLevel(raw ? deserializeCard(raw) : undefined);
      if (level === 'unlearned') unlearned++;
      else if (level === 'learning') learning++;
      else if (level === 'familiar') familiar++;
      else mastered++;
    }
    return {
      paragraph: spec.paragraph,
      name: spec.name,
      total: sents.length,
      unlearned,
      learning,
      familiar,
      mastered,
    };
  });
}

export interface ForecastDay {
  dateKey: string;
  label: string;
  dueCount: number;
}

export function compute14DayForecast(
  cards: Record<string, SerializedCard>,
  now = new Date()
): ForecastDay[] {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days: ForecastDay[] = [];
  const counts = new Map<string, number>();

  for (let i = 0; i < 14; i++) {
    const d = new Date(startOfToday);
    d.setDate(startOfToday.getDate() + i);
    const key = formatLocalDateKey(d);
    counts.set(key, 0);
    days.push({
      dateKey: key,
      label: i === 0 ? '今天' : `${d.getMonth() + 1}/${d.getDate()}`,
      dueCount: 0,
    });
  }

  for (const card of Object.values(cards)) {
    const dueDate = new Date(card.due);
    if (dueDate.getTime() <= startOfToday.getTime() + 24 * 60 * 60 * 1000 - 1) {
      // Overdue or due today counts on day 0
      const todayKey = days[0].dateKey;
      counts.set(todayKey, (counts.get(todayKey) ?? 0) + 1);
    } else {
      const key = formatLocalDateKey(dueDate);
      if (counts.has(key)) {
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return days.map((d) => ({
    ...d,
    dueCount: counts.get(d.dateKey) ?? 0,
  }));
}

export interface ExamTimePoint {
  index: number;
  label: string;
  minutes: number;
  accuracyPct: number;
}

export function computeExamTimeSeries(records: ExamRecord[]): ExamTimePoint[] {
  return records.map((rec, i) => ({
    index: i + 1,
    label: `第 ${i + 1} 篇`,
    minutes: Number((rec.durationSec / 60).toFixed(1)),
    accuracyPct: Math.round(rec.overallAccuracy * 100),
  }));
}

export function computeBigExamTimeSeries(records: BigExamRecord[]): ExamTimePoint[] {
  return records.map((rec, i) => ({
    index: i + 1,
    label: `第 ${i + 1} 篇`,
    minutes: Number((rec.durationSec / 60).toFixed(1)),
    accuracyPct: Math.round(rec.fixedAccuracy * 100),
  }));
}

export interface IdentificationStats {
  total: number;
  correct: number;
  accuracyPct: number | null;
}

export function computeIdentificationStats(
  records: IdentificationRecord[]
): IdentificationStats {
  const total = records.length;
  if (total === 0) return { total: 0, correct: 0, accuracyPct: null };
  const correct = records.filter((r) => r.correct).length;
  return {
    total,
    correct,
    accuracyPct: Math.round((correct / total) * 100),
  };
}
