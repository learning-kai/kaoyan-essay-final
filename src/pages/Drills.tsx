import { ArrowLeft, CheckCircle2, Lock, RotateCcw, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiffResult } from '../components/DiffResult';
import { Layout } from '../components/Layout';
import { renderSentenceText } from '../components/LetterView';
import { StoryLine } from '../components/StoryLine';
import {
  evaluateFullEssay,
  FORM_CARDS,
  ORDER_CARDS,
  PURPOSE_CARDS,
  shuffleDeterministic,
  type EssayEvaluation,
} from '../core/cards';
import { unifyPunctuation } from '../core/normalize';
import { EXAM_PROMPTS } from '../data/prompts';
import { LESSONS, SENTENCES, TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { TemplateId } from '../data/types';
import { deserializeCard, useProgress } from '../store/useProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

type CardDeckType = 'P' | 'F' | 'O' | 'E' | 'T';

export function DrillsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cards = useProgress((s) => s.cards);
  const recordIdentification = useProgress((s) => s.recordIdentification);
  const unlockAll = useSettings((s) => s.unlockAllLessons);
  const strictPunctuation = useSettings((s) => s.strictPunctuation);

  const [activeDeck, setActiveDeck] = useState<CardDeckType | null>(null);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Order card state
  const [pickedOrder, setPickedOrder] = useState<string[]>([]);
  // Essay E card state
  const [essayEval, setEssayEval] = useState<EssayEvaluation | null>(null);
  // T card state
  const [chosenTid, setChosenTid] = useState<TemplateId | null>(null);

  useEffect(() => {
    const typeParam = searchParams.get('type') as CardDeckType | null;
    if (typeParam && ['P', 'F', 'O', 'E', 'T'].includes(typeParam)) {
      setActiveDeck(typeParam);
      setIdx(0);
      resetCardState();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = activeDeck ? `专项卡 · ${activeDeck} · 小作文` : '专项卡片 · 小作文';
  }, [activeDeck]);

  const resetCardState = () => {
    setInput('');
    setChecked(false);
    setIsCorrect(false);
    setPickedOrder([]);
    setEssayEval(null);
    setChosenTid(null);
  };

  // Unlock conditions per section 3.1
  const unlockStatus = useMemo(() => {
    const l1Done = LESSONS[0].sentenceIds.every((id) => Boolean(cards[id]));
    const learnedTemplatesCount = TEMPLATES.filter((t) =>
      t.sentenceIds
        .filter((id) => SENTENCES[id].role === 'body')
        .every((id) => Boolean(cards[id]))
    ).length;

    const unlockedFormCards = unlockAll
      ? FORM_CARDS
      : FORM_CARDS.filter((fc) => Boolean(cards[fc.sentenceId]));

    const unlockedOrderCards = unlockAll
      ? ORDER_CARDS
      : ORDER_CARDS.filter((oc) => {
          const tpl = TEMPLATE_MAP[oc.templateId];
          return tpl.sentenceIds
            .filter((id) => SENTENCES[id].role === 'body')
            .every((id) => Boolean(cards[id]));
        });

    const unlockedEssayTemplates = unlockAll
      ? TEMPLATES
      : TEMPLATES.filter((tpl) => {
          const studyIds = tpl.sentenceIds.filter(
            (id) => SENTENCES[id].role !== 'heading' && SENTENCES[id].role !== 'signoff'
          );
          return studyIds.every((id) => {
            const raw = cards[id];
            if (!raw) return false;
            return deserializeCard(raw).stability >= 3;
          });
        });

    return {
      P: unlockAll || l1Done,
      F: unlockedFormCards.length > 0,
      O: unlockedOrderCards.length > 0,
      E: unlockedEssayTemplates.length > 0,
      T: unlockAll || learnedTemplatesCount >= 3,
      unlockedFormCards,
      unlockedOrderCards,
      unlockedEssayTemplates,
    };
  }, [cards, unlockAll]);

  const DECK_META: {
    type: CardDeckType;
    name: string;
    desc: string;
    unlockHint: string;
    unlocked: boolean;
    count: number;
  }[] = [
    {
      type: 'P',
      name: 'P · 目的短语卡',
      desc: '只考 6 类书信的目的句核心动词短语（如 apologize for）',
      unlockHint: '学完第 1 课通用骨架后解锁',
      unlocked: unlockStatus.P,
      count: PURPOSE_CARDS.length,
    },
    {
      type: 'F',
      name: 'F · 词性易错卡',
      desc: '专攻 as a result of breaking / on Saturday / their 等高频词性坑',
      unlockHint: '对应句子卡毕业后解锁',
      unlocked: unlockStatus.F,
      count: unlockStatus.unlockedFormCards.length,
    },
    {
      type: 'O',
      name: 'O · 故事线排序卡',
      desc: '把打乱的故事线节点按正确顺序排好，强化生成效应',
      unlockHint: '该模板所有主体句学完后解锁',
      unlocked: unlockStatus.O,
      count: unlockStatus.unlockedOrderCards.length,
    },
    {
      type: 'E',
      name: 'E · 整篇默写卡',
      desc: '只给类型名和故事线，在信纸上默写整篇并逐句批改',
      unlockHint: '该模板所有句子稳定度 ≥ 3 天后解锁',
      unlocked: unlockStatus.E,
      count: unlockStatus.unlockedEssayTemplates.length,
    },
    {
      type: 'T',
      name: 'T · 题型识别卡',
      desc: '快速阅读 21 道考研模拟题干，准确判断所属信件类型',
      unlockHint: '学完任意 3 个模板后解锁',
      unlocked: unlockStatus.T,
      count: EXAM_PROMPTS.length,
    },
  ];

  if (!activeDeck) {
    return (
      <Layout>
        <header className="page-header">
          <div>
            <h1 className="page-title">专项卡片</h1>
            <p className="page-sub">
              在单句默写之外，按学习进度逐步解锁短语、词性、排序、整篇与题型识别五类专项卡
            </p>
          </div>
        </header>

        <div className="lesson-grid">
          {DECK_META.map((deck) => (
            <div
              key={deck.type}
              className={`card-surface lesson-row ${!deck.unlocked ? 'locked' : ''}`}
            >
              <div>
                <div className="lesson-info-title">{deck.name}</div>
                <div className="lesson-info-sub">{deck.desc}</div>
                {!deck.unlocked && (
                  <div className="lesson-info-sub" style={{ color: 'var(--gold)', marginTop: 4 }}>
                    <Lock size={12} strokeWidth={1.5} style={{ verticalAlign: -1, marginRight: 4 }} />
                    {deck.unlockHint}（或在设置页开启「解锁全部课程」）
                  </div>
                )}
              </div>
              <div className="lesson-progress-meta">
                {deck.unlocked && (
                  <span className="drill-tag tabular-nums">{deck.count} 张</span>
                )}
                <button
                  type="button"
                  className="btn-primary"
                  style={{ height: 36, padding: '0 14px', fontSize: 13 }}
                  disabled={!deck.unlocked}
                  onClick={() => {
                    setActiveDeck(deck.type);
                    setIdx(0);
                    resetCardState();
                  }}
                >
                  {deck.unlocked ? '开始练习' : '未解锁'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  // Active deck renderers
  const exitDeck = () => {
    setActiveDeck(null);
    resetCardState();
  };

  if (activeDeck === 'P') {
    const card = PURPOSE_CARDS[idx % PURPOSE_CARDS.length];
    const handleCheck = () => {
      const ok =
        unifyPunctuation(input).toLowerCase() === card.answer.toLowerCase();
      setIsCorrect(ok);
      setChecked(true);
    };
    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button type="button" className="btn-ghost" onClick={exitDeck}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            返回专项卡
          </button>
          <span className="tabular-nums page-sub">
            P 短语卡 · {(idx % PURPOSE_CARDS.length) + 1} / {PURPOSE_CARDS.length}
          </span>
        </div>

        <div className="card-surface drill-card animate-card-enter">
          <div className="drill-meta">
            <span className="drill-tag">{card.templateName}</span>
          </div>
          <div className="drill-zh zh-text">{card.promptZh}</div>
          <input
            type="text"
            className="drill-textarea"
            style={{ minHeight: 54 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!checked) handleCheck();
                else {
                  setIdx((i) => i + 1);
                  resetCardState();
                }
              }
            }}
            placeholder="输入对应的目的动词短语…"
            autoFocus
          />
          <div className="drill-actions">
            <span />
            {!checked ? (
              <button
                type="button"
                className="btn-primary"
                disabled={!input.trim()}
                onClick={handleCheck}
              >
                核对答案
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setIdx((i) => i + 1);
                  resetCardState();
                }}
              >
                下一张
              </button>
            )}
          </div>
          {checked && (
            <div className="answer-reveal">
              <div style={{ color: isCorrect ? 'var(--ok)' : 'var(--err)', fontWeight: 600, marginBottom: 6 }}>
                {isCorrect ? '完全正确' : '请核对标准短语'}
              </div>
              <div className="serif-text">{card.answer}</div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (activeDeck === 'F') {
    const list = unlockStatus.unlockedFormCards;
    const card = list[idx % list.length];
    const handleCheck = () => {
      const ok =
        unifyPunctuation(input).toLowerCase() === card.answer.toLowerCase();
      setIsCorrect(ok);
      setChecked(true);
    };
    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button type="button" className="btn-ghost" onClick={exitDeck}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            返回专项卡
          </button>
          <span className="tabular-nums page-sub">
            F 词性卡 · {(idx % list.length) + 1} / {list.length}
          </span>
        </div>

        <div className="card-surface drill-card animate-card-enter">
          <div className="drill-meta">
            <span className="drill-tag">{card.templateName} · 词性填空</span>
          </div>
          <div className="drill-en-display serif-text">
            {card.contextBefore}{' '}
            <span className="slot-chip">___ ({card.baseHint})</span>{' '}
            {card.contextAfter}
          </div>
          <input
            type="text"
            className="drill-textarea"
            style={{ minHeight: 54 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!checked) handleCheck();
                else {
                  setIdx((i) => i + 1);
                  resetCardState();
                }
              }
            }}
            placeholder="填入正确的词形…"
            autoFocus
          />
          <div className="drill-actions">
            <span />
            {!checked ? (
              <button
                type="button"
                className="btn-primary"
                disabled={!input.trim()}
                onClick={handleCheck}
              >
                核对词形
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setIdx((i) => i + 1);
                  resetCardState();
                }}
              >
                下一张
              </button>
            )}
          </div>
          {checked && (
            <div className="answer-reveal">
              <div style={{ color: isCorrect ? 'var(--ok)' : 'var(--err)', fontWeight: 600, marginBottom: 4 }}>
                {isCorrect ? '词形正确' : `正确答案：${card.answer}`}
              </div>
              <div className="zh-text" style={{ fontSize: 14 }}>{card.ruleZh}</div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (activeDeck === 'O') {
    const list = unlockStatus.unlockedOrderCards;
    const card = list[idx % list.length];
    const shuffled = shuffleDeterministic(card.correctOrder, idx * 17 + 7);
    const remaining = shuffled.filter((item) => !pickedOrder.includes(item));

    const handleVerifyOrder = () => {
      const ok =
        pickedOrder.length === card.correctOrder.length &&
        pickedOrder.every((v, i) => v === card.correctOrder[i]);
      setIsCorrect(ok);
      setChecked(true);
    };

    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button type="button" className="btn-ghost" onClick={exitDeck}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            返回专项卡
          </button>
          <span className="tabular-nums page-sub">
            O 排序卡 · {(idx % list.length) + 1} / {list.length}
          </span>
        </div>

        <div className="card-surface drill-card animate-card-enter">
          <div className="drill-meta">
            <span className="drill-tag">{card.templateName} · 故事线排序</span>
          </div>
          <p className="page-sub" style={{ marginBottom: 16 }}>
            按段落推进顺序，依次点选下面的故事线节点：
          </p>

          <div className="order-zone">
            {pickedOrder.length === 0 ? (
              <span className="page-sub">点击下方节点按顺序填入这里…</span>
            ) : (
              <StoryLine nodes={pickedOrder} />
            )}
          </div>

          <div className="tab-bar" style={{ marginTop: 16 }}>
            {remaining.map((node) => (
              <button
                key={node}
                type="button"
                className="tab-pill"
                disabled={checked}
                onClick={() => setPickedOrder((prev) => [...prev, node])}
              >
                {node}
              </button>
            ))}
          </div>

          <div className="drill-actions">
            <button
              type="button"
              className="btn-ghost"
              disabled={checked || pickedOrder.length === 0}
              onClick={() => setPickedOrder([])}
            >
              <RotateCcw size={14} strokeWidth={1.5} />
              重排
            </button>
            {!checked ? (
              <button
                type="button"
                className="btn-primary"
                disabled={pickedOrder.length !== card.correctOrder.length}
                onClick={handleVerifyOrder}
              >
                核对顺序
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setIdx((i) => i + 1);
                  resetCardState();
                }}
              >
                下一张
              </button>
            )}
          </div>

          {checked && (
            <div className="answer-reveal">
              <div style={{ color: isCorrect ? 'var(--ok)' : 'var(--err)', fontWeight: 600, marginBottom: 8 }}>
                {isCorrect ? '顺序完全正确' : '正确故事线顺序：'}
              </div>
              <StoryLine nodes={card.correctOrder} detail={card.detail} />
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (activeDeck === 'E') {
    const list = unlockStatus.unlockedEssayTemplates;
    const tpl = list[idx % list.length];
    const handleGradeEssay = () => {
      if (!input.trim()) return;
      setEssayEval(evaluateFullEssay(tpl.id, input, strictPunctuation));
    };

    return (
      <Layout focusMode>
        <div className="focus-topbar">
          <button type="button" className="btn-ghost" onClick={exitDeck}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            返回专项卡
          </button>
          <span className="tabular-nums page-sub">
            E 整篇默写 · {(idx % list.length) + 1} / {list.length}
          </span>
        </div>

        <div className="card-surface exam-prompt-bar">
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            {tpl.name} · 整篇默写
          </div>
          <StoryLine nodes={tpl.storyLine} detail={tpl.storyLineDetail} />
        </div>

        {!essayEval ? (
          <div className="card-surface exam-paper-sheet">
            <textarea
              className="exam-ruled-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="只看故事线，写出整篇模板（槽位可写 [X] 或具体内容）…"
              autoFocus
            />
            <div className="drill-actions">
              <span className="page-sub">支持框架占位符 [X]</span>
              <button
                type="button"
                className="btn-primary"
                disabled={!input.trim()}
                onClick={handleGradeEssay}
              >
                提交整篇批改
              </button>
            </div>
          </div>
        ) : (
          <div className="mistake-list">
            <div className="card-surface today-task-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="today-task-label">整篇默写准确率</div>
                  <div className="today-metric-num tabular-nums">
                    {Math.round(essayEval.overallAccuracy * 100)}%
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setIdx((i) => i + 1);
                    resetCardState();
                  }}
                >
                  默写下一篇
                </button>
              </div>
            </div>
            {essayEval.alignments.map((al, i) => (
              <div key={al.sentenceId} className="card-surface mistake-card">
                <div className="drill-tag">第 {i + 1} 句</div>
                <DiffResult
                  tokens={al.grade.tokens}
                  accuracy={al.grade.accuracy}
                  warnings={al.grade.warnings}
                />
                <div className="answer-reveal">
                  <div className="serif-text">{renderSentenceText(al.expectedEn)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Layout>
    );
  }

  // Deck T: Prompt type identification
  const promptItem = EXAM_PROMPTS[idx % EXAM_PROMPTS.length];
  const tplCorrect = TEMPLATE_MAP[promptItem.templateId];

  return (
    <Layout focusMode>
      <div className="focus-topbar">
        <button type="button" className="btn-ghost" onClick={exitDeck}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          返回专项卡
        </button>
        <span className="tabular-nums page-sub">
          T 题型识别 · {(idx % EXAM_PROMPTS.length) + 1} / {EXAM_PROMPTS.length}
        </span>
      </div>

      <div className="card-surface drill-card animate-card-enter">
        <div className="drill-meta">
          <span className="drill-tag">阅读题干，快速判断题型</span>
          {promptItem.confusable && (
            <span className="drill-tag" style={{ color: 'var(--warn)', background: 'var(--warn-soft)' }}>
              易混淆题
            </span>
          )}
        </div>
        <p className="serif-text" style={{ margin: '0 0 20px' }}>
          {promptItem.directions}
        </p>

        <div className="id-choice-grid">
          {TEMPLATES.map((t) => {
            const answered = chosenTid !== null;
            const isRight = answered && t.id === promptItem.templateId;
            const isWrong = answered && chosenTid === t.id && !isRight;
            return (
              <button
                key={t.id}
                type="button"
                disabled={answered}
                className={`id-choice-btn ${isRight ? 'choice-ok' : isWrong ? 'choice-err' : ''}`}
                onClick={() => {
                  setChosenTid(t.id);
                  recordIdentification(promptItem.id, promptItem.templateId, t.id);
                }}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {chosenTid && (
          <div className="id-feedback">
            <div className="id-feedback-head">
              {chosenTid === promptItem.templateId ? (
                <span style={{ color: 'var(--ok)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={16} strokeWidth={1.5} />
                  正确：{tplCorrect.name}
                </span>
              ) : (
                <span style={{ color: 'var(--err)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <XCircle size={16} strokeWidth={1.5} />
                  本题应为：{tplCorrect.name}
                </span>
              )}
            </div>
            {promptItem.confusableNote && (
              <p className="page-sub" style={{ marginTop: 6, color: 'var(--warn)' }}>
                {promptItem.confusableNote}
              </p>
            )}
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: 12 }}
              onClick={() => {
                setIdx((i) => i + 1);
                resetCardState();
              }}
            >
              下一题
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
