import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
} from 'ts-fsrs';
import { getTemplatesUsingSentence } from '../data/templates';

export interface SchedulerOptions {
  requestRetention?: number; // 0.85 - 0.95, default 0.9
  examDate?: string | null; // YYYY-MM-DD
}

export function getDaysUntilExam(examDate: string | null | undefined, now: Date): number | null {
  if (!examDate) return null;
  const target = new Date(`${examDate}T09:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function createScheduler(options: SchedulerOptions = {}, now = new Date()) {
  const retention = Math.min(0.95, Math.max(0.85, options.requestRetention ?? 0.9));
  let maximumInterval = 365;

  const daysLeft = getDaysUntilExam(options.examDate, now);
  if (daysLeft !== null && daysLeft <= 30) {
    maximumInterval = Math.max(1, Math.min(Math.floor(Math.max(2, daysLeft) / 2), 7));
  }

  const params = generatorParameters({
    request_retention: retention,
    maximum_interval: maximumInterval,
    enable_fuzz: false,
  });

  return fsrs(params);
}

export function createInitialCard(now = new Date()): Card {
  return createEmptyCard(now);
}

export function reviewCard(
  card: Card,
  rating: Grade,
  now = new Date(),
  options: SchedulerOptions = {}
): Card {
  const scheduler = createScheduler(options, now);
  const record = scheduler.repeat(card, now);
  return record[rating].card;
}

export function formatInterval(from: Date, to: Date): string {
  const diffMin = Math.max(1, Math.round((to.getTime() - from.getTime()) / (1000 * 60)));
  if (diffMin < 60) return `${diffMin} 分钟`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours} 小时`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} 天`;
}

export interface IntervalPreview {
  [Rating.Again]: string;
  [Rating.Hard]: string;
  [Rating.Good]: string;
  [Rating.Easy]: string;
}

export function previewIntervals(
  card: Card,
  now = new Date(),
  options: SchedulerOptions = {}
): IntervalPreview {
  const scheduler = createScheduler(options, now);
  const record = scheduler.repeat(card, now);
  return {
    [Rating.Again]: formatInterval(now, record[Rating.Again].card.due),
    [Rating.Hard]: formatInterval(now, record[Rating.Hard].card.due),
    [Rating.Good]: formatInterval(now, record[Rating.Good].card.due),
    [Rating.Easy]: formatInterval(now, record[Rating.Easy].card.due),
  };
}

/**
 * 交错排布复习队列：保证连续两张卡不属于同一模板（共用卡除外），并在大小作文混刷时交替出现。
 */
export function interleaveQueue(sentenceIds: string[]): string[] {
  const getGroup = (id: string): string => {
    if (id.startsWith('big.')) return 'big';
    if (id.startsWith('shared.')) return 'shared';
    const tpls = getTemplatesUsingSentence(id);
    if (tpls.length !== 1) return 'shared';
    return tpls[0].id;
  };

  // If queue mixes both small and big cards, strictly alternate between big and small buckets first
  const bigIds = sentenceIds.filter((id) => id.startsWith('big.'));
  const smallIds = sentenceIds.filter((id) => !id.startsWith('big.'));
  if (bigIds.length > 0 && smallIds.length > 0) {
    const interleavedSmall = interleaveQueue(smallIds);
    const merged: string[] = [];
    let bi = 0;
    let si = 0;
    let pickSmall = interleavedSmall.length >= bigIds.length;
    while (bi < bigIds.length || si < interleavedSmall.length) {
      if (pickSmall && si < interleavedSmall.length) {
        merged.push(interleavedSmall[si++]);
      } else if (!pickSmall && bi < bigIds.length) {
        merged.push(bigIds[bi++]);
      } else if (si < interleavedSmall.length) {
        merged.push(interleavedSmall[si++]);
      } else {
        merged.push(bigIds[bi++]);
      }
      pickSmall = !pickSmall;
    }
    return merged;
  }

  const buckets = new Map<string, string[]>();
  for (const id of sentenceIds) {
    const g = getGroup(id);
    const list = buckets.get(g) ?? [];
    list.push(id);
    buckets.set(g, list);
  }

  const result: string[] = [];
  let prevGroup: string | null = null;

  while (result.length < sentenceIds.length) {
    // Pick largest non-empty bucket whose group !== prevGroup (unless shared)
    let bestGroup: string | null = null;
    let bestLen = -1;

    for (const [group, items] of buckets.entries()) {
      if (items.length === 0) continue;
      if (group !== 'shared' && group === prevGroup) continue;
      if (items.length > bestLen) {
        bestLen = items.length;
        bestGroup = group;
      }
    }

    // Fallback if only same-group cards remain
    if (bestGroup === null) {
      for (const [group, items] of buckets.entries()) {
        if (items.length > 0) {
          bestGroup = group;
          break;
        }
      }
    }

    if (bestGroup === null) break;
    const nextId = buckets.get(bestGroup)!.shift()!;
    result.push(nextId);
    prevGroup = bestGroup;
  }

  return result;
}

/**
 * 错误重排：本轮评为 Again 的卡在 3-5 张卡之后再次出现。
 */
export function requeueAgainCard(
  queue: string[],
  currentIndex: number,
  sentenceId: string,
  offset = 4
): string[] {
  const clampedOffset = Math.min(5, Math.max(3, offset));
  const next = [...queue];
  const insertAt = Math.min(next.length, currentIndex + 1 + clampedOffset);
  next.splice(insertAt, 0, sentenceId);
  return next;
}

export type MasteryLevel = 'unlearned' | 'learning' | 'familiar' | 'mastered';

export function getMasteryLevel(card: Card | undefined): MasteryLevel {
  if (!card) return 'unlearned';
  if (card.state === State.New || card.stability < 3) return 'learning';
  if (card.stability <= 14) return 'familiar';
  return 'mastered';
}

/**
 * 考前 3 天冲刺队列：
 * 返回历史错误率最高的 10 张句子卡（若有学习记录，不足 10 张则补齐已学句）。
 */
export function buildSprintSentenceQueue(
  reviews: { sentenceId: string; rating: Rating; accuracy: number }[],
  learnedSentenceIds: string[],
  limit = 10
): string[] {
  const stats = new Map<string, { errors: number; total: number }>();
  for (const r of reviews) {
    const entry = stats.get(r.sentenceId) ?? { errors: 0, total: 0 };
    entry.total += 1;
    if (r.rating === Rating.Again || r.accuracy < 0.85) {
      entry.errors += 1;
    }
    stats.set(r.sentenceId, entry);
  }

  const ranked = [...stats.entries()]
    .map(([id, s]) => ({ id, rate: s.errors / Math.max(1, s.total), errors: s.errors }))
    .sort((a, b) => (b.rate !== a.rate ? b.rate - a.rate : b.errors - a.errors))
    .map((x) => x.id);

  const result: string[] = [];
  for (const id of ranked) {
    if (result.length >= limit) break;
    result.push(id);
  }
  for (const id of learnedSentenceIds) {
    if (result.length >= limit) break;
    if (!result.includes(id)) result.push(id);
  }
  return interleaveQueue(result);
}

export function isExamSprintActive(examDate: string | null | undefined, now = new Date()): boolean {
  const days = getDaysUntilExam(examDate, now);
  return days !== null && days >= 0 && days <= 3;
}
