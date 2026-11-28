import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  FastForward,
  Layers,
  Link2,
  Play,
  RefreshCw,
  Shuffle,
  Volume2,
  Zap,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  generateCloze,
  gradeAnswer,
  gradeBigEssayAlignment,
  type BigEssayGradeResult,
  type GradeResult,
} from '../../core/grader';
import { getMasteryLevel } from '../../core/scheduler';
import {
  BIG_CORE_SENTENCES,
  BIG_LESSONS,
  BIG_SENTENCE_IDS,
  BIG_SENTENCE_MAP,
  bigSentenceToSentence,
  getBigSentencesForFormat,
  type BigFormatMode,
  type BigSentence,
} from '../../data/bigEssay';
import { deserializeCard, useProgress } from '../../store/useProgress';
import { useSettings } from '../../store/useSettings';
import { DiffResult } from '../DiffResult';
import { speakEnglish } from '../LetterView';
import { BigEssayPaperEditor } from './BigEssayPaper';
import { BigLogicChain } from './BigLogicChain';
import { BigVarHoverProvider, renderBigSentenceRich } from './BigVarHighlight';

type FastLearnStep = 1 | 2 | 3;
type SpecialCardMode = 'P' | 'O' | 'E' | null;

const FAST_STEP_LABELS = ['1. 看句朗读', '2. 挖空 1 轮', '3. 盲默过关'];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface BigLearnTabProps {
  onNavigateTab: (tab: 'plan' | 'practice' | 'packs' | 'chart') => void;
}

export function BigLearnTab({ onNavigateTab }: BigLearnTabProps) {
  const cards = useProgress((s) => s.cards);
  const completeNewSentence = useProgress((s) => s.completeNewSentence);
  const todayBigLearned = useProgress((s) => s.getTodayBigLearnedCount());

  const bigDailyNewLimit = useSettings((s) => s.bigDailyNewLimit);
  const practiceMode = useSettings((s) => s.practiceMode);
  const strictPunctuation = useSettings((s) => s.strictPunctuation);
  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);

  // Active sentence learning state (Fast 3-Step Flow, 0s wait)
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [step, setStep] = useState<FastLearnStep>(1);
  const [showBlindCue, setShowBlindCue] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [stepMessage, setStepMessage] = useState<string | null>(null);

  // Special drills: Paragraph Sprint (P), Order Card (O), Full Skeleton (E)
  const [specialMode, setSpecialMode] = useState<SpecialCardMode>(null);

  // Paragraph Sprint (整段连默)
  const [sprintPara, setSprintPara] = useState<1 | 2 | 3>(1);
  const [sprintInput, setSprintInput] = useState('');
  const [sprintShowCues, setSprintShowCues] = useState(true);
  const [sprintGrade, setSprintGrade] = useState<BigEssayGradeResult | null>(null);

  // Order Card (10 Core Sentences)
  const [oShuffled, setOShuffled] = useState<BigSentence[]>(() =>
    shuffle(BIG_CORE_SENTENCES)
  );
  const [oPickedIds, setOPickedIds] = useState<string[]>([]);
  const [oChecked, setOChecked] = useState(false);

  // Full Essay Skeleton Card (E)
  const [eFormat, setEFormat] = useState<BigFormatMode>('picture');
  const [eParagraphs, setEParagraphs] = useState<[string, string, string]>(['', '', '']);
  const [eGrade, setEGrade] = useState<BigEssayGradeResult | null>(null);

  const activeBigSentence = activeSentenceId
    ? BIG_SENTENCE_MAP[activeSentenceId]
    : null;
  const activeSentenceObj = useMemo(
    () => (activeBigSentence ? bigSentenceToSentence(activeBigSentence) : null),
    [activeBigSentence]
  );

  const clozeParts = useMemo(() => {
    if (!activeSentenceObj || step !== 2) return [];
    const seed = (activeBigSentence?.order ?? 1) * 31 + 19;
    return generateCloze(activeSentenceObj, seed, 0.5);
  }, [activeSentenceObj, activeBigSentence, step]);

  // Reset input on step / sentence change
  useEffect(() => {
    setInput('');
    setResult(null);
    setShowBlindCue(false);
  }, [activeSentenceId, step]);

  const startSentenceLesson = (lessonId: number, specificSentenceId?: string) => {
    const lesson = BIG_LESSONS.find((l) => l.id === lessonId);
    if (!lesson?.sentenceIds?.length) return;
    const firstUnlearned =
      specificSentenceId ??
      lesson.sentenceIds.find((id) => !cards[id]) ??
      lesson.sentenceIds[0];
    setSpecialMode(null);
    setActiveLessonId(lessonId);
    setActiveSentenceId(firstUnlearned);
    setStep(1);
    setStepMessage(null);
  };

  const openParagraphSprint = (para: 1 | 2 | 3) => {
    setActiveLessonId(null);
    setActiveSentenceId(null);
    setSprintPara(para);
    setSprintInput('');
    setSprintGrade(null);
    setSprintShowCues(true);
    setSpecialMode('P');
  };

  const advanceToNextSentence = (completedId: string, msg?: string) => {
    const lesson = BIG_LESSONS.find((l) => l.id === activeLessonId);
    const ids = lesson?.sentenceIds ?? [];
    const idx = ids.indexOf(completedId);
    if (idx >= 0 && idx + 1 < ids.length) {
      setActiveSentenceId(ids[idx + 1]);
      setStep(1);
      setStepMessage(msg ?? '已入库 FSRS 复习队列，自动进入下一句！');
    } else {
      // Finished this lesson!
      setActiveLessonId(null);
      setActiveSentenceId(null);
      setStep(1);
      setStepMessage(null);
    }
  };

  const markSentenceMasteredNow = () => {
    if (!activeBigSentence) return;
    completeNewSentence(activeBigSentence.id, { requestRetention, examDate });
    advanceToNextSentence(
      activeBigSentence.id,
      `已熟记「${activeBigSentence.role}」并加入 FSRS 复习！`
    );
  };

  const handleSubmitStep = () => {
    if (!activeSentenceObj || !input.trim()) return;
    const g = gradeAnswer(activeSentenceObj, input, {
      mode: practiceMode,
      strictPunctuation,
      usedHint: step === 2 || showBlindCue,
    });
    setResult(g);
  };

  const handleProceed = () => {
    if (!activeBigSentence || !result) return;
    if (step === 2) {
      setStep(3);
      setStepMessage(
        result.accuracy >= 0.85
          ? '挖空过关！最后一步盲默即可入库。'
          : '已对照纠错，直接进盲默把易错词写牢！'
      );
      return;
    }

    // Step 3: Save into FSRS and advance
    completeNewSentence(activeBigSentence.id, { requestRetention, examDate });
    advanceToNextSentence(activeBigSentence.id);
  };

  // ========== Active Sentence Learning View (Fast 3-Step) ==========
  if (activeBigSentence && activeSentenceObj) {
    const lesson = BIG_LESSONS.find((l) => l.id === activeLessonId);
    const lessonIds = lesson?.sentenceIds ?? [];
    const curPos = lessonIds.indexOf(activeBigSentence.id) + 1;

    return (
      <BigVarHoverProvider>
        <div>
          <div className="focus-topbar">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setActiveLessonId(null);
                setActiveSentenceId(null);
              }}
            >
              <ArrowLeft size={16} strokeWidth={1.6} />
              返回骨架课程
            </button>
            <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
              {lesson?.dayTag} · 第 {curPos}/{lessonIds.length} 句
            </span>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => speakEnglish(activeBigSentence.en)}
            >
              <Volume2 size={15} strokeWidth={1.6} />
              朗读
            </button>
          </div>

          <div className="big-step-bar">
            {FAST_STEP_LABELS.map((label, idx) => {
              const sNum = (idx + 1) as FastLearnStep;
              const cls =
                sNum < step ? 'step-done' : sNum === step ? 'step-active' : 'step-todo';
              return (
                <button
                  key={label}
                  type="button"
                  className={`big-step-pill ${cls}`}
                  style={{ cursor: 'pointer', border: 'none' }}
                  onClick={() => setStep(sNum)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {stepMessage && (
            <div className="big-inline-notice">{stepMessage}</div>
          )}

          <div className="card-surface drill-card">
            <div className="drill-meta">
              <span className="drill-tag">
                {activeBigSentence.isFormatShell
                  ? `第一段外壳 · ${activeBigSentence.role}`
                  : `第 ${activeBigSentence.paragraph} 段 · ${activeBigSentence.role}`}
              </span>
              <span className="page-sub" style={{ margin: 0 }}>
                极速 3 步 · 0 等待 · 随时可点“我已背熟”秒过
              </span>
            </div>

            {activeBigSentence.smallEssayLink && (
              <div className="big-link-callout">
                <Link2 size={14} strokeWidth={1.7} />
                <span>{activeBigSentence.smallEssayLink}</span>
              </div>
            )}

            <div className="drill-zh zh-text">
              {renderBigSentenceRich(activeBigSentence.zh)}
            </div>

            {step === 1 && (
              <>
                <div className="drill-en-display serif-text">
                  {renderBigSentenceRich(activeBigSentence.en)}
                </div>
                {activeBigSentence.note && (
                  <p className="setting-desc" style={{ marginBottom: 14 }}>
                    考场提示：{activeBigSentence.note}
                  </p>
                )}
                <div className="drill-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={markSentenceMasteredNow}
                  >
                    <FastForward size={14} strokeWidth={1.7} />
                    我已背熟，直接入库
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setStep(2)}
                  >
                    进入挖空默写 →
                  </button>
                </div>
              </>
            )}

            {step > 1 && (
              <>
                {step === 2 && (
                  <div className="cloze-box serif-text">
                    {clozeParts.map((cp, idx) => (
                      <Fragment key={idx}>
                        {cp.kind === 'slot' ? (
                          <span className="slot-chip">
                            {cp.slotId}
                            {cp.defaultValue ? ` (${cp.defaultValue})` : ''}
                          </span>
                        ) : cp.kind === 'blank' ? (
                          <span className="cloze-blank">
                            {'_'.repeat(Math.max(4, cp.text.length))}
                          </span>
                        ) : (
                          <span>{cp.text}</span>
                        )}
                        {cp.trailingPunct ?? ''}
                      </Fragment>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="toolbar-group" style={{ marginBottom: 10 }}>
                    <button
                      type="button"
                      className="btn-ghost formula-mini-btn"
                      onClick={() => setShowBlindCue((v) => !v)}
                    >
                      {showBlindCue ? <EyeOff size={13} /> : <Eye size={13} />}
                      {showBlindCue ? '隐藏首词提示' : '卡壳了？看首词提示'}
                    </button>
                    {showBlindCue && (
                      <span className="serif-text" style={{ fontSize: 14, color: 'var(--gold)' }}>
                        {activeBigSentence.cue} …
                      </span>
                    )}
                  </div>
                )}

                <textarea
                  className="drill-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={Boolean(result)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !result) {
                      e.preventDefault();
                      handleSubmitStep();
                    }
                  }}
                  placeholder="输入完整英文句子（固定英文需拼准，空位可写 [X] / [B1] 或任意实际内容）…"
                  autoFocus
                />

                {!result ? (
                  <div className="drill-actions">
                    <div className="toolbar-group">
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => setStep(Math.max(1, step - 1) as FastLearnStep)}
                      >
                        看原句
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={markSentenceMasteredNow}
                      >
                        <FastForward size={14} />
                        已背熟跳过
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn-primary"
                      disabled={!input.trim()}
                      onClick={handleSubmitStep}
                    >
                      提交判分 (Enter)
                    </button>
                  </div>
                ) : (
                  <>
                    <DiffResult
                      tokens={result.tokens}
                      accuracy={result.accuracy}
                      warnings={result.warnings}
                    />
                    <div className="answer-reveal">
                      <div className="answer-reveal-label">标准固定骨架</div>
                      <div className="serif-text">
                        {renderBigSentenceRich(activeBigSentence.en)}
                      </div>
                    </div>
                    <div className="drill-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setInput('');
                          setResult(null);
                        }}
                      >
                        <RefreshCw size={14} />
                        本步重写一遍
                      </button>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleProceed}
                      >
                        <Check size={15} />
                        {step === 2
                          ? '进入盲默过关 →'
                          : result.accuracy >= 0.85
                            ? '过关入库，下一句 →'
                            : '记住错词，直接入库 →'}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </BigVarHoverProvider>
    );
  }

  // ========== Special Mode P: Paragraph Continuous Sprint (整段连默) ==========
  if (specialMode === 'P') {
    const paraSentences = BIG_CORE_SENTENCES.filter((s) => s.paragraph === sprintPara);
    const paraTitle =
      sprintPara === 1
        ? '第一段（描述 → 揭示 → 意义 · 3 句）'
        : sprintPara === 2
          ? '第二段（好处 → 受重视 → 媒体教育 · 3 句）'
          : '第三段（关键 → 社会 → 个人 → 倒装 · 4 句）';

    return (
      <section className="card-surface politics-drill-card">
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回骨架课程
          </button>
          <span className="drill-tag">整段连默 · 肌肉记忆快刷</span>
          <div className="toolbar-group">
            {([1, 2, 3] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`btn-secondary formula-mini-btn ${sprintPara === p ? 'active' : ''}`}
                onClick={() => {
                  setSprintPara(p);
                  setSprintInput('');
                  setSprintGrade(null);
                }}
              >
                第 {p} 段
              </button>
            ))}
          </div>
        </div>

        <div className="section-row-head" style={{ marginBottom: 10 }}>
          <h3 className="section-small-title">{paraTitle}</h3>
          <button
            type="button"
            className="btn-ghost formula-mini-btn"
            onClick={() => setSprintShowCues((v) => !v)}
          >
            {sprintShowCues ? <EyeOff size={13} /> : <Eye size={13} />}
            {sprintShowCues ? '隐藏首词提示（纯盲默）' : '显示首词提示'}
          </button>
        </div>

        {sprintShowCues && (
          <div className="big-cue-chain-box" style={{ marginBottom: 12 }}>
            {paraSentences.map((s, idx) => (
              <span key={s.id} className="big-cue-pill">
                <strong className="tabular-nums">{idx + 1}.</strong> {s.cue}…
              </span>
            ))}
          </div>
        )}

        <textarea
          className="exam-ruled-textarea big-paper-textarea"
          style={{ minHeight: 150, width: '100%' }}
          value={sprintInput}
          disabled={Boolean(sprintGrade)}
          onChange={(e) => setSprintInput(e.target.value)}
          placeholder="一口气默写出整段固定句型（空位可写 [X] / [PIC] / [B1] / [B2] / [DO] 或直接代入单词）…"
          autoFocus
        />

        <div className="toolbar-group" style={{ marginTop: 12 }}>
          {!sprintGrade ? (
            <button
              type="button"
              className="btn-primary"
              disabled={!sprintInput.trim()}
              onClick={() =>
                setSprintGrade(
                  gradeBigEssayAlignment(sprintInput, { sentences: paraSentences })
                )
              }
            >
              提交整段核对
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSprintInput('');
                  setSprintGrade(null);
                }}
              >
                <RefreshCw size={14} />
                本段再刷一遍
              </button>
              {sprintPara < 3 && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setSprintPara((sprintPara + 1) as 1 | 2 | 3);
                    setSprintInput('');
                    setSprintGrade(null);
                  }}
                >
                  连默下一段（第 {sprintPara + 1} 段）→
                </button>
              )}
            </>
          )}
        </div>

        {sprintGrade && (
          <div style={{ marginTop: 14 }}>
            <div className="section-row-head" style={{ marginBottom: 8 }}>
              <strong
                style={{
                  color: sprintGrade.fixedAccuracy >= 0.9 ? 'var(--ok)' : 'var(--gold)',
                }}
              >
                固定句型准确率：{Math.round(sprintGrade.fixedAccuracy * 100)}%
              </strong>
              <span className="page-sub tabular-nums" style={{ margin: 0 }}>
                命中 {sprintGrade.matchedFixedWords} / {sprintGrade.totalFixedWords} 固定词
              </span>
            </div>
            {sprintGrade.missingFragments.length === 0 ? (
              <p style={{ color: 'var(--ok)', fontSize: 14, margin: '0 0 10px' }}>
                整段一字不差命中！肌肉记忆已成型。
              </p>
            ) : (
              <ul className="big-missing-list" style={{ marginBottom: 10 }}>
                {sprintGrade.missingFragments.map((mf, i) => (
                  <li key={i}>
                    <strong>第 {mf.sentenceNumber} 句（{mf.role}）</strong> 漏掉：
                    <code>{mf.expected}</code>
                  </li>
                ))}
              </ul>
            )}
            <div className="answer-reveal">
              <div className="answer-reveal-label">本段标准原文对照</div>
              <div className="serif-text" style={{ lineHeight: 1.8 }}>
                {paraSentences.map((s) => s.en).join(' ')}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // ========== Special Mode O: 10-Sentence Core Cue Chain ==========
  if (specialMode === 'O') {
    const isAllCorrect =
      oChecked &&
      BIG_CORE_SENTENCES.every((s, idx) => oPickedIds[idx] === s.id);
    return (
      <section className="card-surface politics-drill-card">
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回骨架课程
          </button>
          <span className="drill-tag">O 排序卡 · 10 句核心首词链</span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setOShuffled(shuffle(BIG_CORE_SENTENCES));
              setOPickedIds([]);
              setOChecked(false);
            }}
          >
            <RefreshCw size={14} />
            重新打乱
          </button>
        </div>

        <p className="page-sub" style={{ marginBottom: 12 }}>
          按「第一段（3句）→ 第二段（3句）→ 第三段（4句）」的逻辑顺序依次点击 10 个首词：
        </p>

        <div className="order-zone politics-order-zone" style={{ marginBottom: 14 }}>
          {oPickedIds.length === 0 ? (
            <span className="setting-desc" style={{ margin: 0 }}>
              依次点击下方首词卡片排序（点击已选项可撤回）…
            </span>
          ) : (
            <div className="politics-order-chips">
              {oPickedIds.map((id, idx) => {
                const s = BIG_SENTENCE_MAP[id];
                const okPos = BIG_CORE_SENTENCES[idx]?.id === id;
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={oChecked}
                    className={`politics-order-chip ${
                      oChecked ? (okPos ? 'choice-ok' : 'choice-err') : 'selected'
                    }`}
                    onClick={() =>
                      setOPickedIds((prev) => prev.filter((x) => x !== id))
                    }
                  >
                    <span className="politics-choice-idx tabular-nums">{idx + 1}</span>
                    <span>{s.cue}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="politics-order-chips">
          {oShuffled.map((s) => {
            const used = oPickedIds.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                disabled={used || oChecked}
                className={`politics-order-chip ${used ? 'used' : ''}`}
                onClick={() => setOPickedIds((prev) => [...prev, s.id])}
              >
                {s.cue}
              </button>
            );
          })}
        </div>

        <div className="toolbar-group" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn-primary"
            disabled={oPickedIds.length !== BIG_CORE_SENTENCES.length || oChecked}
            onClick={() => setOChecked(true)}
          >
            核对首词顺序
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setOPickedIds([]);
              setOChecked(false);
            }}
          >
            清空重排
          </button>
        </div>

        {oChecked && (
          <div className="id-feedback">
            <div
              className="id-feedback-head"
              style={{ color: isAllCorrect ? 'var(--ok)' : 'var(--err)' }}
            >
              {isAllCorrect
                ? '10 句核心首词链全部准确！整篇结构已成肌肉记忆'
                : '部分顺序有误，请对照标准 10 句首词链：'}
            </div>
            <ol className="politics-order-answer-list">
              {BIG_CORE_SENTENCES.map((s) => (
                <li key={s.id}>
                  <strong>{s.cue}</strong>
                  <span className="politics-order-hint">
                    {' '}
                    （P{s.paragraph} · {s.role}）
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    );
  }

  // ========== Special Mode E: Full Skeleton Blind Sprint ==========
  if (specialMode === 'E') {
    const joined = eParagraphs.filter((p) => p.trim()).join('\n\n');
    const targetSentences = getBigSentencesForFormat(eFormat);
    return (
      <div>
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回骨架课程
          </button>
          <span className="drill-tag">E 整篇骨架盲默</span>
          <div className="toolbar-group">
            {(
              [
                ['picture', '纯图画'],
                ['hybrid', '图文结合'],
                ['chart', '纯图表'],
              ] as const
            ).map(([fmt, label]) => (
              <button
                key={fmt}
                type="button"
                className={`btn-secondary formula-mini-btn ${eFormat === fmt ? 'active' : ''}`}
                onClick={() => {
                  setEFormat(fmt);
                  setEGrade(null);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="card-surface today-section-card">
          <BigLogicChain compact />
        </div>

        <BigEssayPaperEditor
          paragraphs={eParagraphs}
          onChange={setEParagraphs}
          disabled={Boolean(eGrade)}
          headerLeft="只看逻辑链默写三段固定骨架（空位可写 [X] / [PIC] / [B1] / [B2] / [DO]）"
        />

        <div className="toolbar-group" style={{ marginTop: 14 }}>
          {!eGrade ? (
            <button
              type="button"
              className="btn-primary"
              disabled={!joined.trim()}
              onClick={() =>
                setEGrade(
                  gradeBigEssayAlignment(joined, { sentences: targetSentences })
                )
              }
            >
              提交整篇骨架判分
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEParagraphs(['', '', '']);
                setEGrade(null);
              }}
            >
              清空再默写一遍
            </button>
          )}
        </div>

        {eGrade && (
          <div className="card-surface today-section-card" style={{ marginTop: 14 }}>
            <div className="section-row-head">
              <h3 className="section-small-title">整篇骨架对齐判分结果</h3>
              <span className="tabular-nums" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                固定句型准确率 {Math.round(eGrade.fixedAccuracy * 100)}% · {eGrade.wordCount} 词
              </span>
            </div>
            {eGrade.missingFragments.length === 0 ? (
              <p style={{ color: 'var(--ok)', fontSize: 14, margin: 0 }}>
                全部 10 句核心固定句型均已完整命中！
              </p>
            ) : (
              <ul className="big-missing-list">
                {eGrade.missingFragments.map((mf, i) => (
                  <li key={i}>
                    <strong>第 {mf.sentenceNumber} 句（{mf.role}）</strong> 漏掉固定片段：
                    <code>{mf.expected}</code>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }

  // ========== Curriculum Overview (4-Day Zero-Lock Sprint Track) ==========
  const learnedBigCount = BIG_SENTENCE_IDS.filter((id) => Boolean(cards[id])).length;

  return (
    <div>
      {/* 4-Lesson Zero-Lock Curriculum */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <div>
            <h2 className="section-small-title">Step 1 · 死背 12 句万能骨架（零锁门 · 极速 3 步）</h2>
            <p className="page-sub" style={{ marginTop: 4 }}>
              Day 1 背前两段 6 句，Day 2 背第三段 4 句 + 图表/图文 2 句壳；背完每段点「整段连默」直接形成肌肉记忆
            </p>
          </div>
          <span className="page-sub tabular-nums" style={{ margin: 0, whiteSpace: 'nowrap' }}>
            已学 {learnedBigCount} / {BIG_SENTENCE_IDS.length} 句 · 今日 {todayBigLearned}/{bigDailyNewLimit}
          </span>
        </div>

        <div className="lesson-grid" style={{ marginTop: 12 }}>
          {BIG_LESSONS.map((lesson) => {
            const sIds = lesson.sentenceIds ?? [];
            const doneCount = sIds.filter((id) => Boolean(cards[id])).length;

            return (
              <div key={lesson.id} className="card-surface lesson-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span className="drill-tag">{lesson.dayTag}</span>
                    {lesson.badge && <span className="formula-tag-warn">{lesson.badge}</span>}
                    <span className="lesson-info-title" style={{ margin: 0 }}>
                      {lesson.title}
                    </span>
                  </div>
                  <div className="lesson-info-sub">{lesson.subtitle}</div>
                  {sIds.length > 0 && (
                    <div className="big-lesson-dots">
                      {sIds.map((sid) => {
                        const bs = BIG_SENTENCE_MAP[sid];
                        if (!bs) return null;
                        const raw = cards[sid];
                        const lv = getMasteryLevel(raw ? deserializeCard(raw) : undefined);
                        return (
                          <button
                            key={sid}
                            type="button"
                            className="big-lesson-dot-btn"
                            onClick={() => startSentenceLesson(lesson.id, sid)}
                            title={`直接练习：${bs.role}`}
                          >
                            <span className={`mastery-dot mastery-${lv}`} />
                            <span>{bs.role}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="lesson-progress-meta">
                  <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                    {doneCount}/{sIds.length}
                  </span>
                  {lesson.paragraph && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => openParagraphSprint(lesson.paragraph!)}
                    >
                      <Zap size={13} />
                      整段连默
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => startSentenceLesson(lesson.id)}
                  >
                    <Play size={14} />
                    {doneCount === sIds.length ? '再刷一遍' : '极速开背'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fast Muscle-Memory Drills (Zero Lock!) */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">骨架肌肉记忆快刷（全部免解锁，随时可练）</h2>
          <span className="page-sub" style={{ margin: 0 }}>
            背完后用这 4 个工具固化到考场秒默
          </span>
        </div>

        <div className="formula-quick-modes">
          <button
            type="button"
            className="card-surface formula-mode-tile"
            onClick={() => openParagraphSprint(1)}
          >
            <div className="formula-mode-tile-top">
              <Zap size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">3 段</span>
            </div>
            <div className="formula-mode-name">整段连默（P1 / P2 / P3）</div>
            <div className="formula-mode-desc">
              按段落一口气连默，比逐句背快 3 倍，直接练出考场书写节奏
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            onClick={() => {
              setOShuffled(shuffle(BIG_CORE_SENTENCES));
              setOPickedIds([]);
              setOChecked(false);
              setSpecialMode('O');
            }}
          >
            <div className="formula-mode-tile-top">
              <Shuffle size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">10 句</span>
            </div>
            <div className="formula-mode-name">O 首词链排序卡</div>
            <div className="formula-mode-desc">
              把打乱的 10 个首词按三段逻辑排好，确保考场永不断片
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            onClick={() => {
              setEParagraphs(['', '', '']);
              setEGrade(null);
              setSpecialMode('E');
            }}
          >
            <div className="formula-mode-tile-top">
              <CheckCircle2 size={17} style={{ color: 'var(--ok)' }} />
              <span className="formula-mode-count">3 壳</span>
            </div>
            <div className="formula-mode-name">E 整篇骨架盲默</div>
            <div className="formula-mode-desc">
              支持纯图画 / 图文结合 / 纯图表，看逻辑链直接盲默三段骨架
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            onClick={() => onNavigateTab('plan')}
          >
            <div className="formula-mode-tile-top">
              <Layers size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">Day 3</span>
            </div>
            <div className="formula-mode-name">去下一步：60 秒填 5 空 →</div>
            <div className="formula-mode-desc">
              骨架背熟后直接练 13 道真题风模拟题，1 分钟定好 5 个空位
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
