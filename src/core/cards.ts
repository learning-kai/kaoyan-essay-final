import { SENTENCES, TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { TemplateId } from '../data/types';
import { gradeAnswer, type GradeResult } from './grader';
import { unifyPunctuation } from './normalize';

export interface PurposePhraseCard {
  id: string;
  templateId: TemplateId;
  templateName: string;
  promptZh: string;
  answer: string;
}

export interface FormCheckCard {
  id: string;
  sentenceId: string;
  templateName: string;
  contextBefore: string;
  contextAfter: string;
  baseHint: string;
  answer: string;
  ruleZh: string;
}

export interface OrderCard {
  id: string;
  templateId: TemplateId;
  templateName: string;
  correctOrder: string[];
  detail: string;
}

/** P 短语卡：11 类书信的目的句核心动词短语（共用 With this letter, I would like to...） */
export const PURPOSE_CARDS: PurposePhraseCard[] = [
  {
    id: 'p-suggest',
    templateId: 'suggest',
    templateName: '建议信',
    promptZh: '目的句 · 建议信（With this letter, I would like to ___ [X].）',
    answer: 'offer some suggestions on',
  },
  {
    id: 'p-invite',
    templateId: 'invite',
    templateName: '邀请信',
    promptZh: '目的句 · 邀请信（With this letter, I would like to ___ [X].）',
    answer: 'invite you to',
  },
  {
    id: 'p-intro',
    templateId: 'intro',
    templateName: '介绍信',
    promptZh: '目的句 · 介绍信（With this letter, I would like to ___ [X] to you.）',
    answer: 'introduce',
  },
  {
    id: 'p-recommend',
    templateId: 'recommend',
    templateName: '推荐信',
    promptZh: '目的句 · 推荐信（With this letter, I would like to ___ [X] to you.）',
    answer: 'recommend',
  },
  {
    id: 'p-apology',
    templateId: 'apology',
    templateName: '道歉信',
    promptZh: '目的句 · 道歉信（With this letter, I would like to ___ [X].）',
    answer: 'apologize for',
  },
  {
    id: 'p-thanks',
    templateId: 'thanks',
    templateName: '感谢信',
    promptZh: '目的句 · 感谢信（With this letter, I would like to ___ [X].）',
    answer: 'express my gratitude for',
  },
  {
    id: 'p-complaint',
    templateId: 'complaint',
    templateName: '投诉信',
    promptZh: '目的句 · 投诉信（With this letter, I would like to ___ [X].）',
    answer: 'make a complaint about',
  },
  {
    id: 'p-inquiry',
    templateId: 'inquiry',
    templateName: '咨询信',
    promptZh: '目的句 · 咨询信（With this letter, I would like to ___ [X].）',
    answer: 'request some information about',
  },
  {
    id: 'p-apply',
    templateId: 'apply',
    templateName: '申请 / 求职信',
    promptZh: '目的句 · 申请/求职信（With this letter, I would like to ___ [X].）',
    answer: 'apply for',
  },
  {
    id: 'p-congrats',
    templateId: 'congrats',
    templateName: '祝贺信',
    promptZh: '目的句 · 祝贺信（With this letter, I would like to ___ [X].）',
    answer: 'extend my warmest congratulations on',
  },
  {
    id: 'p-condolence',
    templateId: 'condolence',
    templateName: '慰问信',
    promptZh: '目的句 · 慰问信（With this letter, I would like to ___ [X].）',
    answer: 'express my sincere concern about',
  },
];

/** F 词性卡：万能骨架高频易错词形与搭配训练 */
export const FORM_CARDS: FormCheckCard[] = [
  {
    id: 'f-closing-sparing',
    sentenceId: 'shared.closing',
    templateName: '万能结尾',
    contextBefore: 'I truly appreciate your',
    contextAfter: 'precious time to read this letter.',
    baseHint: 'spare',
    answer: 'sparing',
    ruleZh: "appreciate one's doing sth. 需用动名词 sparing",
  },
  {
    id: 'f-notice-pronoun',
    sentenceId: 'notice.emotion',
    templateName: '通知 / 备忘录',
    contextBefore: 'We greatly appreciate all students for sparing',
    contextAfter: 'precious time to pay attention to this notice.',
    baseHint: 'your / their（写出正确代词）',
    answer: 'their',
    ruleZh: '前文主语为第三人称 all students，代词须用 their',
  },
  {
    id: 'f-universal-highlighted',
    sentenceId: 'universal.body1',
    templateName: '万能要点 1',
    contextBefore: 'First and foremost, what needs to be',
    contextAfter: 'is that the event will be held on Saturday.',
    baseHint: 'highlight',
    answer: 'highlighted',
    ruleZh: 'what needs to be done 被动结构，须用过去分词 highlighted',
  },
  {
    id: 'f-universal-noting',
    sentenceId: 'universal.body2',
    templateName: '万能要点 2',
    contextBefore: 'Furthermore, another key aspect worth',
    contextAfter: 'is that participants can gain rich experience.',
    baseHint: 'note',
    answer: 'noting',
    ruleZh: 'worth doing 固定搭配（后置定语），须用动名词 noting',
  },
  {
    id: 'f-universal-light',
    sentenceId: 'universal.body2',
    templateName: '万能要点 2',
    contextBefore: '..., especially in the',
    contextAfter: 'of its growing popularity.',
    baseHint: 'light / sight（写出正确名词）',
    answer: 'light',
    ruleZh: 'in the light of 为固定搭配，意为“考虑到 / 鉴于”（沿用原邀请信句型）',
  },
  {
    id: 'f-universal-ensuring',
    sentenceId: 'universal.body3',
    templateName: '万能要点 3',
    contextBefore: 'Last but not least, I sincerely hope that you can join us,',
    contextAfter: 'that everything can proceed smoothly.',
    baseHint: 'ensure',
    answer: 'ensuring',
    ruleZh: '逗号后接现在分词作结果状语，用 ensuring that',
  },
  {
    id: 'f-complaint-prep',
    sentenceId: 'complaint.purpose',
    templateName: '投诉信',
    contextBefore: 'With this letter, I would like to make a complaint',
    contextAfter: 'the defective electronic dictionary.',
    baseHint: 'for / about（写出正确介词）',
    answer: 'about',
    ruleZh: 'make a complaint about sth. 表示“就某事提出投诉”',
  },
  {
    id: 'f-apply-prep',
    sentenceId: 'apply.purpose',
    templateName: '申请 / 求职信',
    contextBefore: 'With this letter, I would like to apply',
    contextAfter: 'the volunteer position.',
    baseHint: 'to / for（写出正确介词）',
    answer: 'for',
    ruleZh: 'apply for + 职位/项目；apply to + 机构/学校',
  },
];

/** O 排序卡：全部 12 类模板的 3 要点填法故事线排序 */
export const ORDER_CARDS: OrderCard[] = TEMPLATES.map((tpl) => ({
  id: `o-${tpl.id}`,
  templateId: tpl.id,
  templateName: tpl.name,
  correctOrder: tpl.storyLine,
  detail: tpl.storyLineDetail,
}));

export function shuffleDeterministic<T>(items: T[], seed = 13): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure it differs from original if length > 1
  if (arr.length > 1 && arr.every((v, idx) => v === items[idx])) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export interface SentenceAlignmentResult {
  sentenceId: string;
  expectedEn: string;
  userSegment: string;
  grade: GradeResult;
}

export interface EssayEvaluation {
  templateId: TemplateId;
  wordCount: number;
  overallAccuracy: number;
  alignments: SentenceAlignmentResult[];
}

/**
 * 将用户整篇作文拆分为句子，并与对应模板正文各句逐句对齐批改。
 */
export function evaluateFullEssay(
  templateId: TemplateId,
  essayText: string,
  strictPunctuation = false
): EssayEvaluation {
  const tpl = TEMPLATE_MAP[templateId];
  const unified = unifyPunctuation(essayText);
  const wordCount = unified ? unified.split(/\s+/).filter(Boolean).length : 0;

  // Split user essay into sentence-like segments by newline or sentence-ending punctuation
  const rawSegments = essayText
    .replace(/\r\n/g, '\n')
    .split(/\n+|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Target studyable sentences (excluding greeting/NOTICE heading and signoff for cleaner alignment)
  const targetSentenceIds = tpl.sentenceIds.filter((id) => {
    const role = SENTENCES[id].role;
    return role !== 'heading' && role !== 'signoff';
  });

  // For each target sentence, find best matching segment from rawSegments (greedy order-preserving or best-score)
  const usedSegmentIdx = new Set<number>();
  const alignments: SentenceAlignmentResult[] = [];

  for (const sid of targetSentenceIds) {
    const sentence = SENTENCES[sid];
    // Handle multi-sentence body like suggest.body3 ("... . Only in this way ...")
    const subSentenceCount = (sentence.en.match(/[.!?]/g) || []).length;

    let bestSeg = '';
    let bestGrade = gradeAnswer(sentence, '', {
      mode: 'framework',
      strictPunctuation,
    });
    let bestIdx = -1;
    let bestSpan = 1;

    for (let i = 0; i < rawSegments.length; i++) {
      if (usedSegmentIdx.has(i)) continue;
      const candidate =
        subSentenceCount >= 2 && i + 1 < rawSegments.length && !usedSegmentIdx.has(i + 1)
          ? `${rawSegments[i]} ${rawSegments[i + 1]}`
          : rawSegments[i];
      const g = gradeAnswer(sentence, candidate, {
        mode: 'framework',
        strictPunctuation,
      });
      if (g.accuracy > bestGrade.accuracy) {
        bestGrade = g;
        bestSeg = candidate;
        bestIdx = i;
        bestSpan = subSentenceCount >= 2 && i + 1 < rawSegments.length ? 2 : 1;
      }
    }

    if (bestIdx !== -1 && bestGrade.accuracy > 0.2) {
      for (let k = 0; k < bestSpan; k++) usedSegmentIdx.add(bestIdx + k);
    }

    alignments.push({
      sentenceId: sid,
      expectedEn: sentence.en,
      userSegment: bestSeg,
      grade: bestGrade,
    });
  }

  const overallAccuracy =
    alignments.length > 0
      ? alignments.reduce((acc, a) => acc + a.grade.accuracy, 0) / alignments.length
      : 0;

  return {
    templateId,
    wordCount,
    overallAccuracy,
    alignments,
  };
}
