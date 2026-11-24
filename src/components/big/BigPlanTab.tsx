import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  checkPlanSheet,
  checkPlanVarBenefit,
  checkPlanVarDO,
  checkPlanVarX,
  type PlanSheetCheckReport,
} from '../../core/grader';
import {
  assemblePicClause,
  BIG_PROMPTS,
  BIG_PROMPT_MAP,
  OLD_NEW_PRESETS,
  PLAN_VARS,
  recommendMaterialPacks,
  renderFullBigEssay,
  type MaterialPack,
} from '../../data/bigEssay';
import { useProgress } from '../../store/useProgress';
import { BigEssayPaperPreview } from './BigEssayPaper';

interface BigPlanTabProps {
  initialPromptId?: string;
  onProceedToPractice?: (promptId: string, vars: Record<string, string>) => void;
}

const PLAN_LIMIT_SEC = 180; // 3 minutes

function formatMMSS(sec: number): string {
  const s = Math.max(0, sec);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function BigPlanTab({
  initialPromptId,
  onProceedToPractice,
}: BigPlanTabProps) {
  const recordBigPlan = useProgress((s) => s.recordBigPlan);

  const [promptId, setPromptId] = useState(initialPromptId ?? BIG_PROMPTS[0].id);
  const prompt = BIG_PROMPT_MAP[promptId] ?? BIG_PROMPTS[0];

  // Timer (3 min countdown; turns calm amber in last 30s — no blink, no fullscreen alert)
  const [remainSec, setRemainSec] = useState(PLAN_LIMIT_SEC);
  const [timerRunning, setTimerRunning] = useState(true);
  const startedAtRef = useRef(Date.now());

  // Core required fields
  const [varX, setVarX] = useState('');
  const [picSubject, setPicSubject] = useState('');
  const [picAction, setPicAction] = useState('');
  const [picContrast, setPicContrast] = useState('');
  const [picResult, setPicResult] = useState('');
  const [varB1, setVarB1] = useState('');
  const [varB2, setVarB2] = useState('');
  const [varDO, setVarDO] = useState('');

  // Optional default-valued variables (collapsed by default)
  const [showOptionalVars, setShowOptionalVars] = useState(false);
  const [extraVars, setExtraVars] = useState<Record<string, string>>({});
  const [includeP2S4, setIncludeP2S4] = useState(false);

  // Per-field blur grammar hints
  const [blurHints, setBlurHints] = useState<Record<string, string>>({});

  // Pack helper drawer target ('ALL' | 'X' | 'PIC' | 'B1' | 'B2' | 'DO' | null)
  const [packPickerFor, setPackPickerFor] = useState<string | null>(null);

  // Submitted essay report
  const [submittedReport, setSubmittedReport] = useState<{
    check: PlanSheetCheckReport;
    durationSec: number;
    wordCount: number;
  } | null>(null);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setRemainSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const recommendedPacks = useMemo(
    () =>
      recommendMaterialPacks(
        `${prompt.title} ${prompt.pictureDescZh} ${prompt.keywords.join(' ')}`,
        2
      ),
    [prompt]
  );

  const assembledPic = useMemo(
    () =>
      assemblePicClause({
        subject: picSubject,
        action: picAction,
        contrast: picContrast,
        result: picResult,
      }),
    [picSubject, picAction, picContrast, picResult]
  );

  const allVars: Record<string, string> = useMemo(
    () => ({
      ...extraVars,
      X: varX.trim(),
      PIC: assembledPic,
      B1: varB1.trim(),
      B2: varB2.trim(),
      DO: varDO.trim(),
    }),
    [extraVars, varX, assembledPic, varB1, varB2, varDO]
  );

  const switchPrompt = (nextId: string) => {
    setPromptId(nextId);
    setVarX('');
    setPicSubject('');
    setPicAction('');
    setPicContrast('');
    setPicResult('');
    setVarB1('');
    setVarB2('');
    setVarDO('');
    setExtraVars({});
    setBlurHints({});
    setSubmittedReport(null);
    setPackPickerFor(null);
    setRemainSec(PLAN_LIMIT_SEC);
    setTimerRunning(true);
    startedAtRef.current = Date.now();
  };

  const applyPackToField = (pack: MaterialPack, field: string) => {
    const clearHint = (k: string) =>
      setBlurHints((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      });

    if (field === 'ALL') {
      setVarX(pack.vars.X ?? '');
      setVarB1(pack.vars.B1 ?? '');
      setVarB2(pack.vars.B2 ?? '');
      setVarDO(pack.vars.DO ?? '');
      setExtraVars((prev) => ({
        ...prev,
        ...(pack.vars.G ? { G: pack.vars.G } : {}),
        ...(pack.vars.LIMIT ? { LIMIT: pack.vars.LIMIT } : {}),
      }));
      // Also fill sample pic parts if pack matches current prompt
      if (prompt.recommendedPackId === pack.id) {
        setPicSubject(prompt.samplePicParts.subject);
        setPicAction(prompt.samplePicParts.action);
        setPicContrast(prompt.samplePicParts.contrast ?? '');
        setPicResult(prompt.samplePicParts.result ?? '');
      } else {
        setPicSubject(pack.picExamples[0]);
        setPicAction('');
        setPicContrast('');
        setPicResult('');
      }
      setBlurHints({});
    } else if (field === 'X') {
      setVarX(pack.vars.X ?? '');
      clearHint('X');
    } else if (field === 'B1') {
      setVarB1(pack.vars.B1 ?? '');
      clearHint('B1');
    } else if (field === 'B2') {
      setVarB2(pack.vars.B2 ?? '');
      clearHint('B2');
    } else if (field === 'DO') {
      setVarDO(pack.vars.DO ?? '');
      clearHint('DO');
    } else if (field === 'PIC') {
      if (prompt.recommendedPackId === pack.id) {
        setPicSubject(prompt.samplePicParts.subject);
        setPicAction(prompt.samplePicParts.action);
        setPicContrast(prompt.samplePicParts.contrast ?? '');
        setPicResult(prompt.samplePicParts.result ?? '');
      } else {
        setPicSubject(pack.picExamples[0]);
        setPicAction('');
        setPicContrast('');
        setPicResult('');
      }
      clearHint('PIC');
    }
    setPackPickerFor(null);
  };

  const handleSubmit = () => {
    const check = checkPlanSheet(allVars);
    setBlurHints(check.fieldHints);
    const durationSec = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000)
    );
    const rendered = renderFullBigEssay(allVars, {
      includeOptionalP2S4: includeP2S4,
    });
    setTimerRunning(false);
    setSubmittedReport({
      check,
      durationSec,
      wordCount: rendered.wordCount,
    });
    recordBigPlan({
      promptId: prompt.id,
      durationSec,
      allRequiredFilled: check.allRequiredFilled,
      grammarPassed: check.grammarPassed,
      wordCount: rendered.wordCount,
    });
  };

  const optionalVarDefs = PLAN_VARS.filter((v) => !v.required);
  const isLast30s = remainSec <= 30;

  return (
    <div>
      {/* Mock prompt + calm top-right 3-min timer */}
      <section className="card-surface today-section-card">
        <div className="big-plan-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="drill-tag">3 分钟考场规划卡</span>
            <select
              className="setting-input"
              value={promptId}
              onChange={(e) => switchPrompt(e.target.value)}
              aria-label="选择模拟题"
            >
              {BIG_PROMPTS.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  模拟题 {idx + 1}：{p.title}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`big-plan-timer tabular-nums ${isLast30s ? 'is-amber' : ''}`}
            title="3 分钟规划倒计时（最后 30 秒变琥珀色提醒）"
          >
            <Clock size={14} strokeWidth={1.7} />
            <span>{formatMMSS(remainSec)}</span>
          </div>
        </div>

        <div className="politics-drill-prompt" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
            {prompt.title}
          </div>
          <p className="politics-drill-stem" style={{ fontSize: 14 }}>
            {prompt.pictureDescZh}
          </p>
          <p className="setting-desc" style={{ marginTop: 6, marginBottom: 0 }}>
            {prompt.requirementsZh}
          </p>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary formula-mini-btn"
            onClick={() =>
              setPackPickerFor((cur) => (cur === 'ALL' ? null : 'ALL'))
            }
          >
            <Sparkles size={13} strokeWidth={1.7} />
            按题干推荐素材包（一键全填）
          </button>
          <button
            type="button"
            className="btn-ghost formula-mini-btn"
            onClick={() => switchPrompt(prompt.id)}
          >
            <RefreshCw size={13} />
            重新计时清空
          </button>
        </div>

        {packPickerFor === 'ALL' && (
          <div className="big-pack-suggest-box">
            <div className="setting-desc" style={{ marginBottom: 8 }}>
              根据题干关键词，推荐最接近的素材包（点击一键填入整张规划卡）：
            </div>
            <div className="toolbar-group">
              {recommendedPacks.map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  className="btn-secondary"
                  onClick={() => applyPackToField(pack, 'ALL')}
                >
                  {pack.theme}（X = {pack.vars.X}）
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Single-column Plan Sheet Form */}
      <section className="card-surface today-section-card">
        <h2 className="section-small-title" style={{ marginBottom: 14 }}>
          只需填 4 项必填（其余均有万能默认值，可不改）
        </h2>

        <div className="big-plan-form">
          {/* 1. X */}
          <div className="big-plan-field">
            <div className="big-plan-label-row">
              <label htmlFor="plan-x" className="setting-label">
                1. 主题词 <span className="slot-chip">X</span>（必填 · 单数或不可数名词）
              </label>
              <button
                type="button"
                className="btn-ghost formula-mini-btn"
                onClick={() => setPackPickerFor((c) => (c === 'X' ? null : 'X'))}
              >
                用素材包
              </button>
            </div>
            <input
              id="plan-x"
              type="text"
              className={`setting-input big-plan-input ${blurHints.X ? 'input-warn' : ''}`}
              placeholder="如 traditional culture / online learning（禁止复数如 online courses）"
              value={varX}
              onChange={(e) => setVarX(e.target.value)}
              onBlur={() => {
                const res = checkPlanVarX(varX);
                setBlurHints((prev) => {
                  const next = { ...prev };
                  if (!res.ok && res.hint) next.X = res.hint;
                  else delete next.X;
                  return next;
                });
              }}
            />
            {blurHints.X && (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>{blurHints.X}</span>
              </div>
            )}
            {packPickerFor === 'X' && (
              <div className="big-pack-mini-bar">
                {recommendedPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="btn-secondary formula-mini-btn"
                    onClick={() => applyPackToField(pack, 'X')}
                  >
                    {pack.theme}：{pack.vars.X}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. PIC split into 4 sub-boxes */}
          <div className="big-plan-field">
            <div className="big-plan-label-row">
              <span className="setting-label">
                2. 图片描述 <span className="slot-chip">PIC</span>（必填 · 拆成 4 个小框）
              </span>
              <button
                type="button"
                className="btn-ghost formula-mini-btn"
                onClick={() => setPackPickerFor((c) => (c === 'PIC' ? null : 'PIC'))}
              >
                用素材包
              </button>
            </div>

            <div className="big-pic-grid">
              <div>
                <label className="sync-field-label" htmlFor="pic-sub">
                  主体（如 an old craftsman）
                </label>
                <input
                  id="pic-sub"
                  type="text"
                  className="setting-input big-plan-input"
                  placeholder="主体"
                  value={picSubject}
                  onChange={(e) => setPicSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="sync-field-label" htmlFor="pic-act">
                  动作 / 状态（如 is teaching children...）
                </label>
                <input
                  id="pic-act"
                  type="text"
                  className="setting-input big-plan-input"
                  placeholder="动作或状态"
                  value={picAction}
                  onChange={(e) => setPicAction(e.target.value)}
                />
              </div>
              <div>
                <label className="sync-field-label" htmlFor="pic-while">
                  while 对比（可空）
                </label>
                <input
                  id="pic-while"
                  type="text"
                  className="setting-input big-plan-input"
                  placeholder="可选：另一主体动作"
                  value={picContrast}
                  onChange={(e) => setPicContrast(e.target.value)}
                />
              </div>
              <div>
                <label className="sync-field-label" htmlFor="pic-res">
                  resulting in 结果（可空）
                </label>
                <input
                  id="pic-res"
                  type="text"
                  className="setting-input big-plan-input"
                  placeholder="可选：带来的画面结果"
                  value={picResult}
                  onChange={(e) => setPicResult(e.target.value)}
                />
              </div>
            </div>

            {assembledPic && (
              <div className="setting-desc" style={{ marginTop: 6 }}>
                拼装预览：<code>The picture presents a vivid scene in which {assembledPic}.</code>
              </div>
            )}
            {blurHints.PIC && (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>{blurHints.PIC}</span>
              </div>
            )}
            {packPickerFor === 'PIC' && (
              <div className="big-pack-mini-bar">
                {recommendedPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="btn-secondary formula-mini-btn"
                    onClick={() => applyPackToField(pack, 'PIC')}
                  >
                    填入 {pack.theme} 图画示例
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. B1 & B2 */}
          <div className="big-plan-field">
            <div className="big-plan-label-row">
              <label htmlFor="plan-b1" className="setting-label">
                3. 两个好处 <span className="slot-chip">B1</span> /{' '}
                <span className="slot-chip">B2</span>（必填 · 名词短语）
              </label>
              <button
                type="button"
                className="btn-ghost formula-mini-btn"
                onClick={() => setPackPickerFor((c) => (c === 'B1' ? null : 'B1'))}
              >
                用素材包
              </button>
            </div>
            <div className="big-pic-grid">
              <div>
                <input
                  id="plan-b1"
                  type="text"
                  className={`setting-input big-plan-input ${blurHints.B1 ? 'input-warn' : ''}`}
                  placeholder="好处一 B1（如 a sense of cultural identity）"
                  value={varB1}
                  onChange={(e) => setVarB1(e.target.value)}
                  onBlur={() => {
                    const res = checkPlanVarBenefit(varB1, '好处一 B1');
                    setBlurHints((prev) => {
                      const next = { ...prev };
                      if (!res.ok && res.hint) next.B1 = res.hint;
                      else delete next.B1;
                      return next;
                    });
                  }}
                />
                {blurHints.B1 && (
                  <div className="big-field-hint">
                    <AlertCircle size={13} />
                    <span>{blurHints.B1}</span>
                  </div>
                )}
              </div>
              <div>
                <input
                  id="plan-b2"
                  type="text"
                  className={`setting-input big-plan-input ${blurHints.B2 ? 'input-warn' : ''}`}
                  placeholder="好处二 B2（如 spiritual enrichment）"
                  value={varB2}
                  onChange={(e) => setVarB2(e.target.value)}
                  onBlur={() => {
                    const res = checkPlanVarBenefit(varB2, '好处二 B2');
                    setBlurHints((prev) => {
                      const next = { ...prev };
                      if (!res.ok && res.hint) next.B2 = res.hint;
                      else delete next.B2;
                      return next;
                    });
                  }}
                />
                {blurHints.B2 && (
                  <div className="big-field-hint">
                    <AlertCircle size={13} />
                    <span>{blurHints.B2}</span>
                  </div>
                )}
              </div>
            </div>
            {packPickerFor === 'B1' && (
              <div className="big-pack-mini-bar">
                {recommendedPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="btn-secondary formula-mini-btn"
                    onClick={() => {
                      applyPackToField(pack, 'B1');
                      applyPackToField(pack, 'B2');
                    }}
                  >
                    {pack.theme}：{pack.vars.B1} / {pack.vars.B2}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. DO */}
          <div className="big-plan-field">
            <div className="big-plan-label-row">
              <label htmlFor="plan-do" className="setting-label">
                4. 人们因此能做什么 <span className="slot-chip">DO</span>（必填 · 动词原形开头）
              </label>
              <button
                type="button"
                className="btn-ghost formula-mini-btn"
                onClick={() => setPackPickerFor((c) => (c === 'DO' ? null : 'DO'))}
              >
                用素材包
              </button>
            </div>
            <input
              id="plan-do"
              type="text"
              className={`setting-input big-plan-input ${blurHints.DO ? 'input-warn' : ''}`}
              placeholder="如 appreciate the charm of history in daily life（动词原形开头）"
              value={varDO}
              onChange={(e) => setVarDO(e.target.value)}
              onBlur={() => {
                const res = checkPlanVarDO(varDO);
                setBlurHints((prev) => {
                  const next = { ...prev };
                  if (!res.ok && res.hint) next.DO = res.hint;
                  else delete next.DO;
                  return next;
                });
              }}
            />
            {blurHints.DO && (
              <div className="big-field-hint">
                <AlertCircle size={13} />
                <span>{blurHints.DO}</span>
              </div>
            )}
            {packPickerFor === 'DO' && (
              <div className="big-pack-mini-bar">
                {recommendedPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="btn-secondary formula-mini-btn"
                    onClick={() => applyPackToField(pack, 'DO')}
                  >
                    {pack.theme}：{pack.vars.DO}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Optional vars (collapsed by default) */}
          <div className="big-optional-box">
            <button
              type="button"
              className="big-collapse-trigger"
              onClick={() => setShowOptionalVars((v) => !v)}
            >
              <span className="setting-label">
                其他变量（{optionalVarDefs.length} 项均有万能默认值，考场可不改）
              </span>
              {showOptionalVars ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showOptionalVars && (
              <div className="big-optional-grid">
                <div style={{ gridColumn: '1 / -1' }}>
                  <div className="sync-field-label" style={{ marginBottom: 6 }}>
                    快捷切换 OLD / NEW 反义词对：
                  </div>
                  <div className="toolbar-group">
                    {OLD_NEW_PRESETS.map((pr) => (
                      <button
                        key={pr.oldVal}
                        type="button"
                        className="btn-secondary formula-mini-btn"
                        onClick={() =>
                          setExtraVars((prev) => ({
                            ...prev,
                            OLD: pr.oldVal,
                            NEW: pr.newVal,
                          }))
                        }
                      >
                        {pr.oldVal} / {pr.newVal}
                      </button>
                    ))}
                  </div>
                </div>

                {optionalVarDefs.map((v) => (
                  <div key={v.id}>
                    <label className="sync-field-label" htmlFor={`opt-${v.id}`}>
                      {v.id} · {v.label}
                    </label>
                    <input
                      id={`opt-${v.id}`}
                      type="text"
                      className="setting-input big-plan-input"
                      placeholder={`默认：${v.defaultValue ?? ''}`}
                      value={extraVars[v.id] ?? ''}
                      onChange={(e) =>
                        setExtraVars((prev) => ({
                          ...prev,
                          [v.id]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="toolbar-group" style={{ justifyContent: 'space-between', marginTop: 6 }}>
            <button
              type="button"
              className={`btn-secondary formula-mini-btn ${includeP2S4 ? 'active' : ''}`}
              onClick={() => setIncludeP2S4((v) => !v)}
            >
              {includeP2S4 ? '包含可选句 P2.S4' : '省去可选句 P2.S4（控字数）'}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              提交规划并即时生成整篇文章
            </button>
          </div>
        </div>
      </section>

      {/* Rendered Essay + Plan Sheet Score */}
      {submittedReport && (
        <div style={{ marginTop: 16 }}>
          <section className="card-surface today-section-card">
            <div className="section-row-head" style={{ marginBottom: 10 }}>
              <h3 className="section-small-title">规划卡评分（已计入统计）</h3>
              <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
                用时 {formatMMSS(submittedReport.durationSec)} · 词数 {submittedReport.wordCount}
              </span>
            </div>
            <div className="toolbar-group">
              <span className={submittedReport.check.allRequiredFilled ? 'formula-tag-ok' : 'formula-tag-warn'}>
                {submittedReport.check.allRequiredFilled ? (
                  <>
                    <CheckCircle2 size={12} style={{ verticalAlign: -1, marginRight: 3 }} />
                    必填项完整
                  </>
                ) : (
                  '尚有必填项未填'
                )}
              </span>
              <span className={submittedReport.check.grammarPassed ? 'formula-tag-ok' : 'formula-tag-warn'}>
                {submittedReport.check.grammarPassed
                  ? '语法启发检查通过'
                  : `有 ${submittedReport.check.hints.length} 处语法提醒（下方琥珀色波浪线）`}
              </span>
            </div>

            {submittedReport.check.hints.length > 0 && (
              <ul className="big-missing-list" style={{ marginTop: 10 }}>
                {submittedReport.check.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            {onProceedToPractice && (
              <div style={{ marginTop: 14 }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => onProceedToPractice(prompt.id, allVars)}
                >
                  用这份规划进入渐隐实战练习
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </section>

          <BigEssayPaperPreview
            vars={allVars}
            includeOptionalP2S4={includeP2S4}
            fieldWarnings={submittedReport.check.fieldHints}
            title={`规划卡即时成文 · ${prompt.title}`}
          />
        </div>
      )}
    </div>
  );
}
