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

/** P 短语卡：6 类书信的目的句核心动词短语 */
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
    id: 'p-intro',
    templateId: 'intro',
    templateName: '介绍类',
    promptZh: '目的句 · 介绍类（With this letter, I would like to ___ [X] to you.）',
    answer: 'introduce',
  },
  {
    id: 'p-congrats',
    templateId: 'congrats',
    templateName: '祝贺信',
    promptZh: '目的句 · 祝贺信（With this letter, I would like to ___ [X].）',
    answer: 'extend my warmest congratulations on',
  },
];

/** F 词性卡：高频易错词性搭配训练 */
export const FORM_CARDS: FormCheckCard[] = [
  {
    id: 'f-apology-doing',
    sentenceId: 'apology.body2',
    templateName: '道歉信',
    contextBefore: 'Furthermore, as a result of',
    contextAfter: ', you had to face a lot of inconvenience.',
    baseHint: 'break my promise',
    answer: 'breaking my promise',
    ruleZh: 'as a result of 后必须接 doing 或名词短语',
  },
  {
    id: 'f-apology-verb',
    sentenceId: 'apology.body1',
    templateName: '道歉信',
    contextBefore: 'First and foremost, my decision to',
    contextAfter: 'in relation to our appointment turned out to be inconsiderate.',
    baseHint: 'breaking my promise',
    answer: 'break my promise',
    ruleZh: 'my decision to 后接动词原形',
  },
  {
    id: 'f-invite-date',
    sentenceId: 'invite.body1',
    templateName: '邀请信',
    contextBefore: 'First and foremost, the event will be held at the school hall',
    contextAfter: ', which will offer you valuable experience.',
    baseHint: 'on next Saturday / on Saturday（写出正确形式）',
    answer: 'on Saturday',
    ruleZh: 'next 前不能加介词 on，直接写 on Saturday 或 on May 10',
  },
  {
    id: 'f-notice-pronoun',
    sentenceId: 'notice.emotion',
    templateName: '通知',
    contextBefore: 'We greatly appreciate all students for sparing',
    contextAfter: 'precious time to pay attention to this notice.',
    baseHint: 'your / their（写出正确代词）',
    answer: 'their',
    ruleZh: '前文主语为第三人称 all students，代词须用 their',
  },
  {
    id: 'f-suggest-attach',
    sentenceId: 'suggest.body1',
    templateName: '建议信',
    contextBefore: 'First and foremost,',
    contextAfter: 'greater importance to practical experience is strongly recommended.',
    baseHint: 'attach',
    answer: 'attaching',
    ruleZh: '动名词短语作主语，需用 attaching',
  },
  {
    id: 'f-closing-sparing',
    sentenceId: 'shared.closing',
    templateName: '通用结尾',
    contextBefore: 'I truly appreciate your',
    contextAfter: 'precious time to read this letter.',
    baseHint: 'spare',
    answer: 'sparing',
    ruleZh: 'appreciate one\'s doing sth. 需用动名词 sparing',
  },
];

/** O 排序卡：7 套模板的故事线排序 */
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
