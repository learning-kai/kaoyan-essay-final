import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { SENTENCES } from '../data/templates';
import { generateCloze, gradeAnswer } from './grader';

describe('判分算法 grader.ts 单元测试', () => {
  it('完全正确：准确率 100%，快速完成建议 Easy', () => {
    const s = SENTENCES['shared.emotion.good'];
    const res = gradeAnswer(
      s,
      'It is a great pleasure for me to write this letter to you.',
      { durationSec: 5 }
    );
    expect(res.accuracy).toBe(1);
    expect(res.suggestedRating).toBe(Rating.Easy);
    expect(res.tokens.every((t) => t.status === 'correct')).toBe(true);
  });

  it('漏写一个词：准确标出 missing 并扣分', () => {
    const s = SENTENCES['shared.emotion.good'];
    const res = gradeAnswer(
      s,
      'It is a pleasure for me to write this letter to you.'
    );
    expect(res.accuracy).toBeLessThan(1);
    expect(res.tokens.some((t) => t.status === 'missing' && t.text === 'great')).toBe(true);
  });

  it('拼写错误（编辑距离 ≤ 2 且词长 ≥ 4）：判为 misspelled 并算半对', () => {
    const s = SENTENCES['suggest.body3'];
    const res = gradeAnswer(
      s,
      'Last but not least, it is advisible for you to [X]. Only in this way can you truly [X].'
    );
    const misspelled = res.tokens.find((t) => t.status === 'misspelled');
    expect(misspelled).toBeDefined();
    expect(misspelled?.text).toBe('advisible');
    expect(misspelled?.expected).toBe('advisable');
    expect(res.accuracy).toBeGreaterThan(0.9);
    expect(res.accuracy).toBeLessThan(1);
  });

  it('词形错误：输入 as a result of break my promise 判为 wrongForm 并提示 breaking', () => {
    const s = SENTENCES['apology.body2'];
    const res = gradeAnswer(
      s,
      'Furthermore, as a result of break my promise, you had to face [影响], which should not have happened.',
      { mode: 'framework' }
    );
    const wf = res.tokens.find((t) => t.status === 'wrongForm');
    expect(wf).toBeDefined();
    expect(wf?.text).toBe('break');
    expect(wf?.expected).toBe('breaking');
    expect(res.warnings.some((w) => w.includes('breaking'))).toBe(true);
  });

  it('框架模式下槽位写 [X] 或任意短语均不扣分', () => {
    const s = SENTENCES['suggest.body1'];
    const res1 = gradeAnswer(
      s,
      'First and foremost, attaching greater importance to [X] is strongly recommended, as it enables you to gain a clearer insight into [X].',
      { mode: 'framework' }
    );
    expect(res1.accuracy).toBe(1);

    const res2 = gradeAnswer(
      s,
      'First and foremost, attaching greater importance to practical experience is strongly recommended, as it enables you to gain a clearer insight into reading habits.',
      { mode: 'framework' }
    );
    expect(res2.accuracy).toBe(1);
  });

  it('中文标点输入与多余空格自动规范化', () => {
    const s = SENTENCES['shared.lead.opinion'];
    const res = gradeAnswer(
      s,
      '  To justify   my opinion，  several points need to be mentioned as follows。  '
    );
    expect(res.accuracy).toBe(1);
    expect(res.missingPeriod).toBe(false);
  });

  it('全大写输入：大小写不扣分但给出大小写提醒', () => {
    const s = SENTENCES['shared.emotion.good'];
    const res = gradeAnswer(
      s,
      'IT IS A GREAT PLEASURE FOR ME TO WRITE THIS LETTER TO YOU.'
    );
    expect(res.accuracy).toBe(1);
    expect(res.hasCaseWarning).toBe(true);
    expect(res.warnings.some((w) => w.includes('大小写'))).toBe(true);
  });

  it('使用提示后评分降为 Hard，准确率低于 85% 为 Again', () => {
    const s = SENTENCES['shared.emotion.good'];
    const withHint = gradeAnswer(
      s,
      'It is a great pleasure for me to write this letter to you.',
      { usedHint: true }
    );
    expect(withHint.suggestedRating).toBe(Rating.Hard);

    const bad = gradeAnswer(s, 'It is pleasure write letter.');
    expect(bad.accuracy).toBeLessThan(0.85);
    expect(bad.suggestedRating).toBe(Rating.Again);
  });

  it('挖空生成器隐藏约 60% 非槽位实词并保留槽位', () => {
    const s = SENTENCES['suggest.body1'];
    const cloze = generateCloze(s);
    expect(cloze.some((c) => c.kind === 'blank')).toBe(true);
    expect(cloze.some((c) => c.kind === 'slot')).toBe(true);
  });
});
