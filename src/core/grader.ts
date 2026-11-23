import { Rating } from 'ts-fsrs';
import { SLOTS } from '../data/fillers';
import type { POS, Sentence } from '../data/types';
import { diffWithSlots, type DiffToken } from './diff';
import {
  countCommas,
  hasTrailingPeriod,
  parseTargetSentence,
  tokenizeUserInput,
} from './normalize';

export type PracticeMode = 'framework' | 'fill';

export interface GradeOptions {
  mode?: PracticeMode;
  strictPunctuation?: boolean;
  usedHint?: boolean;
  durationSec?: number;
}

export interface GradeResult {
  accuracy: number; // 0 to 1
  tokens: DiffToken[];
  suggestedRating: Rating;
  warnings: string[];
  hasCaseWarning: boolean;
  missingPeriod: boolean;
  targetWordCount: number;
}

const SLOT_POS_MAP: Record<string, POS> = Object.fromEntries(
  Object.values(SLOTS).map((s) => [s.id, s.pos])
);

const SLOT_LABEL_MAP: Record<string, string> = Object.fromEntries(
  Object.values(SLOTS).map((s) => [s.id, s.label])
);

export function gradeAnswer(
  sentence: Sentence,
  userInput: string,
  options: GradeOptions = {}
): GradeResult {
  const mode = options.mode ?? 'framework';
  const strictPunctuation = options.strictPunctuation ?? false;
  const usedHint = options.usedHint ?? false;
  const durationSec = options.durationSec ?? 999;

  const targetParts = parseTargetSentence(sentence.en);
  const userTokens = tokenizeUserInput(userInput);
  const diffTokens = diffWithSlots(targetParts, userTokens, {
    mode,
    slotPOSMap: SLOT_POS_MAP,
    slotLabelMap: SLOT_LABEL_MAP,
  });

  const targetWordCount = Math.max(
    1,
    targetParts.filter((p) => p.kind === 'word').length
  );

  let score = 0;
  let extraCount = 0;
  let hasCaseWarning = false;
  const warnings: string[] = [];

  for (const tok of diffTokens) {
    if (tok.status === 'correct') {
      score += 1;
      if (tok.caseMismatch) hasCaseWarning = true;
    } else if (tok.status === 'misspelled') {
      score += 0.5;
    } else if (tok.status === 'wrongForm') {
      // Wrong form gets 0.5 credit if it's a fixed word, or deducts 0.5 if in a slot
      if (tok.slotId) {
        score -= 0.5;
      } else {
        score += 0.5;
      }
      if (tok.slotWarning) warnings.push(tok.slotWarning);
    } else if (tok.status === 'extra') {
      extraCount += 1;
    } else if (tok.status === 'slot' && tok.slotWarning) {
      warnings.push(tok.slotWarning);
      if (mode === 'fill') score -= 0.5;
    }
  }

  score -= extraCount * 0.5;

  // Punctuation checks
  const targetNeedsPeriod = /[.!?]$/.test(sentence.en.trim());
  const missingPeriod = targetNeedsPeriod && !hasTrailingPeriod(userInput);
  if (missingPeriod) {
    warnings.push('句末缺少句号（轻微扣分）');
    score -= strictPunctuation ? 0.5 : 0.25;
  }

  if (strictPunctuation) {
    const expectedCommas = countCommas(sentence.en);
    const actualCommas = countCommas(userInput);
    if (actualCommas !== expectedCommas) {
      warnings.push(`严格标点模式：逗号数量应为 ${expectedCommas} 个，当前 ${actualCommas} 个`);
      score -= Math.abs(expectedCommas - actualCommas) * 0.25;
    }
  }

  if (hasCaseWarning) {
    warnings.push('注意字母大小写（不扣分）');
  }

  const accuracy = Math.max(0, Math.min(1, score / targetWordCount));

  // Suggested FSRS rating per section 3.4
  let suggestedRating: Rating;
  if (accuracy < 0.85) {
    suggestedRating = Rating.Again;
  } else if (accuracy < 0.98 || usedHint) {
    suggestedRating = Rating.Hard;
  } else if (accuracy === 1 && !usedHint && durationSec < targetWordCount * 1.2) {
    suggestedRating = Rating.Easy;
  } else {
    suggestedRating = Rating.Good;
  }

  return {
    accuracy,
    tokens: diffTokens,
    suggestedRating,
    warnings,
    hasCaseWarning,
    missingPeriod,
    targetWordCount,
  };
}

/**
 * Step 3 挖空默写：随机隐藏 60% 的非槽位实词
 */
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'as', 'by', 'from', 'into', 'and', 'or', 'that', 'this', 'it', 'is', 'are', 'be', 'will', 'can', 'would', 'you', 'your', 'i', 'me', 'my', 'we', 'their', 'they',
]);

export interface ClozePart {
  kind: 'visible' | 'blank' | 'slot';
  text: string;
  slotId?: string;
  trailingPunct?: string;
}

export function generateCloze(sentence: Sentence, seed = 42): ClozePart[] {
  const parts = parseTargetSentence(sentence.en);
  const contentIndices: number[] = [];

  parts.forEach((p, idx) => {
    if (p.kind === 'word' && !FUNCTION_WORDS.has(p.normalized)) {
      contentIndices.push(idx);
    }
  });

  // Deterministic pseudo-random shuffle based on seed + sentence id
  let hash = seed;
  for (let i = 0; i < sentence.id.length; i++) {
    hash = (hash * 31 + sentence.id.charCodeAt(i)) >>> 0;
  }
  const shuffled = [...contentIndices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const j = hash % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const hideCount = Math.max(1, Math.round(contentIndices.length * 0.6));
  const hiddenSet = new Set(shuffled.slice(0, hideCount));

  return parts.map((p, idx) => {
    if (p.kind === 'slot') {
      return {
        kind: 'slot',
        text: SLOT_LABEL_MAP[p.slotId!] ?? p.slotId!,
        slotId: p.slotId,
        trailingPunct: p.trailingPunct,
      };
    }
    if (hiddenSet.has(idx)) {
      return {
        kind: 'blank',
        text: p.raw,
        trailingPunct: p.trailingPunct,
      };
    }
    return {
      kind: 'visible',
      text: p.raw,
      trailingPunct: p.trailingPunct,
    };
  });
}
