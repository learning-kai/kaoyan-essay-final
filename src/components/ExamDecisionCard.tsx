import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Table2,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SENTENCES, TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { TemplateId } from '../data/types';
import { renderSentenceText } from './LetterView';
import './components.css';

const STEPS_30S = [
  {
    num: '01',
    time: '5秒',
    title: '看题扫动词',
    desc: '抓 suggest / invite / complain / apply / notice 等核心词，确定收件人',
  },
  {
    num: '02',
    time: '5秒',
    title: '定情绪换 1 句',
    desc: '道歉/投诉/慰问用 regret，通知用 NOTICE，其余全用 pleasure + 1 句目的句',
  },
  {
    num: '03',
    time: '10秒',
    title: '抄词填 3 空',
    desc: '题目给的 2–3 个要点写成简单主谓宾，直接塞进万能主体 3 句',
  },
  {
    num: '04',
    time: '10秒',
    title: '查落款交卷',
    desc: '套完稳落 100–120 词，核对称呼与落款（Li Ming / 指定部门）即可',
  },
];

function emotionBadge(type: 'good' | 'regret' | 'notice') {
  if (type === 'regret') return { text: '情绪：deep regret', cls: 'edc-emo-regret' };
  if (type === 'notice') return { text: '公文：NOTICE / MEMO', cls: 'edc-emo-notice' };
  return { text: '情绪：great pleasure', cls: 'edc-emo-good' };
}

export function ExamDecisionCard() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<TemplateId>('suggest');
  const [showTable, setShowTable] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const tpl = TEMPLATE_MAP[selectedId];
  const emo = emotionBadge(tpl.emotionType);

  const heading = SENTENCES[tpl.sentenceIds[0]];
  const emotion = SENTENCES[tpl.sentenceIds[1]];
  const purpose = SENTENCES[tpl.sentenceIds[2]];
  const lead = SENTENCES[tpl.sentenceIds[3]];
  const body1 = SENTENCES[tpl.sentenceIds[4]];
  const body2 = SENTENCES[tpl.sentenceIds[5]];
  const body3 = SENTENCES[tpl.sentenceIds[6]];
  const closing = SENTENCES[tpl.sentenceIds[7]];
  const signoff = SENTENCES[tpl.sentenceIds[8]];

  return (
    <section className="card-surface edc-card" aria-label="小作文考场 30 秒秒写决策卡">
      <div className="edc-header">
        <div className="edc-title-block">
          <div className="edc-badge-row">
            <span className="edc-pill-badge">
              <Zap size={12} strokeWidth={2} />
              30 秒考场秒写决策卡
            </span>
            <span className="edc-word-badge tabular-nums">100–120 词 · 14 类全覆盖</span>
          </div>
          <h2 className="edc-title">一套万能骨架 · 只换 1 句目的句 + 填 3 个要点空</h2>
          <p className="edc-sub">
            全书信称呼、情绪、引导、主体 3 句、结尾、落款全部固定不变；点下方题型立刻预览考场直套版本
          </p>
        </div>

        <div className="edc-header-actions">
          <button
            type="button"
            className={`btn-secondary edc-mini-btn ${showTable ? 'active' : ''}`}
            onClick={() => {
              setCollapsed(false);
              setShowTable((v) => !v);
            }}
          >
            <Table2 size={14} strokeWidth={1.6} />
            {showTable ? '交互预览' : '12 句速查表'}
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

      {/* 4-Step 30-Second Flow */}
      <div className="edc-steps-grid">
        {STEPS_30S.map((step) => (
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
          {showTable ? (
            <div className="edc-table-wrap">
              <table className="clean-table edc-cheat-table">
                <thead>
                  <tr>
                    <th>题型（点击预览）</th>
                    <th>情绪 / 抬头</th>
                    <th>核心替换目的短语</th>
                    <th>认题触发词</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPLATES.map((t) => {
                    const b = emotionBadge(t.emotionType);
                    const active = t.id === selectedId;
                    return (
                      <tr
                        key={t.id}
                        className={active ? 'edc-row-active' : ''}
                        onClick={() => {
                          setSelectedId(t.id);
                          setShowTable(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {active && (
                            <Check
                              size={13}
                              strokeWidth={2}
                              style={{ color: 'var(--gold)', marginRight: 4, verticalAlign: -2 }}
                            />
                          )}
                          {t.name}
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <span className={`edc-emo-tag ${b.cls}`}>{b.text}</span>
                        </td>
                        <td className="serif-text edc-phrase-cell">{t.purposePhrase}</td>
                        <td className="edc-cue-cell">{t.purposeCueZh}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              {/* 12-Type Instant Selector Pills */}
              <div className="edc-type-bar" role="tablist" aria-label="选择小作文题型">
                {TEMPLATES.map((t) => {
                  const isActive = t.id === selectedId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`edc-type-pill ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedId(t.id)}
                    >
                      <span className={`edc-dot edc-dot-${t.emotionType}`} />
                      {t.name}
                    </button>
                  );
                })}
              </div>

              {/* Instant Skeleton Preview */}
              <div className="edc-preview-box">
                <div className="edc-preview-meta">
                  <div className="edc-preview-meta-left">
                    <span className="edc-preview-name">{tpl.name}</span>
                    <span className={`edc-emo-tag ${emo.cls}`}>{emo.text}</span>
                  </div>
                  <span className="edc-trigger-text">认题：{tpl.purposeCueZh}</span>
                </div>

                <div className="edc-letter-preview serif-text">
                  <div className="edc-para edc-para-muted">
                    {renderSentenceText(heading.en)}
                  </div>

                  <div className="edc-para">
                    <span>{renderSentenceText(emotion.en)} </span>
                    <span className="edc-purpose-highlight">
                      <span className="edc-swap-tag">仅换此句</span>
                      {renderSentenceText(purpose.en)}
                    </span>
                  </div>

                  <div className="edc-para">
                    <span>{renderSentenceText(lead.en)} </span>
                    <span>{renderSentenceText(body1.en)} </span>
                    <span>{renderSentenceText(body2.en, body2.resultWord)} </span>
                    <span>{renderSentenceText(body3.en, body3.resultWord)}</span>
                  </div>

                  <div className="edc-para edc-para-muted">
                    {renderSentenceText(closing.en, closing.resultWord)}
                  </div>

                  <div className="edc-para edc-para-muted" style={{ whiteSpace: 'pre-line' }}>
                    {signoff.en}
                  </div>
                </div>

                {/* 3-Slot Fill Guide for this Type */}
                <div className="edc-slot-tips">
                  <div className="edc-slot-tips-head">本题型 3 个要点空位速填指南：</div>
                  <ul className="edc-slot-tips-list">
                    {tpl.slotTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                  {tpl.id === 'notice' && (
                    <div className="edc-memo-note">
                      备忘录（Memo）速改：抬头 <code>NOTICE</code> → <code>MEMO</code>（下接 To / From / Subject），首句 <code>all students… this notice</code> → <code>you… this memo</code>，其余原样直套！
                    </div>
                  )}
                </div>

                <div className="edc-preview-actions">
                  <button
                    type="button"
                    className="btn-secondary edc-mini-btn"
                    onClick={() => navigate(`/library?template=${tpl.id}`)}
                  >
                    <BookOpen size={14} strokeWidth={1.6} />
                    去模板库看双语版
                    <ArrowRight size={13} strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    className="btn-primary edc-mini-btn"
                    onClick={() => navigate(`/exam?template=${tpl.id}`)}
                  >
                    <Play size={13} strokeWidth={1.8} />
                    立刻用「{tpl.name}」实战
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
