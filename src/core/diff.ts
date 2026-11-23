import type { POS } from '../data/types';
import type { TargetPart, UserWordToken } from './normalize';

export type DiffStatus =
  | 'correct'
  | 'missing'
  | 'extra'
  | 'misspelled'
  | 'wrongForm'
  | 'slot';

export interface DiffToken {
  status: DiffStatus;
  text: string;
  expected?: string;
  slotId?: string;
  slotWarning?: string;
  caseMismatch?: boolean;
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

const IRREGULAR_GROUPS: string[][] = [
  ['break', 'breaks', 'breaking', 'broke', 'broken'],
  ['be', 'am', 'is', 'are', 'was', 'were', 'been', 'being'],
  ['have', 'has', 'had', 'having'],
  ['make', 'makes', 'making', 'made'],
  ['take', 'takes', 'taking', 'taken', 'took'],
  ['give', 'gives', 'giving', 'gave', 'given'],
  ['hold', 'holds', 'holding', 'held'],
  ['write', 'writes', 'writing', 'wrote', 'written'],
  ['read', 'reads', 'reading'],
  ['advise', 'advises', 'advised', 'advising', 'advisable', 'advice'],
  ['recommend', 'recommends', 'recommended', 'recommending', 'recommendation'],
  ['enable', 'enables', 'enabled', 'enabling'],
  ['spare', 'spares', 'spared', 'sparing'],
  ['encourage', 'encourages', 'encouraged', 'encouraging'],
  ['mention', 'mentions', 'mentioned', 'mentioning'],
  ['explain', 'explains', 'explained', 'explaining'],
  ['arrange', 'arranges', 'arranged', 'arranging', 'arrangement'],
  ['require', 'requires', 'required', 'requiring'],
  ['implement', 'implements', 'implemented', 'implementing', 'implementation'],
  ['ensure', 'ensures', 'ensured', 'ensuring'],
  ['help', 'helps', 'helped', 'helping'],
  ['prove', 'proves', 'proved', 'proving'],
  ['impress', 'impresses', 'impressed', 'impressing'],
  ['deal', 'deals', 'dealt', 'dealing'],
  ['accept', 'accepts', 'accepted', 'accepting'],
  ['miss', 'misses', 'missed', 'missing'],
  ['cover', 'covers', 'covered', 'covering'],
  ['characterize', 'characterizes', 'characterized', 'characterizing'],
  ['attach', 'attaches', 'attached', 'attaching'],
  ['appreciate', 'appreciates', 'appreciated', 'appreciating'],
  ['apologize', 'apologizes', 'apologized', 'apologizing'],
  ['congratulate', 'congratulates', 'congratulated', 'congratulating', 'congratulations'],
];

const IRREGULAR_STEM_MAP = new Map<string, string>();
for (const group of IRREGULAR_GROUPS) {
  const root = group[0];
  for (const form of group) {
    IRREGULAR_STEM_MAP.set(form, root);
  }
}

export function getWordStem(word: string): string {
  const w = word.toLowerCase();
  const irregular = IRREGULAR_STEM_MAP.get(w);
  if (irregular) return irregular;

  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 4 && w.endsWith('ied')) return w.slice(0, -3) + 'y';
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function isWrongForm(userWord: string, targetWord: string): boolean {
  const u = userWord.toLowerCase();
  const t = targetWord.toLowerCase();
  if (u === t) return false;
  const su = getWordStem(u);
  const st = getWordStem(t);
  if (su === st && su.length >= 3) return true;
  // Handle silent-e drop: make/making, spare/sparing
  if (su + 'e' === st || st + 'e' === su) return true;
  return false;
}

export function isMisspelled(userWord: string, targetWord: string): boolean {
  const u = userWord.toLowerCase();
  const t = targetWord.toLowerCase();
  if (u === t) return false;
  if (t.length < 4) return false;
  return levenshtein(u, t) <= 2;
}

export function checkSlotPOS(
  phraseWords: string[],
  pos: POS
): { ok: boolean; warning?: string; wrongFormWord?: { raw: string; expected: string } } {
  const clean = phraseWords.map((w) => w.toLowerCase()).filter(Boolean);
  if (clean.length === 0) {
    return { ok: false, warning: `这里要填${posLabel(pos)}` };
  }
  const first = clean[0];

  if (pos === 'verb') {
    if (first === 'to' || (first.endsWith('ing') && first.length > 4)) {
      return { ok: false, warning: '这里要填动词原形（不能以 to 或 -ing 开头）' };
    }
    return { ok: true };
  }

  if (pos === 'doing') {
    // Check common bare-verb mistake like "break my promise" -> "breaking"
    const bareVerbs = new Set([
      'break',
      'miss',
      'forget',
      'cancel',
      'delay',
      'fail',
      'leave',
      'make',
      'do',
      'go',
      'come',
      'lose',
      'ignore',
      'refuse',
    ]);
    if (bareVerbs.has(first)) {
      const ingForm = first.endsWith('e') ? `${first.slice(0, -1)}ing` : `${first}ing`;
      return {
        ok: false,
        warning: `这里要填 doing 或名词短语，请将 "${phraseWords[0]}" 改为 "${ingForm}"`,
        wrongFormWord: { raw: phraseWords[0], expected: ingForm },
      };
    }
    if (first === 'to') {
      return { ok: false, warning: '这里要填 doing 形式或名词短语（不能以 to 开头）' };
    }
    return { ok: true };
  }

  // noun
  if (first === 'to') {
    return { ok: false, warning: '这里要填名词短语（不能以 to 开头）' };
  }
  return { ok: true };
}

function posLabel(pos: POS): string {
  if (pos === 'verb') return '动词原形';
  if (pos === 'doing') return 'doing 形式';
  return '名词短语';
}

/**
 * Align fixed word segments using LCS, then classify mismatches into
 * wrongForm / misspelled / missing / extra.
 */
function diffWordSegment(
  targetWords: TargetPart[],
  userWords: UserWordToken[]
): DiffToken[] {
  const m = targetWords.length;
  const n = userWords.length;

  // LCS matrix on exact normalized match
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (targetWords[i].normalized === userWords[j].normalized) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack into raw ops
  type Op =
    | { type: 'match'; t: TargetPart; u: UserWordToken }
    | { type: 'missing'; t: TargetPart }
    | { type: 'extra'; u: UserWordToken };

  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (targetWords[i].normalized === userWords[j].normalized) {
      ops.push({ type: 'match', t: targetWords[i], u: userWords[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'missing', t: targetWords[i] });
      i++;
    } else {
      ops.push({ type: 'extra', u: userWords[j] });
      j++;
    }
  }
  while (i < m) ops.push({ type: 'missing', t: targetWords[i++] });
  while (j < n) ops.push({ type: 'extra', u: userWords[j++] });

  // Pair adjacent missing + extra runs into wrongForm / misspelled when applicable
  const result: DiffToken[] = [];
  let idx = 0;
  while (idx < ops.length) {
    const op = ops[idx];
    if (op.type === 'match') {
      const caseMismatch = op.t.raw !== op.u.raw;
      result.push({
        status: 'correct',
        text: op.u.raw,
        expected: op.t.raw,
        caseMismatch,
      });
      idx++;
      continue;
    }

    // Collect contiguous non-match block
    const missings: TargetPart[] = [];
    const extras: UserWordToken[] = [];
    while (idx < ops.length && ops[idx].type !== 'match') {
      const cur = ops[idx];
      if (cur.type === 'missing') missings.push(cur.t);
      else if (cur.type === 'extra') extras.push(cur.u);
      idx++;
    }

    const usedExtra = new Set<number>();
    const pairedMissing = new Map<number, { status: 'wrongForm' | 'misspelled'; u: UserWordToken }>();

    for (let mi = 0; mi < missings.length; mi++) {
      const t = missings[mi];
      // Prefer wrongForm first, then closest misspelled
      let bestEi = -1;
      let bestType: 'wrongForm' | 'misspelled' | null = null;
      let bestDist = 999;

      for (let ei = 0; ei < extras.length; ei++) {
        if (usedExtra.has(ei)) continue;
        const u = extras[ei];
        if (u.isPlaceholder) continue;
        if (isWrongForm(u.normalized, t.normalized)) {
          bestEi = ei;
          bestType = 'wrongForm';
          break;
        }
        if (isMisspelled(u.normalized, t.normalized)) {
          const dist = levenshtein(u.normalized, t.normalized);
          if (dist < bestDist) {
            bestDist = dist;
            bestEi = ei;
            bestType = 'misspelled';
          }
        }
      }

      if (bestEi !== -1 && bestType) {
        usedExtra.add(bestEi);
        pairedMissing.set(mi, { status: bestType, u: extras[bestEi] });
      }
    }

    for (let mi = 0; mi < missings.length; mi++) {
      const pair = pairedMissing.get(mi);
      if (pair) {
        result.push({
          status: pair.status,
          text: pair.u.raw,
          expected: missings[mi].raw,
        });
      } else {
        result.push({
          status: 'missing',
          text: missings[mi].raw,
          expected: missings[mi].raw,
        });
      }
    }
    for (let ei = 0; ei < extras.length; ei++) {
      if (!usedExtra.has(ei)) {
        result.push({
          status: 'extra',
          text: extras[ei].raw,
        });
      }
    }
  }

  return result;
}

export interface DiffWithSlotsOptions {
  mode: 'framework' | 'fill';
  slotPOSMap: Record<string, POS>;
  slotLabelMap: Record<string, string>;
}

/**
 * Align target sentence containing {{slot}} wildcards against user tokens.
 * Splits target into alternating fixed word segments and slot placeholders,
 * anchors fixed segments in user input, and matches 0-6 words for each slot.
 */
export function diffWithSlots(
  targetParts: TargetPart[],
  userTokens: UserWordToken[],
  options: DiffWithSlotsOptions
): DiffToken[] {
  // Split targetParts into fixed segments and slots
  type Segment =
    | { kind: 'fixed'; parts: TargetPart[] }
    | { kind: 'slot'; part: TargetPart };

  const segments: Segment[] = [];
  for (const part of targetParts) {
    if (part.kind === 'slot') {
      segments.push({ kind: 'slot', part });
    } else {
      const last = segments[segments.length - 1];
      if (last && last.kind === 'fixed') {
        last.parts.push(part);
      } else {
        segments.push({ kind: 'fixed', parts: [part] });
      }
    }
  }

  if (!segments.some((s) => s.kind === 'slot')) {
    return diffWordSegment(targetParts, userTokens);
  }

  // Locate each fixed segment's best anchor position in userTokens
  const findAnchor = (
    fixedParts: TargetPart[],
    startIdx: number,
    maxOffset: number
  ): { start: number; end: number } | null => {
    if (fixedParts.length === 0) return { start: startIdx, end: startIdx };
    const anchorWords = fixedParts.slice(0, Math.min(3, fixedParts.length));
    const searchLimit = Math.min(userTokens.length, startIdx + maxOffset);

    let bestPos = -1;
    let bestScore = -1;

    for (let pos = startIdx; pos <= searchLimit; pos++) {
      let score = 0;
      for (let k = 0; k < anchorWords.length && pos + k < userTokens.length; k++) {
        const u = userTokens[pos + k];
        const t = anchorWords[k];
        if (u.normalized === t.normalized) score += 3;
        else if (isWrongForm(u.normalized, t.normalized) || isMisspelled(u.normalized, t.normalized)) {
          score += 2;
        }
      }
      if (score > bestScore && score >= 2) {
        bestScore = score;
        bestPos = pos;
        if (score === anchorWords.length * 3) break;
      }
    }

    if (bestPos === -1) return null;
    return { start: bestPos, end: Math.min(userTokens.length, bestPos + fixedParts.length) };
  };

  const result: DiffToken[] = [];
  let userCursor = 0;

  for (let sIdx = 0; sIdx < segments.length; sIdx++) {
    const seg = segments[sIdx];

    if (seg.kind === 'fixed') {
      const nextSeg = segments[sIdx + 1];
      if (!nextSeg) {
        // Final fixed segment consumes all remaining user tokens
        const slice = userTokens.slice(userCursor);
        result.push(...diffWordSegment(seg.parts, slice));
        userCursor = userTokens.length;
      } else {
        // Fixed segment before a slot: find where fixed segment ends
        // Look ahead to the fixed segment AFTER the slot (if any) to bound slice
        const segAfterSlot = segments[sIdx + 2];
        let segEnd = Math.min(userTokens.length, userCursor + seg.parts.length);

        // Adjust segEnd if user missed or added a word inside this fixed segment
        if (seg.parts.length > 0 && userCursor < userTokens.length) {
          const lastFixedWord = seg.parts[seg.parts.length - 1];
          // Search near expected end for lastFixedWord or placeholder start
          for (
            let probe = Math.max(userCursor, segEnd - 2);
            probe <= Math.min(userTokens.length - 1, segEnd + 2);
            probe++
          ) {
            if (userTokens[probe].isPlaceholder) {
              segEnd = probe;
              break;
            }
            if (
              userTokens[probe].normalized === lastFixedWord.normalized ||
              isWrongForm(userTokens[probe].normalized, lastFixedWord.normalized)
            ) {
              segEnd = probe + 1;
              break;
            }
          }
        }

        // Guard: don't overshoot into segAfterSlot
        if (segAfterSlot && segAfterSlot.kind === 'fixed') {
          const afterAnchor = findAnchor(segAfterSlot.parts, userCursor + 1, seg.parts.length + 7);
          if (afterAnchor && segEnd > afterAnchor.start) {
            segEnd = afterAnchor.start;
          }
        }

        const slice = userTokens.slice(userCursor, segEnd);
        result.push(...diffWordSegment(seg.parts, slice));
        userCursor = segEnd;
      }
    } else {
      // Slot segment: find where the next fixed segment starts (0-6 words ahead)
      const nextSeg = segments[sIdx + 1];
      const slotId = seg.part.slotId!;
      const slotLabel = options.slotLabelMap[slotId] ?? slotId;
      const slotPOS = options.slotPOSMap[slotId] ?? 'noun';

      let slotEnd = userCursor;
      if (!nextSeg) {
        // Slot at the end of sentence: consume up to 6 words (or all if <= 6)
        slotEnd = Math.min(userTokens.length, userCursor + 6);
      } else if (nextSeg.kind === 'fixed') {
        const anchor = findAnchor(nextSeg.parts, userCursor, 7);
        if (anchor) {
          slotEnd = anchor.start;
        } else if (userCursor < userTokens.length && userTokens[userCursor].isPlaceholder) {
          slotEnd = userCursor + 1;
        } else {
          slotEnd = Math.min(userTokens.length, userCursor + 1);
        }
      }

      const slotTokens = userTokens.slice(userCursor, slotEnd);
      userCursor = slotEnd;

      const slotText = slotTokens.map((t) => t.raw).join(' ');
      const isPlaceholderUsed =
        slotTokens.length === 0 ||
        (slotTokens.length === 1 && slotTokens[0].isPlaceholder);

      if (options.mode === 'framework') {
        // Framework mode: placeholder, empty, or 1-6 words all accepted
        // Exception: still detect glaring doing-slot bare-verb mistake like "as a result of break my promise"
        let slotWarning: string | undefined;
        let wrongFormToken: DiffToken | null = null;
        if (!isPlaceholderUsed && slotPOS === 'doing') {
          const posCheck = checkSlotPOS(
            slotTokens.map((t) => t.raw),
            slotPOS
          );
          if (!posCheck.ok && posCheck.wrongFormWord) {
            wrongFormToken = {
              status: 'wrongForm',
              text: posCheck.wrongFormWord.raw,
              expected: posCheck.wrongFormWord.expected,
              slotId,
              slotWarning: posCheck.warning,
            };
          }
        }

        if (wrongFormToken) {
          result.push(wrongFormToken);
          if (slotTokens.length > 1) {
            result.push({
              status: 'slot',
              text: slotTokens.slice(1).map((t) => t.raw).join(' '),
              slotId,
              expected: `[${slotLabel}]`,
            });
          }
        } else {
          result.push({
            status: 'slot',
            text: slotText || `[${slotLabel}]`,
            slotId,
            expected: `[${slotLabel}]`,
            slotWarning,
          });
        }
      } else {
        // Real-fill mode: must provide real content matching POS
        if (isPlaceholderUsed) {
          result.push({
            status: 'slot',
            text: slotText || `[${slotLabel}]`,
            slotId,
            expected: `[${slotLabel}]`,
            slotWarning: `实填模式下请填写具体内容（${posLabel(slotPOS)}）`,
          });
        } else {
          const posCheck = checkSlotPOS(
            slotTokens.map((t) => t.raw),
            slotPOS
          );
          if (!posCheck.ok && posCheck.wrongFormWord) {
            result.push({
              status: 'wrongForm',
              text: posCheck.wrongFormWord.raw,
              expected: posCheck.wrongFormWord.expected,
              slotId,
              slotWarning: posCheck.warning,
            });
            if (slotTokens.length > 1) {
              result.push({
                status: 'slot',
                text: slotTokens.slice(1).map((t) => t.raw).join(' '),
                slotId,
                expected: `[${slotLabel}]`,
              });
            }
          } else {
            result.push({
              status: 'slot',
              text: slotText,
              slotId,
              expected: `[${slotLabel}]`,
              slotWarning: posCheck.ok ? undefined : posCheck.warning,
            });
          }
        }
      }
    }
  }

  // Any leftover user tokens at the end are extra
  while (userCursor < userTokens.length) {
    result.push({
      status: 'extra',
      text: userTokens[userCursor++].raw,
    });
  }

  return result;
}
