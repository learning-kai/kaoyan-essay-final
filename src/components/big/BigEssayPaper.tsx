import { Volume2 } from 'lucide-react';
import { Fragment } from 'react';
import { getBigEssayWordCountStatus } from '../../core/grader';
import {
  countEnglishWords,
  getBigSentencesForFormat,
  renderFullBigEssay,
  type BigFormatMode,
} from '../../data/bigEssay';
import { speakEnglish } from '../LetterView';
import { BigVarHoverProvider, renderBigSentenceRich } from './BigVarHighlight';
import '../components.css';

interface BigEssayPaperPreviewProps {
  vars: Record<string, string>;
  includeOptionalP2S4?: boolean;
  format?: BigFormatMode;
  chartKind?: 'dynamic' | 'static' | 'dual';
  fieldWarnings?: Record<string, string>;
  title?: string;
  showSpeak?: boolean;
}

export function BigEssayPaperPreview({
  vars,
  includeOptionalP2S4 = false,
  format = 'picture',
  chartKind = 'dynamic',
  fieldWarnings,
  title = '考场答题纸预览',
  showSpeak = true,
}: BigEssayPaperPreviewProps) {
  const rendered = renderFullBigEssay(vars, {
    includeOptionalP2S4,
    format,
    chartKind,
  });
  const status = getBigEssayWordCountStatus(rendered.wordCount);
  const activeSentences = getBigSentencesForFormat(format, {
    includeOptionalP2S4,
    chartKind,
  });

  const paraGroups: { paragraph: 1 | 2 | 3; roleLabel: string }[] = [
    { paragraph: 1, roleLabel: '描述' },
    { paragraph: 2, roleLabel: '论证' },
    { paragraph: 3, roleLabel: '建议' },
  ];

  return (
    <BigVarHoverProvider>
      <article className="card-surface big-paper-sheet">
        <div className="big-paper-head">
          <div className="big-paper-title">{title}</div>
          <div className="big-paper-head-right">
            {showSpeak && (
              <button
                type="button"
                className="btn-ghost"
                style={{ padding: '4px 8px', fontSize: 12 }}
                onClick={() => speakEnglish(rendered.fullText)}
              >
                <Volume2 size={14} strokeWidth={1.6} />
                朗读全文
              </button>
            )}
            <span className={`big-wc-badge wc-${status} tabular-nums`}>
              {rendered.wordCount} 词（目标 160–200）
            </span>
          </div>
        </div>

        <div className="big-paper-body">
          {paraGroups.map((pg) => {
            const list = activeSentences.filter((s) => s.paragraph === pg.paragraph);
            return (
              <div key={pg.paragraph} className="big-paper-para-row">
                <div className="big-paper-margin">
                  <span className="big-paper-role">{pg.roleLabel}</span>
                </div>
                <p className="big-paper-text serif-text">
                  {list.map((s, idx) => (
                    <Fragment key={s.id}>
                      {idx > 0 ? ' ' : ''}
                      {renderBigSentenceRich(s.en, {
                        vars,
                        inlineValueStyle: true,
                        capitalizeFirst: true,
                        fieldWarnings,
                      })}
                    </Fragment>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </article>
    </BigVarHoverProvider>
  );
}

interface BigEssayPaperEditorProps {
  paragraphs: [string, string, string];
  onChange: (next: [string, string, string]) => void;
  disabled?: boolean;
  headerLeft?: string;
}

export function BigEssayPaperEditor({
  paragraphs,
  onChange,
  disabled = false,
  headerLeft = '考场大作文答题纸（分三段书写）',
}: BigEssayPaperEditorProps) {
  const fullText = paragraphs.filter((p) => p.trim()).join('\n\n');
  const wc = countEnglishWords(fullText);
  const status = getBigEssayWordCountStatus(wc);

  const meta: { idx: 0 | 1 | 2; role: string; placeholder: string }[] = [
    {
      idx: 0,
      role: '描述',
      placeholder: '第一段：图画/图表/双图/图文外壳 → 揭示深层主题 X →（纯图画加意义句）…',
    },
    {
      idx: 1,
      role: '论证',
      placeholder: '第二段：带来好处 B1/B2 → 快节奏世界日益关键并使人们 DO → 回应真实需求…',
    },
    {
      idx: 2,
      role: '建议',
      placeholder: '第三段：不在表面形式而在践行 → 社会支持营造环境 → 个人理性并付诸行动 → Only in this way…',
    },
  ];

  return (
    <div className="card-surface big-paper-sheet">
      <div className="big-paper-head">
        <div className="big-paper-title">{headerLeft}</div>
        <span className={`big-wc-badge wc-${status} tabular-nums`}>
          实时 {wc} 词（160–200 绿 / 150–220 琥珀）
        </span>
      </div>

      <div className="big-paper-editor-stack">
        {meta.map((m) => (
          <div key={m.idx} className="big-paper-para-row">
            <div className="big-paper-margin">
              <span className="big-paper-role">{m.role}</span>
            </div>
            <textarea
              className="exam-ruled-textarea big-paper-textarea"
              value={paragraphs[m.idx]}
              disabled={disabled}
              placeholder={m.placeholder}
              onChange={(e) => {
                const next: [string, string, string] = [...paragraphs];
                next[m.idx] = e.target.value;
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
