import { describe, expect, it } from 'vitest';
import { SLOTS } from './fillers';
import {
  LESSONS,
  SENTENCES,
  STUDYABLE_SENTENCE_IDS,
  TEMPLATES,
  getTemplatesUsingSentence,
  renderTemplateWithBracketLabels,
} from './templates';

const EXPECTED_FULL_TEXTS: Record<string, string> = {
  suggest: `Dear [称呼],

It is a great pleasure for me to write this letter to you. With this letter, I would like to offer some suggestions on [题目关键词].

To justify my opinion, several points need to be mentioned as follows. First and foremost, attaching greater importance to [具体方面] is strongly recommended, as it enables you to gain a clearer insight into [题目相关词]. Furthermore, you are advised to [建议行动] around [题目相关词] so that you can gradually improve [能力]. Last but not least, it is advisable for you to [行动]. Only in this way can you truly [好处].

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`,

  invite: `Dear [称呼],

It is a great pleasure for me to write this letter to you. With this letter, I would like to invite you to [题目关键词].

In terms of concrete arrangement, several key details need to be mentioned as follows. First and foremost, the event will be held at [地点] on [日期], which will offer you [收获·名词]. More specifically, your participation in [题目相关词] would be greatly appreciated, as it will enable you to [收获·动词]. Furthermore, this will be a valuable opportunity for you to [行动], especially in the light of [主题]. Last but not least, accepting this invitation will allow you to [收获·动词], which should not be missed.

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`,

  notice: `NOTICE

We greatly appreciate all students for sparing their precious time to pay attention to this notice. To ensure the smooth implementation of [题目关键词], the following arrangements are hereby announced.

In terms of concrete arrangement, several key details need to be mentioned as follows. First and foremost, the activity is arranged from [开始时间] to [结束时间], during which [活动内容] will be carried out. Furthermore, the main contents of the activity include [内容1], [内容2] and [内容3]. Last but not least, all participants are required to [注意事项], ensuring that the activity can proceed smoothly.

You are kindly requested to [期待动作] so that [题目相关词] can be implemented more effectively.

The Students' Union`,

  apology: `Dear [称呼],

It is with deep regret that I write this letter to you. With this letter, I would like to apologize for [题目关键词].

As for the underlying reasons, they can be explained as follows. First and foremost, my decision to [错误行为·动词原形] in relation to [事件] turned out to be inconsiderate and unprofessional. Furthermore, as a result of [错误行为·doing], you had to face [影响], which should not have happened. Last but not least, concrete steps such as [补救措施] will be taken, ensuring that similar problems with [题目相关词] will not occur again.

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`,

  thanks: `Dear [称呼],

It is a great pleasure for me to write this letter to you. With this letter, I would like to express my gratitude for [题目关键词].

To be more specific, several points need to be mentioned as follows. First and foremost, your generous help in [题目相关词] fully proves that you have [优秀品质]. Furthermore, what impressed me most was your willingness to [关键努力], especially when dealing with [题目相关词]. Last but not least, your help in [题目相关词] has encouraged me to [未来行动], helping me reach [下一个目标].

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`,

  intro: `Dear [称呼],

It is a great pleasure for me to write this letter to you. With this letter, I would like to introduce [题目关键词] to you.

To be more specific, several points need to be mentioned as follows. First and foremost, [题目相关词] refers to [介绍对象或概念], which is characterized by [核心特点]. Furthermore, it covers [方面], enabling [受众对象] to [具体收获]. Taken together, these features make [题目相关词] an ideal choice for [目标人群] who wish to [目标需求].

I truly appreciate your sparing precious time to read this letter, and I look forward to your positive response.

Yours sincerely,
Li Ming`,

  congrats: `Dear [称呼],

It is a great pleasure for me to write this letter to you. With this letter, I would like to extend my warmest congratulations on [题目关键词].

To be more specific, several points need to be mentioned as follows. First and foremost, your outstanding performance in [题目相关词] fully proves that you have [优秀品质或能力]. Furthermore, this success comes from your willingness to [关键努力], especially when dealing with [题目相关词]. Last but not least, this achievement in [题目相关词] will surely encourage you to [未来行动], helping you reach [下一个目标].

I sincerely hope that you will make full use of this opportunity to [期待成效].

Yours sincerely,
Li Ming`,
};

describe('模板数据完整性与原文逐字校验', () => {
  it('模板数量必须为 7 套', () => {
    expect(TEMPLATES).toHaveLength(7);
  });

  it('每套模板主体句数量必须准确', () => {
    const expectedBodyCounts: Record<string, number> = {
      suggest: 3,
      invite: 4,
      notice: 3,
      apology: 3,
      thanks: 3,
      intro: 3,
      congrats: 3,
    };

    for (const tpl of TEMPLATES) {
      const bodySentences = tpl.sentenceIds
        .map((id) => SENTENCES[id])
        .filter((s) => s.role === 'body');
      expect(bodySentences).toHaveLength(expectedBodyCounts[tpl.id]);
    }
  });

  it('所有句子中引用的槽位都必须在 fillers 表中存在', () => {
    for (const sentence of Object.values(SENTENCES)) {
      const matches = [...sentence.en.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
      for (const slotId of matches) {
        expect(SLOTS[slotId], `Missing slot ${slotId} in ${sentence.id}`).toBeDefined();
        expect(sentence.slots).toContain(slotId);
      }
      for (const slotId of sentence.slots) {
        expect(SLOTS[slotId], `Declared slot ${slotId} missing in SLOTS`).toBeDefined();
      }
    }
  });

  it('共用句在卡片系统中去重：通用结尾被 5 套模板复用且仅存一条记录', () => {
    const templatesUsingClosing = getTemplatesUsingSentence('shared.closing');
    expect(templatesUsingClosing).toHaveLength(5);
    const uniqueStudyIds = new Set(STUDYABLE_SENTENCE_IDS);
    expect(uniqueStudyIds.size).toBe(STUDYABLE_SENTENCE_IDS.length);
    expect(LESSONS).toHaveLength(9);
  });

  it('7 套模板拼装结果必须与《小作文_最终背诵版.md》逐字一致', () => {
    const slotLabels = Object.fromEntries(
      Object.values(SLOTS).map((s) => [s.id, s.label])
    );

    for (const tpl of TEMPLATES) {
      const rendered = renderTemplateWithBracketLabels(tpl, slotLabels);
      expect(rendered).toBe(EXPECTED_FULL_TEXTS[tpl.id]);
    }
  });
});
