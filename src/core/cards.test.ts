import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { EXAM_PROMPTS } from '../data/prompts';
import { TEMPLATES } from '../data/templates';
import { evaluateFullEssay, FORM_CARDS, ORDER_CARDS, PURPOSE_CARDS } from './cards';
import { buildSprintSentenceQueue, isExamSprintActive } from './scheduler';

describe('第三阶段：模拟题库、整篇批改与考前冲刺单元测试', () => {
  it('模拟题库覆盖全部 12 类模板（共 32 道，每类至少 2 道，含 9 道易混淆题）', () => {
    expect(EXAM_PROMPTS).toHaveLength(32);
    for (const tpl of TEMPLATES) {
      const count = EXAM_PROMPTS.filter((p) => p.templateId === tpl.id).length;
      expect(count, `Template ${tpl.id} needs >= 2 prompts`).toBeGreaterThanOrEqual(2);
    }
    const confusableCount = EXAM_PROMPTS.filter((p) => p.confusable).length;
    expect(confusableCount).toBe(9);
  });

  it('专项卡片数据完整（P/F/O 覆盖全部万能骨架与 11 类目的短语）', () => {
    expect(PURPOSE_CARDS).toHaveLength(11);
    expect(FORM_CARDS.length).toBeGreaterThanOrEqual(8);
    expect(ORDER_CARDS).toHaveLength(12);
  });

  it('整篇作文逐句对齐批改能识别万能建议信与投诉信并给出高准确率与 100–125 词数', () => {
    const sampleSuggest = `Dear Sir or Madam,

It is a great pleasure for me to write this letter to you. With this letter, I would like to offer some suggestions on improving the reading room environment.

To be more specific, several points need to be mentioned as follows. First and foremost, what needs to be highlighted is that students need longer opening hours in the library. Furthermore, it is equally worth noting that more quiet study seats should be provided, especially in terms of exam preparation. Last but not least, it is sincerely hoped that these suggestions can be adopted, ensuring that everything can proceed smoothly.

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`;

    const res = evaluateFullEssay('suggest', sampleSuggest);
    expect(res.wordCount).toBeGreaterThanOrEqual(105);
    expect(res.wordCount).toBeLessThanOrEqual(130);
    expect(res.overallAccuracy).toBeGreaterThan(0.95);
    expect(res.alignments).toHaveLength(7);

    const sampleComplaint = `Dear Sir or Madam,

It is with deep regret that I write this letter to you. With this letter, I would like to make a complaint about the defective electronic dictionary.

To be more specific, several points need to be mentioned as follows. First and foremost, what needs to be highlighted is that the screen stopped working yesterday. Furthermore, it is equally worth noting that the battery runs out very fast, especially in terms of my daily study. Last but not least, it is sincerely hoped that you can replace it promptly, ensuring that everything can proceed smoothly.

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`;

    const res2 = evaluateFullEssay('complaint', sampleComplaint);
    expect(res2.wordCount).toBeGreaterThanOrEqual(105);
    expect(res2.wordCount).toBeLessThanOrEqual(130);
    expect(res2.overallAccuracy).toBeGreaterThan(0.95);
    expect(res2.alignments).toHaveLength(7);
  });

  it('考前 3 天冲刺模式按错误率优先选出最多 10 张句子卡', () => {
    const now = new Date('2026-12-18T10:00:00Z');
    expect(isExamSprintActive('2026-12-20', now)).toBe(true);
    expect(isExamSprintActive('2026-12-25', now)).toBe(false);

    const queue = buildSprintSentenceQueue(
      [
        { sentenceId: 'apology.body2', rating: Rating.Again, accuracy: 0.6 },
        { sentenceId: 'apology.body2', rating: Rating.Again, accuracy: 0.7 },
        { sentenceId: 'suggest.body1', rating: Rating.Good, accuracy: 1 },
      ],
      ['apology.body2', 'suggest.body1', 'shared.closing'],
      2
    );
    expect(queue).toHaveLength(2);
    expect(queue).toContain('apology.body2');
  });
});
