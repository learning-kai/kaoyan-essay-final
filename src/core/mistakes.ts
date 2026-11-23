import { Rating } from 'ts-fsrs';
import type { DiffToken } from './diff';

export interface WordMistakePair {
  expected: string;
  actual: string;
  kind: 'misspelled' | 'wrongForm' | 'missing';
}

export interface ReviewRecord {
  sentenceId: string;
  rating: Rating;
  accuracy: number;
  timestamp: string;
  wordMistakes?: WordMistakePair[];
}

export interface MistakeSummary {
  sentenceId: string;
  againCount: number;
  totalReviews: number;
  errorRate: number; // 0 to 1
  lastReviewedAt: string;
  topMistakeText: string | null;
}

/**
 * 从单次 DiffToken 中提取可归因的错词（拼写误差、词形误差、漏词）
 */
export function extractWordMistakes(tokens: DiffToken[]): WordMistakePair[] {
  const list: WordMistakePair[] = [];
  for (const tok of tokens) {
    if (tok.status === 'misspelled' && tok.expected) {
      list.push({ expected: tok.expected, actual: tok.text, kind: 'misspelled' });
    } else if (tok.status === 'wrongForm' && tok.expected) {
      list.push({ expected: tok.expected, actual: tok.text, kind: 'wrongForm' });
    } else if (tok.status === 'missing') {
      list.push({ expected: tok.text, actual: '', kind: 'missing' });
    }
  }
  return list;
}

/**
 * 收集错题本：
 * - 最近 30 天内评过 Again 的句子
 * - 或历史错误率 > 30% 的句子（accuracy < 0.85 或 rating === Again 计为一次错误）
 */
export function collectMistakes(
  reviews: ReviewRecord[],
  now = new Date()
): MistakeSummary[] {
  const cutoffMs = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const bySentence = new Map<string, ReviewRecord[]>();

  for (const r of reviews) {
    const arr = bySentence.get(r.sentenceId) ?? [];
    arr.push(r);
    bySentence.set(r.sentenceId, arr);
  }

  const summaries: MistakeSummary[] = [];

  for (const [sentenceId, records] of bySentence.entries()) {
    const totalReviews = records.length;
    if (totalReviews === 0) continue;

    let recentAgain = false;
    let againCount = 0;
    let errorCount = 0;
    let lastTs = records[0].timestamp;

    const mistakeFreq = new Map<string, { pair: WordMistakePair; count: number }>();

    for (const r of records) {
      const ts = new Date(r.timestamp).getTime();
      if (ts > new Date(lastTs).getTime()) lastTs = r.timestamp;

      const isAgain = r.rating === Rating.Again;
      if (isAgain) {
        againCount += 1;
        if (ts >= cutoffMs) recentAgain = true;
      }
      if (isAgain || r.accuracy < 0.85) {
        errorCount += 1;
      }

      for (const wm of r.wordMistakes ?? []) {
        const key = `${wm.kind}:${wm.expected.toLowerCase()}->${wm.actual.toLowerCase()}`;
        const prev = mistakeFreq.get(key);
        if (prev) {
          prev.count += 1;
        } else {
          mistakeFreq.set(key, { pair: wm, count: 1 });
        }
      }
    }

    const errorRate = errorCount / totalReviews;
    if (!recentAgain && errorRate <= 0.3) continue;

    // Pick most frequent word mistake (prefer misspelled/wrongForm over missing)
    let topEntry: { pair: WordMistakePair; count: number } | null = null;
    for (const entry of mistakeFreq.values()) {
      if (!topEntry) {
        topEntry = entry;
        continue;
      }
      const entryScore = entry.count * (entry.pair.kind === 'missing' ? 0.8 : 1);
      const topScore = topEntry.count * (topEntry.pair.kind === 'missing' ? 0.8 : 1);
      if (entryScore > topScore) {
        topEntry = entry;
      }
    }

    let topMistakeText: string | null = null;
    if (topEntry) {
      const { pair } = topEntry;
      if (pair.kind === 'missing') {
        topMistakeText = `常漏写 ${pair.expected}`;
      } else {
        topMistakeText = `常把 ${pair.expected} 写成 ${pair.actual}`;
      }
    }

    summaries.push({
      sentenceId,
      againCount,
      totalReviews,
      errorRate,
      lastReviewedAt: lastTs,
      topMistakeText,
    });
  }

  return summaries.sort((a, b) => {
    if (b.againCount !== a.againCount) return b.againCount - a.againCount;
    return b.errorRate - a.errorRate;
  });
}

/**
 * 统计最近 7 天（含今天）每日练习次数，用于今日首页热力图
 */
export interface DayActivity {
  dateKey: string;
  weekdayLabel: string;
  count: number;
  level: 0 | 1 | 2 | 3;
}

const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六'];

export function getWeeklyHeatmap(
  reviews: ReviewRecord[],
  now = new Date()
): DayActivity[] {
  const counts = new Map<string, number>();
  for (const r of reviews) {
    const d = new Date(r.timestamp);
    const key = formatLocalDateKey(d);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const days: DayActivity[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    const key = formatLocalDateKey(d);
    const count = counts.get(key) ?? 0;
    const level: 0 | 1 | 2 | 3 =
      count === 0 ? 0 : count < 5 ? 1 : count < 15 ? 2 : 3;
    days.push({
      dateKey: key,
      weekdayLabel: offset === 0 ? '今' : `周${WEEKDAY_ZH[d.getDay()]}`,
      count,
      level,
    });
  }
  return days;
}

export function formatLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
