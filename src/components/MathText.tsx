import katex from 'katex';
import { Fragment, useMemo } from 'react';

interface Segment {
  kind: 'text' | 'math' | 'blank';
  value: string;
  display?: boolean;
}

export function tokenizeMathText(text: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  let textBuf = '';

  const flushText = () => {
    if (!textBuf) return;
    // Split out blank placeholders like ________________ (4+ underscores)
    const blankRe = /(_{4,})/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = blankRe.exec(textBuf)) !== null) {
      if (m.index > last) {
        segments.push({ kind: 'text', value: textBuf.slice(last, m.index) });
      }
      segments.push({ kind: 'blank', value: m[1] });
      last = m.index + m[1].length;
    }
    if (last < textBuf.length) {
      segments.push({ kind: 'text', value: textBuf.slice(last) });
    }
    textBuf = '';
  };

  while (i < text.length) {
    if (text[i] === '$' && (i === 0 || text[i - 1] !== '\\')) {
      const isDisplay = text[i + 1] === '$';
      const delim = isDisplay ? '$$' : '$';
      const start = i + delim.length;
      const end = text.indexOf(delim, start);
      if (end !== -1) {
        flushText();
        segments.push({
          kind: 'math',
          value: text.slice(start, end),
          display: isDisplay,
        });
        i = end + delim.length;
        continue;
      }
    }
    textBuf += text[i];
    i += 1;
  }
  flushText();
  return segments;
}

const DISPLAY_STYLE_TRIGGER =
  /\\(frac|dfrac|binom|lim|sum|int|iint|iiint|oint|prod)\b/;

export function formatFormulaTex(tex: string, displayMode = false): string {
  if (
    displayMode ||
    tex.includes('\\displaystyle') ||
    tex.includes('\\textstyle')
  ) {
    return tex;
  }
  return DISPLAY_STYLE_TRIGGER.test(tex) ? `\\displaystyle ${tex}` : tex;
}

export function renderLatexSafe(tex: string, displayMode = false): string {
  try {
    return katex.renderToString(formatFormulaTex(tex, displayMode), {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
    });
  } catch {
    return tex;
  }
}

export function stripLatexForPlainText(text: string): string {
  return text
    .replace(/\$([^$]+)\$/g, (_, inner: string) =>
      inner
        .replace(/\\infty/g, '∞')
        .replace(/\\to/g, '→')
        .replace(/\^\{([^}]+)\}/g, '^$1')
        .replace(/\\/g, '')
    )
    .trim();
}

interface MathTextProps {
  text: string;
  className?: string;
  displayMath?: boolean;
}

export function MathText({ text, className, displayMath = false }: MathTextProps) {
  const segments = useMemo(() => tokenizeMathText(text), [text]);

  return (
    <span className={className ? `math-text ${className}` : 'math-text'}>
      {segments.map((seg, idx) => {
        if (seg.kind === 'blank') {
          return (
            <span
              key={idx}
              className="math-blank-slot"
              aria-label="待默写空位"
            />
          );
        }
        if (seg.kind === 'math') {
          const useDisplay = Boolean(seg.display || displayMath);
          const hasStack =
            useDisplay ||
            DISPLAY_STYLE_TRIGGER.test(seg.value) ||
            seg.value.includes('\\displaystyle');
          const html = renderLatexSafe(seg.value, useDisplay);
          return (
            <span
              key={idx}
              className={
                hasStack
                  ? 'math-inline-wrap math-has-stack'
                  : 'math-inline-wrap'
              }
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <Fragment key={idx}>{seg.value}</Fragment>;
      })}
    </span>
  );
}
