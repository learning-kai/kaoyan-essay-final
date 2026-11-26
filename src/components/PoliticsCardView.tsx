import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import type { PoliticsCard, PoliticsLine, PoliticsToken } from '../data/politics';
import { POLITICS_CLOZE_RULES } from '../data/politicsCloze';

export function colorClassForHex(hex: string): string {
  const clean = hex.replace('#', '').toUpperCase();
  return `pc-c-${clean}`;
}

export interface ClozeGroup {
  groupIndex: number;
  tokens: Extract<PoliticsToken, { type: 'text' }>[];
  plainText: string;
}

export interface ProcessedLine {
  line: PoliticsLine;
  parts: (
    | { kind: 'token'; token: PoliticsToken }
    | { kind: 'cloze'; group: ClozeGroup }
  )[];
}

interface TextSpan {
  start: number;
  end: number;
  spanId: number;
}

/**
 * 将某一行按语义考点词（POLITICS_CLOZE_RULES）精准切分为遮罩块，
 * 完整保留每个字的原有颜色与粗细，绝不盲目遮挡题干或标题。
 */
export function resolveLineClozeSpans(
  line: PoliticsLine,
  targets: string[] | undefined
): { spans: TextSpan[]; unmatched: string[] } {
  if (!targets || targets.length === 0) {
    return { spans: [], unmatched: [] };
  }
  const plain = line.tokens
    .map((t) => (t.type === 'text' ? t.text : ''))
    .join('');

  const spans: TextSpan[] = [];
  const unmatched: string[] = [];
  let cursor = 0;

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (!target) continue;
    let pos = plain.indexOf(target, cursor);
    if (pos === -1) {
      // Fallback: check earlier in case targets weren't strictly ordered
      pos = plain.indexOf(target);
      if (
        pos !== -1 &&
        spans.some((s) => !(pos + target.length <= s.start || pos >= s.end))
      ) {
        pos = -1;
      }
    }
    if (pos === -1) {
      unmatched.push(target);
      continue;
    }
    spans.push({ start: pos, end: pos + target.length, spanId: i });
    cursor = pos + target.length;
  }

  spans.sort((a, b) => a.start - b.start);
  return { spans, unmatched };
}

/**
 * 将卡片内语义考点词切分为可点击揭晓的“考点遮罩块”
 */
export function buildProcessedPoliticsLines(
  card: PoliticsCard,
  options?: { hideMnemonicLines?: boolean }
): { lines: ProcessedLine[]; totalClozeCount: number } {
  const out: ProcessedLine[] = [];
  const cardRules = POLITICS_CLOZE_RULES[card.id];
  let groupCounter = 0;

  for (let lineIdx = 0; lineIdx < card.lines.length; lineIdx++) {
    const line = card.lines[lineIdx];
    if (options?.hideMnemonicLines && line.isMnemonic) {
      continue;
    }

    const { spans } = resolveLineClozeSpans(line, cardRules?.[lineIdx]);
    if (spans.length === 0) {
      out.push({
        line,
        parts: line.tokens.map((token) => ({ kind: 'token', token })),
      });
      continue;
    }

    // Step 1: Split text tokens at every span boundary so each atomic token is either fully inside 1 span or outside all spans
    type AtomicTok =
      | { kind: 'icon'; token: Extract<PoliticsToken, { type: 'icon' }> }
      | { kind: 'text'; token: Extract<PoliticsToken, { type: 'text' }>; spanId: number };

    const atomic: AtomicTok[] = [];
    let charPos = 0;

    for (const tok of line.tokens) {
      if (tok.type === 'icon') {
        atomic.push({ kind: 'icon', token: tok });
        continue;
      }
      const tokStart = charPos;
      const tokEnd = charPos + tok.text.length;
      charPos = tokEnd;

      // Collect cut points within [tokStart, tokEnd]
      const cuts = new Set<number>([tokStart, tokEnd]);
      for (const sp of spans) {
        if (sp.start > tokStart && sp.start < tokEnd) cuts.add(sp.start);
        if (sp.end > tokStart && sp.end < tokEnd) cuts.add(sp.end);
      }
      const sortedCuts = [...cuts].sort((a, b) => a - b);

      for (let ci = 0; ci < sortedCuts.length - 1; ci++) {
        const s0 = sortedCuts[ci];
        const s1 = sortedCuts[ci + 1];
        if (s1 <= s0) continue;
        const sliceText = tok.text.slice(s0 - tokStart, s1 - tokStart);
        const matchedSpan = spans.find((sp) => s0 >= sp.start && s1 <= sp.end);
        atomic.push({
          kind: 'text',
          token: { ...tok, text: sliceText },
          spanId: matchedSpan ? matchedSpan.spanId : -1,
        });
      }
    }

    // Step 2: Merge contiguous text tokens belonging to the same spanId into one ClozeGroup
    const parts: ProcessedLine['parts'] = [];
    let activeSpanId = -1;
    let activeCloze: Extract<PoliticsToken, { type: 'text' }>[] = [];

    const flushCloze = () => {
      if (activeCloze.length === 0) return;
      parts.push({
        kind: 'cloze',
        group: {
          groupIndex: groupCounter,
          tokens: activeCloze,
          plainText: activeCloze.map((t) => t.text).join(''),
        },
      });
      groupCounter += 1;
      activeCloze = [];
      activeSpanId = -1;
    };

    for (const item of atomic) {
      if (item.kind === 'text' && item.spanId >= 0) {
        if (activeSpanId !== item.spanId) {
          flushCloze();
          activeSpanId = item.spanId;
        }
        activeCloze.push(item.token);
      } else {
        flushCloze();
        parts.push({ kind: 'token', token: item.token });
      }
    }
    flushCloze();
    out.push({ line, parts });
  }

  return { lines: out, totalClozeCount: groupCounter };
}

interface PoliticsCardViewProps {
  card: PoliticsCard;
  clozeMode?: boolean;
  revealedClozes?: Set<number>;
  onToggleCloze?: (groupIndex: number) => void;
  hideMnemonicLines?: boolean;
  showMnemonicPanel?: boolean;
  defaultBreakdownOpen?: boolean;
  visibleLineCount?: number;
}

export function PoliticsCardView({
  card,
  clozeMode = false,
  revealedClozes,
  onToggleCloze,
  hideMnemonicLines = false,
  showMnemonicPanel = true,
  defaultBreakdownOpen = false,
  visibleLineCount,
}: PoliticsCardViewProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(defaultBreakdownOpen);

  const { lines } = useMemo(
    () => buildProcessedPoliticsLines(card, { hideMnemonicLines }),
    [card, hideMnemonicLines]
  );

  const displayedLines =
    visibleLineCount !== undefined ? lines.slice(0, visibleLineCount) : lines;

  return (
    <div className="politics-card-body">
      <div className="politics-lines">
        {displayedLines.map((pl, lIdx) => (
          <div key={lIdx} className="politics-line">
            {pl.parts.map((part, pIdx) => {
              if (part.kind === 'token') {
                const tok = part.token;
                if (tok.type === 'icon') {
                  return (
                    <img
                      key={pIdx}
                      src={tok.src}
                      alt={tok.alt}
                      className="politics-inline-icon"
                    />
                  );
                }
                return (
                  <span
                    key={pIdx}
                    className={`${colorClassForHex(tok.color)}${tok.bold ? ' pc-bold' : ''}`}
                  >
                    {tok.text}
                  </span>
                );
              }

              const g = part.group;
              const isRevealed = !clozeMode || Boolean(revealedClozes?.has(g.groupIndex));
              if (isRevealed) {
                return (
                  <span
                    key={pIdx}
                    className={clozeMode ? 'politics-cloze-revealed' : undefined}
                    onClick={
                      clozeMode && onToggleCloze
                        ? () => onToggleCloze(g.groupIndex)
                        : undefined
                    }
                  >
                    {g.tokens.map((t, ti) => (
                      <span
                        key={ti}
                        className={`${colorClassForHex(t.color)}${t.bold ? ' pc-bold' : ''}`}
                      >
                        {t.text}
                      </span>
                    ))}
                  </span>
                );
              }

              // Render clickable color-tinted mask sized proportionally to hidden keyword
              const charLen = Math.max(2, Math.min(14, g.plainText.trim().length));
              return (
                <button
                  key={pIdx}
                  type="button"
                  className="politics-cloze-mask"
                  style={{ minWidth: `${charLen * 1.05}em` }}
                  onClick={() => onToggleCloze?.(g.groupIndex)}
                  title="点击揭晓该核心考点词"
                  aria-label="点击揭晓核心考点词"
                >
                  {'·'.repeat(Math.min(4, Math.max(2, Math.ceil(charLen / 2))))}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {card.image && (visibleLineCount === undefined || visibleLineCount > 0) && (
        <div className="politics-timeline-wrap" style={{ marginTop: displayedLines.length > 0 ? 12 : 0 }}>
          <img
            src={card.image.src}
            alt={card.image.alt}
            className="politics-timeline-img"
            loading="lazy"
          />
        </div>
      )}

      {showMnemonicPanel && card.mnemonicBreakdown.length > 0 && (
        <div className="politics-mnemonic-box">
          <button
            type="button"
            className="politics-mnemonic-toggle"
            onClick={() => setBreakdownOpen((v) => !v)}
          >
            <span className="politics-mnemonic-toggle-left">
              <Sparkles size={14} strokeWidth={1.7} />
              <span>口诀拆解对应（{card.mnemonicBreakdown.length} 项）</span>
            </span>
            {breakdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {breakdownOpen && (
            <div className="politics-mnemonic-list">
              {card.mnemonicBreakdown.map((pair, idx) => (
                <div key={idx} className="politics-mnemonic-row">
                  <span className="politics-mnemonic-cue">{pair.cue}</span>
                  <ArrowRight
                    size={13}
                    strokeWidth={1.7}
                    className="politics-mnemonic-arrow"
                  />
                  <span className="politics-mnemonic-target">{pair.target}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {visibleLineCount !== undefined && visibleLineCount < lines.length && (
        <div className="politics-hidden-more-hint tabular-nums">
          下方还有 {lines.length - visibleLineCount} 行待揭晓…
        </div>
      )}
    </div>
  );
}

export function PoliticsTitle({ card }: { card: PoliticsCard }) {
  return (
    <Fragment>
      {card.titleTokens.map((tok, idx) =>
        tok.type === 'icon' ? (
          <img
            key={idx}
            src={tok.src}
            alt={tok.alt}
            className="politics-inline-icon"
          />
        ) : (
          <span key={idx}>{tok.text}</span>
        )
      )}
    </Fragment>
  );
}
