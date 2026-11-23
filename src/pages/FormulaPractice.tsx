import {
  ArrowLeft,
  CheckCircle2,
  Eye,
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
import { MathText } from '../components/MathText';
import {
  collectFormulaMistakes,
  getDueFormulaIds,
  getStarredFormulaIds,
  getUnlearnedFormulaIds,
  isFormulaDirectMastered,
  isFormulaStarred,
} from '../core/formulaStats';
import {
  createInitialCard,
  previewIntervals,
  requeueAgainCard,
} from '../core/scheduler';
import {
  FORMULA_MAP,
  FORMULA_SECTIONS,
  FORMULA_SECTION_MAP,
  FORMULA_SUBJECTS,
  FORMULA_SUBJECT_MAP,
  type FormulaSubjectId,
} from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

type PracticeModeKind = 'due' | 'new' | 'custom' | 'starred' | 'mistakes' | 'section';

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function FormulaPracticePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const cards = useFormulaProgress((s) => s.cards);
  const reviews = useFormulaProgress((s) => s.reviews);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);
  const dailyNewLimit = useFormulaProgress((s) => s.dailyNewLimit);
  const reviewFormula = useFormulaProgress((s) => s.reviewFormula);
  const setMastered = useFormulaProgress((s) => s.setMastered);
  const toggleStarred = useFormulaProgress((s) => s.toggleStarred);
  const getCard = useFormulaProgress((s) => s.getCard);
  const getTodayLearnedCount = useFormulaProgress((s) => s.getTodayLearnedCount);

  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);

  // Custom launcher filter state
  const [selectedSubjects, setSelectedSubjects] = useState<FormulaSubjectId[]>([
    'calculus',
    'linalg',
    'probstat',
    'signals',
  ]);
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
  const [includeMastered, setIncludeMastered] = useState(false);
  const [randomOrder, setRandomOrder] = useState(false);
  const [batchLimit, setBatchLimit] = useState<number>(20);

  // Active session state
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [revealedParts, setRevealedParts] = useState(0);
  const [againSeen, setAgainSeen] = useState<Set<string>>(() => new Set());
  const [stats, setStats] = useState({
    graded: 0,
    directMastered: 0,
    againCount: 0,
  });
  const [undoBanner, setUndoBanner] = useState<{
    formulaId: string;
    code: string;
    prevIndex: number;
  } | null>(null);

  const autoStartedKeyRef = useRef<string>('');

  const dueIds = useMemo(
    () => getDueFormulaIds(cards, mastered),
    [cards, mastered]
  );
  const unlearnedIds = useMemo(
    () => getUnlearnedFormulaIds(cards, mastered),
    [cards, mastered]
  );
  const starredIds = useMemo(() => getStarredFormulaIds(starred), [starred]);
  const mistakeIds = useMemo(
    () => collectFormulaMistakes(reviews, mastered).map((m) => m.formulaId),
    [reviews, mastered]
  );

  const mistakeCountMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of collectFormulaMistakes(reviews, mastered)) {
      map.set(m.formulaId, m.againCount);
    }
    return map;
  }, [reviews, mastered]);

  const startSession = useCallback((ids: string[], title: string) => {
    setQueue(ids);
    setIndex(0);
    setRevealedParts(0);
    setAgainSeen(new Set());
    setStats({ graded: 0, directMastered: 0, againCount: 0 });
    setUndoBanner(null);
    setSessionTitle(title);
    setSessionActive(ids.length > 0);
  }, []);

  // Auto-launch when navigated with query params (?mode=due|new|starred|mistakes|section)
  useEffect(() => {
    const mode = searchParams.get('mode') as PracticeModeKind | null;
    const sectionParam = searchParams.get('section');
    const key = `${mode ?? ''}|${sectionParam ?? ''}`;
    if (!mode || mode === 'custom' || autoStartedKeyRef.current === key) return;
    autoStartedKeyRef.current = key;

    if (mode === 'due') {
      if (dueIds.length > 0) startSession(dueIds, 'FSRS 到期复习');
    } else if (mode === 'new') {
      const remain = Math.max(1, dailyNewLimit - getTodayLearnedCount());
      const ids = unlearnedIds.slice(0, remain);
      if (ids.length > 0) startSession(ids, `今日新公式（${ids.length} 题）`);
    } else if (mode === 'starred') {
      if (starredIds.length > 0) startSession(starredIds, '标星收藏专练');
    } else if (mode === 'mistakes') {
      if (mistakeIds.length > 0) startSession(mistakeIds, '错题公式专攻');
    } else if (mode === 'section' && sectionParam && FORMULA_SECTION_MAP[sectionParam]) {
      const sec = FORMULA_SECTION_MAP[sectionParam];
      const notMastered = sec.questionIds.filter(
        (id) => !isFormulaDirectMastered(id, mastered)
      );
      const ids = notMastered.length > 0 ? notMastered : sec.questionIds;
      startSession(ids, sec.fullTitle);
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
  const currentItem = currentId ? FORMULA_MAP[currentId] : undefined;
  const isFinished = sessionActive && index >= queue.length;

  useEffect(() => {
    document.title = sessionActive
      ? `${sessionTitle || '公式默写'} · 公式默写`
      : '默写复习 · 公式默写';
  }, [sessionActive, sessionTitle]);

  const totalParts = currentItem ? currentItem.answerParts.length : 1;
  const isFullyRevealed = currentItem ? revealedParts >= totalParts : false;

  const currentCardObj = useMemo(() => {
    if (!currentId) return createInitialCard();
    return getCard(currentId) ?? createInitialCard();
  }, [currentId, getCard]);

  const intervals = useMemo(
    () =>
      previewIntervals(currentCardObj, new Date(), {
        requestRetention,
        examDate,
      }),
    [currentCardObj, requestRetention, examDate]
  );

  const handleRevealNext = useCallback(() => {
    if (!currentItem) return;
    setRevealedParts((prev) => Math.min(currentItem.answerParts.length, prev + 1));
  }, [currentItem]);

  const handleRevealAll = useCallback(() => {
    if (!currentItem) return;
    setRevealedParts(currentItem.answerParts.length);
  }, [currentItem]);

  const handleGrade = useCallback(
    (rating: Grade) => {
      if (!currentId) return;
      const isSecondPass = againSeen.has(currentId);
      reviewFormula(
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
      setRevealedParts(0);
    },
    [currentId, againSeen, reviewFormula, requestRetention, examDate, index]
  );

  const handleMarkMastered = useCallback(() => {
    if (!currentId || !currentItem) return;
    setMastered(currentId, true);
    setUndoBanner({
      formulaId: currentId,
      code: currentItem.code,
      prevIndex: index,
    });
    setStats((s) => ({ ...s, directMastered: s.directMastered + 1 }));
    // Remove any duplicate re-queued occurrences of this card later in queue
    setQueue((prevQueue) => {
      const before = prevQueue.slice(0, index + 1);
      const after = prevQueue.slice(index + 1).filter((id) => id !== currentId);
      return [...before, ...after];
    });
    setIndex((i) => i + 1);
    setRevealedParts(0);
  }, [currentId, currentItem, index, setMastered]);

  const handleUndoMastered = useCallback(() => {
    if (!undoBanner) return;
    setMastered(undoBanner.formulaId, false);
    setStats((s) => ({
      ...s,
      directMastered: Math.max(0, s.directMastered - 1),
    }));
    setIndex(undoBanner.prevIndex);
    setRevealedParts(0);
    setUndoBanner(null);
  }, [undoBanner, setMastered]);

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
    setRevealedParts(0);
  }, [currentId, index, queue.length]);

  // Keyboard shortcuts during active formula session
  useEffect(() => {
    if (!sessionActive || isFinished || !currentItem) return;
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

      if (e.code === 'Space' || e.key === 'Enter') {
        if (!isFullyRevealed) {
          e.preventDefault();
          handleRevealNext();
        }
        return;
      }

      const lower = e.key.toLowerCase();
      if (lower === 'a' && !isFullyRevealed) {
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
        toggleStarred(currentItem.id);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSkip();
        return;
      }

      if (isFullyRevealed) {
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
    currentItem,
    isFullyRevealed,
    handleRevealNext,
    handleRevealAll,
    handleMarkMastered,
    handleSkip,
    handleGrade,
    toggleStarred,
  ]);

  // Custom pool preview count
  const customPool = useMemo(() => {
    const useSections = selectedSectionIds.length > 0;
    const secSet = new Set(selectedSectionIds);
    const subjSet = new Set(selectedSubjects);
    const ids: string[] = [];

    for (const sec of FORMULA_SECTIONS) {
      if (useSections ? !secSet.has(sec.id) : !subjSet.has(sec.subject)) {
        continue;
      }
      for (const id of sec.questionIds) {
        if (!includeMastered && isFormulaDirectMastered(id, mastered)) continue;
        ids.push(id);
      }
    }
    return ids;
  }, [selectedSubjects, selectedSectionIds, includeMastered, mastered]);

  const handleLaunchCustom = () => {
    if (customPool.length === 0) return;
    const ordered = randomOrder ? shuffleArray(customPool) : customPool;
    const sliced = batchLimit > 0 ? ordered.slice(0, batchLimit) : ordered;
    startSession(
      sliced,
      `自由默写（${sliced.length} 题${randomOrder ? ' · 随机' : ''}）`
    );
  };

  const toggleSubjectFilter = (subj: FormulaSubjectId) => {
    setSelectedSectionIds([]);
    setSelectedSubjects((prev) =>
      prev.includes(subj)
        ? prev.length > 1
          ? prev.filter((s) => s !== subj)
          : prev
        : [...prev, subj]
    );
  };

  const toggleSectionFilter = (secId: string) => {
    setSelectedSectionIds((prev) =>
      prev.includes(secId) ? prev.filter((s) => s !== secId) : [...prev, secId]
    );
  };

  const exitSession = () => {
    setSessionActive(false);
    setUndoBanner(null);
    autoStartedKeyRef.current = '';
    if (searchParams.toString()) {
      setSearchParams({}, { replace: true });
    }
  };

  // ========== Active Focus Session View ==========
  if (sessionActive) {
    if (isFinished || !currentItem) {
      return (
        <Layout focusMode>
          <div className="card-surface formula-done-card">
            <CheckCircle2 size={36} strokeWidth={1.5} style={{ color: 'var(--ok)' }} />
            <h1 className="page-title" style={{ marginTop: 12 }}>
              本轮公式默写完成
            </h1>
            <p className="page-sub" style={{ marginTop: 6 }}>
              {sessionTitle} · FSRS 评分 {stats.graded} 次 · 直接标熟记 {stats.directMastered} 题
              {stats.againCount > 0 ? ` · 回炉强化 ${stats.againCount} 次` : ''}
            </p>
            <div className="toolbar-group" style={{ justifyContent: 'center', marginTop: 22 }}>
              <button
                type="button"
                className="btn-primary"
                onClick={exitSession}
              >
                选择下一组公式
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/formula/today')}
              >
                返回今日公式
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/formula/handbook')}
              >
                去公式手册
              </button>
            </div>
          </div>
        </Layout>
      );
    }

    const sec = FORMULA_SECTION_MAP[currentItem.sectionId];
    const subj = FORMULA_SUBJECT_MAP[currentItem.subject];
    const itemStarred = isFormulaStarred(currentItem.id, starred);
    const itemMastered = isFormulaDirectMastered(currentItem.id, mastered);
    const itemAgainCount = mistakeCountMap.get(currentItem.id) ?? 0;
    const progressPct = Math.round(((index + 1) / Math.max(1, queue.length)) * 100);

    return (
      <Layout focusMode>
        <div className="formula-session-topbar">
          <button
            type="button"
            className="btn-ghost"
            onClick={exitSession}
          >
            <ArrowLeft size={16} strokeWidth={1.6} />
            退出默写
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
            title="跳过此题，移到本轮末尾 (→)"
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
              已将 <strong>#{undoBanner.code}</strong> 标为熟记，不再出现在日常复习队列。
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
              <span className="formula-subj-badge">{subj.name}</span>
              <span className="formula-sec-badge">{sec.fullTitle}</span>
              <span className="formula-num-badge tabular-nums">#{currentItem.code}</span>
              {itemMastered && (
                <span className="formula-tag-ok">当前已标熟记</span>
              )}
              {itemAgainCount > 0 && (
                <span className="formula-tag-warn">历史重来 {itemAgainCount} 次</span>
              )}
            </div>

            <div className="formula-card-quick">
              <button
                type="button"
                className={`btn-ghost formula-icon-action ${itemStarred ? 'is-starred' : ''}`}
                onClick={() => toggleStarred(currentItem.id)}
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
                  onClick={() => setMastered(currentItem.id, false)}
                  title="取消熟记，重新加入 FSRS 队列"
                >
                  取消熟记
                </button>
              )}
            </div>
          </div>

          <div className="formula-question-box">
            <MathText text={currentItem.question} />
          </div>

          {!isFullyRevealed ? (
            <div className="formula-reveal-zone">
              {revealedParts > 0 && currentItem.answerParts.length > 1 && (
                <div className="formula-partial-list">
                  {currentItem.answerParts.slice(0, revealedParts).map((part, i) => (
                    <div key={i} className="formula-answer-part">
                      <span className="formula-part-idx tabular-nums">{i + 1}</span>
                      <MathText text={part} />
                    </div>
                  ))}
                </div>
              )}

              <div className="paper-prompt-box" style={{ marginTop: revealedParts > 0 ? 14 : 0 }}>
                <p>
                  {currentItem.answerParts.length > 1
                    ? `本题共 ${currentItem.answerParts.length} 项要点（已揭晓 ${revealedParts}/${currentItem.answerParts.length}），在纸上或脑中默写后翻面核对。`
                    : '在草稿纸或脑中写出完整公式后，点击显示答案自评；早就会的公式可直接按 M 标熟记秒过。'}
                </p>
                <div className="toolbar-group" style={{ justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleRevealNext}
                  >
                    <Eye size={15} strokeWidth={1.6} />
                    {currentItem.answerParts.length > 1
                      ? `逐项揭晓 (${revealedParts + 1}/${currentItem.answerParts.length}) · Space`
                      : '显示答案 (Space)'}
                  </button>
                  {currentItem.answerParts.length > 1 && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleRevealAll}
                    >
                      显示全部答案 (A)
                    </button>
                  )}
                  {!itemMastered && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleMarkMastered}
                    >
                      <CheckCircle2 size={15} strokeWidth={1.6} />
                      早就会了 · 标为熟记 (M)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="formula-answer-section">
              <div className="formula-answer-box">
                <div className="formula-answer-label">参考答案</div>
                {currentItem.answerParts.length > 1 ? (
                  <div className="formula-partial-list">
                    {currentItem.answerParts.map((part, i) => (
                      <div key={i} className="formula-answer-part">
                        <span className="formula-part-idx tabular-nums">{i + 1}</span>
                        <MathText text={part} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="formula-answer-single">
                    <MathText text={currentItem.answer} />
                  </div>
                )}
              </div>

              <div style={{ marginTop: 18 }}>
                <GradeBar
                  suggested={Rating.Good}
                  intervals={intervals}
                  onSelect={handleGrade}
                />
                <div className="formula-post-hint">
                  <span>快捷键：1–4 评分 · M 直接标熟记不再考 · S 收藏</span>
                </div>
              </div>
            </div>
          )}
        </article>
      </Layout>
    );
  }

  // ========== Launcher / Mode Picker View ==========
  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">公式默写与复习</h1>
          <p className="page-sub">
            支持 FSRS 间隔复习、按科目/板块自由抽查、专刷收藏与错题，随时按 M 一键标熟记
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
            <span className="tabular-nums formula-mode-count">{dueIds.length} 题</span>
          </div>
          <div className="formula-mode-name">FSRS 到期复习</div>
          <div className="formula-mode-desc">按遗忘曲线推送待巩固公式</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={unlearnedIds.length === 0}
          onClick={() => {
            const count = Math.min(dailyNewLimit, unlearnedIds.length);
            startSession(unlearnedIds.slice(0, count), `学习新公式（${count} 题）`);
          }}
        >
          <div className="formula-mode-tile-top">
            <Sparkles size={17} style={{ color: 'var(--gold)' }} />
            <span className="tabular-nums formula-mode-count">
              {Math.min(dailyNewLimit, unlearnedIds.length)} / {unlearnedIds.length}
            </span>
          </div>
          <div className="formula-mode-name">学习新公式</div>
          <div className="formula-mode-desc">从尚未掌握的新题按顺序推进</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={starredIds.length === 0}
          onClick={() => startSession(starredIds, '标星收藏专练')}
        >
          <div className="formula-mode-tile-top">
            <Star size={17} style={{ color: 'var(--gold)' }} />
            <span className="tabular-nums formula-mode-count">{starredIds.length} 题</span>
          </div>
          <div className="formula-mode-name">只刷标星收藏</div>
          <div className="formula-mode-desc">考前聚焦你亲自标星的高危公式</div>
        </button>

        <button
          type="button"
          className="card-surface formula-mode-tile"
          disabled={mistakeIds.length === 0}
          onClick={() => startSession(mistakeIds, '错题公式专攻')}
        >
          <div className="formula-mode-tile-top">
            <Shuffle size={17} style={{ color: 'var(--err)' }} />
            <span className="tabular-nums formula-mode-count">{mistakeIds.length} 题</span>
          </div>
          <div className="formula-mode-name">错题公式专攻</div>
          <div className="formula-mode-desc">近 30 天点过「重来」或高错率公式</div>
        </button>
      </div>

      <section className="card-surface" style={{ padding: '20px 22px', marginTop: 18 }}>
        <div className="section-head-row" style={{ marginBottom: 14 }}>
          <h2 className="section-small-title">自由选科 / 选板块抽查</h2>
          <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
            当前命中 {customPool.length} 题
          </span>
        </div>

        <div className="formula-filter-block">
          <div className="setting-label" style={{ marginBottom: 8 }}>
            按科目选择
          </div>
          <div className="toolbar-group">
            {FORMULA_SUBJECTS.map((subj) => {
              const active =
                selectedSectionIds.length === 0 && selectedSubjects.includes(subj.id);
              return (
                <button
                  key={subj.id}
                  type="button"
                  className={`tab-pill ${active ? 'active' : ''}`}
                  onClick={() => toggleSubjectFilter(subj.id)}
                >
                  {subj.name}
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
              或精确点选板块（可选多个，留空则按上方科目）
            </div>
            {selectedSectionIds.length > 0 && (
              <button
                type="button"
                className="btn-ghost"
                style={{ fontSize: 12, padding: '2px 8px' }}
                onClick={() => setSelectedSectionIds([])}
              >
                清空板块选择 ({selectedSectionIds.length})
              </button>
            )}
          </div>
          <div className="formula-section-chips">
            {FORMULA_SECTIONS.map((sec) => {
              const active = selectedSectionIds.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={`formula-sec-chip ${active ? 'active' : ''}`}
                  onClick={() => toggleSectionFilter(sec.id)}
                >
                  <span>{sec.code}</span> {sec.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="formula-custom-options">
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
              随机打乱抽查
            </button>
            <button
              type="button"
              className={`btn-secondary ${includeMastered ? 'active' : ''}`}
              onClick={() => setIncludeMastered((v) => !v)}
            >
              {includeMastered ? '已包含熟记题' : '自动跳过已熟记'}
            </button>
          </div>

          <div className="toolbar-group" style={{ alignItems: 'center' }}>
            <span className="setting-desc" style={{ margin: 0 }}>
              本轮题量：
            </span>
            {[15, 20, 30, 0].map((n) => (
              <button
                key={n}
                type="button"
                className={`btn-secondary ${batchLimit === n ? 'active' : ''}`}
                onClick={() => setBatchLimit(n)}
              >
                {n === 0 ? '全部' : `${n} 题`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="btn-primary"
            disabled={customPool.length === 0}
            onClick={handleLaunchCustom}
          >
            开始默写（{batchLimit > 0 ? Math.min(batchLimit, customPool.length) : customPool.length} 题）
          </button>
        </div>
      </section>
    </Layout>
  );
}
