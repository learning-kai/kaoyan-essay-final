import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Image,
  Layers,
  Lightbulb,
  RefreshCw,
  ShieldAlert,
  X,
  XCircle,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PoliticsCardView, PoliticsTitle } from '../components/PoliticsCardView';
import {
  POLITICS_CARD_MAP,
  POLITICS_TIMELINE_IMAGE,
} from '../data/politics';
import {
  generatePolEconCalcProblem,
  MEETING_DRILL_ITEMS,
  STAGE_ORDER_SETS,
  TRAP_JUDGE_ITEMS,
  type MeetingDrillItem,
  type PolEconCalcProblem,
} from '../data/politicsDrills';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import './pages.css';

type DrillTab = 'meeting' | 'trap' | 'calc';
type MeetingSubMode = 'match' | 'order';
type CalcFilter = 'mix' | 'organic' | 'absolute' | 'relative';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface MeetingMatchQuestion {
  target: MeetingDrillItem;
  direction: 'point-to-meeting' | 'meeting-to-point';
  options: MeetingDrillItem[];
}

function buildMeetingMatchQuestion(prevTargetId?: string): MeetingMatchQuestion {
  const pool = MEETING_DRILL_ITEMS.filter((m) => m.id !== prevTargetId);
  const target = pool[Math.floor(Math.random() * pool.length)] ?? MEETING_DRILL_ITEMS[0];
  const distractors = shuffle(
    MEETING_DRILL_ITEMS.filter((m) => m.id !== target.id)
  ).slice(0, 3);
  const options = shuffle([target, ...distractors]);
  const direction: MeetingMatchQuestion['direction'] =
    Math.random() < 0.65 ? 'point-to-meeting' : 'meeting-to-point';
  return { target, direction, options };
}

interface OrderChallenge {
  id: string;
  title: string;
  subtitle: string;
  cardId?: string;
  correctOrder: { id: string; label: string; hint: string }[];
  shuffledItems: { id: string; label: string; hint: string }[];
}

function buildOrderChallenge(stepIndex: number): OrderChallenge {
  // First cycle through the 4 curated stage sets, then alternate with random 4-meeting timeline sets
  if (stepIndex < STAGE_ORDER_SETS.length || stepIndex % 2 === 0) {
    const set = STAGE_ORDER_SETS[stepIndex % STAGE_ORDER_SETS.length];
    let shuffled = shuffle(set.items);
    if (shuffled.every((x, i) => x.id === set.items[i].id) && shuffled.length > 1) {
      shuffled = [shuffled[1], shuffled[0], ...shuffled.slice(2)];
    }
    return {
      id: `${set.id}-${stepIndex}`,
      title: set.title,
      subtitle: set.subtitle,
      cardId: set.cardId,
      correctOrder: set.items,
      shuffledItems: shuffled,
    };
  }

  // Pick 4 meetings with strictly distinct years
  const picked: MeetingDrillItem[] = [];
  const usedYears = new Set<number>();
  for (const m of shuffle(MEETING_DRILL_ITEMS)) {
    if (usedYears.has(m.year)) continue;
    usedYears.add(m.year);
    picked.push(m);
    if (picked.length === 4) break;
  }
  const sorted = [...picked].sort((a, b) => a.year - b.year);
  const items = sorted.map((m) => ({
    id: m.id,
    label: m.name,
    hint: `${m.yearLabel} · ${m.corePoint.slice(0, 34)}${m.corePoint.length > 34 ? '…' : ''}`,
  }));
  let shuffled = shuffle(items);
  if (shuffled.every((x, i) => x.id === items[i].id) && shuffled.length > 1) {
    shuffled = [shuffled[1], shuffled[0], ...shuffled.slice(2)];
  }
  return {
    id: `meeting-chrono-${stepIndex}`,
    title: '重要会议按时间先后排序',
    subtitle: '从最早召开到最晚召开依次点击 4 次重要会议',
    cardId: 'p-092',
    correctOrder: items,
    shuffledItems: shuffled,
  };
}

function makeCalcProblem(filter: CalcFilter): PolEconCalcProblem {
  if (filter === 'organic') return generatePolEconCalcProblem(0.1);
  if (filter === 'absolute') return generatePolEconCalcProblem(0.5);
  if (filter === 'relative') return generatePolEconCalcProblem(0.9);
  return generatePolEconCalcProblem(Math.random());
}

export function PoliticsDrillsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const drillStats = usePoliticsProgress((s) => s.drillStats);
  const recordDrillAttempt = usePoliticsProgress((s) => s.recordDrillAttempt);

  const initialTab = ((): DrillTab => {
    const t = searchParams.get('tab');
    if (t === 'trap' || t === 'calc' || t === 'meeting') return t;
    return 'meeting';
  })();

  const [tab, setTab] = useState<DrillTab>(initialTab);
  const [timelineOpen, setTimelineOpen] = useState(false);

  // Sync if URL query changes externally
  useEffect(() => {
    const t = searchParams.get('tab');
    if (t === 'trap' || t === 'calc' || t === 'meeting') {
      setTab(t);
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = '专项快刷 · 政治一页纸';
  }, []);

  const switchTab = (next: DrillTab) => {
    setTab(next);
    setSearchParams({ tab: next }, { replace: true });
  };

  // ========== Tab 1: Meeting Match & Timeline Order ==========
  const [meetingSubMode, setMeetingSubMode] = useState<MeetingSubMode>('match');
  const [matchQ, setMatchQ] = useState<MeetingMatchQuestion>(() =>
    buildMeetingMatchQuestion()
  );
  const [matchPickedId, setMatchPickedId] = useState<string | null>(null);
  const [matchShowMnemonic, setMatchShowMnemonic] = useState(false);
  const [matchCardExpanded, setMatchCardExpanded] = useState(false);

  const [orderStep, setOrderStep] = useState(0);
  const [orderChallenge, setOrderChallenge] = useState<OrderChallenge>(() =>
    buildOrderChallenge(0)
  );
  const [orderSelectedIds, setOrderSelectedIds] = useState<string[]>([]);
  const [orderChecked, setOrderChecked] = useState(false);
  const [orderCardExpanded, setOrderCardExpanded] = useState(false);

  const handleSelectMatchOption = useCallback(
    (optionId: string) => {
      if (matchPickedId !== null) return;
      setMatchPickedId(optionId);
      recordDrillAttempt('meeting', optionId === matchQ.target.id);
    },
    [matchPickedId, matchQ.target.id, recordDrillAttempt]
  );

  const handleNextMatch = useCallback(() => {
    setMatchQ((prev) => buildMeetingMatchQuestion(prev.target.id));
    setMatchPickedId(null);
    setMatchShowMnemonic(false);
    setMatchCardExpanded(false);
  }, []);

  const handleNextOrder = useCallback(() => {
    const nextStep = orderStep + 1;
    setOrderStep(nextStep);
    setOrderChallenge(buildOrderChallenge(nextStep));
    setOrderSelectedIds([]);
    setOrderChecked(false);
    setOrderCardExpanded(false);
  }, [orderStep]);

  const handleCheckOrder = useCallback(() => {
    if (
      orderChecked ||
      orderSelectedIds.length !== orderChallenge.correctOrder.length
    ) {
      return;
    }
    const ok = orderChallenge.correctOrder.every(
      (item, idx) => orderSelectedIds[idx] === item.id
    );
    setOrderChecked(true);
    recordDrillAttempt('meeting', ok);
  }, [orderChecked, orderSelectedIds, orderChallenge.correctOrder, recordDrillAttempt]);

  // ========== Tab 2: Trap Judgment (√ / ×) ==========
  const [trapDeck, setTrapDeck] = useState(() => shuffle(TRAP_JUDGE_ITEMS));
  const [trapIdx, setTrapIdx] = useState(0);
  const [trapAnswer, setTrapAnswer] = useState<boolean | null>(null);
  const [trapCardExpanded, setTrapCardExpanded] = useState(false);

  const currentTrap = trapDeck[trapIdx % trapDeck.length];

  const handleJudgeTrap = useCallback(
    (choice: boolean) => {
      if (trapAnswer !== null || !currentTrap) return;
      setTrapAnswer(choice);
      recordDrillAttempt('trap', choice === currentTrap.isTrue);
    },
    [trapAnswer, currentTrap, recordDrillAttempt]
  );

  const handleNextTrap = useCallback(() => {
    setTrapAnswer(null);
    setTrapCardExpanded(false);
    if (trapIdx + 1 >= trapDeck.length) {
      setTrapDeck(shuffle(TRAP_JUDGE_ITEMS));
      setTrapIdx(0);
    } else {
      setTrapIdx((i) => i + 1);
    }
  }, [trapIdx, trapDeck.length]);

  // ========== Tab 3: PolEcon Dynamic Calculator ==========
  const [calcFilter, setCalcFilter] = useState<CalcFilter>('mix');
  const [calcProblem, setCalcProblem] = useState<PolEconCalcProblem>(() =>
    makeCalcProblem('mix')
  );
  const [calcPickedIdx, setCalcPickedIdx] = useState<number | null>(null);
  const [calcCardExpanded, setCalcCardExpanded] = useState(false);

  const handlePickCalc = useCallback(
    (idx: number) => {
      if (calcPickedIdx !== null) return;
      setCalcPickedIdx(idx);
      recordDrillAttempt('calc', idx === calcProblem.correctIndex);
    },
    [calcPickedIdx, calcProblem.correctIndex, recordDrillAttempt]
  );

  const handleNextCalc = useCallback(
    (overrideFilter?: CalcFilter) => {
      const f = overrideFilter ?? calcFilter;
      setCalcProblem(makeCalcProblem(f));
      setCalcPickedIdx(null);
      setCalcCardExpanded(false);
    },
    [calcFilter]
  );

  // ========== Keyboard Shortcuts ==========
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }
      if (timelineOpen) {
        if (e.key === 'Escape') setTimelineOpen(false);
        return;
      }

      if (tab === 'meeting' && meetingSubMode === 'match') {
        if (matchPickedId === null) {
          const num = Number(e.key);
          if (num >= 1 && num <= matchQ.options.length) {
            e.preventDefault();
            handleSelectMatchOption(matchQ.options[num - 1].id);
          }
        } else if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleNextMatch();
        }
      } else if (tab === 'trap') {
        const lower = e.key.toLowerCase();
        if (trapAnswer === null) {
          if (e.key === '1' || lower === 't') {
            e.preventDefault();
            handleJudgeTrap(true);
          } else if (e.key === '2' || lower === 'f') {
            e.preventDefault();
            handleJudgeTrap(false);
          }
        } else if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleNextTrap();
        }
      } else if (tab === 'calc') {
        if (calcPickedIdx === null) {
          const num = Number(e.key);
          if (num >= 1 && num <= calcProblem.choices.length) {
            e.preventDefault();
            handlePickCalc(num - 1);
          }
        } else if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleNextCalc();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    tab,
    meetingSubMode,
    timelineOpen,
    matchPickedId,
    matchQ.options,
    handleSelectMatchOption,
    handleNextMatch,
    trapAnswer,
    handleJudgeTrap,
    handleNextTrap,
    calcPickedIdx,
    calcProblem.choices.length,
    handlePickCalc,
    handleNextCalc,
  ]);

  const activeStat = useMemo(() => {
    if (tab === 'meeting') {
      return {
        label: '会议与脉络累计',
        correct: drillStats.meetingCorrect,
        total: drillStats.meetingTotal,
      };
    }
    if (tab === 'trap') {
      return {
        label: '红叉排雷累计',
        correct: drillStats.trapCorrect,
        total: drillStats.trapTotal,
      };
    }
    return {
      label: '政经计算累计',
      correct: drillStats.calcCorrect,
      total: drillStats.calcTotal,
    };
  }, [tab, drillStats]);

  const pct =
    activeStat.total > 0
      ? Math.round((activeStat.correct / activeStat.total) * 100)
      : null;

  const orderIsCorrect =
    orderChecked &&
    orderChallenge.correctOrder.every(
      (item, idx) => orderSelectedIds[idx] === item.id
    );

  const matchSourceCard = POLITICS_CARD_MAP[matchQ.target.cardId];
  const orderSourceCard = orderChallenge.cardId
    ? POLITICS_CARD_MAP[orderChallenge.cardId]
    : undefined;
  const trapSourceCard = currentTrap
    ? POLITICS_CARD_MAP[currentTrap.cardId]
    : undefined;
  const calcSourceCard = POLITICS_CARD_MAP[calcProblem.cardId];

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">政治专项快刷</h1>
          <p className="page-sub">
            5–10 秒一题，专攻选择题高频对应、红叉干扰项排雷与政经动态计算
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setTimelineOpen(true)}
        >
          <Image size={15} strokeWidth={1.6} />
          史纲脉络图
        </button>
      </header>

      <div className="tab-bar" role="tablist" aria-label="专项快刷分类">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'meeting'}
          className={`tab-pill ${tab === 'meeting' ? 'active' : ''}`}
          onClick={() => switchTab('meeting')}
        >
          <Layers size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          会议速配 &amp; 时间线
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'trap'}
          className={`tab-pill ${tab === 'trap' ? 'active' : ''}`}
          onClick={() => switchTab('trap')}
        >
          <ShieldAlert size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          红叉排雷（√/×）
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'calc'}
          className={`tab-pill ${tab === 'calc' ? 'active' : ''}`}
          onClick={() => switchTab('calc')}
        >
          <Calculator size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          政经动态计算
        </button>
      </div>

      <div className="politics-drill-statbar tabular-nums">
        <span>
          {activeStat.label}：已刷 <strong>{activeStat.total}</strong> 题，答对{' '}
          <strong style={{ color: 'var(--ok)' }}>{activeStat.correct}</strong> 题
          {pct !== null ? `（正确率 ${pct}%）` : ''}
        </span>
      </div>

      {/* ========== TAB 1: MEETING MATCH & ORDER ========== */}
      {tab === 'meeting' && (
        <section className="card-surface politics-drill-card">
          <div className="politics-card-controls" style={{ marginTop: 0 }}>
            <div className="toolbar-group">
              <button
                type="button"
                className={`btn-secondary formula-mini-btn ${meetingSubMode === 'match' ? 'active' : ''}`}
                onClick={() => setMeetingSubMode('match')}
              >
                会议 ↔ 考点 4选1速配
              </button>
              <button
                type="button"
                className={`btn-secondary formula-mini-btn ${meetingSubMode === 'order' ? 'active' : ''}`}
                onClick={() => setMeetingSubMode('order')}
              >
                脉络 / 会议时间线排序
              </button>
            </div>

            {meetingSubMode === 'match' && matchQ.target.mnemonic && matchPickedId === null && (
              <button
                type="button"
                className={`btn-secondary formula-mini-btn ${matchShowMnemonic ? 'active' : ''}`}
                onClick={() => setMatchShowMnemonic((v) => !v)}
              >
                <Lightbulb size={13} strokeWidth={1.7} />
                {matchShowMnemonic ? '隐藏口诀提示' : '口诀提示'}
              </button>
            )}
          </div>

          {meetingSubMode === 'match' ? (
            <div style={{ marginTop: 14 }}>
              <div className="drill-tag">
                {matchQ.direction === 'point-to-meeting'
                  ? '看核心考点 → 秒选对应会议（按 1–4 快捷键）'
                  : '看重要会议 → 秒选核心考点（按 1–4 快捷键）'}
              </div>

              <div className="politics-drill-prompt">
                {matchQ.direction === 'point-to-meeting' ? (
                  <p className="politics-drill-stem">{matchQ.target.corePoint}</p>
                ) : (
                  <p className="politics-drill-stem politics-drill-stem-lg">
                    {matchQ.target.name}
                  </p>
                )}
              </div>

              {matchShowMnemonic && matchQ.target.mnemonic && matchPickedId === null && (
                <div className="politics-tab-hint" style={{ marginBottom: 14 }}>
                  <div className="politics-tab-hint-cue">
                    <Lightbulb size={14} strokeWidth={1.7} />
                    <span>助记口诀：{matchQ.target.mnemonic}</span>
                  </div>
                </div>
              )}

              <div
                className={
                  matchQ.direction === 'point-to-meeting'
                    ? 'id-choice-grid'
                    : 'politics-choice-list'
                }
              >
                {matchQ.options.map((opt, i) => {
                  const isTarget = opt.id === matchQ.target.id;
                  const isPicked = opt.id === matchPickedId;
                  let cls = 'id-choice-btn politics-choice-btn';
                  if (matchPickedId !== null) {
                    if (isTarget) cls += ' choice-ok';
                    else if (isPicked) cls += ' choice-err';
                  }
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={cls}
                      disabled={matchPickedId !== null}
                      onClick={() => handleSelectMatchOption(opt.id)}
                    >
                      <span className="politics-choice-idx tabular-nums">
                        {i + 1}
                      </span>
                      <span className="politics-choice-text">
                        {matchQ.direction === 'point-to-meeting'
                          ? opt.name
                          : opt.corePoint}
                      </span>
                    </button>
                  );
                })}
              </div>

              {matchPickedId !== null && (
                <div className="id-feedback">
                  <div
                    className="id-feedback-head"
                    style={{
                      color:
                        matchPickedId === matchQ.target.id
                          ? 'var(--ok)'
                          : 'var(--err)',
                    }}
                  >
                    {matchPickedId === matchQ.target.id
                      ? '答对了！条件反射到位'
                      : `答错了，正确答案是：${matchQ.target.name}`}
                  </div>
                  <p className="politics-drill-explain">
                    <strong>
                      {matchQ.target.name}（{matchQ.target.yearLabel}）
                    </strong>
                    ：{matchQ.target.corePoint}
                    {matchQ.target.mnemonic ? (
                      <span className="politics-drill-mnemonic-inline">
                        口诀：{matchQ.target.mnemonic}
                      </span>
                    ) : null}
                  </p>

                  <div className="toolbar-group" style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleNextMatch}
                    >
                      下一题 (Enter)
                      <ArrowRight size={14} />
                    </button>
                    {matchSourceCard && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setMatchCardExpanded((v) => !v)}
                      >
                        {matchCardExpanded ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                        {matchCardExpanded
                          ? '收起原色卡片'
                          : `查看原色卡片 · 知识点 ${matchSourceCard.code}`}
                      </button>
                    )}
                  </div>

                  {matchCardExpanded && matchSourceCard && (
                    <div className="politics-drill-source-card">
                      <div className="politics-drill-source-head">
                        知识点 {matchSourceCard.code} ·{' '}
                        <PoliticsTitle card={matchSourceCard} />
                      </div>
                      <PoliticsCardView card={matchSourceCard} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginTop: 14 }}>
              <div className="drill-tag">{orderChallenge.subtitle}</div>
              <h2 className="politics-card-title" style={{ marginTop: 10 }}>
                {orderChallenge.title}
              </h2>

              <div className="setting-desc" style={{ marginBottom: 8 }}>
                已排顺序（点击可撤回）：
              </div>
              <div className="order-zone politics-order-zone">
                {orderSelectedIds.length === 0 ? (
                  <span className="setting-desc" style={{ margin: 0 }}>
                    请按时间从早到晚，依次点击下方卡片填入…
                  </span>
                ) : (
                  <div className="politics-order-chips">
                    {orderSelectedIds.map((id, idx) => {
                      const item = orderChallenge.correctOrder.find(
                        (x) => x.id === id
                      )!;
                      const rightPos =
                        orderChallenge.correctOrder[idx]?.id === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={orderChecked}
                          className={`politics-order-chip ${
                            orderChecked
                              ? rightPos
                                ? 'choice-ok'
                                : 'choice-err'
                              : 'selected'
                          }`}
                          onClick={() =>
                            setOrderSelectedIds((prev) =>
                              prev.filter((x) => x !== id)
                            )
                          }
                        >
                          <span className="politics-choice-idx tabular-nums">
                            {idx + 1}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="setting-desc" style={{ marginTop: 14, marginBottom: 8 }}>
                待选卡片：
              </div>
              <div className="politics-order-chips">
                {orderChallenge.shuffledItems.map((item) => {
                  const used = orderSelectedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={used || orderChecked}
                      className={`politics-order-chip ${used ? 'used' : ''}`}
                      onClick={() =>
                        setOrderSelectedIds((prev) => [...prev, item.id])
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="toolbar-group" style={{ marginTop: 16 }}>
                {!orderChecked ? (
                  <>
                    <button
                      type="button"
                      className="btn-primary"
                      disabled={
                        orderSelectedIds.length !==
                        orderChallenge.correctOrder.length
                      }
                      onClick={handleCheckOrder}
                    >
                      <Check size={15} />
                      提交排序
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={orderSelectedIds.length === 0}
                      onClick={() => setOrderSelectedIds([])}
                    >
                      清空重排
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleNextOrder}
                    >
                      <RefreshCw size={14} />
                      换一组
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleNextOrder}
                    >
                      下一组排序
                      <ArrowRight size={14} />
                    </button>
                    {orderSourceCard && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setOrderCardExpanded((v) => !v)}
                      >
                        {orderCardExpanded ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                        {orderCardExpanded
                          ? '收起原色卡片'
                          : `查看原色卡片 · 知识点 ${orderSourceCard.code}`}
                      </button>
                    )}
                  </>
                )}
              </div>

              {orderChecked && (
                <div className="id-feedback">
                  <div
                    className="id-feedback-head"
                    style={{
                      color: orderIsCorrect ? 'var(--ok)' : 'var(--err)',
                    }}
                  >
                    {orderIsCorrect
                      ? '全部顺序正确！脉络非常清晰'
                      : '顺序有误，请对照下方正确时间线：'}
                  </div>
                  <ol className="politics-order-answer-list">
                    {orderChallenge.correctOrder.map((item) => (
                      <li key={item.id}>
                        <strong>{item.label}</strong>
                        <span className="politics-order-hint">（{item.hint}）</span>
                      </li>
                    ))}
                  </ol>
                  {orderCardExpanded && orderSourceCard && (
                    <div className="politics-drill-source-card">
                      <div className="politics-drill-source-head">
                        知识点 {orderSourceCard.code} ·{' '}
                        <PoliticsTitle card={orderSourceCard} />
                      </div>
                      <PoliticsCardView card={orderSourceCard} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========== TAB 2: RED-X TRAP JUDGMENT ========== */}
      {tab === 'trap' && currentTrap && (
        <section className="card-surface politics-drill-card">
          <div className="section-row-head" style={{ marginBottom: 12 }}>
            <span className="drill-tag">
              专治高频干扰项 · 第 {(trapIdx % trapDeck.length) + 1} /{' '}
              {trapDeck.length} 题
            </span>
            <span className="setting-desc" style={{ margin: 0 }}>
              快捷键：1/T 判对 · 2/F 判错 · Enter 下一题
            </span>
          </div>

          <div className="politics-drill-prompt">
            <p className="politics-drill-stem">{currentTrap.statement}</p>
          </div>

          <div className="politics-trap-actions">
            <button
              type="button"
              disabled={trapAnswer !== null}
              className={`politics-judge-btn ${
                trapAnswer !== null
                  ? currentTrap.isTrue
                    ? 'choice-ok'
                    : trapAnswer === true
                      ? 'choice-err'
                      : ''
                  : ''
              }`}
              onClick={() => handleJudgeTrap(true)}
            >
              <CheckCircle2 size={18} strokeWidth={1.7} />
              <span>表述正确 (1 / T)</span>
            </button>
            <button
              type="button"
              disabled={trapAnswer !== null}
              className={`politics-judge-btn ${
                trapAnswer !== null
                  ? !currentTrap.isTrue
                    ? 'choice-ok'
                    : trapAnswer === false
                      ? 'choice-err'
                      : ''
                  : ''
              }`}
              onClick={() => handleJudgeTrap(false)}
            >
              <XCircle size={18} strokeWidth={1.7} />
              <span>经典坑项 / 错误 (2 / F)</span>
            </button>
          </div>

          {trapAnswer !== null && (
            <div className="id-feedback">
              <div
                className="id-feedback-head"
                style={{
                  color:
                    trapAnswer === currentTrap.isTrue
                      ? 'var(--ok)'
                      : 'var(--err)',
                }}
              >
                {trapAnswer === currentTrap.isTrue
                  ? currentTrap.isTrue
                    ? '判断正确！这是一条标准正确表述'
                    : '成功排雷！一眼识破经典干扰项'
                  : currentTrap.isTrue
                    ? '误杀了！这句话其实是正确的标准表述'
                    : '踩坑了！这是命题人埋的经典错项'}
              </div>
              <p className="politics-drill-explain">{currentTrap.explanation}</p>

              <div className="toolbar-group" style={{ marginTop: 14 }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextTrap}
                >
                  下一题 (Enter)
                  <ArrowRight size={14} />
                </button>
                {trapSourceCard && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setTrapCardExpanded((v) => !v)}
                  >
                    {trapCardExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                    {trapCardExpanded
                      ? '收起原色卡片'
                      : `查看原色卡片 · 知识点 ${trapSourceCard.code}`}
                  </button>
                )}
              </div>

              {trapCardExpanded && trapSourceCard && (
                <div className="politics-drill-source-card">
                  <div className="politics-drill-source-head">
                    知识点 {trapSourceCard.code} ·{' '}
                    <PoliticsTitle card={trapSourceCard} />
                  </div>
                  <PoliticsCardView card={trapSourceCard} />
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========== TAB 3: DYNAMIC POL-ECON CALCULATOR ========== */}
      {tab === 'calc' && (
        <section className="card-surface politics-drill-card">
          <div className="politics-card-controls" style={{ marginTop: 0 }}>
            <div className="toolbar-group">
              {(
                [
                  { id: 'mix', label: '随机混出' },
                  { id: 'organic', label: '有机构成 c:v' },
                  { id: 'absolute', label: '绝对剩余价值' },
                  { id: 'relative', label: '相对剩余价值' },
                ] as { id: CalcFilter; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn-secondary formula-mini-btn ${calcFilter === opt.id ? 'active' : ''}`}
                  onClick={() => {
                    setCalcFilter(opt.id);
                    handleNextCalc(opt.id);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="drill-tag">{calcProblem.title}</div>
            <div className="politics-drill-prompt">
              <p className="politics-drill-stem">{calcProblem.prompt}</p>
            </div>

            <div className="id-choice-grid">
              {calcProblem.choices.map((choice, idx) => {
                let cls = 'id-choice-btn politics-choice-btn';
                if (calcPickedIdx !== null) {
                  if (idx === calcProblem.correctIndex) cls += ' choice-ok';
                  else if (idx === calcPickedIdx) cls += ' choice-err';
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={calcPickedIdx !== null}
                    className={cls}
                    onClick={() => handlePickCalc(idx)}
                  >
                    <span className="politics-choice-idx tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="politics-choice-text tabular-nums">
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>

            {calcPickedIdx !== null && (
              <div className="id-feedback">
                <div
                  className="id-feedback-head"
                  style={{
                    color:
                      calcPickedIdx === calcProblem.correctIndex
                        ? 'var(--ok)'
                        : 'var(--err)',
                  }}
                >
                  {calcPickedIdx === calcProblem.correctIndex
                    ? '计算准确！公式套用很稳'
                    : `算错了，正确答案是 ${calcProblem.choices[calcProblem.correctIndex]}`}
                </div>

                <ol className="politics-calc-steps">
                  {calcProblem.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>

                <div className="toolbar-group" style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleNextCalc()}
                  >
                    <RefreshCw size={14} />
                    再出一道新数题 (Enter)
                  </button>
                  {calcSourceCard && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setCalcCardExpanded((v) => !v)}
                    >
                      {calcCardExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {calcCardExpanded
                        ? '收起原色卡片'
                        : `查看原色卡片 · 知识点 ${calcSourceCard.code}`}
                    </button>
                  )}
                </div>

                {calcCardExpanded && calcSourceCard && (
                  <div className="politics-drill-source-card">
                    <div className="politics-drill-source-head">
                      知识点 {calcSourceCard.code} ·{' '}
                      <PoliticsTitle card={calcSourceCard} />
                    </div>
                    <PoliticsCardView card={calcSourceCard} />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Timeline Image Modal */}
      {timelineOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setTimelineOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="史纲整体脉络原图"
        >
          <div
            className="card-surface politics-wide-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2>史纲整体脉络（原图）</h2>
              <button
                type="button"
                className="icon-mini-btn"
                onClick={() => setTimelineOpen(false)}
                aria-label="关闭"
              >
                <X size={18} />
              </button>
            </div>
            <div className="politics-timeline-wrap">
              <img
                src={POLITICS_TIMELINE_IMAGE}
                alt="史纲整体脉络（原图）"
                className="politics-timeline-img"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
