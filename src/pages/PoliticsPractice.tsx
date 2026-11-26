import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  Lightbulb,
  RotateCcw,
  Shuffle,
  SkipForward,
  Sparkles,
  Star,
  Undo2,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rating, type Grade } from 'ts-fsrs';
import { GradeBar } from '../components/GradeBar';
import { Layout } from '../components/Layout';
import {
  buildProcessedPoliticsLines,
  PoliticsCardView,
  PoliticsTitle,
} from '../components/PoliticsCardView';
import {
  collectPoliticsMistakes,
  getDuePoliticsIds,
  getStarredPoliticsIds,
  getUnlearnedPoliticsIds,
  isPoliticsDirectMastered,
  isPoliticsStarred,
} from '../core/politicsStats';
import {
  createInitialCard,
  previewIntervals,
  requeueAgainCard,
} from '../core/scheduler';
import {
  POLITICS_CARD_MAP,
  POLITICS_MAJORS,
  POLITICS_MAJOR_MAP,
  POLITICS_TOPICS,
  POLITICS_TOPIC_MAP,
  type PoliticsMajorId,
} from '../data/politics';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

type PoliticsStudyStyle = 'cloze' | 'blind' | 'read';
type PracticeLaunchMode = 'due' | 'new' | 'custom' | 'starred' | 'mistakes' | 'topic';

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function PoliticsPracticePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const cards = usePoliticsProgress((s) => s.cards);
  const reviews = usePoliticsProgress((s) => s.reviews);
  const mastered = usePoliticsProgress((s) => s.mastered);
  const starred = usePoliticsProgress((s) => s.starred);
  const dailyNewLimit = usePoliticsProgress((s) => s.dailyNewLimit);
  const reviewPoliticsCard = usePoliticsProgress((s) => s.reviewPoliticsCard);
  const setMastered = usePoliticsProgress((s) => s.setMastered);
  const toggleStarred = usePoliticsProgress((s) => s.toggleStarred);
  const getCard = usePoliticsProgress((s) => s.getCard);
  const getTodayLearnedCount = usePoliticsProgress((s) => s.getTodayLearnedCount);

  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);

  // Launcher filter state
  const [selectedMajors, setSelectedMajors] = useState<PoliticsMajorId[]>([
    'mayuan',
    'shigang',
    'other',
  ]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [includeMastered, setIncludeMastered] = useState(false);
  const [randomOrder, setRandomOrder] = useState(false);
  const [batchLimit, setBatchLimit] = useState<number>(15);
  const [studyStyle, setStudyStyle] = useState<PoliticsStudyStyle>('cloze');

  // Active session state
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  // Card interaction states
  const [revealedClozes, setRevealedClozes] = useState<Set<number>>(() => new Set());
  const [blindRevealedLines, setBlindRevealedLines] = useState(0);
  const [tabMnemonicOpen, setTabMnemonicOpen] = useState(false);

  const [againSeen, setAgainSeen] = useState<Set<string>>(() => new Set());
  const [stats, setStats] = useState({
    graded: 0,
    directMastered: 0,
    againCount: 0,
  });
  const [undoBanner, setUndoBanner] = useState<{
    cardId: string;
    code: string;
    prevIndex: number;
  } | null>(null);

  const autoStartedKeyRef = useRef('');

  const dueIds = useMemo(
    () => getDuePoliticsIds(cards, mastered),
    [cards, mastered]
  );
  const unlearnedIds = useMemo(
    () => getUnlearnedPoliticsIds(cards, mastered),
    [cards, mastered]
  );
  const starredIds = useMemo(() => getStarredPoliticsIds(starred), [starred]);
  const mistakeIds = useMemo(
    () => collectPoliticsMistakes(reviews, mastered).map((m) => m.cardId),
    [reviews, mastered]
  );

  const resetCardViewState = useCallback(() => {
    setRevealedClozes(new Set());
    setBlindRevealedLines(0);
    setTabMnemonicOpen(false);
  }, []);

  const startSession = useCallback(
    (ids: string[], title: string) => {
      setQueue(ids);
      setIndex(0);
      resetCardViewState();
      setAgainSeen(new Set());
      setStats({ graded: 0, directMastered: 0, againCount: 0 });
      setUndoBanner(null);
      setSessionTitle(title);
      setSessionActive(ids.length > 0);
    },
    [resetCardViewState]
  );

  useEffect(() => {
    const mode = searchParams.get('mode') as PracticeLaunchMode | null;
    const topicParam = searchParams.get('topic');
    const key = `${mode ?? ''}|${topicParam ?? ''}`;
    if (!mode || mode === 'custom' || autoStartedKeyRef.current === key) return;
    autoStartedKeyRef.current = key;

    if (mode === 'due') {
      if (dueIds.length > 0) startSession(dueIds, 'FSRS 到期复习');
    } else if (mode === 'new') {
      const remain = Math.max(1, dailyNewLimit - getTodayLearnedCount());
      const ids = unlearnedIds.slice(0, remain);
      if (ids.length > 0) startSession(ids, `今日新政治卡（${ids.length} 张）`);
    } else if (mode === 'starred') {
      if (starredIds.length > 0) startSession(starredIds, '标星收藏专练');
    } else if (mode === 'mistakes') {
      if (mistakeIds.length > 0) startSession(mistakeIds, '薄弱错题专攻');
    } else if (mode === 'topic' && topicParam && POLITICS_TOPIC_MAP[topicParam]) {
      const tp = POLITICS_TOPIC_MAP[topicParam];
      const active = tp.cardIds.filter((id) => !isPoliticsDirectMastered(id, mastered));
      const ids = active.length > 0 ? active : tp.cardIds;
      startSession(ids, `${POLITICS_MAJOR_MAP[tp.major].name} · ${tp.title}`);
    }
  }, [
    searchParams,
    dueIds,
    unlearnedIds,
    starredIds,
    mistakeIds,
    mastered,
    dailyNewLimit,
    getTodayLearnedCount,
    startSession,
  ]);

  const currentId = sessionActive ? queue[index] : undefined;
  const currentCard = currentId ? POLITICS_CARD_MAP[currentId] : undefined;
  const isFinished = sessionActive && index >= queue.length;

  useEffect(() => {
    document.title = sessionActive
      ? `${sessionTitle || '政治卡片复习'} · 政治一页纸`
      : '卡片复习 · 政治一页纸';
  }, [sessionActive, sessionTitle]);

  const hideMnemonicInCard =
    studyStyle === 'cloze' && Boolean(currentCard?.mnemonicCue) && !tabMnemonicOpen;

  const processed = useMemo(() => {
    if (!currentCard) return { lines: [], totalClozeCount: 0 };
    return buildProcessedPoliticsLines(currentCard, {
      hideMnemonicLines: hideMnemonicInCard,
    });
  }, [currentCard, hideMnemonicInCard]);

  const totalBlindSteps = currentCard
    ? Math.max(processed.lines.length, currentCard.image ? 1 : 0)
    : 0;

  const isCardReadyForGrade = useMemo(() => {
    if (!currentCard) return false;
    if (studyStyle === 'read') return true;
    if (studyStyle === 'cloze') {
      return (
        processed.totalClozeCount === 0 ||
        revealedClozes.size >= processed.totalClozeCount
      );
    }
    return blindRevealedLines >= totalBlindSteps;
  }, [
    currentCard,
    studyStyle,
    processed.totalClozeCount,
    totalBlindSteps,
    revealedClozes.size,
    blindRevealedLines,
  ]);

  const currentFsrsCard = useMemo(() => {
    if (!currentId) return createInitialCard();
    return getCard(currentId) ?? createInitialCard();
  }, [currentId, getCard]);

  const intervals = useMemo(
    () =>
      previewIntervals(currentFsrsCard, new Date(), {
        requestRetention,
        examDate,
      }),
    [currentFsrsCard, requestRetention, examDate]
  );

  const handleToggleCloze = useCallback((groupIndex: number) => {
    setRevealedClozes((prev) => {
      const next = new Set(prev);
      if (next.has(groupIndex)) next.delete(groupIndex);
      else next.add(groupIndex);
      return next;
    });
  }, []);

  const handleRevealNext = useCallback(() => {
    if (!currentCard) return;
    if (studyStyle === 'cloze') {
      for (let i = 0; i < processed.totalClozeCount; i++) {
        if (!revealedClozes.has(i)) {
          setRevealedClozes((prev) => new Set(prev).add(i));
          return;
        }
      }
    } else if (studyStyle === 'blind') {
      const step = totalBlindSteps > 14 ? 5 : 3;
      setBlindRevealedLines((n) => Math.min(totalBlindSteps, n + step));
    }
  }, [
    currentCard,
    studyStyle,
    processed.totalClozeCount,
    totalBlindSteps,
    revealedClozes,
  ]);

  const handleRevealAll = useCallback(() => {
    if (!currentCard) return;
    if (studyStyle === 'cloze') {
      const all = new Set<number>();
      for (let i = 0; i < processed.totalClozeCount; i++) all.add(i);
      setRevealedClozes(all);
    } else if (studyStyle === 'blind') {
      setBlindRevealedLines(totalBlindSteps);
    }
  }, [currentCard, studyStyle, processed.totalClozeCount, totalBlindSteps]);

  const handleGrade = useCallback(
    (rating: Grade) => {
      if (!currentId) return;
      const isSecondPass = againSeen.has(currentId);
      reviewPoliticsCard(
        currentId,
        rating,
        { requestRetention, examDate },
        !isSecondPass
      );
      setUndoBanner(null);
      setStats((s) => ({
        ...s,
        graded: s.graded + 1,
        againCount: s.againCount + (rating === Rating.Again ? 1 : 0),
      }));
      if (rating === Rating.Again) {
        setAgainSeen((prev) => new Set(prev).add(currentId));
        setQueue((q) => requeueAgainCard(q, index, currentId, 4));
      }
      setIndex((i) => i + 1);
      resetCardViewState();
    },
    [
      currentId,
      againSeen,
      reviewPoliticsCard,
      requestRetention,
      examDate,
      index,
      resetCardViewState,
    ]
  );

  const handleMarkMastered = useCallback(() => {
    if (!currentId || !currentCard) return;
    setMastered(currentId, true);
    setUndoBanner({
      cardId: currentId,
      code: currentCard.code,
      prevIndex: index,
    });
    setStats((s) => ({ ...s, directMastered: s.directMastered + 1 }));
    setQueue((prev) => {
      const before = prev.slice(0, index + 1);
      const after = prev.slice(index + 1).filter((id) => id !== currentId);
      return [...before, ...after];
    });
    setIndex((i) => i + 1);
    resetCardViewState();
  }, [currentId, currentCard, index, setMastered, resetCardViewState]);

  const handleUndoMastered = useCallback(() => {
    if (!undoBanner) return;
    setMastered(undoBanner.cardId, false);
    setStats((s) => ({
      ...s,
      directMastered: Math.max(0, s.directMastered - 1),
    }));
    setIndex(undoBanner.prevIndex);
    resetCardViewState();
    setUndoBanner(null);
  }, [undoBanner, setMastered, resetCardViewState]);

  const handleSkip = useCallback(() => {
    if (!currentId) return;
    setUndoBanner(null);
    if (index < queue.length - 1) {
      setQueue((prev) => {
        const next = [...prev];
        const [removed] = next.splice(index, 1);
        next.push(removed);
        return next;
      });
    } else {
      setIndex((i) => i + 1);
    }
    resetCardViewState();
  }, [currentId, index, queue.length, resetCardViewState]);

  // Keyboard shortcuts: Tab (mnemonic hint), Space (reveal next), A (reveal all), M (mastered), S (star), 1-4 (FSRS)
  useEffect(() => {
    if (!sessionActive || isFinished || !currentCard) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Tab') {
        if (currentCard.mnemonicCue) {
          e.preventDefault();
          setTabMnemonicOpen((v) => !v);
        }
        return;
      }
      if (e.code === 'Space' || e.key === 'Enter') {
        if (!isCardReadyForGrade) {
          e.preventDefault();
          handleRevealNext();
        }
        return;
      }
      const lower = e.key.toLowerCase();
      if (lower === 'a' && !isCardReadyForGrade) {
        e.preventDefault();
        handleRevealAll();
        return;
      }
      if (lower === 'm') {
        e.preventDefault();
        handleMarkMastered();
        return;
      }
      if (lower === 's') {
        e.preventDefault();
        toggleStarred(currentCard.id);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSkip();
        return;
      }
      if (isCardReadyForGrade) {
        if (e.key === '1') {
          e.preventDefault();
          handleGrade(Rating.Again);
        } else if (e.key === '2') {
          e.preventDefault();
          handleGrade(Rating.Hard);
        } else if (e.key === '3') {
          e.preventDefault();
          handleGrade(Rating.Good);
        } else if (e.key === '4') {
          e.preventDefault();
          handleGrade(Rating.Easy);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    sessionActive,
    isFinished,
    currentCard,
    isCardReadyForGrade,
    handleRevealNext,
    handleRevealAll,
    handleMarkMastered,
    handleSkip,
    handleGrade,
    toggleStarred,
  ]);

  const customPool = useMemo(() => {
    const useTopics = selectedTopicIds.length > 0;
    const tpSet = new Set(selectedTopicIds);
    const majSet = new Set(selectedMajors);
    const ids: string[] = [];
    for (const tp of POLITICS_TOPICS) {
      if (useTopics ? !tpSet.has(tp.id) : !majSet.has(tp.major)) continue;
      for (const id of tp.cardIds) {
        if (!includeMastered && isPoliticsDirectMastered(id, mastered)) continue;
        ids.push(id);
      }
    }
    return ids;
  }, [selectedMajors, selectedTopicIds, includeMastered, mastered]);

  const exitSession = () => {
    setSessionActive(false);
    setUndoBanner(null);
    autoStartedKeyRef.current = '';
    if (searchParams.toString()) {
      setSearchParams({}, { replace: true });
    }
  };

  // ========== Active Session View ==========
  if (sessionActive) {
    if (isFinished || !currentCard) {
      return (
        <Layout focusMode>
          <div className="card-surface formula-done-card">
            <CheckCircle2 size={36} strokeWidth={1.5} style={{ color: 'var(--ok)' }} />
            <h1 className="page-title" style={{ marginTop: 12 }}>
              本轮政治卡片完成
            </h1>
            <p className="page-sub" style={{ marginTop: 6 }}>
              {sessionTitle} · FSRS 评分 {stats.graded} 次 · 直接标熟记 {stats.directMastered} 张
              {stats.againCount > 0 ? ` · 回炉强化 ${stats.againCount} 次` : ''}
            </p>
            <div className="toolbar-group" style={{ justifyContent: 'center', marginTop: 22 }}>
              <button type="button" className="btn-primary" onClick={exitSession}>
                选择下一组卡片
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/politics/drills')}
              >
                去刷会议速配 / 排雷
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/politics/today')}
              >
                返回今日政治
              </button>
            </div>
          </div>
        </Layout>
      );
    }

    const majorMeta = POLITICS_MAJOR_MAP[currentCard.major];
    const itemStarred = isPoliticsStarred(currentCard.id, starred);
    const itemMastered = isPoliticsDirectMastered(currentCard.id, mastered);
    const progressPct = Math.round(((index + 1) / Math.max(1, queue.length)) * 100);

    return (
      <Layout focusMode>
        <div className="formula-session-topbar">
          <button type="button" className="btn-ghost" onClick={exitSession}>
            <ArrowLeft size={16} strokeWidth={1.6} />
            退出复习
          </button>

          <div className="formula-session-title">
            <span>{sessionTitle}</span>
            <span className="tabular-nums" style={{ color: 'var(--gold)', fontWeight: 600 }}>
              {index + 1} / {queue.length}
            </span>
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={handleSkip}
            title="跳过此卡，移到末尾 (→)"
          >
            <SkipForward size={15} strokeWidth={1.6} />
            跳过
          </button>
        </div>

        <div className="formula-progress-track">
          <div className="formula-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {undoBanner && (
          <div className="formula-undo-banner">
            <span>
              已将 <strong>知识点 {undoBanner.code}</strong> 标为熟记，不再出现在日常复习队列。
            </span>
            <button
              type="button"
              className="btn-ghost formula-undo-btn"
              onClick={handleUndoMastered}
            >
              <Undo2 size={14} />
              撤销
            </button>
          </div>
        )}

        <article className="card-surface formula-card">
          <div className="formula-card-meta">
            <div className="formula-meta-badges">
              <span className={`politics-major-badge pm-${currentCard.major}`}>
                {majorMeta.name}
              </span>
              <span className="formula-sec-badge">{currentCard.topic}</span>
              <span className="formula-num-badge tabular-nums">
                知识点 {currentCard.code}
              </span>
              {itemMastered && <span className="formula-tag-ok">当前已标熟记</span>}
            </div>

            <div className="formula-card-quick">
              <button
                type="button"
                className={`btn-ghost formula-icon-action ${itemStarred ? 'is-starred' : ''}`}
                onClick={() => toggleStarred(currentCard.id)}
                title="标星收藏 (S)"
              >
                <Star
                  size={16}
                  strokeWidth={1.6}
                  fill={itemStarred ? 'currentColor' : 'none'}
                />
                <span>{itemStarred ? '已收藏' : '收藏'}</span>
              </button>

              {!itemMastered ? (
                <button
                  type="button"
                  className="btn-secondary formula-master-btn"
                  onClick={handleMarkMastered}
                  title="已经背熟，直接跳过不再考 (M)"
                >
                  <CheckCircle2 size={15} strokeWidth={1.6} />
                  已熟记 (M)
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-ghost formula-icon-action"
                  onClick={() => setMastered(currentCard.id, false)}
                >
                  取消熟记
                </button>
              )}
            </div>
          </div>

          {/* Study Style Switcher + Tab Mnemonic Trigger */}
          <div className="politics-card-controls">
            <div className="toolbar-group">
              {(
                [
                  { id: 'cloze', label: '考点遮罩' },
                  { id: 'blind', label: '标题盲背' },
                  { id: 'read', label: '原色精读' },
                ] as { id: PoliticsStudyStyle; label: string }[]
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className={`btn-secondary formula-mini-btn ${studyStyle === st.id ? 'active' : ''}`}
                  onClick={() => {
                    setStudyStyle(st.id);
                    resetCardViewState();
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {currentCard.mnemonicCue && (
              <button
                type="button"
                className={`btn-secondary formula-mini-btn ${tabMnemonicOpen ? 'active' : ''}`}
                onClick={() => setTabMnemonicOpen((v) => !v)}
                title="按 Tab 键呼出/隐藏助记口诀与对应拆解"
              >
                <Lightbulb size={13} strokeWidth={1.7} />
                {tabMnemonicOpen ? '收起口诀 (Tab)' : '口诀提示 (Tab)'}
              </button>
            )}
          </div>

          <h2 className="politics-card-title">
            <PoliticsTitle card={currentCard} />
          </h2>

          {/* Tab Mnemonic Hint & Arrow Breakdown Drawer */}
          {tabMnemonicOpen && currentCard.mnemonicCue && (
            <div className="politics-tab-hint">
              <div className="politics-tab-hint-cue">
                <Lightbulb size={14} strokeWidth={1.7} />
                <span>助记口诀：{currentCard.mnemonicCue}</span>
              </div>
              {currentCard.mnemonicBreakdown.length > 0 && (
                <div className="politics-mnemonic-list" style={{ marginTop: 8 }}>
                  {currentCard.mnemonicBreakdown.map((pair, idx) => (
                    <div key={idx} className="politics-mnemonic-row">
                      <span className="politics-mnemonic-cue">{pair.cue}</span>
                      <span className="politics-mnemonic-arrow">→</span>
                      <span className="politics-mnemonic-target">{pair.target}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Main Verbatim Colored Card Area */}
          {studyStyle === 'blind' && blindRevealedLines === 0 ? (
            <div className="paper-prompt-box">
              <p>
                看标题「{currentCard.title}」回想核心考点与对应关系
                {currentCard.mnemonicCue ? '（卡壳可按 Tab 唤出口诀提示）' : ''}。
              </p>
              <div className="toolbar-group" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn-primary" onClick={handleRevealNext}>
                  <Eye size={15} />
                  {processed.lines.length > 6 ? '逐段揭晓 (Space)' : '显示原色卡片 (Space)'}
                </button>
                {processed.lines.length > 6 && (
                  <button type="button" className="btn-secondary" onClick={handleRevealAll}>
                    显示全部 (A)
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="politics-card-paper">
              <PoliticsCardView
                card={currentCard}
                clozeMode={studyStyle === 'cloze'}
                revealedClozes={revealedClozes}
                onToggleCloze={handleToggleCloze}
                hideMnemonicLines={hideMnemonicInCard}
                showMnemonicPanel={isCardReadyForGrade && !tabMnemonicOpen}
                visibleLineCount={
                  studyStyle === 'blind' ? blindRevealedLines : undefined
                }
              />
            </div>
          )}

          {/* Reveal controls or FSRS GradeBar */}
          {!isCardReadyForGrade ? (
            <div className="politics-reveal-bar">
              <div className="toolbar-group">
                <button type="button" className="btn-primary" onClick={handleRevealNext}>
                  <Eye size={15} strokeWidth={1.6} />
                  {studyStyle === 'cloze'
                    ? `揭晓下一个彩字 (${revealedClozes.size}/${processed.totalClozeCount}) · Space`
                    : `继续揭晓 (${blindRevealedLines}/${processed.lines.length}) · Space`}
                </button>
                <button type="button" className="btn-secondary" onClick={handleRevealAll}>
                  全部揭晓 (A)
                </button>
              </div>
              <span className="formula-post-hint" style={{ marginTop: 0 }}>
                也可以直接点击文中任意遮罩块单独翻开 · M 标熟记 · Tab 看口诀
              </span>
            </div>
          ) : (
            <div style={{ marginTop: 18 }}>
              <GradeBar
                suggested={Rating.Good}
                intervals={intervals}
                onSelect={handleGrade}
              />
              <div className="formula-post-hint">
                快捷键：1–4 评分 · Tab 查口诀与拆解 · M 直接标熟记不再考 · S 收藏
              </div>
            </div>
          )}
        </article>
      </Layout>
    );
  }

  // ========== Launcher View ==========
  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">政治卡片复习</h1>
          <p className="page-sub">
            100 张逐字原色卡片，默认「彩字重点遮罩」练选择题条件反射，Tab 呼出口诀与对应拆解
          </p>
        </div>
      </header>

      <div className="formula-quick-modes">
        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={dueIds.length === 0}
          onClick={() => startSession(dueIds, 'FSRS 到期复习')}
        >
          <div className="formula-mode-tile-top">
            <RotateCcw size={17} style={{ color: 'var(--gold)' }} />
            <span className="tabular-nums formula-mode-count">{dueIds.length} 张</span>
          </div>
          <div className="formula-mode-name">FSRS 到期复习</div>
          <div className="formula-mode-desc">按遗忘曲线高频刺激待巩固考点</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={unlearnedIds.length === 0}
          onClick={() => {
            const count = Math.min(dailyNewLimit, unlearnedIds.length);
            startSession(unlearnedIds.slice(0, count), `学习新政治卡（${count} 张）`);
          }}
        >
          <div className="formula-mode-tile-top">
            <Sparkles size={17} style={{ color: 'var(--gold)' }} />
            <span className="tabular-nums formula-mode-count">
              {Math.min(dailyNewLimit, unlearnedIds.length)} / {unlearnedIds.length}
            </span>
          </div>
          <div className="formula-mode-name">学习新卡片</div>
          <div className="formula-mode-desc">按 001–100 顺序推进，会的按 M 秒过</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={starredIds.length === 0}
          onClick={() => startSession(starredIds, '标星收藏专练')}
        >
          <div className="formula-mode-tile-top">
            <Star size={17} style={{ color: 'var(--gold)' }} />
            <span className="tabular-nums formula-mode-count">{starredIds.length} 张</span>
          </div>
          <div className="formula-mode-name">只刷标星收藏</div>
          <div className="formula-mode-desc">考前聚焦你亲自标星的高危知识点</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={mistakeIds.length === 0}
          onClick={() => startSession(mistakeIds, '薄弱错题专攻')}
        >
          <div className="formula-mode-tile-top">
            <Shuffle size={17} style={{ color: 'var(--err)' }} />
            <span className="tabular-nums formula-mode-count">{mistakeIds.length} 张</span>
          </div>
          <div className="formula-mode-name">薄弱错题专攻</div>
          <div className="formula-mode-desc">近 30 天点过「重来」或高错率卡片</div>
        </button>
      </div>

      <section className="card-surface today-section-card" style={{ marginTop: 18 }}>
        <div className="section-row-head">
          <h2 className="section-small-title">自由选板块 / 专题抽查</h2>
          <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
            当前命中 {customPool.length} 张
          </span>
        </div>

        <div className="formula-filter-block">
          <div className="setting-label" style={{ marginBottom: 8 }}>
            按大板块选择
          </div>
          <div className="toolbar-group">
            {POLITICS_MAJORS.map((m) => {
              const active =
                selectedTopicIds.length === 0 && selectedMajors.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`tab-pill ${active ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTopicIds([]);
                    setSelectedMajors((prev) =>
                      prev.includes(m.id)
                        ? prev.length > 1
                          ? prev.filter((x) => x !== m.id)
                          : prev
                        : [...prev, m.id]
                    );
                  }}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="formula-filter-block" style={{ marginTop: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <div className="setting-label">
              或精确点选专题（可选多个，留空按上方大板块）
            </div>
            {selectedTopicIds.length > 0 && (
              <button
                type="button"
                className="btn-ghost"
                style={{ fontSize: 12, padding: '2px 8px' }}
                onClick={() => setSelectedTopicIds([])}
              >
                清空专题 ({selectedTopicIds.length})
              </button>
            )}
          </div>
          <div className="formula-section-chips">
            {POLITICS_TOPICS.map((tp) => {
              const active = selectedTopicIds.includes(tp.id);
              return (
                <button
                  key={tp.id}
                  type="button"
                  className={`formula-sec-chip ${active ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedTopicIds((prev) =>
                      prev.includes(tp.id)
                        ? prev.filter((x) => x !== tp.id)
                        : [...prev, tp.id]
                    )
                  }
                >
                  <span className="formula-sec-chip-code">
                    {POLITICS_MAJOR_MAP[tp.major].name}
                  </span>
                  <span>
                    {tp.title}（{tp.cardIds.length}）
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="formula-custom-options">
          <div className="toolbar-group" style={{ alignItems: 'center' }}>
            <span className="setting-desc" style={{ margin: 0 }}>
              默认刷卡模式：
            </span>
            {(
              [
                { id: 'cloze', label: '考点遮罩（推荐）' },
                { id: 'blind', label: '标题盲背' },
                { id: 'read', label: '原色精读' },
              ] as { id: PoliticsStudyStyle; label: string }[]
            ).map((st) => (
              <button
                key={st.id}
                type="button"
                className={`btn-secondary ${studyStyle === st.id ? 'active' : ''}`}
                onClick={() => setStudyStyle(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              className={`btn-secondary ${!randomOrder ? 'active' : ''}`}
              onClick={() => setRandomOrder(false)}
            >
              按题号顺序
            </button>
            <button
              type="button"
              className={`btn-secondary ${randomOrder ? 'active' : ''}`}
              onClick={() => setRandomOrder(true)}
            >
              随机打乱
            </button>
            <button
              type="button"
              className={`btn-secondary ${includeMastered ? 'active' : ''}`}
              onClick={() => setIncludeMastered((v) => !v)}
            >
              {includeMastered ? '已包含熟记卡' : '自动跳过已熟记'}
            </button>
          </div>

          <div className="toolbar-group" style={{ alignItems: 'center' }}>
            <span className="setting-desc" style={{ margin: 0 }}>
              本轮张数：
            </span>
            {[10, 15, 25, 0].map((n) => (
              <button
                key={n}
                type="button"
                className={`btn-secondary ${batchLimit === n ? 'active' : ''}`}
                onClick={() => setBatchLimit(n)}
              >
                {n === 0 ? '全部' : `${n} 张`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="btn-primary"
            disabled={customPool.length === 0}
            onClick={() => {
              const ordered = randomOrder ? shuffleArray(customPool) : customPool;
              const sliced = batchLimit > 0 ? ordered.slice(0, batchLimit) : ordered;
              startSession(
                sliced,
                `自由刷卡（${sliced.length} 张${randomOrder ? ' · 随机' : ''}）`
              );
            }}
          >
            开始刷卡（
            {batchLimit > 0 ? Math.min(batchLimit, customPool.length) : customPool.length}{' '}
            张）
          </button>
        </div>
      </section>
    </Layout>
  );
}
