import { describe, expect, it } from 'vitest';
import { SLOTS } from './fillers';
import {
  LESSONS,
  SENTENCES,
  STUDYABLE_SENTENCE_IDS,
  STUDYABLE_SENTENCE_SET,
  TEMPLATES,
  getTemplatesUsingSentence,
  renderTemplateWithBracketLabels,
} from './templates';

describe('万能小作文模板数据完整性、字数区间与向后兼容校验', () => {
  it('覆盖全部 12 套模板（含 14 类考研小作文题型），每套均为 3 句万能主体', () => {
    expect(TEMPLATES).toHaveLength(12);

    const expectedIds = [
      'suggest',
      'invite',
      'notice',
      'intro',
      'recommend',
      'apology',
      'thanks',
      'complaint',
      'inquiry',
      'apply',
      'congrats',
      'condolence',
    ];
    expect(TEMPLATES.map((t) => t.id)).toEqual(expectedIds);

    for (const tpl of TEMPLATES) {
      const bodyIds = tpl.sentenceIds.filter((id) => SENTENCES[id].role === 'body');
      expect(bodyIds).toEqual(['universal.body1', 'universal.body2', 'universal.body3']);
      expect(tpl.sentenceIds).toContain('shared.lead.specific');
      expect(tpl.slotTips).toHaveLength(3);
    }
  });

  it('全部 11 类书信共用同一套固定骨架（称呼/情绪/引导/主体/结尾/落款），仅替换目的句', () => {
    const letters = TEMPLATES.filter((t) => t.id !== 'notice');
    expect(letters).toHaveLength(11);

    for (const tpl of letters) {
      expect(tpl.sentenceIds[0]).toBe('shared.greeting');
      expect(['shared.emotion.good', 'shared.emotion.regret']).toContain(
        tpl.sentenceIds[1]
      );
      expect(SENTENCES[tpl.sentenceIds[2]].role).toBe('purpose');
      expect(SENTENCES[tpl.sentenceIds[2]].en.startsWith('With this letter, I would like to ')).toBe(
        true
      );
      expect(tpl.sentenceIds.slice(3, 7)).toEqual([
        'shared.lead.specific',
        'universal.body1',
        'universal.body2',
        'universal.body3',
      ]);
      expect(tpl.sentenceIds[7]).toBe('shared.closing');
      expect(tpl.sentenceIds[8]).toBe('shared.signoff');
    }
  });

  it('所有句子（含保留的旧版句型）引用的槽位均在 fillers 表中存在', () => {
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

  it('极速 4 课路线去重后仅 21 句，通用结尾被 11 套书信复用，且所有旧句子 ID 原样保留', () => {
    expect(LESSONS).toHaveLength(4);
    expect(STUDYABLE_SENTENCE_IDS).toHaveLength(21);
    expect(STUDYABLE_SENTENCE_SET.size).toBe(21);
    expect(getTemplatesUsingSentence('shared.closing')).toHaveLength(11);
    expect(getTemplatesUsingSentence('universal.body1')).toHaveLength(12);

    // Backward-compatibility check: legacy IDs remain resolvable for existing user FSRS/sync records
    const legacyIds = [
      'shared.emotion.good',
      'shared.emotion.regret',
      'shared.closing',
      'shared.lead.opinion',
      'shared.lead.specific',
      'shared.lead.arrangement',
      'shared.lead.reasons',
      'suggest.body1',
      'suggest.body2',
      'suggest.body3',
      'invite.body1',
      'invite.body4',
      'notice.body1',
      'apology.body1',
      'apology.body2',
      'thanks.body1',
      'intro.body1',
      'congrats.body1',
      'congrats.closing',
    ];
    for (const id of legacyIds) {
      expect(SENTENCES[id], `Legacy sentence ${id} must remain intact`).toBeDefined();
    }
  });

  it('全部 12 套模板使用标准万能填充词套写后，正文字数稳定落在 100–120 词', () => {
    const slotFillers = Object.fromEntries(
      Object.values(SLOTS).map((s) => [s.id, s.filler])
    );

    for (const tpl of TEMPLATES) {
      // Count body words (excluding heading and signoff, matching Kaoyan official rule)
      const bodyParagraphs = tpl.sentenceIds
        .slice(1, -1)
        .map((id) =>
          SENTENCES[id].en.replace(
            /\{\{(\w+)\}\}/g,
            (_, key: string) => slotFillers[key] ?? 'something'
          )
        )
        .join(' ');
      const bodyWordCount = bodyParagraphs.trim().split(/\s+/).filter(Boolean).length;
      expect(
        bodyWordCount,
        `${tpl.id} body word count ${bodyWordCount} out of range`
      ).toBeGreaterThanOrEqual(100);
      expect(
        bodyWordCount,
        `${tpl.id} body word count ${bodyWordCount} out of range`
      ).toBeLessThanOrEqual(120);

      const bracketText = renderTemplateWithBracketLabels(
        tpl,
        Object.fromEntries(Object.values(SLOTS).map((s) => [s.id, s.label]))
      );
      expect(bracketText).toContain('[要点1]');
      expect(bracketText).toContain('[要点2]');
      expect(bracketText).toContain('[要点3/期待]');
    }
  });
});
