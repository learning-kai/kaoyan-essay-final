import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Shuffle,
  XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiffResult } from '../components/DiffResult';
import { Layout } from '../components/Layout';
import { renderSentenceText } from '../components/LetterView';
import { StoryLine } from '../components/StoryLine';
import { evaluateFullEssay, type EssayEvaluation } from '../core/cards';
import { EXAM_PROMPTS, type ExamPrompt } from '../data/prompts';
import { TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { TemplateId } from '../data/types';
import { useProgress } from '../store/useProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

type ExamStage = 'lobby' | 'identify' | 'write' | 'result';

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function ExamPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const examRecords = useProgress((s) => s.examRecords);
  const recordExam = useProgress((s) => s.recordExam);
  const recordIdentification = useProgress((s) => s.recordIdentification);
  const strictPunctuation = useSettings((s) => s.strictPunctuation);

  const [stage, setStage] = useState<ExamStage>('lobby');
  const [prompt, setPrompt] = useState<ExamPrompt | null>(null);
  const [idSecondsLeft, setIdSecondsLeft] = useState(20);
  const [chosenType, setChosenType] = useState<TemplateId | null>(null);
  const [idTimedOut, setIdTimedOut] = useState(false);

  const [writeElapsed, setWriteElapsed] = useState(0);
  const [essay, setEssay] = useState('');
  const [evaluation, setEvaluation] = useState<EssayEvaluation | null>(null);

  const confusableCount = useMemo(
    () => EXAM_PROMPTS.filter((p) => p.confusable).length,
    []
  );

  useEffect(() => {
    document.title =
      stage === 'write'
        ? `实战写作 ${formatClock(writeElapsed)} · 小作文`
        : '实战模式 · 小作文';
  }, [stage, writeElapsed]);

  // 20-second identification timer
  useEffect(() => {
    if (stage !== 'identify' || chosenType !== null || idTimedOut) return;
    const timer = window.setInterval(() => {
      setIdSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIdTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage, chosenType, idTimedOut]);

  // Writing timer (counts up, 15-min limit, 10-min target)
  useEffect(() => {
    if (stage !== 'write') return;
    const timer = window.setInterval(() => {
      setWriteElapsed((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const startExamWithPrompt = (picked: ExamPrompt) => {
    setPrompt(picked);
    setStage('identify');
    setIdSecondsLeft(20);
    setChosenType(null);
    setIdTimedOut(false);
    setWriteElapsed(0);
    setEssay('');
    setEvaluation(null);
  };

  const pickRandomPrompt = (filter?: 'all' | 'confusable' | TemplateId) => {
    let pool = EXAM_PROMPTS;
    if (filter === 'confusable') {
      pool = EXAM_PROMPTS.filter((p) => p.confusable);
    } else if (filter && filter !== 'all') {
      pool = EXAM_PROMPTS.filter((p) => p.templateId === filter);
    }
    const picked = pool[Math.floor(Math.random() * pool.length)] ?? EXAM_PROMPTS[0];
    startExamWithPrompt(picked);
  };

  // Support deep link /exam?template=<TemplateId> from ExamDecisionCard
  useEffect(() => {
    const param = searchParams.get('template') as TemplateId | null;
    if (param && param in TEMPLATE_MAP) {
      pickRandomPrompt(param);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleChooseType = (tid: TemplateId) => {
    if (!prompt || chosenType !== null) return;
    setChosenType(tid);
    recordIdentification(prompt.id, prompt.templateId, tid);
  };

  const handleSubmitEssay = () => {
    if (!prompt || !essay.trim()) return;
    const ev = evaluateFullEssay(prompt.templateId, essay, strictPunctuation);
    setEvaluation(ev);
    recordExam({
      promptId: prompt.id,
      templateId: prompt.templateId,
      identifiedCorrectly: chosenType === prompt.templateId,
      durationSec: writeElapsed,
      wordCount: ev.wordCount,
      overallAccuracy: ev.overallAccuracy,
    });
    setStage('result');
  };

  const liveWordCount = useMemo(() => {
    const trimmed = essay.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }, [essay]);

  if (stage === 'lobby') {
    return (
      <Layout>
        <header className="page-header">
          <div>
            <h1 className="page-title">实战模式</h1>
            <p className="page-sub">
              {EXAM_PROMPTS.length} 道原创考研模拟题（覆盖 14 类题型 · 含 {confusableCount} 道易混淆题）· 20 秒识题 → 10 分钟目标信纸写作 → 逐句模板批改
            </p>
          </div>
        </header>

        <section className="card-surface today-task-card">
          <div className="today-task-label">随机抽题</div>
          <div className="toolbar-group" style={{ marginBottom: 20 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => pickRandomPrompt('all')}
            >
              <Shuffle size={15} strokeWidth={1.5} />
              随机抽一道题（{EXAM_PROMPTS.length} 题）
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => pickRandomPrompt('confusable')}
            >
              专攻易混淆题（{confusableCount} 题）
            </button>
          </div>

          <div className="today-task-label" style={{ marginTop: 8 }}>
            按指定类型抽题
          </div>
          <div className="tab-bar" style={{ marginBottom: 0 }}>
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                className="tab-pill"
                onClick={() => pickRandomPrompt(tpl.id)}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </section>

        {examRecords.length > 0 && (
          <section className="card-surface today-section-card">
            <div className="section-row-head">
              <h2 className="section-small-title">历史实战记录</h2>
              <span className="page-sub tabular-nums">共 {examRecords.length} 篇</span>
            </div>
            <table className="clean-table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>识题</th>
                  <th>词数</th>
                  <th>用时</th>
                  <th>模板准确率</th>
                </tr>
              </thead>
              <tbody>
                {[...examRecords]
                  .reverse()
                  .slice(0, 10)
                  .map((rec) => (
                    <tr key={rec.id}>
                      <td>{TEMPLATE_MAP[rec.templateId].name}</td>
                      <td style={{ color: rec.identifiedCorrectly ? 'var(--ok)' : 'var(--err)' }}>
                        {rec.identifiedCorrectly ? '正确' : '误判'}
                      </td>
                      <td className="tabular-nums">{rec.wordCount} 词</td>
                      <td
                        className="tabular-nums"
                        style={{
                          color: rec.durationSec <= 600 ? 'var(--ok)' : 'var(--warn)',
                        }}
                      >
                        {formatClock(rec.durationSec)}
                      </td>
                      <td className="tabular-nums">
                        {Math.round(rec.overallAccuracy * 100)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        )}
      </Layout>
    );
  }

  if (!prompt) return null;
  const tpl = TEMPLATE_MAP[prompt.templateId];

  if (stage === 'identify') {
    const answered = chosenType !== null || idTimedOut;
    const isCorrect = chosenType === prompt.templateId;

    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setStage('lobby')}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            返回实战大厅
          </button>
          <span
            className="drill-tag tabular-nums"
            style={{ color: idSecondsLeft <= 5 ? 'var(--err)' : 'var(--gold)' }}
          >
            <Clock size={13} strokeWidth={1.5} />
            识题倒计时 {idSecondsLeft}s
          </span>
        </div>

        <div className="card-surface drill-card animate-card-enter">
          <div className="drill-meta">
            <span className="drill-tag">第 1 步 · 20 秒内判断题型</span>
            {prompt.confusable && (
              <span className="drill-tag" style={{ color: 'var(--warn)', background: 'var(--warn-soft)' }}>
                易混淆题
              </span>
            )}
          </div>

          <p className="serif-text" style={{ margin: '0 0 22px' }}>
            {prompt.directions}
          </p>

          <div className="id-choice-grid">
            {TEMPLATES.map((t) => {
              const isSelected = chosenType === t.id;
              const isRightChoice = answered && t.id === prompt.templateId;
              const isWrongChoice = answered && isSelected && !isRightChoice;
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={answered}
                  className={`id-choice-btn ${
                    isRightChoice
                      ? 'choice-ok'
                      : isWrongChoice
                        ? 'choice-err'
                        : ''
                  }`}
                  onClick={() => handleChooseType(t.id)}
                >
                  {t.name}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="id-feedback">
              <div className="id-feedback-head">
                {isCorrect ? (
                  <span style={{ color: 'var(--ok)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} strokeWidth={1.5} />
                    判断正确：{tpl.name}
                  </span>
                ) : (
                  <span style={{ color: 'var(--err)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <XCircle size={16} strokeWidth={1.5} />
                    {idTimedOut ? '已超时' : '判断有误'}，本题属于：{tpl.name}
                  </span>
                )}
              </div>
              {prompt.confusableNote && (
                <p className="page-sub" style={{ marginTop: 6, color: 'var(--warn)' }}>
                  辨析：{prompt.confusableNote}
                </p>
              )}
              <div style={{ marginTop: 14 }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setStage('write')}
                >
                  开始 15 分钟计时写作（目标 10 分钟）
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (stage === 'write') {
    const remaining15 = Math.max(0, 900 - writeElapsed);
    const over10Min = writeElapsed > 600;

    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setStage('lobby')}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            放弃本次
          </button>

          <div className="toolbar-group" style={{ alignItems: 'center' }}>
            <span className="drill-tag tabular-nums">
              已写 {liveWordCount} 词
            </span>
            <span
              className="drill-tag tabular-nums"
              style={{
                color: over10Min ? 'var(--warn)' : 'var(--ink)',
                background: over10Min ? 'var(--warn-soft)' : 'var(--surface-sunk)',
              }}
            >
              <Clock size={13} strokeWidth={1.5} />
              用时 {formatClock(writeElapsed)} / 剩余 {formatClock(remaining15)}
            </span>
          </div>
        </div>

        <div className="card-surface exam-prompt-bar">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', marginBottom: 6 }}>
            {tpl.name} · {prompt.title}
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--ink-muted)' }}>
            {prompt.directions}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>建议关键词：</span>
            {prompt.suggestedKeywords.map((kw) => (
              <span key={kw} className="slot-chip">
                {kw}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <StoryLine nodes={tpl.storyLine} />
          </div>
        </div>

        <div className="card-surface exam-paper-sheet">
          <div className="exam-paper-head">
            <FileText size={14} strokeWidth={1.5} />
            ANSWER SHEET · 模拟答题卡（目标 10 分钟 / 约 100 词）
          </div>
          <textarea
            className="exam-ruled-textarea"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder={
              prompt.templateId === 'notice'
                ? "NOTICE\n\nWe greatly appreciate all students for sparing their precious time..."
                : 'Dear ...,\n\nIt is a great pleasure for me to write this letter to you...'
            }
            autoFocus
          />
          <div className="drill-actions">
            <span className="page-sub">
              写完后核对三件事：词性、称呼、落款
            </span>
            <button
              type="button"
              className="btn-primary"
              disabled={!essay.trim()}
              onClick={handleSubmitEssay}
            >
              交卷并逐句批改
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Stage: result
  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">实战批改报告 · {tpl.name}</h1>
          <p className="page-sub">{prompt.title}</p>
        </div>
        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setStage('lobby')}
          >
            返回实战大厅
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => pickRandomPrompt('all')}
          >
            再练一篇
          </button>
        </div>
      </header>

      {evaluation && (
        <>
          <section className="card-surface today-task-card">
            <div className="today-metrics">
              <div className="today-metric">
                <span className="today-metric-num tabular-nums">
                  {Math.round(evaluation.overallAccuracy * 100)}%
                </span>
                <span className="today-metric-cap">模板逐句准确率</span>
              </div>
              <div className="today-metric-sep" />
              <div className="today-metric">
                <span className="today-metric-num tabular-nums">
                  {evaluation.wordCount} 词
                </span>
                <span className="today-metric-cap">总词数（目标 ≈100）</span>
              </div>
              <div className="today-metric-sep" />
              <div className="today-metric">
                <span
                  className="today-metric-num tabular-nums"
                  style={{ color: writeElapsed <= 600 ? 'var(--ok)' : 'var(--warn)' }}
                >
                  {formatClock(writeElapsed)}
                </span>
                <span className="today-metric-cap">
                  {writeElapsed <= 600 ? '达成 10 分钟目标' : '超过 10 分钟目标'}
                </span>
              </div>
            </div>
          </section>

          <div className="mistake-list">
            {evaluation.alignments.map((al, i) => (
              <div key={al.sentenceId} className="card-surface mistake-card">
                <div className="mistake-meta">
                  <span className="drill-tag">第 {i + 1} 句</span>
                  <span className="tabular-nums" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                    准确率 {Math.round(al.grade.accuracy * 100)}%
                  </span>
                </div>
                <DiffResult
                  tokens={al.grade.tokens}
                  accuracy={al.grade.accuracy}
                  warnings={al.grade.warnings}
                />
                <div className="answer-reveal">
                  <div className="answer-reveal-label">模板标准句</div>
                  <div className="serif-text">
                    {renderSentenceText(al.expectedEn)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
