import {
  ArrowLeft,
  Check,
  Lock,
  Unlock,
  Volume2,
  Wand2,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiffResult } from '../components/DiffResult';
import { Layout } from '../components/Layout';
import { renderSentenceText, speakEnglish } from '../components/LetterView';
import { SlotChip } from '../components/SlotChip';
import { StoryLine } from '../components/StoryLine';
import { generateCloze, gradeAnswer, type GradeResult } from '../core/grader';
import { SLOTS } from '../data/fillers';
import {
  LESSONS,
  SENTENCES,
  STUDYABLE_SENTENCE_IDS,
  TEMPLATE_MAP,
  getTemplatesUsingSentence,
} from '../data/templates';
import { useProgress } from '../store/useProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

type LearnStep = 1 | 2 | 3 | 4;

const STEP_LABELS = ['1. 理解句子', '2. 首词默写', '3. 挖空默写', '4. 只看中文'];

export function LearnPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cards = useProgress((s) => s.cards);
  const completeNewSentence = useProgress((s) => s.completeNewSentence);
  const todayLearned = useProgress((s) => s.getTodayLearnedCount());

  const dailyNewLimit = useSettings((s) => s.dailyNewLimit);
  const practiceMode = useSettings((s) => s.practiceMode);
  const strictPunctuation = useSettings((s) => s.strictPunctuation);
  const unlockAllLessons = useSettings((s) => s.unlockAllLessons);
  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);
  const updateSettings = useSettings((s) => s.updateSettings);

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [step, setStep] = useState<LearnStep>(1);
  const [countdown, setCountdown] = useState(5);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [stepMessage, setStepMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [flashOk, setFlashOk] = useState(false);

  const sentence = activeSentenceId ? SENTENCES[activeSentenceId] : null;
  const activeLesson = activeLessonId
    ? LESSONS.find((l) => l.id === activeLessonId) ?? null
    : null;

  const isLessonUnlocked = (lessonIndex: number): boolean => {
    if (unlockAllLessons || lessonIndex === 0) return true;
    const prev = LESSONS[lessonIndex - 1];
    return prev.sentenceIds.every((id) => Boolean(cards[id]));
  };

  const startLesson = (lessonId: number) => {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;
    const firstUnlearned =
      lesson.sentenceIds.find((id) => !cards[id]) ?? lesson.sentenceIds[0];
    setActiveLessonId(lessonId);
    setActiveSentenceId(firstUnlearned);
    setStep(1);
    setInput('');
    setResult(null);
    setStepMessage(null);
  };

  // Support deep link /learn?lesson=N from Today page
  useEffect(() => {
    const param = searchParams.get('lesson');
    if (!param) return;
    const id = Number(param);
    const idx = LESSONS.findIndex((l) => l.id === id);
    if (idx !== -1 && isLessonUnlocked(idx)) {
      startLesson(id);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = sentence ? `学习中 · 步骤 ${step}/4 · 小作文` : '学习新句 · 小作文';
  }, [sentence, step]);

  // R hotkey to speak when focus is not in textarea
  useEffect(() => {
    if (!sentence) return;
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === 'r' || e.key === 'R') &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        speakEnglish(sentence.en);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sentence]);

  // Step 1 minimum 5-second reading timer
  useEffect(() => {
    if (!sentence || step !== 1) return;
    setCountdown(5);
    const timer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sentence?.id, step]);

  const clozeParts = useMemo(() => {
    if (!sentence) return [];
    return generateCloze(sentence, sentence.id.length * 17);
  }, [sentence]);

  const handleSubmitStep = () => {
    if (!sentence || !input.trim()) return;
    const graded = gradeAnswer(sentence, input, {
      mode: practiceMode,
      strictPunctuation,
    });
    setResult(graded);

    if (graded.accuracy >= 0.9) {
      setFlashOk(true);
      window.setTimeout(() => setFlashOk(false), 420);
      setStepMessage(null);
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 260);
      setStepMessage(
        `本步准确率 ${Math.round(graded.accuracy * 100)}%（需 ≥ 90%），将退回上一步重新巩固。`
      );
    }
  };

  const handleProceed = () => {
    if (!sentence || !result) return;

    if (result.accuracy < 0.9) {
      const prevStep = Math.max(1, step - 1) as LearnStep;
      setStep(prevStep);
      setInput('');
      setResult(null);
      setStepMessage(null);
      return;
    }

    if (step < 4) {
      setStep((step + 1) as LearnStep);
      setInput('');
      setResult(null);
      setStepMessage(null);
      return;
    }

    completeNewSentence(sentence.id, { requestRetention, examDate });

    if (activeLesson) {
      const nextUnlearned = activeLesson.sentenceIds.find(
        (id) => id !== sentence.id && !cards[id]
      );
      if (nextUnlearned) {
        setActiveSentenceId(nextUnlearned);
        setStep(1);
        setInput('');
        setResult(null);
        setStepMessage('上一句已写入 FSRS 复习队列，继续学习下一句。');
        return;
      }
    }

    setActiveSentenceId(null);
    setActiveLessonId(null);
    setStep(1);
    setInput('');
    setResult(null);
    setStepMessage(null);
  };

  const fillUniversalWords = () => {
    if (!sentence) return;
    const filled = sentence.en.replace(
      /\{\{(\w+)\}\}/g,
      (_, id: string) => SLOTS[id]?.filler ?? '[X]'
    );
    setInput(filled);
  };

  const currentTemplate = useMemo(() => {
    if (activeLesson?.templateId) return TEMPLATE_MAP[activeLesson.templateId];
    if (sentence) {
      const tpls = getTemplatesUsingSentence(sentence.id);
      return tpls[0] ?? null;
    }
    return null;
  }, [activeLesson, sentence]);

  const rightRail = currentTemplate ? (
    <div>
      <div className="rail-section-title">{currentTemplate.name} · 故事线</div>
      <StoryLine
        nodes={currentTemplate.storyLine}
        activeIndex={sentence?.storyNodeIndex ?? -1}
        detail={currentTemplate.storyLineDetail}
        vertical
      />
      {sentence && (
        <div style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-muted)' }}>
          <div className="rail-section-title">本句所属模板</div>
          <div>
            {getTemplatesUsingSentence(sentence.id)
              .map((t) => t.name)
              .join(' / ')}
          </div>
        </div>
      )}
    </div>
  ) : undefined;

  if (!sentence) {
    return (
      <Layout>
        <header className="page-header">
          <div>
            <h1 className="page-title">学习新句</h1>
            <p className="page-sub">
              按「固定骨架 → 万能主体 3 句 → 目的句替换 → 通知头尾」{LESSONS.length} 课极速通关（共 {STUDYABLE_SENTENCE_IDS.length} 句） · 今日已学{' '}
              <span className="tabular-nums">{todayLearned}</span> / {dailyNewLimit} 句
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => updateSettings({ unlockAllLessons: !unlockAllLessons })}
          >
            {unlockAllLessons ? (
              <Unlock size={15} strokeWidth={1.5} />
            ) : (
              <Lock size={15} strokeWidth={1.5} />
            )}
            {unlockAllLessons ? '已解锁全部' : '解锁全部课程'}
          </button>
        </header>

        <div className="lesson-grid">
          {LESSONS.map((lesson, idx) => {
            const unlocked = isLessonUnlocked(idx);
            const doneCount = lesson.sentenceIds.filter((id) => Boolean(cards[id])).length;
            const total = lesson.sentenceIds.length;
            const allDone = doneCount === total;

            return (
              <div
                key={lesson.id}
                className={`card-surface lesson-row ${!unlocked ? 'locked' : ''}`}
              >
                <div>
                  <div className="lesson-info-title">{lesson.title}</div>
                  <div className="lesson-info-sub">{lesson.subtitle}</div>
                </div>
                <div className="lesson-progress-meta">
                  <span className="drill-tag tabular-nums">
                    {doneCount} / {total}
                  </span>
                  <button
                    type="button"
                    className={allDone ? 'btn-secondary' : 'btn-primary'}
                    style={{ height: 36, padding: '0 14px', fontSize: 13 }}
                    disabled={!unlocked}
                    onClick={() => startLesson(lesson.id)}
                  >
                    {!unlocked ? '未解锁' : allDone ? '重学本课' : doneCount > 0 ? '继续学习' : '开始'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }

  return (
    <Layout rightRail={rightRail}>
      <div className="toolbar-row" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setActiveSentenceId(null);
            setActiveLessonId(null);
            setResult(null);
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          返回课程目录
        </button>

        <div className="toolbar-group">
          <button
            type="button"
            className={`btn-secondary ${practiceMode === 'framework' ? 'active' : ''}`}
            onClick={() => updateSettings({ practiceMode: 'framework' })}
          >
            框架模式
          </button>
          <button
            type="button"
            className={`btn-secondary ${practiceMode === 'fill' ? 'active' : ''}`}
            onClick={() => updateSettings({ practiceMode: 'fill' })}
          >
            实填模式
          </button>
        </div>
      </div>

      <div className="step-bar" aria-label="学习步骤">
        {STEP_LABELS.map((label, i) => {
          const stepNum = (i + 1) as LearnStep;
          const status = stepNum < step ? 'done' : stepNum === step ? 'active' : '';
          return (
            <div key={label} className={`step-seg ${status}`}>
              <div className="step-seg-line" />
              <span className="step-seg-label">{label}</span>
            </div>
          );
        })}
      </div>

      <div
        key={`${sentence.id}-${step}`}
        className={`card-surface drill-card animate-card-enter ${flashOk ? 'flash-ok' : ''}`}
      >
        <div className="drill-meta">
          <span className="drill-tag">
            {activeLesson?.title} · {sentence.layer}
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => speakEnglish(sentence.en)}
          >
            <Volume2 size={15} strokeWidth={1.5} />
            朗读英文 (R)
          </button>
        </div>

        <div className="drill-zh zh-text">
          {renderSentenceText(sentence.zh)}
        </div>

        {step === 1 && (
          <>
            <div className="drill-en-display serif-text">
              {renderSentenceText(sentence.en, sentence.resultWord)}
            </div>
            {sentence.resultWord && (
              <p className="page-sub" style={{ marginBottom: 16 }}>
                金色下划线为后半句结果词：<strong>{sentence.resultWord}</strong>
              </p>
            )}
            <div className="drill-actions">
              <span className="page-sub">
                {countdown > 0 ? `请默读理解句子（${countdown} 秒后可继续）` : '理解后进入下一步默写'}
              </span>
              <button
                type="button"
                className="btn-primary"
                disabled={countdown > 0}
                onClick={() => {
                  setStep(2);
                  setInput('');
                  setResult(null);
                  setStepMessage(null);
                }}
              >
                <Check size={16} strokeWidth={1.5} />
                {countdown > 0 ? `我记住了 (${countdown}s)` : '我记住了'}
              </button>
            </div>
          </>
        )}

        {step >= 2 && (
          <>
            {step === 2 && (
              <div className="cue-box">
                <span style={{ fontSize: 12, color: 'var(--ink-muted)', display: 'block', fontFamily: 'var(--font-sans)' }}>
                  首词提示
                </span>
                {renderSentenceText(sentence.cue)} …
              </div>
            )}

            {step === 3 && (
              <div className="cloze-box serif-text">
                {clozeParts.map((part, i) => {
                  if (part.kind === 'slot') {
                    return (
                      <Fragment key={i}>
                        <SlotChip slotId={part.slotId!} compact />
                        {part.trailingPunct}
                      </Fragment>
                    );
                  }
                  if (part.kind === 'blank') {
                    return (
                      <Fragment key={i}>
                        <span className="cloze-blank">____</span>
                        {part.trailingPunct}
                      </Fragment>
                    );
                  }
                  return (
                    <span key={i}>
                      {part.text}
                      {part.trailingPunct}
                    </span>
                  );
                })}
              </div>
            )}

            <textarea
              className={`drill-textarea ${shake ? 'animate-shake' : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!result) handleSubmitStep();
                  else handleProceed();
                }
              }}
              placeholder={
                practiceMode === 'framework'
                  ? '输入完整英文句子（槽位可写 [X] 或任意短语）…'
                  : '实填模式：请填入符合词性的真实英文内容…'
              }
              autoFocus
            />

            <div className="drill-actions">
              <div className="drill-actions-left">
                {practiceMode === 'fill' && sentence.slots.length > 0 && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={fillUniversalWords}
                  >
                    <Wand2 size={14} strokeWidth={1.5} />
                    用万能填充词
                  </button>
                )}
              </div>

              <div className="drill-actions-right">
                {!result ? (
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={!input.trim()}
                    onClick={handleSubmitStep}
                  >
                    提交判分 (Enter)
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleProceed}
                  >
                    {result.accuracy < 0.9
                      ? `退回第 ${Math.max(1, step - 1)} 步重练`
                      : step < 4
                        ? `进入第 ${step + 1} 步 (Enter)`
                        : '完成学习，加入 FSRS 复习 (Enter)'}
                  </button>
                )}
              </div>
            </div>

            {stepMessage && (
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--warn)' }}>
                {stepMessage}
              </p>
            )}

            {result && (
              <>
                <DiffResult
                  tokens={result.tokens}
                  accuracy={result.accuracy}
                  warnings={result.warnings}
                />
                <div className="answer-reveal">
                  <div className="answer-reveal-label">原文对照</div>
                  <div className="serif-text">
                    {renderSentenceText(sentence.en, sentence.resultWord)}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
