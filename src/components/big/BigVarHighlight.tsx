import {
  createContext,
  Fragment,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { PLAN_VAR_MAP } from '../../data/bigEssay';
import '../components.css';

interface BigVarHoverCtxValue {
  hoveredVarId: string | null;
  setHoveredVarId: (id: string | null) => void;
}

const BigVarHoverCtx = createContext<BigVarHoverCtxValue>({
  hoveredVarId: null,
  setHoveredVarId: () => {},
});

export function BigVarHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredVarId, setHoveredVarId] = useState<string | null>(null);
  return (
    <BigVarHoverCtx.Provider value={{ hoveredVarId, setHoveredVarId }}>
      {children}
    </BigVarHoverCtx.Provider>
  );
}

export function useBigVarHover() {
  return useContext(BigVarHoverCtx);
}

const POS_ZH: Record<string, string> = {
  noun: '名词短语',
  verb: '动词原形短语',
  clause: '从句',
  adj: '形容词',
};

interface BigVarPillProps {
  varId: string;
  defaultValue?: string;
  displayText?: string;
  wavyWarning?: string;
  inlineTextStyle?: boolean;
}

export function BigVarPill({
  varId,
  defaultValue,
  displayText,
  wavyWarning,
  inlineTextStyle = false,
}: BigVarPillProps) {
  const { hoveredVarId, setHoveredVarId } = useBigVarHover();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const meta = PLAN_VAR_MAP[varId];
  const isLinked = hoveredVarId === varId;
  const fallbackDef = defaultValue ?? meta?.defaultValue;
  const labelText =
    displayText ??
    (meta
      ? fallbackDef
        ? `${varId} · ${fallbackDef}`
        : `${varId}（${meta.label}）`
      : varId);

  return (
    <span
      className={inlineTextStyle ? 'big-var-inline-wrap' : 'slot-chip-wrap'}
      onMouseEnter={() => setHoveredVarId(varId)}
      onMouseLeave={() => {
        setHoveredVarId(null);
        setPopoverOpen(false);
      }}
    >
      {inlineTextStyle ? (
        <span
          role="button"
          tabIndex={0}
          className={`big-var-pill big-var-inline ${
            isLinked ? 'big-var-linked-active' : ''
          } ${wavyWarning ? 'big-grammar-wavy' : ''}`}
          onClick={() => setPopoverOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setPopoverOpen((v) => !v);
            }
          }}
          data-var-id={varId}
          title={wavyWarning ?? (meta ? `${varId}：${meta.label}` : varId)}
        >
          {labelText}
        </span>
      ) : (
        <button
          type="button"
          className={`slot-chip big-var-pill ${
            isLinked ? 'big-var-linked-active' : ''
          } ${wavyWarning ? 'big-grammar-wavy' : ''}`}
          onClick={() => setPopoverOpen((v) => !v)}
          data-var-id={varId}
          title={wavyWarning ?? (meta ? `${varId}：${meta.label}` : varId)}
        >
          {labelText}
        </button>
      )}

      {popoverOpen && (
        <span className="slot-popover" role="tooltip">
          <span className="slot-popover-head">
            {meta && <span className="slot-pos-tag">{POS_ZH[meta.pos] ?? meta.pos}</span>}
            <span className="slot-popover-label">
              {varId} · {meta?.label ?? varId}
            </span>
          </span>
          {meta?.rule && <span className="slot-popover-zh">{meta.rule}</span>}
          {fallbackDef && (
            <span className="slot-popover-filler">默认：{fallbackDef}</span>
          )}
          {wavyWarning && <span className="slot-popover-hint">{wavyWarning}</span>}
        </span>
      )}
    </span>
  );
}

/**
 * 将含 {{X}} / {{G|people}} 的大作文句渲染为墨色固定句 + 悬停联动红色变量胶囊
 */
export function renderBigSentenceRich(
  templateText: string,
  options?: {
    vars?: Record<string, string>;
    showDefaultText?: boolean;
    inlineValueStyle?: boolean;
    capitalizeFirst?: boolean;
    fieldWarnings?: Record<string, string>;
  }
) {
  const tokens = templateText.split(/(\{\{[^}]+\}\})/g);
  let isAtStart = true;

  return tokens.map((part, idx) => {
    if (!part) return null;
    const match = part.match(/^\{\{(\w+)(?:\|([^}]+))?\}\}$/);
    if (match) {
      const varId = match[1];
      const inlineDef = match[2];
      const meta = PLAN_VAR_MAP[varId];
      const customVal = options?.vars?.[varId]?.trim();
      const defVal = inlineDef ?? meta?.defaultValue;

      let display: string | undefined;
      if (options?.vars) {
        display = customVal || defVal || `[${varId}]`;
        if (options.capitalizeFirst && isAtStart) {
          display = display.replace(/^([a-z])/, (c) => c.toUpperCase());
        }
      } else if (options?.showDefaultText && defVal) {
        display = defVal;
      } else {
        display = inlineDef ? `${varId}: ${inlineDef}` : varId;
      }

      isAtStart = false;
      return (
        <BigVarPill
          key={`${varId}-${idx}`}
          varId={varId}
          defaultValue={inlineDef}
          displayText={display}
          inlineTextStyle={options?.inlineValueStyle}
          wavyWarning={options?.fieldWarnings?.[varId]}
        />
      );
    }

    if (part.trim().length > 0) isAtStart = false;
    return <Fragment key={`txt-${idx}`}>{part}</Fragment>;
  });
}
