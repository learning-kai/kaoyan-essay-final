import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCcw,
  RefreshCw,
  ShieldCheck,
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
  MATERIAL_PACK_MAP,
  UNIVERSAL_FALLBACK_SETS,
  renderFullBigEssay,
  type BigFormatMode,
  type BigPrompt,
  type FallbackSet,
} from '../../data/bigEssay';
import { useProgress } from '../../store/useProgress';
import { BigEssayPaperPreview } from './BigEssayPaper';

interface BigPlanTabProps {
  initialPromptId?: string;
  onProceedToPractice?: (promptId: string, vars: Record<string, string>) => void;
}

type PromptFilter = 'all' | 'hybrid' | 'chart' | 'picture' | 'negative';

function formatMMSS(sec: number): string {
  const s = Math.max(0, sec);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function getFormatLabel(p: BigPrompt): string {
  if (p.format === 'hybrid') return '图文结合 · 2024风';
  if (p.format === 'chart') return p.chartKind === 'static' ? '纯图表 · 静态占比' : '纯图表 · 2025动态风';
  if (p.isNegativeFlip) return '纯图画 · 负题正转';
  return '纯图画';
}

export function BigPlanTab({
  initialPromptId,
  onProceedToPractice,
}: BigPlanTabProps) {
  const recordBigPlan = useProgress((s) => s.recordBigPlan);

  const [filter, setFilter] = useState<PromptFilter>('all');
  const [promptId, setPromptId] = useState(initialPromptId ?? BIG_PROMPTS[0].id);
  const [timerMode, setTimerMode] = useState<60 | 180>(60);
  const [remainSec, setRemainSec] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState(true);
  const startedAtRef = useRef(Date.now());

  // 5 Core Exam Blanks (+ chart/hybrid first-para blanks when needed)
  const [varX, setVarX] = useState('');
  const [picSubject, setPicSubject] = useState('');
  const [picAction, setPicAction] = useState('');
  const [picContrast, setPicContrast] = useState('');
  const [picResult, setPicResult] = useState('');
  const [varChart, setVarChart] = useState('');
  const [varTopic, setVarTopic] = useState('');
  const [varT1, setVarT1] = useState('');
  const [varT2, setVarT2] = useState('');
  const [varCount, setVarCount] = useState('');
  const [varData, setVarData] = useState('');
  const [varB1, setVarB1] = useState('');
  const [varB2, setVarB2] = useState('');
  const [varDO, setVarDO] = useState('');

  const [blurHints, setBlurHints] = useState<Record<string, string>>({});
  const [submittedReport, setSubmittedReport] = useState<{
    check: PlanSheetCheckReport;
    durationSec: number;
    wordCount: number;
  } | null>(null);

  useEffect(() => {
    if (initialPromptId && BIG_PROMPT_MAP[initialPromptId]) {
      switchPrompt(initialPromptId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPromptId]);

  const filteredPrompts = useMemo(() => {
    if (filter === 'all') return BIG_PROMPTS;
    if (filter === 'negative') return BIG_PROMPTS.filter((p) => p.isNegativeFlip);
    return BIG_PROMPTS.filter((p) => (p.format ?? 'picture') === filter);
  }, [filter]);

  const prompt = BIG_PROMPT_MAP[promptId] ?? BIG_PROMPTS[0];
  const promptFormat: BigFormatMode = prompt.format ?? 'picture';
  const promptChartKind = prompt.chartKind ?? 'dynamic';

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setRemainSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

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
      X: varX.trim(),
      PIC: assembledPic,
      CHART: varChart.trim() || prompt.sampleChartParts?.chart || 'bar chart',
      TOPIC: varTopic.trim() || prompt.sampleChartParts?.topic || 'this field',
      T1: varT1.trim() || prompt.sampleChartParts?.t1 || '2020',
      T2: varT2.trim() || prompt.sampleChartParts?.t2 || '2024',
      COUNT: varCount.trim() || prompt.sampleChartParts?.count || 'four',
      DATA: varData.trim(),
      B1: varB1.trim(),
      B2: varB2.trim(),
      DO: varDO.trim(),
    }),
    [
      varX,
      assembledPic,
      varChart,
      varTopic,
      varT1,
      varT2,
      varCount,
      varData,
      varB1,
      varB2,
      varDO,
      prompt.sampleChartParts,
    ]
  );

  const switchPrompt = (nextId: string, nextLimit?: 60 | 180) => {
    const limit = nextLimit ?? timerMode;
    setPromptId(nextId);
    setVarX('');
    setPicSubject('');
    setPicAction('');
    setPicContrast('');
    setPicResult('');
    setVarChart('');
    setVarTopic('');
    setVarT1('');
    setVarT2('');
    setVarCount('');
    setVarData('');
    setVarB1('');
    setVarB2('');
    setVarDO('');
    setBlurHints({});
    setSubmittedReport(null);
    setRemainSec(limit);
    setTimerRunning(true);
    startedAtRef.current = Date.now();
  };

  const fillReferenceAnswer = () => {
    const pack = MATERIAL_PACK_MAP[prompt.recommendedPackId];
    setVarX(prompt.sampleX ?? pack.vars.X ?? '');
    setVarB1(prompt.sampleB1 ?? pack.vars.B1 ?? '');
    setVarB2(prompt.sampleB2 ?? pack.vars.B2 ?? '');
    setVarDO(prompt.sampleDO ?? pack.vars.DO ?? '');
    setPicSubject(prompt.samplePicParts.subject);
    setPicAction(prompt.samplePicParts.action);
    setPicContrast(prompt.samplePicParts.contrast ?? '');
    setPicResult(prompt.samplePicParts.result ?? '');
    if (prompt.sampleChartParts) {
      setVarChart(prompt.sampleChartParts.chart);
      setVarTopic(prompt.sampleChartParts.topic);
      setVarT1(prompt.sampleChartParts.t1 ?? '');
      setVarT2(prompt.sampleChartParts.t2 ?? '');
      setVarCount(prompt.sampleChartParts.count ?? '');
      setVarData(prompt.sampleChartParts.data);
    }
    setBlurHints({});
  };

  const applyFallbackSet = (fb: FallbackSet) => {
    setVarB1(fb.B1);
    setVarB2(fb.B2);
    setVarDO(fb.DO);
    setBlurHints((prev) => {
      const next = { ...prev };
      delete next.B1;
      delete next.B2;
      delete next.DO;
      return next;
    });
  };

  const handleSubmit = () => {
    const check = checkPlanSheet(allVars, promptFormat);
    setBlurHints(check.fieldHints);
    const durationSec = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000)
    );
    const rendered = renderFullBigEssay(allVars, {
      includeOptionalP2S4: false,
      format: promptFormat,
      chartKind: promptChartKind,
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

  const isWarningTime = remainSec <= 15;

  return (
    <div>
      {/* Prompt & Format Filter Card */}
      <section className="card-surface today-section-card">
        <div className="big-plan-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="drill-tag">Step 2 · Day 3 · 60 秒填 5 空</span>
            <span className="edc-emo-tag edc-emo-good">{getFormatLabel(prompt)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="btn-ghost formula-mini-btn"
              onClick={() => {
                const next = timerMode === 60 ? 180 : 60;
                setTimerMode(next);
                setRemainSec(next);
                setTimerRunning(true);
                startedAtRef.current = Date.now();
              }}
            >
              {timerMode === 60 ? '切 3 分钟' : '切 60 秒冲刺'}
            </button>
            <div
              className={`big-plan-timer tabular-nums ${isWarningTime ? 'is-amber' : ''}`}
              title="考场速填倒计时"
            >
              <Clock size={14} strokeWidth={1.7} />
              <span>{formatMMSS(remainSec)}</span>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="toolbar-group" style={{ marginTop: 10, marginBottom: 10 }}>
          {(
            [
              ['all', `全部 (${BIG_PROMPTS.length})`],
              ['hybrid', '图文结合 · 2024风'],
              ['chart', '纯图表 · 2025风'],
              ['picture', '纯图画'],
              ['negative', '负题正转'],
            ] as const
          ).map(([fid, label]) => (
            <button
              key={fid}
              type="button"
              className={`btn-secondary formula-mini-btn ${filter === fid ? 'active' : ''}`}
              onClick={() => {
                setFilter(fid);
                const list =
                  fid === 'all'
                    ? BIG_PROMPTS
                    : fid === 'negative'
                      ? BIG_PROMPTS.filter((p) => p.isNegativeFlip)
                      : BIG_PROMPTS.filter((p) => (p.format ?? 'picture') === fid);
                if (list.length > 0 && !list.some((p) => p.id === promptId)) {
                  switchPrompt(list[0].id);
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          className="setting-input"
          style={{ width: '100%', marginBottom: 12 }}
          value={promptId}
          onChange={(e) => switchPrompt(e.target.value)}
          aria-label="选择模拟题"
        >
          {filteredPrompts.map((p, idx) => (
            <option key={p.id} value={p.id}>
              第 {idx + 1} 题 · {p.title}
            </option>
          ))}
        </select>

        <div className="politics-drill-prompt" style={{ marginBottom: 10 }}>
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

        {prompt.isNegativeFlip && prompt.negativeFlipTip && (
          <div className="edc-memo-note" style={{ marginBottom: 10 }}>
            <RefreshCcw size={13} style={{ verticalAlign: -2, marginRight: 5 }} />
            <strong>负题正转：</strong>
            {prompt.negativeFlipTip}
          </div>
        )}

        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary formula-mini-btn"
            onClick={fillReferenceAnswer}
          >
            <Sparkles size={13} strokeWidth={1.7} />
            看本题参考 5 空（一键示范）
          </button>
          <button
            type="button"
            className="btn-ghost formula-mini-btn"
            onClick={() => switchPrompt(prompt.id)}
          >
            <RefreshCw size={13} />
            清空重计
          </button>
        </div>
      </section>

      {/* Streamlined 5-Blank Exam Form */}
      <section className="card-surface today-section-card">
        <h2 className="section-small-title" style={{ marginBottom: 14 }}>
          全篇只填这 5 个空位（其余 100% 固定直抄，不再管 17 个多余变量）
        </h2>

        <div className="big-plan-form">
          {/* 1. X */}
          <div className="big-plan-field">
            <label htmlFor="plan-x" className="setting-label" style={{ display: 'block', marginBottom: 6 }}>
              1. 正面主题词 <span className="slot-chip">X</span>（单数或不可数名词，负面漫画走“负题正转”）
            </label>
            <input
              id="plan-x"
              type="text"
              className={`setting-input big-plan-input ${blurHints.X ? 'input-warn' : ''}`}
              placeholder="如 public green space / smart home living / rational smartphone use"
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
          </div>

          {/* 2A. PIC (for picture & hybrid) */}
          {(promptFormat === 'picture' || promptFormat === 'hybrid') && (
            <div className="big-plan-field">
              <span className="setting-label" style={{ display: 'block', marginBottom: 6 }}>
                2. 画面描述 <span className="slot-chip">PIC</span>（主体 + 正在做的动作，while / resulting in 可选）
              </span>
              <div className="big-pic-grid">
                <div>
                  <label className="sync-field-label" htmlFor="pic-sub">
                    主体（如 residents）
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
                    动作 / 状态（如 are jogging in a new city park）
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
                  第一段画面句：<code>The picture presents a vivid scene in which {assembledPic}.</code>
                </div>
              )}
              {blurHints.PIC && (
                <div className="big-field-hint">
                  <AlertCircle size={13} />
                  <span>{blurHints.PIC}</span>
                </div>
              )}
            </div>
          )}

          {/* 2B. Chart Data (for chart & hybrid) */}
          {(promptFormat === 'chart' || promptFormat === 'hybrid') && (
            <div className="big-plan-field">
              <span className="setting-label" style={{ display: 'block', marginBottom: 6 }}>
                {promptFormat === 'hybrid' ? '2B. 随附图表数据' : '2. 图表信息与核心数据'}{' '}
                <span className="slot-chip">DATA</span>（一句写清最显著上升或占比最大即可）
              </span>

              {promptFormat === 'chart' && (
                <div className="big-pic-grid" style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    className="setting-input big-plan-input"
                    placeholder={`图表名（默认 ${prompt.sampleChartParts?.chart ?? 'table'}）`}
                    value={varChart}
                    onChange={(e) => setVarChart(e.target.value)}
                  />
                  <input
                    type="text"
                    className="setting-input big-plan-input"
                    placeholder={`图表主题（如 ${prompt.sampleChartParts?.topic ?? 'this field'}）`}
                    value={varTopic}
                    onChange={(e) => setVarTopic(e.target.value)}
                  />
                  {promptChartKind === 'dynamic' ? (
                    <>
                      <input
                        type="text"
                        className="setting-input big-plan-input"
                        placeholder={`起始年份（如 ${prompt.sampleChartParts?.t1 ?? '2020'}）`}
                        value={varT1}
                        onChange={(e) => setVarT1(e.target.value)}
                      />
                      <input
                        type="text"
                        className="setting-input big-plan-input"
                        placeholder={`结束年份（如 ${prompt.sampleChartParts?.t2 ?? '2024'}）`}
                        value={varT2}
                        onChange={(e) => setVarT2(e.target.value)}
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      className="setting-input big-plan-input"
                      placeholder={`类别数量（如 ${prompt.sampleChartParts?.count ?? 'four'}）`}
                      value={varCount}
                      onChange={(e) => setVarCount(e.target.value)}
                    />
                  )}
                </div>
              )}

              <input
                type="text"
                className={`setting-input big-plan-input ${blurHints.DATA ? 'input-warn' : ''}`}
                placeholder={
                  prompt.sampleChartParts?.data ??
                  '如 the number of city parks rose steadily from 406 in 2020 to 670 in 2022'
                }
                value={varData}
                onChange={(e) => setVarData(e.target.value)}
              />
              {blurHints.DATA && (
                <div className="big-field-hint">
                  <AlertCircle size={13} />
                  <span>{blurHints.DATA}</span>
                </div>
              )}
            </div>
          )}

          {/* 3. Universal Fallback Bar for B1 / B2 / DO */}
          <div className="big-fallback-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
              <ShieldCheck size={14} style={{ color: 'var(--gold)' }} />
              <span>卡壳防冷场 · 一键套入 3 组万金油兜底词（自动填 B1 + B2 + DO）：</span>
            </div>
            <div className="toolbar-group" style={{ marginTop: 6 }}>
              {UNIVERSAL_FALLBACK_SETS.map((fb) => (
                <button
                  key={fb.id}
                  type="button"
                  className={`btn-secondary formula-mini-btn ${
                    prompt.recommendedFallbackId === fb.id ? 'active' : ''
                  }`}
                  onClick={() => applyFallbackSet(fb)}
                >
                  {fb.category}
                  {prompt.recommendedFallbackId === fb.id ? '（推荐）' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* 4. B1 & B2 */}
          <div className="big-plan-field">
            <span className="setting-label" style={{ display: 'block', marginBottom: 6 }}>
              3–4. 两个好处 <span className="slot-chip">B1</span> /{' '}
              <span className="slot-chip">B2</span>（名词短语，≤ 6 词）
            </span>
            <div className="big-pic-grid">
              <div>
                <input
                  type="text"
                  className={`setting-input big-plan-input ${blurHints.B1 ? 'input-warn' : ''}`}
                  placeholder="好处一 B1（如 steady personal growth）"
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
                  type="text"
                  className={`setting-input big-plan-input ${blurHints.B2 ? 'input-warn' : ''}`}
                  placeholder="好处二 B2（如 greater social harmony）"
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
          </div>

          {/* 5. DO */}
          <div className="big-plan-field">
            <label htmlFor="plan-do" className="setting-label" style={{ display: 'block', marginBottom: 6 }}>
              5. 人们因此能做什么 <span className="slot-chip">DO</span>（动词原形开头，前接 enabling people to）
            </label>
            <input
              id="plan-do"
              type="text"
              className={`setting-input big-plan-input ${blurHints.DO ? 'input-warn' : ''}`}
              placeholder="如 enjoy a smarter and easier modern life"
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
          </div>

          <div className="toolbar-group" style={{ marginTop: 6 }}>
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              <CheckCircle2 size={15} />
              生成 195 词成品并质检
            </button>
            {onProceedToPractice && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onProceedToPractice(prompt.id, allVars)}
              >
                带着这 5 空进 15 分钟整篇实战
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Check Report */}
      {submittedReport && (
        <section className="card-surface today-section-card">
          <div className="section-row-head">
            <h3 className="section-small-title">
              {submittedReport.check.grammarPassed
                ? `过关！用时 ${submittedReport.durationSec} 秒，直接就能套出 ${submittedReport.wordCount} 词高分作文`
                : '请顺手修一下下方红字提示，马上就通顺'}
            </h3>
          </div>
          {submittedReport.check.hints.length > 0 && (
            <ul className="big-missing-list" style={{ marginTop: 8 }}>
              {submittedReport.check.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Live 3-Format Full Essay Preview */}
      <BigEssayPaperPreview
        vars={allVars}
        format={promptFormat}
        chartKind={promptChartKind}
        fieldWarnings={blurHints}
        title={`实时套写成品 · ${getFormatLabel(prompt)}`}
      />
    </div>
  );
}
