import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import {
  NEGATIVE_FLIP_TABLE,
  PLAN_VAR_MAP,
  UNIVERSAL_FALLBACK_SETS,
  getBigSentencesForFormat,
  renderFullBigEssay,
  type BigFormatMode,
} from '../../data/bigEssay';
import { useProgress } from '../../store/useProgress';
import '../components.css';

interface BigExamDecisionCardProps {
  onNavigateTab: (tab: 'learn' | 'plan' | 'practice' | 'ref', promptId?: string) => void;
}

const STEPS_60S = [
  {
    num: '01',
    time: '10s',
    title: '定题型选壳',
    desc: '纯图画 / 纯图表 / 图文结合 3 选 1，二三段 100% 照抄原骨架',
  },
  {
    num: '02',
    time: '15s',
    title: '定正面 X',
    desc: '提炼单数/不可数正面主题词 X；遇负面漫画直接走“负题正转”',
  },
  {
    num: '03',
    time: '20s',
    title: '写画面/数据',
    desc: '图画写「主体 + is doing…」；图表写 1 句核心上升或最高占比',
  },
  {
    num: '04',
    time: '15s',
    title: '填3词直抄',
    desc: '填 B1 / B2 / DO（卡壳直接套 3 组万金油兜底词），15 分钟写完 ~195 词',
  },
];

const SHORT_PILL_LABELS: Record<string, string> = {
  X: 'X·主题',
  PIC: 'PIC·画面',
  CHART: 'CHART·图表',
  TOPIC: 'TOPIC·主题',
  T1: 'T1·起年',
  T2: 'T2·止年',
  COUNT: 'N·类别数',
  DATA: 'DATA·核心数据',
  B1: 'B1·好处1',
  B2: 'B2·好处2',
  DO: 'DO·能做什么',
};

const FORMAT_META: {
  id: BigFormatMode;
  label: string;
  tag: string;
  estWords: string;
  promptId: string;
  sampleVars: Record<string, string>;
}[] = [
  {
    id: 'picture',
    label: '纯图画',
    tag: '经典图画题 · 3 句第一段',
    estWords: '约 196–200 词',
    promptId: 'bp-family',
    sampleVars: {
      X: 'family companionship',
      PIC: 'a young man is cooking dinner with his aging parents, resulting in cheerful laughter',
      B1: 'deep emotional warmth',
      B2: 'closer mutual understanding',
      DO: 'bridge generation gaps through patient dialogue',
    },
  },
  {
    id: 'hybrid',
    label: '图文结合（2024 同款）',
    tag: '2024 英语一真题风 · 省去 P1.S3',
    estWords: '约 195–200 词',
    promptId: 'bp-2024-hybrid',
    sampleVars: {
      X: 'public green space',
      PIC: 'residents are jogging happily in a newly built city park',
      CHART: 'bar chart',
      DATA: 'the number of city parks rose steadily from 406 in 2020 to 670 in 2022',
      B1: 'stronger physical fitness',
      B2: 'better mental relaxation',
      DO: 'relieve daily stress and stay energetic',
    },
  },
  {
    id: 'chart',
    label: '纯图表（2025 / 2026）',
    tag: '2025 动态表 · 2026 双图表 · 省去 P1.S3',
    estWords: '约 190–204 词',
    promptId: 'bp-2026-dual',
    sampleVars: {
      X: 'better household living',
      CHART: 'table',
      TOPIC: 'household ownership of major appliances',
      T1: '2014',
      T2: '2023',
      COUNT: 'four',
      DATA: 'air conditioner ownership rose sharply from 75.2 to 145.9 per hundred households, while refrigerators and washing machines grew steadily',
      B1: 'greater daily convenience',
      B2: 'a higher quality of life',
      DO: 'enjoy a more comfortable and efficient life',
    },
  },
];

const DUAL_CHART_SAMPLE_VARS: Record<string, string> = {
  X: 'smart elderly care',
  TOPIC: 'public acceptance of and main concerns about elderly care robots',
  DATA: 'over half of the respondents welcome care robots, while safety, high cost, and lack of emotional warmth remain the top concerns',
  B1: 'greater daily convenience',
  B2: 'a higher quality of life',
  DO: 'look after aging family members more easily',
};

function renderTemplatePills(
  en: string,
  showSample: boolean,
  sampleVars: Record<string, string>
) {
  const parts = en.split(/(\{\{[^}]+\}\})/g);
  let atStart = true;
  return parts.map((part, idx) => {
    if (!part) return null;
    const m = part.match(/^\{\{(\w+)(?:\|([^}]+))?\}\}$/);
    if (m) {
      const varId = m[1];
      const defVal = m[2];
      const meta = PLAN_VAR_MAP[varId];
      let text = showSample
        ? sampleVars[varId] || defVal || `[${varId}]`
        : SHORT_PILL_LABELS[varId] ?? (meta ? `${varId}·${meta.label}` : varId);
      if (showSample && atStart) {
        text = text.replace(/^([a-z])/, (c) => c.toUpperCase());
      }
      atStart = false;
      return (
        <span
          key={idx}
          className="slot-chip"
          style={{ margin: '0 2px', whiteSpace: showSample ? undefined : 'nowrap' }}
        >
          {text}
        </span>
      );
    }
    if (part.trim()) atStart = false;
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

export function BigExamDecisionCard({ onNavigateTab }: BigExamDecisionCardProps) {
  const cards = useProgress((s) => s.cards);
  const bigPlanRecords = useProgress((s) => s.bigPlanRecords);
  const bigExamRecords = useProgress((s) => s.bigExamRecords);

  const [format, setFormat] = useState<BigFormatMode>('picture');
  const [chartKind, setChartKind] = useState<'dynamic' | 'static' | 'dual'>('dual');
  const [drawer, setDrawer] = useState<'preview' | 'fallback' | 'flip'>('preview');
  const [showSample, setShowSample] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // 4-Day Sprint Progress Computation
  const day1Ids = ['big.p1.s1', 'big.p1.s2', 'big.p1.s3', 'big.p2.s1', 'big.p2.s2', 'big.p2.s3'];
  const day2Ids = ['big.p3.s1', 'big.p3.s2', 'big.p3.s3', 'big.p3.s4', 'big.shell.chart', 'big.shell.hybrid'];
  const day1Done = day1Ids.filter((id) => Boolean(cards[id])).length;
  const day2Done = day2Ids.filter((id) => Boolean(cards[id])).length;
  const planDone = bigPlanRecords.length;
  const examDone = bigExamRecords.length;

  const currentStage =
    day1Done < day1Ids.length
      ? {
          day: 'Day 1',
          actionLabel: `继续 Day 1：背第 1–2 段核心（${day1Done}/6）`,
          tab: 'learn' as const,
        }
      : day2Done < day2Ids.length
        ? {
            day: 'Day 2',
            actionLabel: `继续 Day 2：背第 3 段 + 图表壳（${day2Done}/6）`,
            tab: 'learn' as const,
          }
        : planDone < 3
          ? {
              day: 'Day 3',
              actionLabel: `进入 Day 3：60 秒填 5 空（已完成 ${planDone}/3 题）`,
              tab: 'plan' as const,
            }
          : {
              day: 'Day 4–5',
              actionLabel: `进入 Day 4–5：15 分钟整篇实战（已写 ${examDone} 篇）`,
              tab: 'practice' as const,
            };

  const activeMeta = FORMAT_META.find((f) => f.id === format) ?? FORMAT_META[0];
  const activeSampleVars =
    format === 'chart' && chartKind === 'dual'
      ? DUAL_CHART_SAMPLE_VARS
      : activeMeta.sampleVars;
  const sentences = getBigSentencesForFormat(format, {
    includeOptionalP2S4: false,
    chartKind,
  });
  const sampleStats = renderFullBigEssay(activeSampleVars, {
    includeOptionalP2S4: false,
    format,
    chartKind,
  });

  const milestones = [
    {
      day: 'Day 1',
      title: '背 P1–P2（6句）',
      meta: `${day1Done}/6`,
      done: day1Done === day1Ids.length,
      onClick: () => onNavigateTab('learn'),
    },
    {
      day: 'Day 2',
      title: '背 P3+图表壳（6句）',
      meta: `${day2Done}/6`,
      done: day2Done === day2Ids.length,
      onClick: () => onNavigateTab('learn'),
    },
    {
      day: 'Day 3',
      title: '60秒填5空',
      meta: `${planDone} 题`,
      done: planDone >= 3,
      onClick: () => onNavigateTab('plan'),
    },
    {
      day: 'Day 4–5',
      title: '15分钟整篇实战',
      meta: `${examDone} 篇`,
      done: examDone >= 2,
      onClick: () => onNavigateTab('practice'),
    },
  ];

  return (
    <section className="card-surface edc-card" aria-label="大作文 4 天速通与 60 秒考场决策卡">
      {/* 4-Day Sprint Roadmap Strip */}
      <div className="big-sprint-strip">
        <div className="big-sprint-strip-head">
          <div className="edc-badge-row" style={{ marginBottom: 0 }}>
            <span className="edc-pill-badge">
              <Zap size={12} strokeWidth={2} />
              大作文 4 天极速通关路线
            </span>
            <span className="edc-word-badge tabular-nums">
              只需死背 12 句 · 考场仅填 5 空 · 稳落 185–200 词
            </span>
          </div>
          <button
            type="button"
            className="btn-primary edc-mini-btn"
            onClick={() => onNavigateTab(currentStage.tab)}
          >
            <Play size={13} strokeWidth={2} />
            {currentStage.actionLabel}
          </button>
        </div>

        <div className="big-sprint-milestones">
          {milestones.map((m) => (
            <button
              key={m.day}
              type="button"
              className={`big-sprint-node ${m.done ? 'is-done' : ''}`}
              onClick={m.onClick}
            >
              <div className="big-sprint-node-top">
                <span className="big-sprint-day">{m.day}</span>
                {m.done ? (
                  <CheckCircle2 size={14} style={{ color: 'var(--ok)' }} />
                ) : (
                  <span className="big-sprint-meta tabular-nums">{m.meta}</span>
                )}
              </div>
              <div className="big-sprint-title">{m.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Decision Card Header */}
      <div className="edc-header" style={{ marginTop: 14 }}>
        <div className="edc-title-block">
          <h2 className="edc-title">60 秒大作文考场决策卡 · 3 壳通杀 · 仅填 5 空</h2>
          <p className="edc-sub">
            纯图画 / 纯图表（2025风）/ 图文结合（2024风）只换第 1 段外壳，第 2、3 段 100% 固定直抄
          </p>
        </div>

        <div className="edc-header-actions">
          <button
            type="button"
            className={`btn-secondary edc-mini-btn ${drawer === 'fallback' ? 'active' : ''}`}
            onClick={() => {
              setCollapsed(false);
              setDrawer((cur) => (cur === 'fallback' ? 'preview' : 'fallback'));
            }}
          >
            <ShieldCheck size={14} strokeWidth={1.6} />
            3 组兜底词
          </button>
          <button
            type="button"
            className={`btn-secondary edc-mini-btn ${drawer === 'flip' ? 'active' : ''}`}
            onClick={() => {
              setCollapsed(false);
              setDrawer((cur) => (cur === 'flip' ? 'preview' : 'flip'));
            }}
          >
            <RefreshCcw size={14} strokeWidth={1.6} />
            负题正转速查
          </button>
          <button
            type="button"
            className="btn-ghost edc-mini-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
          >
            {collapsed ? '展开' : '收起'}
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {/* 4-Step 60-Second Flow */}
      <div className="edc-steps-grid">
        {STEPS_60S.map((step) => (
          <div key={step.num} className="edc-step-item">
            <div className="edc-step-top">
              <span className="edc-step-num tabular-nums">{step.num}</span>
              <span className="edc-step-title">{step.title}</span>
              <span className="edc-step-time tabular-nums">{step.time}</span>
            </div>
            <p className="edc-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>

      {!collapsed && (
        <>
          {/* Drawer 1: 3 Universal Fallback Sets */}
          {drawer === 'fallback' && (
            <div className="edc-preview-box">
              <div className="edc-preview-meta">
                <span className="edc-preview-name">
                  <Sparkles size={14} style={{ verticalAlign: -2, marginRight: 5, color: 'var(--gold)' }} />
                  3 组万金油兜底词（考场卡壳 2 秒直接照抄，拼写零风险）
                </span>
                <button
                  type="button"
                  className="btn-ghost edc-mini-btn"
                  onClick={() => setDrawer('preview')}
                >
                  返回 3 壳预览
                </button>
              </div>
              <div className="big-fallback-grid">
                {UNIVERSAL_FALLBACK_SETS.map((fb) => (
                  <div key={fb.id} className="big-fallback-card">
                    <div className="big-fallback-cat">{fb.category}</div>
                    <div className="big-fallback-desc">{fb.desc}</div>
                    <div className="big-fallback-rows">
                      <div>
                        <span className="slot-chip">B1</span>{' '}
                        <span className="serif-text">{fb.B1}</span>
                      </div>
                      <div>
                        <span className="slot-chip">B2</span>{' '}
                        <span className="serif-text">{fb.B2}</span>
                      </div>
                      <div>
                        <span className="slot-chip">DO</span>{' '}
                        <span className="serif-text">{fb.DO}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drawer 2: 6 Negative-to-Positive Flip Table */}
          {drawer === 'flip' && (
            <div className="edc-table-wrap">
              <div className="edc-preview-meta" style={{ padding: '10px 14px' }}>
                <span className="edc-preview-name">
                  负面漫画「负题正转」铁律：不背负面模板，3 秒转成单数正面 X 直接照套！
                </span>
                <button
                  type="button"
                  className="btn-ghost edc-mini-btn"
                  onClick={() => setDrawer('preview')}
                >
                  返回 3 壳预览
                </button>
              </div>
              <table className="clean-table edc-cheat-table">
                <thead>
                  <tr>
                    <th>考场负面漫画类型</th>
                    <th>常见画面特征</th>
                    <th>3 秒转正面 X（单数/不可数）</th>
                  </tr>
                </thead>
                <tbody>
                  {NEGATIVE_FLIP_TABLE.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.negativeZh}</td>
                      <td className="edc-cue-cell">{item.negativeHint}</td>
                      <td className="serif-text edc-phrase-cell">
                        {item.positiveX}{' '}
                        <span style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-sans)' }}>
                          （{item.positiveZh}）
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Default: 3-Format Instant Preview */}
          {drawer === 'preview' && (
            <>
              <div className="edc-type-bar" role="tablist" aria-label="选择大作文题型外壳">
                {FORMAT_META.map((fm) => {
                  const active = fm.id === format;
                  return (
                    <button
                      key={fm.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`edc-type-pill ${active ? 'active' : ''}`}
                      onClick={() => setFormat(fm.id)}
                    >
                      <span
                        className={`edc-dot ${
                          fm.id === 'picture'
                            ? 'edc-dot-good'
                            : fm.id === 'hybrid'
                              ? 'edc-dot-notice'
                              : 'edc-dot-regret'
                        }`}
                      />
                      {fm.label}
                    </button>
                  );
                })}

                {format === 'chart' && (
                  <div style={{ display: 'inline-flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className={`btn-secondary edc-mini-btn ${chartKind === 'dual' ? 'active' : ''}`}
                      onClick={() => setChartKind('dual')}
                    >
                      双图表（2026 同款）
                    </button>
                    <button
                      type="button"
                      className={`btn-secondary edc-mini-btn ${chartKind === 'dynamic' ? 'active' : ''}`}
                      onClick={() => setChartKind('dynamic')}
                    >
                      动态趋势（2025 同款）
                    </button>
                    <button
                      type="button"
                      className={`btn-secondary edc-mini-btn ${chartKind === 'static' ? 'active' : ''}`}
                      onClick={() => setChartKind('static')}
                    >
                      静态占比（饼/柱）
                    </button>
                  </div>
                )}
              </div>

              <div className="edc-preview-box">
                <div className="edc-preview-meta">
                  <div className="edc-preview-meta-left">
                    <span className="edc-preview-name">{activeMeta.label}</span>
                    <span className="edc-emo-tag edc-emo-good">{activeMeta.tag}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="edc-trigger-text tabular-nums">
                      {showSample ? `实测 ${sampleStats.wordCount} 词` : activeMeta.estWords}
                    </span>
                    <button
                      type="button"
                      className={`btn-ghost edc-mini-btn ${showSample ? 'active' : ''}`}
                      onClick={() => setShowSample((v) => !v)}
                    >
                      {showSample ? '切回纯模板空位' : '代入真题看成品'}
                    </button>
                  </div>
                </div>

                <div className="edc-letter-preview serif-text">
                  {([1, 2, 3] as const).map((pNum) => {
                    const list = sentences.filter((s) => s.paragraph === pNum);
                    return (
                      <div key={pNum} className="edc-para">
                        {list.map((s, si) => {
                          const isShellSentence = pNum === 1 && format !== 'picture' && si < 2;
                          return (
                            <Fragment key={`${s.id}-${si}`}>
                              {si > 0 ? ' ' : ''}
                              {isShellSentence ? (
                                <span className="edc-purpose-highlight">
                                  {si === 0 && <span className="edc-swap-tag">仅换第一段壳</span>}
                                  {renderTemplatePills(s.en, showSample, activeSampleVars)}
                                </span>
                              ) : (
                                <span>
                                  {renderTemplatePills(s.en, showSample, activeSampleVars)}
                                </span>
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="edc-preview-actions">
                  <button
                    type="button"
                    className="btn-secondary edc-mini-btn"
                    onClick={() => onNavigateTab('learn')}
                  >
                    去背这 12 句骨架
                    <ArrowRight size={13} strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    className="btn-primary edc-mini-btn"
                    onClick={() =>
                      onNavigateTab(
                        'plan',
                        format === 'chart'
                          ? chartKind === 'dual'
                            ? 'bp-2026-dual'
                            : chartKind === 'static'
                              ? 'bp-static-chart'
                              : 'bp-2025-chart'
                          : activeMeta.promptId
                      )
                    }
                  >
                    <Play size={13} strokeWidth={2} />
                    用「{activeMeta.label}」练 60 秒填 5 空
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
