import { Rating } from 'ts-fsrs';
import {
  PLAN_VARS,
  countEnglishWords,
  getBigSentencesForFormat,
  type BigFormatMode,
  type BigSentence,
} from '../data/bigEssay';
import { SLOTS } from '../data/fillers';
import type { POS, Sentence } from '../data/types';
import {
  diffWithSlots,
  isMisspelled,
  isWrongForm,
  type DiffToken,
} from './diff';
import {
  countCommas,
  hasTrailingPeriod,
  parseTargetSentence,
  tokenizeUserInput,
  type TargetPart,
  type UserWordToken,
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

const SLOT_POS_MAP: Record<string, POS> = {
  ...Object.fromEntries(Object.values(SLOTS).map((s) => [s.id, s.pos])),
  ...Object.fromEntries(
    PLAN_VARS.map((v) => [
      v.id,
      v.pos === 'verb' ? 'verb' : v.id === 'N1' || v.id === 'N2' ? 'doing' : 'noun',
    ])
  ),
};

const SLOT_LABEL_MAP: Record<string, string> = {
  ...Object.fromEntries(Object.values(SLOTS).map((s) => [s.id, s.label])),
  ...Object.fromEntries(PLAN_VARS.map((v) => [v.id, v.label])),
};

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
    maxSlotWords:
      sentence.deck === 'big' ||
      sentence.id.startsWith('big.') ||
      sentence.id.startsWith('universal.')
        ? 18
        : 6,
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
 * Step 3 挖空默写：随机隐藏指定比例（小作文默认 60%，大作文两轮 40% / 80%）的非槽位实词
 */
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'as', 'by', 'from', 'into', 'and', 'or', 'that', 'this', 'it', 'is', 'are', 'be', 'will', 'can', 'would', 'you', 'your', 'i', 'me', 'my', 'we', 'their', 'they',
]);

export interface ClozePart {
  kind: 'visible' | 'blank' | 'slot';
  text: string;
  slotId?: string;
  defaultValue?: string;
  trailingPunct?: string;
}

export function generateCloze(
  sentence: Sentence,
  seed = 42,
  hideRatio = 0.6
): ClozePart[] {
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

  const hideCount = Math.max(1, Math.round(contentIndices.length * hideRatio));
  const hiddenSet = new Set(shuffled.slice(0, hideCount));

  return parts.map((p, idx) => {
    if (p.kind === 'slot') {
      return {
        kind: 'slot',
        text: SLOT_LABEL_MAP[p.slotId!] ?? p.slotId!,
        slotId: p.slotId,
        defaultValue: p.defaultValue,
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

/* ==========================================================================
 * 大作文：规划卡语法启发式检查 + 模板对齐判分（Template-Alignment Grader）
 * ========================================================================== */

export type WordCountStatus = 'ok' | 'warn' | 'err';

export function getBigEssayWordCountStatus(wordCount: number): WordCountStatus {
  if (wordCount >= 160 && wordCount <= 200) return 'ok';
  if ((wordCount >= 150 && wordCount <= 159) || (wordCount >= 201 && wordCount <= 220)) {
    return 'warn';
  }
  return 'err';
}

const SINGULAR_S_WHITELIST = new Set([
  'progress', 'fitness', 'happiness', 'awareness', 'kindness', 'mindfulness',
  'wellness', 'fairness', 'weakness', 'illness', 'business', 'stress', 'access',
  'success', 'process', 'focus', 'campus', 'status', 'consensus', 'emphasis',
  'analysis', 'crisis', 'basis', 'news', 'physics', 'ethics', 'politics',
  'economics', 'mathematics', 'series', 'species', 'cross', 'class', 'loss',
  'mass', 'press', 'dress', 'glass', 'grass', 'pass', 'chaos', 'ethos', 'plus',
  'bonus', 'virus', 'bus', 'gas', 'atlas', 'canvas',
]);

const IRREGULAR_PLURALS = new Set([
  'people', 'children', 'men', 'women', 'mice', 'teeth', 'feet', 'geese',
  'data', 'media', 'criteria', 'phenomena', 'citizens', 'students', 'workers',
  'parents', 'teachers', 'courses', 'books', 'phones', 'smartphones', 'apps',
  'devices', 'technologies', 'activities', 'habits', 'skills', 'problems',
  'issues', 'challenges', 'opportunities', 'efforts', 'resources', 'traditions',
  'customs', 'festivals', 'products', 'services', 'sports', 'exercises',
]);

const CLAUSE_FINITE_VERBS = new Set([
  'is', 'are', 'was', 'were', 'am', 'be', 'can', 'could', 'will', 'would',
  'should', 'must', 'may', 'might', 'have', 'has', 'had', 'do', 'does', 'did',
]);

export interface GrammarCheckResult {
  ok: boolean;
  hint?: string;
}

export function isLikelyPluralNounPhrase(phrase: string): boolean {
  const clean = phrase.trim().toLowerCase().replace(/[.,;:!?]+$/g, '');
  if (!clean) return false;
  // Ignore prepositional tail: head noun is before "of / in / on / for / with / among / between"
  const headPart = clean.split(/\b(?:of|in|on|for|with|among|between|to|at)\b/)[0].trim();
  const words = headPart.split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  const head = words[words.length - 1].replace(/[^a-z-]/g, '');
  if (!head || head.length < 3) return false;

  if (IRREGULAR_PLURALS.has(head)) return true;
  if (SINGULAR_S_WHITELIST.has(head)) return false;

  // Plural determiners like "many / several / various / these / those / two / three"
  if (
    words.length >= 2 &&
    ['many', 'several', 'various', 'these', 'those', 'both', 'few', 'numerous'].includes(
      words[0]
    )
  ) {
    return true;
  }

  // Regular plural endings: -ies, -es, -s (excluding -ss, -us, -is, -ness, -ics, -'s)
  if (head.endsWith('ies') && head.length > 4) return true;
  if (
    head.endsWith('s') &&
    !head.endsWith('ss') &&
    !head.endsWith('us') &&
    !head.endsWith('is') &&
    !head.endsWith('ous') &&
    !head.endsWith('ics') &&
    !head.endsWith('ness') &&
    !head.endsWith("'s")
  ) {
    return true;
  }
  return false;
}

/**
 * 检查主题词 X：不能是句子、不能是复数（如 online courses）
 */
export function checkPlanVarX(value: string): GrammarCheckResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, hint: '请填写主题词 X（建议使用 2–3 词单数或不可数名词短语）' };
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (/[.!?]/.test(trimmed) || words.length > 6) {
    return { ok: false, hint: '主题词 X 建议写成简洁的名词短语（2–4 词），不要写成完整句子。' };
  }
  if (words.some((w) => CLAUSE_FINITE_VERBS.has(w.toLowerCase()))) {
    return { ok: false, hint: '主题词 X 里似乎包含谓语动词，这里可能需要名词短语而非句子。' };
  }
  if (isLikelyPluralNounPhrase(trimmed)) {
    return {
      ok: false,
      hint: `“${trimmed}”似乎是复数名词；全文多处使用 its / has 指代 X，建议改用单数或不可数名词（如把 online courses 改为 online learning）。`,
    };
  }
  return { ok: true };
}

/**
 * 检查 DO：需以动词原形开头（前接 enabling people to ...）
 */
export function checkPlanVarDO(value: string): GrammarCheckResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, hint: '请填写人们因此能做的事 DO（动词原形开头）' };
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  const first = words[0].toLowerCase().replace(/[^a-z]/g, '');
  if (!first) return { ok: false, hint: '这里可能需要动词原形短语。' };

  if (first === 'to') {
    return { ok: false, hint: '前面已经有 enabling people to，这里可能需要去掉开头的 to，直接写动词原形。' };
  }
  if (
    (first.endsWith('ing') && first.length > 4 && first !== 'bring' && first !== 'sing') ||
    (first.endsWith('ed') && first.length > 4 && first !== 'need' && first !== 'feed' && first !== 'succeed')
  ) {
    return { ok: false, hint: `“${words[0]}”看起来不是动词原形，这里可能需要动词原形开头。` };
  }
  if (['a', 'an', 'the', 'people', 'we', 'they', 'it'].includes(first)) {
    return { ok: false, hint: '这里可能需要动词原形开头（如 appreciate / enjoy / improve…），而不是名词或代词。' };
  }
  return { ok: true };
}

/**
 * 检查 B1 / B2：需为名词短语
 */
export function checkPlanVarBenefit(value: string, label = '好处'): GrammarCheckResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, hint: `请填写${label}（名词短语，≤ 6 词）` };
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  const first = words[0].toLowerCase();
  if (first === 'to') {
    return { ok: false, hint: `${label}这里可能需要名词短语（建议去掉开头的 to）。` };
  }
  if (words.some((w) => CLAUSE_FINITE_VERBS.has(w.toLowerCase()))) {
    return { ok: false, hint: `${label}这里可能需要名词短语，看起来像包含谓语的句子。` };
  }
  return { ok: true };
}

export interface PlanSheetCheckReport {
  allRequiredFilled: boolean;
  grammarPassed: boolean;
  fieldHints: Record<string, string>;
  hints: string[];
}

export function checkPlanSheet(
  vars: Record<string, string>,
  format: BigFormatMode = 'picture'
): PlanSheetCheckReport {
  const fieldHints: Record<string, string> = {};
  const requiredIds =
    format === 'chart'
      ? ['X', 'DATA', 'B1', 'B2', 'DO']
      : format === 'hybrid'
        ? ['X', 'PIC', 'DATA', 'B1', 'B2', 'DO']
        : ['X', 'PIC', 'B1', 'B2', 'DO'];
  const allRequiredFilled = requiredIds.every((id) => Boolean(vars[id]?.trim()));

  if ((format === 'picture' || format === 'hybrid') && !vars.PIC?.trim()) {
    fieldHints.PIC = '请填写画面描述（主体 + 动作/状态）';
  }
  if ((format === 'chart' || format === 'hybrid') && !vars.DATA?.trim()) {
    fieldHints.DATA = '请用一句英文写出核心数据变化或占比（如 the figure rose from 406 to 670）';
  }
  const xRes = checkPlanVarX(vars.X ?? '');
  if (!xRes.ok && xRes.hint) fieldHints.X = xRes.hint;

  const b1Res = checkPlanVarBenefit(vars.B1 ?? '', '好处一 B1');
  if (!b1Res.ok && b1Res.hint) fieldHints.B1 = b1Res.hint;

  const b2Res = checkPlanVarBenefit(vars.B2 ?? '', '好处二 B2');
  if (!b2Res.ok && b2Res.hint) fieldHints.B2 = b2Res.hint;

  const doRes = checkPlanVarDO(vars.DO ?? '');
  if (!doRes.ok && doRes.hint) fieldHints.DO = doRes.hint;

  const hints = Object.values(fieldHints);
  return {
    allRequiredFilled,
    grammarPassed: allRequiredFilled && hints.length === 0,
    fieldHints,
    hints,
  };
}

export interface MissingFixedFragment {
  sentenceNumber: number; // 1-based
  sentenceId: string;
  role: string;
  expected: string;
}

export interface BigSentenceAlignment {
  sentenceNumber: number;
  sentenceId: string;
  role: string;
  accuracy: number;
  matchedWords: number;
  totalFixedWords: number;
  missingFragments: string[];
}

export interface BigEssayGradeResult {
  fixedAccuracy: number; // 0 to 1
  wordCount: number;
  wordCountStatus: WordCountStatus;
  sentenceResults: BigSentenceAlignment[];
  missingFragments: MissingFixedFragment[];
  grammarHints: string[];
  totalFixedWords: number;
  matchedFixedWords: number;
}

interface RawFixedSeg {
  sentenceIdx: number; // 0-based in active list
  sentenceNumber: number; // 1-based
  sentenceId: string;
  role: string;
  words: TargetPart[];
  rawText: string;
  precededBySlot: boolean;
}

function scoreSegmentAt(
  segWords: TargetPart[],
  userTokens: UserWordToken[],
  startPos: number
): { matchedWeight: number; exactMatches: number; endPos: number } {
  const m = segWords.length;
  // Allow slight deletions/insertions within fixed segment by taking slice of length m + 2
  const sliceLen = Math.min(userTokens.length - startPos, m + 2);
  if (sliceLen <= 0) return { matchedWeight: 0, exactMatches: 0, endPos: startPos };
  const slice = userTokens.slice(startPos, startPos + sliceLen);

  // LCS-based fuzzy matching on segWords vs slice
  const n = slice.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const t = segWords[i].normalized;
      const u = slice[j].normalized;
      let w = 0;
      if (t === u) w = 1;
      else if (isWrongForm(u, t) || isMisspelled(u, t)) w = 0.5;
      dp[i][j] = Math.max(
        w > 0 ? w + dp[i + 1][j + 1] : 0,
        dp[i + 1][j],
        dp[i][j + 1]
      );
    }
  }

  // Track last matched user index to advance cursor accurately
  let i = 0;
  let j = 0;
  let exactMatches = 0;
  let lastMatchedJ = -1;
  while (i < m && j < n) {
    const t = segWords[i].normalized;
    const u = slice[j].normalized;
    const w = t === u ? 1 : isWrongForm(u, t) || isMisspelled(u, t) ? 0.5 : 0;
    if (w > 0 && Math.abs(dp[i][j] - (w + dp[i + 1][j + 1])) < 1e-6) {
      if (w === 1) exactMatches += 1;
      lastMatchedJ = j;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }

  return {
    matchedWeight: dp[0][0],
    exactMatches,
    endPos: lastMatchedJ >= 0 ? startPos + lastMatchedJ + 1 : startPos,
  };
}

/**
 * 大作文模板对齐判分：
 * 将模板拆分为「固定片段」与「槽位」交替序列，通过长锚点 + 区间匹配在用户输入中按顺序模糊对齐固定片段，
 * 允许槽位包含长短语（≤ 15–25 词），精准定位漏掉的固定片段及对应句号，并给出词数与启发式语法提示。
 */
export function gradeBigEssayAlignment(
  userText: string,
  options?: {
    sentences?: BigSentence[];
    includeOptionalP2S4?: boolean;
    format?: BigFormatMode;
    chartKind?: 'dynamic' | 'static' | 'dual';
    planVars?: Partial<Record<string, string>>;
  }
): BigEssayGradeResult {
  const includeOpt = options?.includeOptionalP2S4 ?? false;
  const activeSentences =
    options?.sentences ??
    getBigSentencesForFormat(options?.format ?? 'picture', {
      includeOptionalP2S4: includeOpt,
      chartKind: options?.chartKind,
    });
  const userTokens = tokenizeUserInput(userText);
  const wordCount = countEnglishWords(userText);
  const wordCountStatus = getBigEssayWordCountStatus(wordCount);

  // Build sequential fixed segments across active sentences
  const allSegs: RawFixedSeg[] = [];
  activeSentences.forEach((s, sIdx) => {
    const parts = parseTargetSentence(s.en);
    let curWords: TargetPart[] = [];
    let precededBySlot = false;

    const flush = () => {
      if (curWords.length === 0) return;
      allSegs.push({
        sentenceIdx: sIdx,
        sentenceNumber: sIdx + 1,
        sentenceId: s.id,
        role: s.role,
        words: curWords,
        rawText: curWords.map((w) => w.raw).join(' '),
        precededBySlot,
      });
      curWords = [];
    };

    for (const p of parts) {
      if (p.kind === 'slot') {
        flush();
        precededBySlot = true;
      } else {
        curWords.push(p);
      }
    }
    flush();
  });

  // Pass 1: Anchor strong landmarks (fixed segments with >= 3 words) in order across userTokens
  const matchPos = new Array<{ start: number; end: number; weight: number } | null>(
    allSegs.length
  ).fill(null);

  let landmarkCursor = 0;
  for (let idx = 0; idx < allSegs.length; idx++) {
    const seg = allSegs[idx];
    if (seg.words.length < 3) continue;

    // Generous search window so even 15-25 word slots or skipped previous sentences still re-sync cleanly
    const searchEnd = Math.min(userTokens.length - 1, landmarkCursor + 85);
    let bestPos = -1;
    let bestWeight = 0;
    let bestEnd = landmarkCursor;

    for (let pos = landmarkCursor; pos <= searchEnd; pos++) {
      // Quick check: first or second word should roughly match to avoid O(N*M) waste
      const u0 = userTokens[pos].normalized;
      const t0 = seg.words[0].normalized;
      const t1 = seg.words[1]?.normalized;
      const quickHit =
        u0 === t0 ||
        isMisspelled(u0, t0) ||
        isWrongForm(u0, t0) ||
        (t1 && u0 === t1);
      if (!quickHit) continue;

      const res = scoreSegmentAt(seg.words, userTokens, pos);
      const ratio = res.matchedWeight / seg.words.length;
      if (ratio >= 0.55 && res.matchedWeight > bestWeight) {
        bestWeight = res.matchedWeight;
        bestPos = pos;
        bestEnd = res.endPos;
        if (res.matchedWeight >= seg.words.length - 0.01) break;
      }
    }

    if (bestPos !== -1) {
      matchPos[idx] = { start: bestPos, end: bestEnd, weight: bestWeight };
      landmarkCursor = bestEnd;
    }
  }

  // Pass 2: Match short segments (1-2 words) strictly inside surrounding matched landmark bounds
  for (let idx = 0; idx < allSegs.length; idx++) {
    if (matchPos[idx] !== null) continue;
    const seg = allSegs[idx];
    if (seg.words.length >= 3) continue;

    let leftBound = 0;
    for (let l = idx - 1; l >= 0; l--) {
      if (matchPos[l]) {
        leftBound = matchPos[l]!.end;
        break;
      }
    }
    let rightBound = userTokens.length;
    for (let r = idx + 1; r < allSegs.length; r++) {
      if (matchPos[r]) {
        rightBound = matchPos[r]!.start;
        break;
      }
    }

    const searchLimit = Math.min(rightBound - 1, leftBound + 25);
    let bestPos = -1;
    let bestWeight = 0;
    let bestEnd = leftBound;

    for (let pos = leftBound; pos <= searchLimit; pos++) {
      const res = scoreSegmentAt(seg.words, userTokens, pos);
      const ratio = res.matchedWeight / seg.words.length;
      if (ratio >= 0.5 && res.matchedWeight > bestWeight) {
        bestWeight = res.matchedWeight;
        bestPos = pos;
        bestEnd = res.endPos;
        if (res.matchedWeight >= seg.words.length - 0.01) break;
      }
    }

    if (bestPos !== -1) {
      matchPos[idx] = { start: bestPos, end: bestEnd, weight: bestWeight };
    }
  }

  // Aggregate per-sentence results and missing fixed fragments
  const perSentenceMap = new Map<
    number,
    { matched: number; total: number; missing: string[] }
  >();
  activeSentences.forEach((_, idx) => {
    perSentenceMap.set(idx, { matched: 0, total: 0, missing: [] });
  });

  const missingFragments: MissingFixedFragment[] = [];
  let totalFixedWords = 0;
  let matchedFixedWords = 0;

  allSegs.forEach((seg, idx) => {
    const m = matchPos[idx];
    const segLen = seg.words.length;
    const w = m ? Math.min(segLen, m.weight) : 0;
    totalFixedWords += segLen;
    matchedFixedWords += w;

    const bucket = perSentenceMap.get(seg.sentenceIdx)!;
    bucket.total += segLen;
    bucket.matched += w;

    if (!m || w / segLen < 0.55) {
      bucket.missing.push(seg.rawText);
      missingFragments.push({
        sentenceNumber: seg.sentenceNumber,
        sentenceId: seg.sentenceId,
        role: seg.role,
        expected: seg.rawText,
      });
    }
  });

  const sentenceResults: BigSentenceAlignment[] = activeSentences.map((s, idx) => {
    const b = perSentenceMap.get(idx)!;
    return {
      sentenceNumber: idx + 1,
      sentenceId: s.id,
      role: s.role,
      accuracy: b.total > 0 ? Math.min(1, b.matched / b.total) : 1,
      matchedWords: Number(b.matched.toFixed(1)),
      totalFixedWords: b.total,
      missingFragments: b.missing,
    };
  });

  const fixedAccuracy =
    totalFixedWords > 0 ? Math.min(1, matchedFixedWords / totalFixedWords) : 0;

  // Heuristic grammar hints (check planVars if supplied, AND extract X / DO from user text!)
  const grammarHints: string[] = [];
  const seenHints = new Set<string>();
  const pushHint = (h?: string) => {
    if (h && !seenHints.has(h)) {
      seenHints.add(h);
      grammarHints.push(h);
    }
  };

  if (options?.planVars?.X) {
    const r = checkPlanVarX(options.planVars.X);
    if (!r.ok) pushHint(r.hint);
  } else {
    // Try extracting X from "value and impact of <X> in modern society" or "Only in this way can <X> truly"
    const xExtract =
      userText.match(/value and impact of\s+([^.,;!?]{2,40}?)\s+in modern society/i) ??
      userText.match(/Only in this way can\s+([^.,;!?]{2,40}?)\s+truly/i);
    if (xExtract && xExtract[1]) {
      const r = checkPlanVarX(xExtract[1]);
      if (!r.ok) pushHint(r.hint);
    }
  }

  if (options?.planVars?.DO) {
    const r = checkPlanVarDO(options.planVars.DO);
    if (!r.ok) pushHint(r.hint);
  } else {
    const doExtract = userText.match(/enabling people to\s+([^.,;!?]{2,60})/i);
    if (doExtract && doExtract[1]) {
      const r = checkPlanVarDO(doExtract[1]);
      if (!r.ok) pushHint(r.hint);
    }
  }

  if (options?.planVars?.B1) {
    const r = checkPlanVarBenefit(options.planVars.B1, '好处一 B1');
    if (!r.ok) pushHint(r.hint);
  }
  if (options?.planVars?.B2) {
    const r = checkPlanVarBenefit(options.planVars.B2, '好处二 B2');
    if (!r.ok) pushHint(r.hint);
  }

  return {
    fixedAccuracy,
    wordCount,
    wordCountStatus,
    sentenceResults,
    missingFragments,
    grammarHints,
    totalFixedWords,
    matchedFixedWords: Number(matchedFixedWords.toFixed(1)),
  };
}

