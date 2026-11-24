import { Fragment, useState } from 'react';
import { getBigEssayWordCountStatus } from '../../core/grader';
import {
  BIG_SENTENCES,
  MATERIAL_PACKS,
  MATERIAL_PACK_MAP,
  renderFullBigEssay,
} from '../../data/bigEssay';
import { BigVarHoverProvider, renderBigSentenceRich } from './BigVarHighlight';

const DEFAULT_COMPARE_IDS: [string, string, string] = [
  'culture',
  'tech-ai',
  'education',
];

export function BigExamplesTab() {
  const [selectedIds, setSelectedIds] =
    useState<[string, string, string]>(DEFAULT_COMPARE_IDS);
  const [includeP2S4, setIncludeP2S4] = useState(false);
  const [mobileIdx, setMobileIdx] = useState(0);

  const activeSentences = BIG_SENTENCES.filter((s) => includeP2S4 || !s.optional);

  return (
    <BigVarHoverProvider>
      <div>
        <section className="card-surface today-section-card">
          <div
            className="section-row-head"
            style={{ marginBottom: 10, flexWrap: 'wrap', gap: 10 }}
          >
            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <h2 className="section-small-title">
                三篇样例并排对照（Worked Examples）
              </h2>
              <p className="page-sub" style={{ marginTop: 4 }}>
                同一副墨色骨架，换几个红色变量就是三篇全新高分作文。鼠标悬停任意红色变量，三篇文章中同一变量会一起高亮！
              </p>
            </div>
            <button
              type="button"
              className={`btn-secondary formula-mini-btn ${includeP2S4 ? 'active' : ''}`}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              onClick={() => setIncludeP2S4((v) => !v)}
            >
              {includeP2S4 ? '已含可选句 P2.S4' : '已省去可选句 P2.S4（推荐）'}
            </button>
          </div>

          {/* 3-column pack pickers */}
          <div className="big-examples-selectors">
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx} className="big-examples-picker-item">
                <span className="setting-desc" style={{ margin: 0 }}>
                  样例 {colIdx + 1}：
                </span>
                <select
                  className="setting-input"
                  value={selectedIds[colIdx]}
                  onChange={(e) => {
                    const next: [string, string, string] = [...selectedIds];
                    next[colIdx] = e.target.value;
                    setSelectedIds(next);
                  }}
                >
                  {MATERIAL_PACKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.theme}（{p.vars.X}）
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Mobile switcher pills (hidden on desktop) */}
          <div className="big-examples-mobile-tabs">
            {selectedIds.map((pid, idx) => {
              const pack = MATERIAL_PACK_MAP[pid];
              return (
                <button
                  key={`${pid}-${idx}`}
                  type="button"
                  className={`tab-pill ${mobileIdx === idx ? 'active' : ''}`}
                  onClick={() => setMobileIdx(idx)}
                >
                  {idx + 1}. {pack.theme}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3 side-by-side worked examples */}
        <div className="big-examples-grid">
          {selectedIds.map((pid, colIdx) => {
            const pack = MATERIAL_PACK_MAP[pid];
            const vars: Record<string, string> = {
              ...pack.vars,
              PIC: pack.picExamples[0],
            };
            const stats = renderFullBigEssay(vars, {
              includeOptionalP2S4: includeP2S4,
            });
            const wcStatus = getBigEssayWordCountStatus(stats.wordCount);

            return (
              <article
                key={`${pid}-${colIdx}`}
                className={`card-surface big-example-col ${
                  mobileIdx === colIdx ? 'mobile-visible' : ''
                }`}
              >
                <div className="big-example-col-head">
                  <div>
                    <div className="big-example-theme">{pack.theme}</div>
                    <div className="big-example-x">X = {pack.vars.X}</div>
                  </div>
                  <span className={`big-wc-badge wc-${wcStatus} tabular-nums`}>
                    {stats.wordCount} 词
                  </span>
                </div>

                <div className="big-example-body serif-text">
                  {([1, 2, 3] as const).map((pNum) => {
                    const pSentences = activeSentences.filter(
                      (s) => s.paragraph === pNum
                    );
                    return (
                      <p key={pNum} className="big-example-para">
                        {pSentences.map((s, si) => (
                          <Fragment key={s.id}>
                            {si > 0 ? ' ' : ''}
                            {renderBigSentenceRich(s.en, {
                              vars,
                              inlineValueStyle: true,
                              capitalizeFirst: true,
                            })}
                          </Fragment>
                        ))}
                      </p>
                    );
                  })}
                </div>

                <div className="big-example-foot tabular-nums">
                  <span>固定墨色骨架 + 红色变量</span>
                  <strong className={`wc-text-${wcStatus}`}>
                    共 {stats.wordCount} 词
                  </strong>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </BigVarHoverProvider>
  );
}
