import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { getTemplatesUsingSentence } from '../data/templates';
import {
  createInitialCard,
  interleaveQueue,
  previewIntervals,
  requeueAgainCard,
  reviewCard,
} from './scheduler';

describe('FSRS 调度与队列逻辑 scheduler.ts 单元测试', () => {
  it('新卡片经 Good 评分后安排到未来复习，并输出间隔预览', () => {
    const now = new Date('2026-11-23T10:00:00Z');
    const card = createInitialCard(now);
    const next = reviewCard(card, Rating.Good, now);
    expect(next.due.getTime()).toBeGreaterThan(now.getTime());

    const preview = previewIntervals(card, now);
    expect(preview[Rating.Again]).toBeTruthy();
    expect(preview[Rating.Good]).toBeTruthy();
  });

  it('设置距考试 ≤ 30 天的考试日期后，最大复习间隔被正确限制', () => {
    const now = new Date('2026-12-01T10:00:00Z');
    // 距离考试 10 天 -> maximum_interval = min(10/2, 7) = 5 天
    let card = createInitialCard(now);
    for (let i = 0; i < 6; i++) {
      card = reviewCard(card, Rating.Easy, card.due, {
        examDate: '2026-12-11',
      });
    }
    expect(card.scheduled_days).toBeLessThanOrEqual(5);
  });

  it('交错队列中连续两张卡不属于同一模板（共用卡除外）', () => {
    const ids = [
      'suggest.body1',
      'suggest.body2',
      'suggest.body3',
      'invite.body1',
      'invite.body2',
      'apology.body1',
      'apology.body2',
      'shared.closing',
    ];
    const interleaved = interleaveQueue(ids);
    expect(interleaved).toHaveLength(ids.length);

    for (let i = 1; i < interleaved.length; i++) {
      const prev = interleaved[i - 1];
      const curr = interleaved[i];
      if (prev.startsWith('shared.') || curr.startsWith('shared.')) continue;
      const prevTpls = getTemplatesUsingSentence(prev);
      const currTpls = getTemplatesUsingSentence(curr);
      if (prevTpls.length === 1 && currTpls.length === 1) {
        expect(prevTpls[0].id).not.toBe(currTpls[0].id);
      }
    }
  });

  it('评 Again 的卡在本轮 3-5 张卡后重新插入队列', () => {
    const queue = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const updated = requeueAgainCard(queue, 0, 'a', 4);
    expect(updated).toHaveLength(8);
    expect(updated[5]).toBe('a');
  });
});
