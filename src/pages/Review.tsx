import { ArrowLeft, Eye, Keyboard, PenTool, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rating, type Grade } from 'ts-fsrs';
import { DiffResult } from '../components/DiffResult';
import { GradeBar } from '../components/GradeBar';
import { Layout } from '../components/Layout';
import { renderSentenceText, speakEnglish } from '../components/LetterView';
import { gradeAnswer, type GradeResult } from '../core/grader';
import { collectMistakes, extractWordMistakes } from '../core/mistakes';
import {
  buildSprintSentenceQueue,
  createInitialCard,
  interleaveQueue,
  previewIntervals,
  requeueAgainCard,
} from '../core/scheduler';
import { SENTENCES, getTemplatesUsingSentence } from '../data/templates';
import { useProgress } from '../store/useProgress';
import { useSettings, type InputMode } from '../store/useSettings';
import './pages.css';

export function ReviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  const isMistakesMode = modeParam === 'mistakes';
  const isSprintMode = modeParam === 'sprint';

  const cards = useProgress((s) => s.cards);
  const reviews = useProgress((s) => s.reviews);
  const getCard = useProgress((s) => s.getCard);
  const getDueSentenceIds = useProgress((s) => s.getDueSentenceIds);
  const recordReview = useProgress((s) => s.recordReview);

  const practiceMode = useSettings((s) => s.practiceMode);
  const defaultInputMode = useSettings((s) => s.inputMode);
  const strictPunctuation = useSettings((s) => s.strictPunctuation);
  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);
  const updateSettings = useSettings((s) => s.updateSettings);

  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);

  const [queue, setQueue] = useState<string[]>(() => {
    if (isMistakesMode) {
      const mIds = collectMistakes(reviews).map((m) => m.sentenceId);
      return interleaveQueue(mIds);
    }
    if (isSprintMode) {
      return buildSprintSentenceQueue(reviews, Object.keys(cards), 10);
    }
    return interleaveQueue(getDueSentenceIds());
  });
  const [index, setIndex] = useState(0);
  const [sessionGradedIds, setSessionGradedIds] = useState<Set<string>>(
    () => new Set()
  );
  const [input, setInput] = useState('');
  const [usedHint, setUsedHint] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [paperRevealed, setPaperRevealed] = useState(false);
  const [shake, setShake] = useState(false);
  const [flashOk, setFlashOk] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const sentenceId = queue[index] ?? null;
  const sentence = sentenceId ? SENTENCES[sentenceId] : null;
  const currentCard = sentenceId ? getCard(sentenceId) ?? createInitialCard() : null;

  useEffect(() => {
    if (sentence) {
      const prefix = isSprintMode ? '考前冲刺' : isMistakesMode ? '错题复习' : '复习';
      document.title = `${prefix} ${Math.min(index + 1, queue.length)}/${queue.length} · 小作文`;
    } else {
      document.title = '复习完成 · 小作文';
    }
  }, [sentence, index, queue.length, isMistakesMode, isSprintMode]);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [index, sentenceId]);

  const intervals = useMemo(() => {
    if (!currentCard) return null;
    return previewIntervals(currentCard, new Date(), {
      requestRetention,
      examDate,
    });
  }, [currentCard, requestRetention, examDate]);

  const handleSubmitTyping = () => {
    if (!sentence || !input.trim()) return;
    const durationSec = (Date.now() - startTimeRef.current) / 1000;
    const graded = gradeAnswer(sentence, input, {
      mode: practiceMode,
      strictPunctuation,
      usedHint,
      durationSec,
    });
    setResult(graded);
    if (graded.accuracy >= 0.9) {
      setFlashOk(true);
      window.setTimeout(() => setFlashOk(false), 420);
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 260);
    }
  };

  const handleGrade = (rating: Grade) => {
    if (!sentence) return;
    const isFirstInSession = !sessionGradedIds.has(sentence.id);
    const acc =
      result !== null
        ? result.accuracy
        : rating === Rating.Again
          ? 0.5
          : rating === Rating.Hard
            ? 0.85
            : 1;
    const wordMistakes = result ? extractWordMistakes(result.tokens) : undefined;

    recordReview(
      sentence.id,
      rating,
      acc,
      { requestRetention, examDate },
      isFirstInSession,
      wordMistakes
    );

    if (isFirstInSession) {
      setSessionGradedIds((prev) => new Set(prev).add(sentence.id));
    }

    if (rating === Rating.Again) {
      setQueue((prev) => requeueAgainCard(prev, index, sentence.id, 4));
    }

    setIndex((i) => i + 1);
    setInput('');
    setUsedHint(false);
    setResult(null);
    setPaperRevealed(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      const inInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;

      if (e.key === 'Escape') {
        navigate('/today');
        return;
      }
      if (!sentence) return;

      if (!inInput && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        speakEnglish(sentence.en);
        return;
      }

      if (e.key === 'Tab' && !result && !paperRevealed) {
        e.preventDefault();
        setUsedHint(true);
        return;
      }

      if (inputMode === 'paper' && !paperRevealed && e.code === 'Space' && !inInput) {
        e.preventDefault();
        setPaperRevealed(true);
        return;
      }

      const readyToGrade = inputMode === 'typing' ? Boolean(result) : paperRevealed;
      if (readyToGrade) {
        if (e.key === '1') handleGrade(Rating.Again);
        else if (e.key === '2') handleGrade(Rating.Hard);
        else if (e.key === '3') handleGrade(Rating.Good);
        else if (e.key === '4') handleGrade(Rating.Easy);
        else if (e.key === 'Enter' && inputMode === 'typing' && result) {
          e.preventDefault();
          const suggested =
            result.suggestedRating === Rating.Manual
              ? Rating.Good
              : result.suggestedRating;
          handleGrade(suggested);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const learnedIds = Object.keys(cards);

  if (!sentence) {
    return (
      <Layout>
        <div className="card-surface empty-state">
          <h2>
            {isSprintMode
              ? '考前冲刺高错率 10 句已完成'
              : isMistakesMode
                ? '错题专项练习已完成'
                : '今天的复习做完了'}
          </h2>
          <p>
            {learnedIds.length === 0
              ? '你还没有学过新句子。先去「学习新句」完成第 1 课通用骨架吧。'
              : '可以去实战写一篇模拟题、练练专项卡片，或者明天再来。'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/exam')}
            >
              去实战写一篇
            </button>
            {learnedIds.length > 0 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setQueue(interleaveQueue(learnedIds));
                  setIndex(0);
                  setSessionGradedIds(new Set());
                }}
              >
                提前巩固全部已学句（{learnedIds.length} 句）
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  const templates = getTemplatesUsingSentence(sentence.id);
  const progressPct =
    queue.length > 0 ? Math.round(((index + 1) / queue.length) * 100) : 0;

  return (
    <Layout focusMode>
      <div className="focus-topbar">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => navigate('/today')}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          退出专注 (Esc)
        </button>

        <span className="tabular-nums" style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
          {isSprintMode ? '冲刺 · ' : isMistakesMode ? '错题 · ' : ''}
          {index + 1} / {queue.length}
        </span>

        <div className="toolbar-group">
          <button
            type="button"
            className={`btn-secondary ${inputMode === 'typing' ? 'active' : ''}`}
            style={{ height: 32, fontSize: 12, padding: '0 10px' }}
            onClick={() => {
              setInputMode('typing');
              setPaperRevealed(false);
            }}
          >
            <Keyboard size={13} strokeWidth={1.5} />
            打字
          </button>
          <button
            type="button"
            className={`btn-secondary ${inputMode === 'paper' ? 'active' : ''}`}
            style={{ height: 32, fontSize: 12, padding: '0 10px' }}
            onClick={() => {
              setInputMode('paper');
              setResult(null);
            }}
          >
            <PenTool size={13} strokeWidth={1.5} />
            纸笔
          </button>
          {inputMode === 'typing' && (
            <button
              type="button"
              className="btn-secondary"
              style={{ height: 32, fontSize: 12, padding: '0 10px' }}
              onClick={() =>
                updateSettings({
                  practiceMode: practiceMode === 'framework' ? 'fill' : 'framework',
                })
              }
            >
              {practiceMode === 'framework' ? '框架模式' : '实填模式'}
            </button>
          )}
        </div>
      </div>

      <div className="thin-progress-track">
        <div className="thin-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div
        key={`${sentence.id}-${index}`}
        className={`card-surface drill-card animate-card-enter ${flashOk ? 'flash-ok' : ''}`}
      >
        <div className="drill-meta">
          <span className="drill-tag">
            {templates.length > 2
              ? `共用骨架（${templates.length} 套模板复用）`
              : templates.map((t) => t.name).join(' / ')}{' '}
            · {sentence.layer}
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => speakEnglish(sentence.en)}
            title="朗读英文 (R)"
          >
            <Volume2 size={15} strokeWidth={1.5} />
            朗读 (R)
          </button>
        </div>

        <div className="drill-zh zh-text">
          {renderSentenceText(sentence.zh)}
        </div>

        {usedHint ? (
          <div className="cue-box">
            <span
              style={{
                fontSize: 12,
                color: 'var(--ink-muted)',
                display: 'block',
                fontFamily: 'var(--font-sans)',
              }}
            >
              首词提示（已启用，最高建议评分降为 Hard）
            </span>
            {renderSentenceText(sentence.cue)} …
          </div>
        ) : (
          !result &&
          !paperRevealed && (
            <div style={{ marginBottom: 14 }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setUsedHint(true)}
              >
                <Eye size={14} strokeWidth={1.5} />
                显示首词提示 (Tab)
              </button>
            </div>
          )
        )}

        {inputMode === 'typing' && (
          <>
            <textarea
              className={`drill-textarea ${shake ? 'animate-shake' : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={Boolean(result)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !result) {
                  e.preventDefault();
                  handleSubmitTyping();
                }
              }}
              placeholder={
                practiceMode === 'framework'
                  ? '写出英文句子（槽位可写 [X] 或任意短语）…'
                  : '实填模式：请填入符合词性的真实英文内容…'
              }
              autoFocus
            />

            {!result && (
              <div className="drill-actions">
                <span className="page-sub">Enter 提交 · Shift+Enter 换行 · Tab 看提示</span>
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!input.trim()}
                  onClick={handleSubmitTyping}
                >
                  提交判分
                </button>
              </div>
            )}

            {result && intervals && (
              <>
                <DiffResult
                  tokens={result.tokens}
                  accuracy={result.accuracy}
                  warnings={result.warnings}
                />
                <div className="answer-reveal">
                  <div className="answer-reveal-label">标准原文</div>
                  <div className="serif-text">
                    {renderSentenceText(sentence.en, sentence.resultWord)}
                  </div>
                </div>
                <GradeBar
                  suggested={result.suggestedRating}
                  intervals={intervals}
                  onSelect={handleGrade}
                />
              </>
            )}
          </>
        )}

        {inputMode === 'paper' && (
          <>
            {!paperRevealed ? (
              <div className="paper-prompt-box">
                <p>请在草稿纸上完整手写本句英文，写完后对照原文自评。</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setPaperRevealed(true)}
                >
                  显示答案 (Space)
                </button>
              </div>
            ) : (
              intervals && (
                <>
                  <div className="answer-reveal">
                    <div className="answer-reveal-label">标准原文（对照你的手写内容按 1–4 自评）</div>
                    <div className="serif-text">
                      {renderSentenceText(sentence.en, sentence.resultWord)}
                    </div>
                  </div>
                  <GradeBar
                    suggested={usedHint ? Rating.Hard : Rating.Good}
                    intervals={intervals}
                    onSelect={handleGrade}
                  />
                </>
              )
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
