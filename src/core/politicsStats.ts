import { Rating } from 'ts-fsrs';
import { formatLocalDateKey } from './mistakes';
import {
  POLITICS_CARD_IDS,
  POLITICS_CARD_MAP,
  POLITICS_MAJORS,
  POLITICS_TOPICS,
  type PoliticsMajorId,
} from '../data/politics';
import type { TimestampedFlag } from '../store/useFormulaProgress';
import type { PoliticsReviewRecord } from '../store/usePoliticsProgress';
import type { SerializedCard } from '../store/useProgress';

export type PoliticsMasteryLevel =
  | 'unlearned'
  | 'learning'
  | 'familiar'
  | 'mastered';

export function isPoliticsDirectMastered(
  id: string,
  mastered: Record<string, TimestampedFlag>
): boolean {
  return Boolean(mastered[id]?.value);
}

export function isPoliticsStarred(
  id: string,
  starred: Record<string, TimestampedFlag>
): boolean {
  return Boolean(starred[id]?.value);
}

export function getPoliticsMasteryLevel(
  id: string,
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>
): PoliticsMasteryLevel {
  if (isPoliticsDirectMastered(id, mastered)) return 'mastered';
  const card = cards[id];
  if (!card) return 'unlearned';
  if (card.stability >= 21) return 'mastered';
  if (card.stability >= 7) return 'familiar';
  return 'learning';
}

export function getDuePoliticsIds(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  now = new Date(),
  major?: PoliticsMajorId
): string[] {
  const nowMs = now.getTime();
  return Object.entries(cards)
    .filter(([id, card]) => {
      if (!POLITICS_CARD_MAP[id]) return false;
      if (isPoliticsDirectMastered(id, mastered)) return false;
      if (major && POLITICS_CARD_MAP[id].major !== major) return false;
      return new Date(card.due).getTime() <= nowMs;
    })
    .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
    .map(([id]) => id);
}

export function getUnlearnedPoliticsIds(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  options?: { major?: PoliticsMajorId; topicIds?: string[] }
): string[] {
  const topicSet = options?.topicIds ? new Set(options.topicIds) : null;
  return POLITICS_CARD_IDS.filter((id) => {
    if (isPoliticsDirectMastered(id, mastered)) return false;
    if (cards[id]) return false;
    const item = POLITICS_CARD_MAP[id];
    if (options?.major && item.major !== options.major) return false;
    if (topicSet && !topicSet.has(item.topicId)) return false;
    return true;
  });
}

export function getStarredPoliticsIds(
  starred: Record<string, TimestampedFlag>,
  major?: PoliticsMajorId
): string[] {
  return POLITICS_CARD_IDS.filter((id) => {
    if (!isPoliticsStarred(id, starred)) return false;
    if (major && POLITICS_CARD_MAP[id].major !== major) return false;
    return true;
  });
}

export interface PoliticsMistakeItem {
  cardId: string;
  totalReviews: number;
  againCount: number;
  errorRate: number;
  lastReviewAt: string;
}

export function collectPoliticsMistakes(
  reviews: PoliticsReviewRecord[],
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): PoliticsMistakeItem[] {
  const cutoffMs = now.getTime() - 30 * 86400 * 1000;
  const byId = new Map<
    string,
    { total: number; again: number; recentAgain: boolean; lastAt: string }
  >();

  for (const r of reviews) {
    if (!POLITICS_CARD_MAP[r.cardId]) continue;
    const entry = byId.get(r.cardId) ?? {
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
    byId.set(r.cardId, entry);
  }

  const out: PoliticsMistakeItem[] = [];
  for (const [cardId, entry] of byId.entries()) {
    if (isPoliticsDirectMastered(cardId, mastered)) continue;
    const errorRate = entry.total > 0 ? entry.again / entry.total : 0;
    if (entry.recentAgain || errorRate > 0.3) {
      out.push({
        cardId,
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

export interface PoliticsMajorProgressRow {
  major: PoliticsMajorId;
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

export function computePoliticsMajorProgress(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>
): PoliticsMajorProgressRow[] {
  return POLITICS_MAJORS.map((m) => {
    let total = 0;
    let directMastered = 0;
    let fsrsMastered = 0;
    let familiar = 0;
    let learning = 0;
    let unlearned = 0;

    for (const id of POLITICS_CARD_IDS) {
      if (POLITICS_CARD_MAP[id].major !== m.id) continue;
      total += 1;
      if (isPoliticsDirectMastered(id, mastered)) {
        directMastered += 1;
      } else {
        const level = getPoliticsMasteryLevel(id, cards, mastered);
        if (level === 'mastered') fsrsMastered += 1;
        else if (level === 'familiar') familiar += 1;
        else if (level === 'learning') learning += 1;
        else unlearned += 1;
      }
    }

    return {
      major: m.id,
      name: m.name,
      fullName: m.fullName,
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

export interface PoliticsTopicProgressRow {
  topicId: string;
  major: PoliticsMajorId;
  title: string;
  total: number;
  directMastered: number;
  fsrsMastered: number;
  inProgress: number;
  unlearned: number;
  dueCount: number;
}

export function computePoliticsTopicProgress(
  cards: Record<string, SerializedCard>,
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): PoliticsTopicProgressRow[] {
  const nowMs = now.getTime();
  return POLITICS_TOPICS.map((t) => {
    let directMastered = 0;
    let fsrsMastered = 0;
    let inProgress = 0;
    let unlearned = 0;
    let dueCount = 0;

    for (const id of t.cardIds) {
      if (isPoliticsDirectMastered(id, mastered)) {
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
      topicId: t.id,
      major: t.major,
      title: t.title,
      total: t.cardIds.length,
      directMastered,
      fsrsMastered,
      inProgress,
      unlearned,
      dueCount,
    };
  });
}

export interface PoliticsDayActivity {
  dateKey: string;
  weekdayLabel: string;
  count: number;
  level: 0 | 1 | 2 | 3;
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export function getPoliticsWeeklyHeatmap(
  reviews: PoliticsReviewRecord[],
  mastered: Record<string, TimestampedFlag>,
  now = new Date()
): PoliticsDayActivity[] {
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

  const days: PoliticsDayActivity[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    const key = formatLocalDateKey(d);
    const count = counts.get(key) ?? 0;
    const level: 0 | 1 | 2 | 3 =
      count === 0 ? 0 : count < 5 ? 1 : count < 12 ? 2 : 3;
    days.push({
      dateKey: key,
      weekdayLabel: offset === 0 ? '今' : `周${WEEKDAY_LABELS[d.getDay()]}`,
      count,
      level,
    });
  }
  return days;
}
