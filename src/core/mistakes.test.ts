import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { SENTENCES } from '../data/templates';
import { gradeAnswer } from './grader';
import {
  collectMistakes,
  extractWordMistakes,
  getWeeklyHeatmap,
  type ReviewRecord,
} from './mistakes';

describe('错题本收集与热力图统计 mistakes.ts 单元测试', () => {
  it('从判分结果中提取拼写错误并生成最常错词提示', () => {
    const s = SENTENCES['suggest.body3'];
    const graded = gradeAnswer(
      s,
      'Last but not least, it is advisible for you to [X]. Only in this way can you truly [X].'
    );
    const wordMistakes = extractWordMistakes(graded.tokens);
    expect(wordMistakes).toContainEqual({
      expected: 'advisable',
      actual: 'advisible',
      kind: 'misspelled',
    });

    const now = new Date('2026-11-23T12:00:00Z');
    const reviews: ReviewRecord[] = [
      {
        sentenceId: 'suggest.body3',
        rating: Rating.Again,
        accuracy: 0.8,
        timestamp: '2026-11-22T10:00:00Z',
        wordMistakes,
      },
      {
        sentenceId: 'suggest.body3',
        rating: Rating.Hard,
        accuracy: 0.92,
        timestamp: '2026-11-23T08:00:00Z',
        wordMistakes,
      },
    ];

    const list = collectMistakes(reviews, now);
    expect(list).toHaveLength(1);
    expect(list[0].againCount).toBe(1);
    expect(list[0].topMistakeText).toBe('常把 advisable 写成 advisible');
  });

  it('超过 30 天的单次 Again 且整体错误率 ≤ 30% 不再进入错题本', () => {
    const now = new Date('2026-11-23T12:00:00Z');
    const reviews: ReviewRecord[] = [
      {
        sentenceId: 'shared.closing',
        rating: Rating.Again,
        accuracy: 0.7,
        timestamp: '2026-10-01T10:00:00Z',
      },
      {
        sentenceId: 'shared.closing',
        rating: Rating.Good,
        accuracy: 1,
        timestamp: '2026-11-10T10:00:00Z',
      },
      {
        sentenceId: 'shared.closing',
        rating: Rating.Good,
        accuracy: 1,
        timestamp: '2026-11-15T10:00:00Z',
      },
      {
        sentenceId: 'shared.closing',
        rating: Rating.Easy,
        accuracy: 1,
        timestamp: '2026-11-20T10:00:00Z',
      },
    ];
    expect(collectMistakes(reviews, now)).toHaveLength(0);
  });

  it('本周热力图准确返回 7 天记录与活跃等级', () => {
    const now = new Date('2026-11-23T12:00:00Z');
    const reviews: ReviewRecord[] = Array.from({ length: 6 }, () => ({
      sentenceId: 'shared.emotion.good',
      rating: Rating.Good,
      accuracy: 1,
      timestamp: '2026-11-23T09:00:00Z',
    }));
    const heatmap = getWeeklyHeatmap(reviews, now);
    expect(heatmap).toHaveLength(7);
    expect(heatmap[6].weekdayLabel).toBe('今');
    expect(heatmap[6].count).toBe(6);
    expect(heatmap[6].level).toBe(2);
  });
});
