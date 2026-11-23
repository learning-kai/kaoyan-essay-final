import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { EXAM_PROMPTS } from '../data/prompts';
import { TEMPLATES } from '../data/templates';
import { evaluateFullEssay, FORM_CARDS, ORDER_CARDS, PURPOSE_CARDS } from './cards';
import { buildSprintSentenceQueue, isExamSprintActive } from './scheduler';

describe('第三阶段：模拟题库、整篇批改与考前冲刺单元测试', () => {
  it('模拟题库共 21 道，每类恰好 3 道，且包含 6 道易混淆题', () => {
    expect(EXAM_PROMPTS).toHaveLength(21);
    for (const tpl of TEMPLATES) {
      const count = EXAM_PROMPTS.filter((p) => p.templateId === tpl.id).length;
      expect(count).toBe(3);
    }
    const confusableCount = EXAM_PROMPTS.filter((p) => p.confusable).length;
    expect(confusableCount).toBe(6);
  });

  it('专项卡片数据完整（P/F/O）', () => {
    expect(PURPOSE_CARDS).toHaveLength(6);
    expect(FORM_CARDS.length).toBeGreaterThanOrEqual(6);
    expect(ORDER_CARDS).toHaveLength(7);
  });

  it('整篇作文逐句对齐批改能识别标准建议信并给出高准确率', () => {
    const sampleSuggest = `Dear Sir or Madam,

It is a great pleasure for me to write this letter to you. With this letter, I would like to offer some suggestions on improving the reading room environment.

To justify my opinion, several points need to be mentioned as follows. First and foremost, attaching greater importance to practical experience is strongly recommended, as it enables you to gain a clearer insight into library services. Furthermore, you are advised to make full use of relevant resources around library services so that you can gradually improve your overall competence. Last but not least, it is advisable for you to arrive on time. Only in this way can you truly make remarkable progress.

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`;

    const res = evaluateFullEssay('suggest', sampleSuggest);
    expect(res.wordCount).toBeGreaterThan(100);
    expect(res.overallAccuracy).toBeGreaterThan(0.95);
    expect(res.alignments).toHaveLength(7);
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
