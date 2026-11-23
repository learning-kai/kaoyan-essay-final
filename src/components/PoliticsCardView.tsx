import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import type { PoliticsCard, PoliticsLine, PoliticsToken } from '../data/politics';

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

/**
 * 将卡片内相邻的高亮词合并为可点击揭晓的“彩字遮罩块”
 */
export function buildProcessedPoliticsLines(
  card: PoliticsCard,
  options?: { hideMnemonicLines?: boolean }
): { lines: ProcessedLine[]; totalClozeCount: number } {
  const out: ProcessedLine[] = [];
  let groupCounter = 0;

  for (const line of card.lines) {
    if (options?.hideMnemonicLines && line.isMnemonic) {
      continue;
    }
    const parts: ProcessedLine['parts'] = [];
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
    };

    for (const tok of line.tokens) {
      if (!line.isMnemonic && tok.type === 'text' && tok.highlight) {
        activeCloze.push(tok);
      } else {
        flushCloze();
        parts.push({ kind: 'token', token: tok });
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
