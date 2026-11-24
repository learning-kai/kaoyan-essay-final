import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Layers,
  Link2,
  Lock,
  Play,
  RefreshCw,
  Shuffle,
  Unlock,
  Volume2,
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
  BIG_LESSONS,
  BIG_SENTENCES,
  BIG_SENTENCE_IDS,
  BIG_SENTENCE_MAP,
  PLAN_VAR_MAP,
  bigSentenceToSentence,
  type BigSentence,
} from '../../data/bigEssay';
import { deserializeCard, useProgress } from '../../store/useProgress';
import { useSettings } from '../../store/useSettings';
import { DiffResult } from '../DiffResult';
import { speakEnglish } from '../LetterView';
import { BigEssayPaperEditor } from './BigEssayPaper';
import { BigLogicChain } from './BigLogicChain';
import { BigVarHoverProvider, renderBigSentenceRich } from './BigVarHighlight';

type BigLearnStep = 1 | 2 | 3 | 4 | 5;
type SpecialCardMode = 'O' | 'V' | 'E' | null;

const BIG_STEP_LABELS = [
  '1. 理解句子',
  '2. 首词提示',
  '3. 挖空 40%',
  '4. 挖空 80%',
  '5. 只看中文',
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface VarQuizItem {
  sentence: BigSentence;
  targetVarId: string;
  options: string[];
}

function buildVarQuiz(): VarQuizItem {
  const candidates: { s: BigSentence; varId: string }[] = [];
  for (const s of BIG_SENTENCES) {
    const matches = [...s.en.matchAll(/\{\{(\w+)(?:\|[^}]+)?\}\}/g)];
    for (const m of matches) {
      if (['X', 'PIC', 'B1', 'B2', 'DO', 'G', 'LIMIT', 'OLD', 'NEW', 'MEDIA', 'ACT', 'N1'].includes(m[1])) {
        candidates.push({ s, varId: m[1] });
      }
    }
  }
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const pool = ['X', 'PIC', 'B1', 'B2', 'DO', 'G', 'LIMIT', 'OLD', 'NEW', 'MEDIA', 'ACT', 'N1'].filter(
    (v) => v !== picked.varId
  );
  const distractors = shuffle(pool).slice(0, 3);
  return {
    sentence: picked.s,
    targetVarId: picked.varId,
    options: shuffle([picked.varId, ...distractors]),
  };
}

const POS_ZH: Record<string, string> = {
  noun: '名词短语',
  verb: '动词原形短语',
  clause: '从句',
  adj: '形容词',
};

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
  const unlockAllLessons = useSettings((s) => s.unlockAllLessons);
  const requestRetention = useSettings((s) => s.requestRetention);
  const examDate = useSettings((s) => s.examDate);

  // Active sentence learning state
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [step, setStep] = useState<BigLearnStep>(1);
  const [countdown, setCountdown] = useState(5);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [stepMessage, setStepMessage] = useState<string | null>(null);

  // Special card drills (O, V, E)
  const [specialMode, setSpecialMode] = useState<SpecialCardMode>(null);

  // O-card: 11 cues ordering
  const [oShuffled, setOShuffled] = useState<BigSentence[]>(() => shuffle(BIG_SENTENCES));
  const [oPickedIds, setOPickedIds] = useState<string[]>([]);
  const [oChecked, setOChecked] = useState(false);

  // V-card: variable & POS identification
  const [vQuiz, setVQuiz] = useState<VarQuizItem>(() => buildVarQuiz());
  const [vPicked, setVPicked] = useState<string | null>(null);

  // E-card: whole essay fixed-skeleton recall from logic chain
  const [eParagraphs, setEParagraphs] = useState<[string, string, string]>(['', '', '']);
  const [eGrade, setEGrade] = useState<BigEssayGradeResult | null>(null);

  // Lesson 6 (Chart) collapsed by default
  const [chartLessonOpen, setChartLessonOpen] = useState(false);

  // Unlock checks
  const lesson1Done = BIG_LESSONS[0].sentenceIds!.every((id) => Boolean(cards[id]));
  const lesson2Done = BIG_LESSONS[1].sentenceIds!.every((id) => Boolean(cards[id]));
  const lesson3Done = BIG_LESSONS[2].sentenceIds!.every((id) => Boolean(cards[id]));
  const allStable3Days = BIG_SENTENCE_IDS.every((id) => {
    const raw = cards[id];
    return raw ? deserializeCard(raw).stability >= 3 : false;
  });

  const isLessonUnlocked = (lessonId: number): boolean => {
    if (unlockAllLessons || lessonId === 1 || lessonId === 6) return true;
    if (lessonId === 2) return lesson1Done;
    if (lessonId === 3) return lesson2Done;
    if (lessonId === 4) return lesson3Done;
    if (lessonId === 5) return lesson3Done;
    return true;
  };

  const activeBigSentence = activeSentenceId ? BIG_SENTENCE_MAP[activeSentenceId] : null;
  const activeSentenceObj = useMemo(
    () => (activeBigSentence ? bigSentenceToSentence(activeBigSentence) : null),
    [activeBigSentence]
  );

  // Step 1 5-second reading timer
  useEffect(() => {
    if (!activeBigSentence || step !== 1) return;
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
  }, [activeBigSentence?.id, step]);

  const clozeParts = useMemo(() => {
    if (!activeSentenceObj) return [];
    if (step === 3) return generateCloze(activeSentenceObj, activeSentenceObj.id.length * 13, 0.4);
    if (step === 4) return generateCloze(activeSentenceObj, activeSentenceObj.id.length * 29 + 7, 0.8);
    return [];
  }, [activeSentenceObj, step]);

  const startSentenceLesson = (lessonId: number, specificSentenceId?: string) => {
    const lesson = BIG_LESSONS.find((l) => l.id === lessonId);
    if (!lesson || !lesson.sentenceIds) return;
    const firstId =
      specificSentenceId ??
      lesson.sentenceIds.find((id) => !cards[id]) ??
      lesson.sentenceIds[0];
    setSpecialMode(null);
    setActiveLessonId(lessonId);
    setActiveSentenceId(firstId);
    setStep(1);
    setInput('');
    setResult(null);
    setStepMessage(null);
  };

  const handleSubmitStep = () => {
    if (!activeSentenceObj || !input.trim()) return;
    const graded = gradeAnswer(activeSentenceObj, input, {
      mode: practiceMode,
      strictPunctuation,
    });
    setResult(graded);
    if (graded.accuracy >= 0.9) {
      setStepMessage(null);
    } else {
      setStepMessage(
        `本步准确率 ${Math.round(graded.accuracy * 100)}%（需 ≥ 90%），将退回上一步重新巩固。`
      );
    }
  };

  const handleProceed = () => {
    if (!activeBigSentence || !result) return;
    if (result.accuracy < 0.9) {
      setStep(Math.max(1, step - 1) as BigLearnStep);
      setInput('');
      setResult(null);
      return;
    }

    if (step < 5) {
      setStep((step + 1) as BigLearnStep);
      setInput('');
      setResult(null);
      setStepMessage(null);
      return;
    }

    // Step 5 passed -> record in FSRS with deck: 'big'
    completeNewSentence(activeBigSentence.id, { requestRetention, examDate });
    const lesson = BIG_LESSONS.find((l) => l.id === activeLessonId);
    const ids = lesson?.sentenceIds ?? [];
    const curIdx = ids.indexOf(activeBigSentence.id);
    if (curIdx >= 0 && curIdx + 1 < ids.length) {
      setActiveSentenceId(ids[curIdx + 1]);
      setStep(1);
      setInput('');
      setResult(null);
      setStepMessage('上一句已入库 FSRS（deck: big），继续本课下一句！');
    } else {
      setActiveLessonId(null);
      setActiveSentenceId(null);
      setStep(1);
      setInput('');
      setResult(null);
      setStepMessage(null);
    }
  };

  // ========== Active Sentence Learning View ==========
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
              返回课程列表
            </button>
            <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
              {lesson?.title} · 第 {curPos}/{lessonIds.length} 句
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
            {BIG_STEP_LABELS.map((label, idx) => {
              const sNum = (idx + 1) as BigLearnStep;
              const cls =
                sNum < step ? 'step-done' : sNum === step ? 'step-active' : 'step-todo';
              return (
                <span key={label} className={`big-step-pill ${cls}`}>
                  {label}
                </span>
              );
            })}
          </div>

          {stepMessage && (
            <div className="big-inline-notice">{stepMessage}</div>
          )}

          <div className="card-surface drill-card">
            <div className="drill-meta">
              <span className="drill-tag">
                第 {activeBigSentence.paragraph} 段 · {activeBigSentence.role}
                {activeBigSentence.optional ? '（可选句）' : ''}
              </span>
              <span className="page-sub" style={{ margin: 0 }}>
                大作文 5 步渐进（含两轮 40%/80% 挖空）
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
                    提示：{activeBigSentence.note}
                  </p>
                )}
                <div className="drill-actions">
                  <span className="page-sub" style={{ margin: 0 }}>
                    悬停红色变量可查看词性与默认值，默读理解后进入首词默写
                  </span>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={countdown > 0}
                    onClick={() => setStep(2)}
                  >
                    {countdown > 0 ? `先默读理解（${countdown}s）` : '我理解了，进入首词提示'}
                  </button>
                </div>
              </>
            )}

            {step > 1 && (
              <>
                {step === 2 && (
                  <div className="cue-box">
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--ink-muted)',
                        display: 'block',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      首词提示（槽位可写 [X] / [PIC] 或直接填默认英文短语）
                    </span>
                    {activeBigSentence.cue} …
                  </div>
                )}

                {(step === 3 || step === 4) && (
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
                  placeholder="输入完整英文句子（固定句型需准确，变量处可写 [X] 或实际内容）…"
                  autoFocus
                />

                {!result ? (
                  <div className="drill-actions">
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => setStep(Math.max(1, step - 1) as BigLearnStep)}
                    >
                      退回上一步
                    </button>
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
                      <div className="answer-reveal-label">标准原文（附录 A）</div>
                      <div className="serif-text">
                        {renderBigSentenceRich(activeBigSentence.en)}
                      </div>
                    </div>
                    <div className="drill-actions">
                      <span className="page-sub" style={{ margin: 0 }}>
                        {result.accuracy >= 0.9
                          ? step === 5
                            ? '通过！将加入 FSRS 复习队列（deck: big）'
                            : '达标（≥ 90%），进入下一步'
                          : '未达 90%，将退回上一步巩固'}
                      </span>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleProceed}
                      >
                        <Check size={15} />
                        {result.accuracy >= 0.9
                          ? step === 5
                            ? '完成本句并入库 FSRS'
                            : '下一步'
                          : '退回巩固'}
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

  // ========== Special Card Views: O / V / E ==========
  if (specialMode === 'O') {
    const isAllCorrect =
      oChecked &&
      BIG_SENTENCES.every((s, idx) => oPickedIds[idx] === s.id);
    return (
      <section className="card-surface politics-drill-card">
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回大作文学习
          </button>
          <span className="drill-tag">O 排序卡 · 11 句整篇首词链</span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setOShuffled(shuffle(BIG_SENTENCES));
              setOPickedIds([]);
              setOChecked(false);
            }}
          >
            <RefreshCw size={14} />
            重新打乱
          </button>
        </div>

        <p className="page-sub" style={{ marginBottom: 12 }}>
          按「第一段（3句）→ 第二段（4句）→ 第三段（4句）」的逻辑顺序依次点击 11 个首词：
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
                const okPos = BIG_SENTENCES[idx]?.id === id;
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
            disabled={oPickedIds.length !== BIG_SENTENCES.length || oChecked}
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
                ? '11 句首词链全部准确！整篇结构已成肌肉记忆'
                : '部分顺序有误，请对照标准 11 句首词链：'}
            </div>
            <ol className="politics-order-answer-list">
              {BIG_SENTENCES.map((s) => (
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

  if (specialMode === 'V') {
    const targetMeta = PLAN_VAR_MAP[vQuiz.targetVarId];
    const maskedSentence = vQuiz.sentence.en.replace(
      new RegExp(`\\{\\{${vQuiz.targetVarId}(?:\\|[^}]+)?\\}\\}`, 'g'),
      '【 ？？？ 】'
    );

    return (
      <section className="card-surface politics-drill-card">
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回大作文学习
          </button>
          <span className="drill-tag">V 变量卡 · 槽位与词性反射</span>
        </div>

        <div className="politics-drill-prompt">
          <div className="setting-desc" style={{ marginBottom: 6 }}>
            高亮空位【 ？？？ 】应该放入哪个变量？
          </div>
          <p className="politics-drill-stem serif-text">{maskedSentence}</p>
        </div>

        <div className="id-choice-grid">
          {vQuiz.options.map((varId) => {
            const meta = PLAN_VAR_MAP[varId];
            let cls = 'id-choice-btn politics-choice-btn';
            if (vPicked !== null) {
              if (varId === vQuiz.targetVarId) cls += ' choice-ok';
              else if (varId === vPicked) cls += ' choice-err';
            }
            return (
              <button
                key={varId}
                type="button"
                disabled={vPicked !== null}
                className={cls}
                onClick={() => setVPicked(varId)}
              >
                <span className="politics-choice-text">
                  <strong>{`{{${varId}}}`}</strong> · {meta?.label ?? varId}
                </span>
              </button>
            );
          })}
        </div>

        {vPicked !== null && (
          <div className="id-feedback">
            <div
              className="id-feedback-head"
              style={{
                color: vPicked === vQuiz.targetVarId ? 'var(--ok)' : 'var(--err)',
              }}
            >
              {vPicked === vQuiz.targetVarId
                ? `正确！这里放 {{${vQuiz.targetVarId}}}（${targetMeta?.label}）`
                : `正确答案是 {{${vQuiz.targetVarId}}}（${targetMeta?.label}）`}
            </div>
            <p className="politics-drill-explain">
              词性要求：<strong>{POS_ZH[targetMeta?.pos ?? 'noun']}</strong>
              {targetMeta?.rule ? ` · ${targetMeta.rule}` : ''}
              {targetMeta?.defaultValue
                ? ` · 万能默认值：${targetMeta.defaultValue}`
                : '（考场必填）'}
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: 12 }}
              onClick={() => {
                setVQuiz(buildVarQuiz());
                setVPicked(null);
              }}
            >
              下一张变量卡
            </button>
          </div>
        )}
      </section>
    );
  }

  if (specialMode === 'E') {
    const joined = eParagraphs.filter((p) => p.trim()).join('\n\n');
    return (
      <div>
        <div className="focus-topbar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSpecialMode(null)}
          >
            <ArrowLeft size={16} />
            返回大作文学习
          </button>
          <span className="drill-tag">E 整篇卡 · 看逻辑链默写全篇固定骨架</span>
        </div>

        <div className="card-surface today-section-card">
          <BigLogicChain compact />
        </div>

        <BigEssayPaperEditor
          paragraphs={eParagraphs}
          onChange={setEParagraphs}
          disabled={Boolean(eGrade)}
          headerLeft="只看上方逻辑链，默写三段固定句型（槽位可写 [X] / [PIC] 或默认值）"
        />

        <div className="toolbar-group" style={{ marginTop: 14 }}>
          {!eGrade ? (
            <button
              type="button"
              className="btn-primary"
              disabled={!joined.trim()}
              onClick={() => setEGrade(gradeBigEssayAlignment(joined))}
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
              <h3 className="section-small-title">整篇模板对齐判分结果</h3>
              <span className="tabular-nums" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                固定句型准确率 {Math.round(eGrade.fixedAccuracy * 100)}% · {eGrade.wordCount} 词
              </span>
            </div>
            {eGrade.missingFragments.length === 0 ? (
              <p style={{ color: 'var(--ok)', fontSize: 14, margin: 0 }}>
                全部核心固定句型均已完整命中！
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

  // ========== Curriculum Overview ==========
  const learnedBigCount = BIG_SENTENCE_IDS.filter((id) => Boolean(cards[id])).length;

  return (
    <div>
      {/* Logic chain + daily quota summary */}
      <section className="card-surface today-section-card">
        <div className="section-row-head" style={{ marginBottom: 12 }}>
          <h2 className="section-small-title">大作文三段逻辑链</h2>
          <span className="page-sub tabular-nums" style={{ margin: 0 }}>
            已学 {learnedBigCount} / {BIG_SENTENCE_IDS.length} 句 · 今日已学 {todayBigLearned} / {bigDailyNewLimit} 句
          </span>
        </div>
        <BigLogicChain />
      </section>

      {/* 6-Lesson Big Essay Curriculum */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">大作文 6 课学习路线</h2>
          <span className="page-sub" style={{ margin: 0 }}>
            背得出（1–4 课）→ 套得出（5 课）→ 图表备用（6 课）
          </span>
        </div>

        <div className="lesson-grid">
          {BIG_LESSONS.map((lesson) => {
            const unlocked = isLessonUnlocked(lesson.id);

            // Lesson 6 (Chart) collapsed by default per spec 3.2
            if (lesson.id === 6) {
              return (
                <div key={lesson.id} className="card-surface" style={{ padding: '12px 16px' }}>
                  <button
                    type="button"
                    className="big-collapse-trigger"
                    onClick={() => setChartLessonOpen((v) => !v)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {chartLessonOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                      <span className="lesson-info-title">{lesson.title}</span>
                      {lesson.badge && <span className="formula-tag-warn">{lesson.badge}</span>}
                    </div>
                    <span className="page-sub" style={{ margin: 0 }}>
                      {chartLessonOpen ? '收起' : '展开'}
                    </span>
                  </button>
                  {chartLessonOpen && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <p className="lesson-info-sub" style={{ margin: 0 }}>
                        {lesson.subtitle}（积木结构：引入 → 总体特征 → 数据细节，随机图表无限练）
                      </p>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => onNavigateTab('chart')}
                      >
                        进入图表选句与填数
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            const sIds = lesson.sentenceIds ?? [];
            const doneCount = sIds.filter((id) => Boolean(cards[id])).length;

            return (
              <div
                key={lesson.id}
                className={`card-surface lesson-row ${!unlocked ? 'locked' : ''}`}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="lesson-info-title">{lesson.title}</div>
                  <div className="lesson-info-sub">{lesson.subtitle}</div>
                  {sIds.length > 0 && (
                    <div className="big-lesson-dots">
                      {sIds.map((sid) => {
                        const bs = BIG_SENTENCE_MAP[sid];
                        const raw = cards[sid];
                        const lv = getMasteryLevel(raw ? deserializeCard(raw) : undefined);
                        return (
                          <button
                            key={sid}
                            type="button"
                            disabled={!unlocked}
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
                  {sIds.length > 0 && (
                    <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                      {doneCount}/{sIds.length}
                    </span>
                  )}
                  <button
                    type="button"
                    className={unlocked ? 'btn-primary' : 'btn-secondary'}
                    disabled={!unlocked}
                    onClick={() => {
                      if (lesson.kind === 'sentences') startSentenceLesson(lesson.id);
                      else if (lesson.kind === 'order') setSpecialMode('O');
                      else if (lesson.kind === 'transfer') onNavigateTab('plan');
                    }}
                  >
                    {!unlocked ? (
                      <>
                        <Lock size={14} /> 未解锁
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        {lesson.kind === 'sentences'
                          ? doneCount === sIds.length
                            ? '再练一遍'
                            : '开始学习'
                          : '进入训练'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Big Essay Special Cards (O / V / E / P) */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">大作文专项卡片（O / V / E / P）</h2>
          <span className="page-sub" style={{ margin: 0 }}>
            {unlockAllLessons ? '设置中已开启全部解锁' : '随课程进度自动解锁'}
          </span>
        </div>

        <div className="formula-quick-modes">
          <button
            type="button"
            className="card-surface formula-mode-tile"
            disabled={!unlockAllLessons && !lesson1Done}
            onClick={() => {
              setVQuiz(buildVarQuiz());
              setVPicked(null);
              setSpecialMode('V');
            }}
          >
            <div className="formula-mode-tile-top">
              <Layers size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">
                {unlockAllLessons || lesson1Done ? (
                  <Unlock size={14} />
                ) : (
                  <Lock size={14} />
                )}
              </span>
            </div>
            <div className="formula-mode-name">V 变量卡（槽位词性反射）</div>
            <div className="formula-mode-desc">
              第 1 课完成后解锁 · 高亮模板槽位，秒判变量名与词性要求
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            disabled={!unlockAllLessons && !lesson3Done}
            onClick={() => {
              setOShuffled(shuffle(BIG_SENTENCES));
              setOPickedIds([]);
              setOChecked(false);
              setSpecialMode('O');
            }}
          >
            <div className="formula-mode-tile-top">
              <Shuffle size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">
                {unlockAllLessons || lesson3Done ? (
                  <Unlock size={14} />
                ) : (
                  <Lock size={14} />
                )}
              </span>
            </div>
            <div className="formula-mode-name">O 排序卡（11 句首词链）</div>
            <div className="formula-mode-desc">
              第 3 课完成后解锁 · 将打乱的 11 个首词按三段逻辑排好顺序
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            disabled={!unlockAllLessons && !allStable3Days}
            onClick={() => {
              setEParagraphs(['', '', '']);
              setEGrade(null);
              setSpecialMode('E');
            }}
          >
            <div className="formula-mode-tile-top">
              <CheckCircle2 size={17} style={{ color: 'var(--ok)' }} />
              <span className="formula-mode-count">
                {unlockAllLessons || allStable3Days ? (
                  <Unlock size={14} />
                ) : (
                  <Lock size={14} />
                )}
              </span>
            </div>
            <div className="formula-mode-name">E 整篇卡（看逻辑链默全篇）</div>
            <div className="formula-mode-desc">
              全部句子稳定度 ≥ 3 天后解锁 · 只给逻辑链，默写整篇固定句型
            </div>
          </button>

          <button
            type="button"
            className="card-surface formula-mode-tile"
            disabled={!unlockAllLessons && !lesson3Done}
            onClick={() => onNavigateTab('plan')}
          >
            <div className="formula-mode-tile-top">
              <Play size={17} style={{ color: 'var(--gold)' }} />
              <span className="formula-mode-count">
                {unlockAllLessons || lesson3Done ? (
                  <Unlock size={14} />
                ) : (
                  <Lock size={14} />
                )}
              </span>
            </div>
            <div className="formula-mode-name">P 规划卡（3 分钟考场定稿）</div>
            <div className="formula-mode-desc">
              第 4 课完成后解锁 · 看模拟图画题，3 分钟填好 X/PIC/B1/B2/DO
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
