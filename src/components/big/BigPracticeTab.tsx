import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  checkPlanVarBenefit,
  checkPlanVarDO,
  checkPlanVarX,
  generateCloze,
  gradeBigEssayAlignment,
  type BigEssayGradeResult,
} from '../../core/grader';
import {
  assemblePicClause,
  BIG_PROMPTS,
  BIG_PROMPT_MAP,
  BIG_SENTENCES,
  bigSentenceToSentence,
  MATERIAL_PACK_MAP,
  PLAN_VAR_MAP,
} from '../../data/bigEssay';
import { useProgress } from '../../store/useProgress';
import { BigEssayPaperEditor, BigEssayPaperPreview } from './BigEssayPaper';

type FadingLevel = 'completion' | 'semi' | 'independent';

interface BigPracticeTabProps {
  initialPromptId?: string;
  initialVars?: Record<string, string> | null;
}

const EXAM_LIMIT_SEC = 25 * 60; // 25 minutes

function formatMMSS(sec: number): string {
  const s = Math.max(0, sec);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function BigPracticeTab({
  initialPromptId,
  initialVars,
}: BigPracticeTabProps) {
  const recordBigExam = useProgress((s) => s.recordBigExam);

  const [promptId, setPromptId] = useState(initialPromptId ?? BIG_PROMPTS[0].id);
  const [level, setLevel] = useState<FadingLevel>('completion');
  const [paragraphs, setParagraphs] = useState<[string, string, string]>(['', '', '']);
  const [grade, setGrade] = useState<BigEssayGradeResult | null>(null);
  const [showRefEssay, setShowRefEssay] = useState(false);

  // Independent level quick plan sheet before writing
  const [indPhase, setIndPhase] = useState<'plan' | 'write'>('plan');
  const [indX, setIndX] = useState('');
  const [indPic, setIndPic] = useState('');
  const [indB1, setIndB1] = useState('');
  const [indB2, setIndB2] = useState('');
  const [indDO, setIndDO] = useState('');

  // 25-min timer for independent exam (also tracks elapsed seconds for all levels)
  const [remainSec, setRemainSec] = useState(EXAM_LIMIT_SEC);
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    if (initialPromptId) setPromptId(initialPromptId);
  }, [initialPromptId]);

  useEffect(() => {
    if (level !== 'independent' || grade) return;
    const id = window.setInterval(() => {
      setRemainSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [level, grade]);

  const prompt = BIG_PROMPT_MAP[promptId] ?? BIG_PROMPTS[0];

  const activeVars: Record<string, string> = useMemo(() => {
    if (level === 'independent') {
      return {
        X: indX.trim(),
        PIC: indPic.trim(),
        B1: indB1.trim(),
        B2: indB2.trim(),
        DO: indDO.trim(),
      };
    }
    if (initialVars && initialPromptId === prompt.id && initialVars.X) {
      return initialVars;
    }
    const pack = MATERIAL_PACK_MAP[prompt.recommendedPackId];
    return {
      ...pack.vars,
      PIC: assemblePicClause(prompt.samplePicParts),
    };
  }, [
    level,
    indX,
    indPic,
    indB1,
    indB2,
    indDO,
    initialVars,
    initialPromptId,
    prompt,
  ]);

  const activeSentences = useMemo(
    () => BIG_SENTENCES.filter((s) => !s.optional),
    []
  );

  // Level 1: 50% fixed-words cloze with filled variables
  const completionParagraphs = useMemo(() => {
    return ([1, 2, 3] as const).map((pNum) => {
      const list = activeSentences.filter((s) => s.paragraph === pNum);
      return {
        paragraph: pNum,
        roleLabel: pNum === 1 ? '描述' : pNum === 2 ? '论证' : '建议',
        sentences: list.map((bs) => {
          const parts = generateCloze(bigSentenceToSentence(bs), bs.order * 37, 0.5);
          return { bs, parts };
        }),
      };
    });
  }, [activeSentences]);

  const resetSession = (nextLevel?: FadingLevel, nextPromptId?: string) => {
    if (nextLevel) setLevel(nextLevel);
    if (nextPromptId) setPromptId(nextPromptId);
    setParagraphs(['', '', '']);
    setGrade(null);
    setShowRefEssay(false);
    setIndPhase('plan');
    setRemainSec(EXAM_LIMIT_SEC);
    startedAtRef.current = Date.now();
  };

  const fullText = paragraphs.filter((p) => p.trim()).join('\n\n');

  const handleSubmit = () => {
    if (!fullText.trim()) return;
    const durationSec = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000)
    );
    const res = gradeBigEssayAlignment(fullText, {
      includeOptionalP2S4: false,
      planVars: level === 'independent' ? activeVars : undefined,
    });
    setGrade(res);
    recordBigExam({
      promptId: prompt.id,
      level,
      durationSec,
      wordCount: res.wordCount,
      fixedAccuracy: res.fixedAccuracy,
    });
  };

  return (
    <div>
      {/* Controls & Fading Level Selector */}
      <section className="card-surface today-section-card">
        <div className="big-plan-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="drill-tag">渐隐迁移实战</span>
            <select
              className="setting-input"
              value={promptId}
              onChange={(e) => resetSession(undefined, e.target.value)}
              aria-label="选择实战题目"
            >
              {BIG_PROMPTS.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  模拟题 {idx + 1}：{p.title}
                </option>
              ))}
            </select>
          </div>

          {level === 'independent' && (
            <div
              className={`big-plan-timer tabular-nums ${remainSec <= 180 ? 'is-amber' : ''}`}
              title="25 分钟考场大作文倒计时"
            >
              <Clock size={14} strokeWidth={1.7} />
              <span>{formatMMSS(remainSec)}</span>
            </div>
          )}
        </div>

        <div className="tab-bar" style={{ marginTop: 12, marginBottom: 12 }}>
          <button
            type="button"
            className={`tab-pill ${level === 'completion' ? 'active' : ''}`}
            onClick={() => resetSession('completion')}
          >
            1. 补全（变量已填，固定句挖空 50%）
          </button>
          <button
            type="button"
            className={`tab-pill ${level === 'semi' ? 'active' : ''}`}
            onClick={() => resetSession('semi')}
          >
            2. 半独立（规划卡 + 首词链）
          </button>
          <button
            type="button"
            className={`tab-pill ${level === 'independent' ? 'active' : ''}`}
            onClick={() => resetSession('independent')}
          >
            3. 独立实战（25 分钟计时）
          </button>
        </div>

        <div className="politics-drill-prompt" style={{ margin: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
            {prompt.title}
          </div>
          <p className="politics-drill-stem" style={{ fontSize: 14 }}>
            {prompt.pictureDescZh}
          </p>
          <p className="setting-desc" style={{ marginTop: 4, marginBottom: 0 }}>
            {prompt.requirementsZh}
          </p>
        </div>
      </section>

      {/* Level 1: Completion prompt (variables filled, fixed words 50% blanked) */}
      {level === 'completion' && (
        <section className="card-surface today-section-card">
          <div className="section-row-head" style={{ marginBottom: 10 }}>
            <h3 className="section-small-title">
              补全提示（红色变量已代好，补全被挖空的 50% 固定句型）
            </h3>
            <span className="page-sub" style={{ margin: 0 }}>
              在下方考场作文纸写出完整三段
            </span>
          </div>
          <div className="big-completion-box serif-text">
            {completionParagraphs.map((pg) => (
              <div key={pg.paragraph} className="big-completion-para">
                <span className="big-paper-role" style={{ marginRight: 8 }}>
                  {pg.roleLabel}
                </span>
                {pg.sentences.map(({ bs, parts }, si) => (
                  <Fragment key={bs.id}>
                    {si > 0 ? ' ' : ''}
                    {parts.map((cp, pi) => {
                      if (cp.kind === 'slot') {
                        const val =
                          activeVars[cp.slotId!] ||
                          cp.defaultValue ||
                          PLAN_VAR_MAP[cp.slotId!]?.defaultValue ||
                          `[${cp.slotId}]`;
                        const text =
                          pi === 0 ? val.replace(/^([a-z])/, (c) => c.toUpperCase()) : val;
                        return (
                          <Fragment key={pi}>
                            <span className="slot-chip big-var-inline">{text}</span>
                            {cp.trailingPunct ?? ''}{' '}
                          </Fragment>
                        );
                      }
                      if (cp.kind === 'blank') {
                        return (
                          <Fragment key={pi}>
                            <span className="cloze-blank">
                              {'_'.repeat(Math.max(4, cp.text.length))}
                            </span>
                            {cp.trailingPunct ?? ''}{' '}
                          </Fragment>
                        );
                      }
                      return (
                        <Fragment key={pi}>
                          {cp.text}
                          {cp.trailingPunct ?? ''}{' '}
                        </Fragment>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Level 2: Semi-independent (Plan Sheet summary + 10-sentence Cue Chain) */}
      {level === 'semi' && (
        <section className="card-surface today-section-card">
          <h3 className="section-small-title" style={{ marginBottom: 10 }}>
            半独立支架：规划卡变量 + 10 句首词链
          </h3>
          <div className="big-semi-vars">
            {(['X', 'PIC', 'B1', 'B2', 'DO', 'G', 'LIMIT'] as const).map((k) => {
              const val = activeVars[k] || PLAN_VAR_MAP[k]?.defaultValue;
              if (!val) return null;
              return (
                <div key={k} className="big-semi-var-item">
                  <span className="slot-chip">{k}</span>
                  <span>{val}</span>
                </div>
              );
            })}
          </div>
          <div className="big-cue-chain-box">
            {activeSentences.map((s, idx) => (
              <span key={s.id} className="big-cue-pill">
                <strong className="tabular-nums">{idx + 1}.</strong> {s.cue}…
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Level 3: Independent (Step 1 quick plan -> Step 2 25-min writing) */}
      {level === 'independent' && indPhase === 'plan' && (
        <section className="card-surface today-section-card">
          <h3 className="section-small-title" style={{ marginBottom: 10 }}>
            第一步：先定 4 项必填变量（3 分钟内定稿，随后进入答题纸书写）
          </h3>
          <div className="big-plan-form">
            <input
              type="text"
              className="setting-input big-plan-input"
              placeholder="主题词 X（单数或不可数名词短语，如 traditional culture）"
              value={indX}
              onChange={(e) => setIndX(e.target.value)}
            />
            {indX && !checkPlanVarX(indX).ok && (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>{checkPlanVarX(indX).hint}</span>
              </div>
            )}
            <input
              type="text"
              className="setting-input big-plan-input"
              placeholder="图片描述 PIC（主体 + 动作，可选 while / resulting in）"
              value={indPic}
              onChange={(e) => setIndPic(e.target.value)}
            />
            <div className="big-pic-grid">
              <input
                type="text"
                className="setting-input big-plan-input"
                placeholder="好处一 B1（名词短语）"
                value={indB1}
                onChange={(e) => setIndB1(e.target.value)}
              />
              <input
                type="text"
                className="setting-input big-plan-input"
                placeholder="好处二 B2（名词短语）"
                value={indB2}
                onChange={(e) => setIndB2(e.target.value)}
              />
            </div>
            {(indB1 && !checkPlanVarBenefit(indB1).ok) ||
            (indB2 && !checkPlanVarBenefit(indB2).ok) ? (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>
                  {checkPlanVarBenefit(indB1).hint || checkPlanVarBenefit(indB2).hint}
                </span>
              </div>
            ) : null}
            <input
              type="text"
              className="setting-input big-plan-input"
              placeholder="人们能做什么 DO（动词原形开头）"
              value={indDO}
              onChange={(e) => setIndDO(e.target.value)}
            />
            {indDO && !checkPlanVarDO(indDO).ok && (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>{checkPlanVarDO(indDO).hint}</span>
              </div>
            )}
            <div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIndPhase('write')}
              >
                规划完成，开始在答题纸上写整篇
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Exam Answer Sheet Editor */}
      {(level !== 'independent' || indPhase === 'write') && (
        <>
          {level === 'independent' && (
            <section className="card-surface today-section-card" style={{ padding: '12px 16px' }}>
              <div className="section-row-head" style={{ marginBottom: 6 }}>
                <span className="setting-label">我的考场规划速记</span>
                <button
                  type="button"
                  className="btn-ghost formula-mini-btn"
                  onClick={() => setIndPhase('plan')}
                >
                  修改规划
                </button>
              </div>
              <div className="big-semi-vars">
                {(['X', 'PIC', 'B1', 'B2', 'DO'] as const).map((k) =>
                  activeVars[k] ? (
                    <div key={k} className="big-semi-var-item">
                      <span className="slot-chip">{k}</span>
                      <span>{activeVars[k]}</span>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          <BigEssayPaperEditor
            paragraphs={paragraphs}
            onChange={setParagraphs}
            disabled={Boolean(grade)}
          />

          <div className="toolbar-group" style={{ marginTop: 14 }}>
            {!grade ? (
              <button
                type="button"
                className="btn-primary"
                disabled={!fullText.trim()}
                onClick={handleSubmit}
              >
                提交模板对齐判分
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => resetSession()}
                >
                  <RefreshCw size={14} />
                  重写一遍
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setShowRefEssay((v) => !v)}
                >
                  {showRefEssay ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showRefEssay ? '收起参考范文' : '对照本题参考范文'}
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Template-Alignment Grade Report */}
      {grade && (
        <section className="card-surface today-section-card" style={{ marginTop: 16 }}>
          <div className="section-row-head" style={{ marginBottom: 12 }}>
            <h3 className="section-small-title">模板对齐判分报告</h3>
            <span className={`big-wc-badge wc-${grade.wordCountStatus} tabular-nums`}>
              {grade.wordCount} 词（
              {grade.wordCountStatus === 'ok'
                ? '160–200 理想区间'
                : grade.wordCountStatus === 'warn'
                  ? '略偏（150–220 警戒区）'
                  : '超出理想范围'}
              ）
            </span>
          </div>

          <div className="today-metrics" style={{ marginBottom: 14 }}>
            <div className="today-metric">
              <span
                className="today-metric-num tabular-nums"
                style={{
                  color:
                    grade.fixedAccuracy >= 0.9
                      ? 'var(--ok)'
                      : grade.fixedAccuracy >= 0.7
                        ? 'var(--warn)'
                        : 'var(--err)',
                }}
              >
                {Math.round(grade.fixedAccuracy * 100)}%
              </span>
              <span className="today-metric-cap">固定句型准确率</span>
            </div>
            <div className="today-metric-sep" />
            <div className="today-metric">
              <span className="today-metric-num tabular-nums">
                {grade.matchedFixedWords} / {grade.totalFixedWords}
              </span>
              <span className="today-metric-cap">命中固定词数</span>
            </div>
            <div className="today-metric-sep" />
            <div className="today-metric">
              <span className="today-metric-num tabular-nums">
                {grade.missingFragments.length}
              </span>
              <span className="today-metric-cap">遗漏固定片段</span>
            </div>
          </div>

          {grade.grammarHints.length > 0 && (
            <div className="warning-box" style={{ marginBottom: 14 }}>
              <div className="warning-box-title">
                <AlertCircle size={15} />
                温和语法检查提醒
              </div>
              <ul>
                {grade.grammarHints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {grade.missingFragments.length === 0 ? (
            <div style={{ color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <CheckCircle2 size={16} />
              <span>太稳了！10 句核心固定句型全部准确对齐。</span>
            </div>
          ) : (
            <div>
              <div className="setting-label" style={{ marginBottom: 6 }}>
                遗漏或偏离较大的固定片段（精确到句号）：
              </div>
              <ul className="big-missing-list">
                {grade.missingFragments.map((mf, i) => (
                  <li key={i}>
                    <strong>第 {mf.sentenceNumber} 句（{mf.role}）</strong>：漏掉{' '}
                    <code>{mf.expected}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="big-sentence-score-grid">
            {grade.sentenceResults.map((sr) => (
              <div key={sr.sentenceId} className="big-sent-score-chip tabular-nums">
                <span>
                  第 {sr.sentenceNumber} 句·{sr.role}
                </span>
                <strong
                  style={{
                    color:
                      sr.accuracy >= 0.9
                        ? 'var(--ok)'
                        : sr.accuracy >= 0.6
                          ? 'var(--warn)'
                          : 'var(--err)',
                  }}
                >
                  {Math.round(sr.accuracy * 100)}%
                </strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {showRefEssay && (
        <div style={{ marginTop: 14 }}>
          <BigEssayPaperPreview
            vars={{
              ...MATERIAL_PACK_MAP[prompt.recommendedPackId].vars,
              PIC: assemblePicClause(prompt.samplePicParts),
            }}
            title={`参考范文 · ${prompt.title}`}
          />
        </div>
      )}
    </div>
  );
}
