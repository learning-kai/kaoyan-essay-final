import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Image,
  Play,
  Search,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  buildProcessedPoliticsLines,
  PoliticsCardView,
  PoliticsTitle,
} from '../components/PoliticsCardView';
import {
  getPoliticsMasteryLevel,
  isPoliticsDirectMastered,
  isPoliticsStarred,
} from '../core/politicsStats';
import {
  POLITICS_CARDS,
  POLITICS_MAJORS,
  POLITICS_MAJOR_MAP,
  POLITICS_PREFACE,
  POLITICS_TIMELINE_IMAGE,
  POLITICS_TOPICS,
  POLITICS_TOPIC_MAP,
  type PoliticsCard,
  type PoliticsMajorId,
} from '../data/politics';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import './pages.css';

type StatusFilter = 'all' | 'active' | 'unlearned' | 'mastered' | 'starred';

export function PoliticsHandbookPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cards = usePoliticsProgress((s) => s.cards);
  const mastered = usePoliticsProgress((s) => s.mastered);
  const starred = usePoliticsProgress((s) => s.starred);
  const setMastered = usePoliticsProgress((s) => s.setMastered);
  const setBatchMastered = usePoliticsProgress((s) => s.setBatchMastered);
  const toggleStarred = usePoliticsProgress((s) => s.toggleStarred);

  const initialTopic = searchParams.get('topic') ?? '';
  const initialMajor: PoliticsMajorId | 'all' = initialTopic
    ? POLITICS_TOPIC_MAP[initialTopic]?.major ?? 'all'
    : 'all';

  const [majorFilter, setMajorFilter] = useState<PoliticsMajorId | 'all'>(
    initialMajor
  );
  const [topicFilter, setTopicFilter] = useState<string>(initialTopic);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [clozeMode, setClozeMode] = useState(false);
  const [revealedMap, setRevealedMap] = useState<Record<string, Set<number>>>(
    {}
  );
  const [prefaceOpen, setPrefaceOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  useEffect(() => {
    document.title = '一页纸总览 · 政治一页纸';
  }, []);

  useEffect(() => {
    const t = searchParams.get('topic') ?? '';
    if (t && POLITICS_TOPIC_MAP[t]) {
      setTopicFilter(t);
      setMajorFilter(POLITICS_TOPIC_MAP[t].major);
    }
  }, [searchParams]);

  const availableTopics = useMemo(
    () =>
      majorFilter === 'all'
        ? POLITICS_TOPICS
        : POLITICS_TOPICS.filter((t) => t.major === majorFilter),
    [majorFilter]
  );

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POLITICS_CARDS.filter((card) => {
      if (majorFilter !== 'all' && card.major !== majorFilter) return false;
      if (topicFilter && card.topicId !== topicFilter) return false;

      const direct = isPoliticsDirectMastered(card.id, mastered);
      const star = isPoliticsStarred(card.id, starred);
      if (statusFilter === 'active' && direct) return false;
      if (statusFilter === 'mastered' && !direct) return false;
      if (statusFilter === 'starred' && !star) return false;
      if (statusFilter === 'unlearned' && (direct || cards[card.id])) {
        return false;
      }

      if (q) {
        const hay = `${card.code} ${card.topic} ${card.searchText}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [majorFilter, topicFilter, statusFilter, query, cards, mastered, starred]);

  const groupedByTopic = useMemo(() => {
    const map = new Map<string, PoliticsCard[]>();
    for (const c of filteredCards) {
      const list = map.get(c.topicId) ?? [];
      list.push(c);
      map.set(c.topicId, list);
    }
    return POLITICS_TOPICS.filter((t) => map.has(t.id)).map((topic) => ({
      topic,
      items: map.get(topic.id)!,
    }));
  }, [filteredCards]);

  const handleToggleCardCloze = (cardId: string, groupIndex: number) => {
    setRevealedMap((prev) => {
      const nextSet = new Set(prev[cardId] ?? []);
      if (nextSet.has(groupIndex)) nextSet.delete(groupIndex);
      else nextSet.add(groupIndex);
      return { ...prev, [cardId]: nextSet };
    });
  };

  const handleRevealWholeCard = (card: PoliticsCard) => {
    const { totalClozeCount } = buildProcessedPoliticsLines(card);
    setRevealedMap((prev) => {
      const existing = prev[card.id];
      if (existing && existing.size >= totalClozeCount) {
        return { ...prev, [card.id]: new Set() };
      }
      const all = new Set<number>();
      for (let i = 0; i < totalClozeCount; i++) all.add(i);
      return { ...prev, [card.id]: all };
    });
  };

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">政治一页纸总览</h1>
          <p className="page-sub">
            100 张逐字原色卡片 · {POLITICS_TOPICS.length} 专题，不改一字保留原色。会的知识点一键点「标熟记」跳过
          </p>
        </div>
        <div className="toolbar-group">
          <button
            type="button"
            className={`btn-secondary ${clozeMode ? 'active' : ''}`}
            onClick={() => {
              setClozeMode((v) => !v);
              setRevealedMap({});
            }}
          >
            {clozeMode ? <EyeOff size={15} /> : <Eye size={15} />}
            {clozeMode ? '考点遮罩自查' : '原色全显'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setTimelineOpen(true)}
          >
            <Image size={15} />
            史纲脉络图
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setPrefaceOpen(true)}
          >
            <FileText size={15} />
            前言
          </button>
        </div>
      </header>

      <div className="tab-bar" role="tablist" aria-label="按大板块筛选">
        <button
          type="button"
          className={`tab-pill ${majorFilter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setMajorFilter('all');
            setTopicFilter('');
          }}
        >
          全部（{POLITICS_CARDS.length}）
        </button>
        {POLITICS_MAJORS.map((m) => {
          const count = POLITICS_CARDS.filter((c) => c.major === m.id).length;
          return (
            <button
              key={m.id}
              type="button"
              className={`tab-pill ${majorFilter === m.id ? 'active' : ''}`}
              onClick={() => {
                setMajorFilter(m.id);
                setTopicFilter('');
              }}
            >
              {m.name}（{count}）
            </button>
          );
        })}
      </div>

      <div className="formula-handbook-controls">
        <div className="formula-search-wrap">
          <Search size={15} className="formula-search-icon" />
          <input
            type="text"
            className="search-input formula-search-input"
            placeholder="搜索编号、关键词、会议名或口诀（如 遵义 / 牢二 / 康熙 / 剩余价值 / 092）…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="formula-filter-row">
          <select
            className="setting-input formula-sec-select"
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            aria-label="按专题筛选"
          >
            <option value="">全部专题（{availableTopics.length}）</option>
            {availableTopics.map((tp) => (
              <option key={tp.id} value={tp.id}>
                {POLITICS_MAJOR_MAP[tp.major].name} · {tp.title}（{tp.cardIds.length}）
              </option>
            ))}
          </select>

          <div className="toolbar-group">
            {(
              [
                { id: 'all', label: '全部状态' },
                { id: 'active', label: '隐藏已熟记' },
                { id: 'unlearned', label: '仅未学' },
                { id: 'mastered', label: '已熟记' },
                { id: 'starred', label: '标星收藏' },
              ] as { id: StatusFilter; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`btn-secondary formula-mini-btn ${statusFilter === opt.id ? 'active' : ''}`}
                onClick={() => setStatusFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="formula-notes-bar">
        <span className="page-sub" style={{ marginTop: 0 }}>
          红 / 橙 / 紫 / 蓝 / 绿完全按原版一页纸着色；深色夜读自动增亮护眼
        </span>
        <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
          当前显示 {filteredCards.length} 张
        </span>
      </div>

      {groupedByTopic.length === 0 ? (
        <div
          className="card-surface"
          style={{ padding: '32px 24px', textAlign: 'center' }}
        >
          <p className="page-sub" style={{ margin: 0 }}>
            没有匹配当前筛选条件的知识点卡片，试试放宽筛选或清空搜索词。
          </p>
        </div>
      ) : (
        <div className="formula-handbook-sections">
          {groupedByTopic.map(({ topic, items }) => {
            const allMasteredInTopic = topic.cardIds.every((id) =>
              isPoliticsDirectMastered(id, mastered)
            );
            const doneInTopic = topic.cardIds.filter(
              (id) =>
                getPoliticsMasteryLevel(id, cards, mastered) === 'mastered'
            ).length;

            return (
              <section key={topic.id} className="formula-handbook-group">
                <div className="formula-handbook-sec-head">
                  <div>
                    <h2 className="formula-handbook-sec-title">
                      <span
                        className={`politics-major-badge pm-${topic.major}`}
                        style={{ marginRight: 8, verticalAlign: 1 }}
                      >
                        {POLITICS_MAJOR_MAP[topic.major].name}
                      </span>
                      {topic.title}
                    </h2>
                    <span className="formula-sec-meta tabular-nums">
                      已搞定 {doneInTopic} / {topic.cardIds.length} 张
                    </span>
                  </div>
                  <div className="toolbar-group">
                    <button
                      type="button"
                      className="btn-secondary formula-mini-btn"
                      onClick={() =>
                        navigate(`/politics/practice?mode=topic&topic=${topic.id}`)
                      }
                    >
                      <Play size={12} strokeWidth={1.8} />
                      刷本专题
                    </button>
                    <button
                      type="button"
                      className={`btn-ghost formula-mini-btn ${allMasteredInTopic ? 'is-ok' : ''}`}
                      onClick={() =>
                        setBatchMastered(topic.cardIds, !allMasteredInTopic)
                      }
                    >
                      <CheckCircle2 size={13} strokeWidth={1.6} />
                      {allMasteredInTopic ? '取消全熟记' : '本专题全标熟记'}
                    </button>
                  </div>
                </div>

                <div className="formula-item-list">
                  {items.map((card) => {
                    const directMastered = isPoliticsDirectMastered(
                      card.id,
                      mastered
                    );
                    const itemStarred = isPoliticsStarred(card.id, starred);
                    const level = getPoliticsMasteryLevel(
                      card.id,
                      cards,
                      mastered
                    );

                    return (
                      <article
                        key={card.id}
                        className={`card-surface formula-row-card ${
                          directMastered ? 'formula-row-mastered' : ''
                        }`}
                      >
                        <div className="formula-row-top">
                          <div className="formula-row-left">
                            <span
                              className={`mastery-dot mastery-${level}`}
                              title={
                                directMastered
                                  ? '已标熟记'
                                  : level === 'mastered'
                                    ? 'FSRS 已掌握'
                                    : level === 'familiar'
                                      ? '熟悉'
                                      : level === 'learning'
                                        ? '学习中'
                                        : '未学'
                              }
                            />
                            <span className="formula-row-num tabular-nums">
                              知识点 {card.code}
                            </span>
                            <div className="politics-handbook-card-title">
                              <PoliticsTitle card={card} />
                            </div>
                          </div>

                          <div className="formula-row-actions">
                            {clozeMode && (
                              <button
                                type="button"
                                className="btn-ghost formula-mini-btn"
                                onClick={() => handleRevealWholeCard(card)}
                              >
                                全显/重遮
                              </button>
                            )}
                            <button
                              type="button"
                              className={`icon-mini-btn ${itemStarred ? 'is-starred' : ''}`}
                              onClick={() => toggleStarred(card.id)}
                              title={itemStarred ? '取消收藏' : '标星收藏'}
                              aria-label={itemStarred ? '取消收藏' : '标星收藏'}
                            >
                              <Star
                                size={15}
                                strokeWidth={1.6}
                                fill={itemStarred ? 'currentColor' : 'none'}
                              />
                            </button>
                            <button
                              type="button"
                              className={`formula-master-chip ${directMastered ? 'active' : ''}`}
                              onClick={() =>
                                setMastered(card.id, !directMastered)
                              }
                              title={
                                directMastered
                                  ? '点击取消熟记，恢复到复习队列'
                                  : '标记为已熟记，跳过不再考'
                              }
                            >
                              <CheckCircle2 size={13} strokeWidth={1.7} />
                              <span>{directMastered ? '已熟记' : '标熟记'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="politics-handbook-body">
                          <PoliticsCardView
                            card={card}
                            clozeMode={clozeMode}
                            revealedClozes={revealedMap[card.id]}
                            onToggleCloze={(gIdx) =>
                              handleToggleCardCloze(card.id, gIdx)
                            }
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
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

      {/* Preface Modal */}
      {prefaceOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setPrefaceOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="作者前言"
        >
          <div
            className="card-surface politics-wide-modal politics-preface-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2>2027 一页纸 · 作者前言（原文）</h2>
              <button
                type="button"
                className="icon-mini-btn"
                onClick={() => setPrefaceOpen(false)}
                aria-label="关闭"
              >
                <X size={18} />
              </button>
            </div>
            <div className="politics-preface-body">
              {POLITICS_PREFACE.map((blk, i) => {
                const content = blk.tokens.map((t, j) => (
                  <span
                    key={j}
                    className={t.highlight ? 'pc-c-FF0000 pc-bold' : undefined}
                  >
                    {t.text}
                  </span>
                ));
                if (blk.kind === 'h1') return <h3 key={i}>{content}</h3>;
                if (blk.kind === 'h2')
                  return (
                    <h4 key={i} style={{ marginTop: 14, marginBottom: 6 }}>
                      {content}
                    </h4>
                  );
                return (
                  <p key={i} style={{ margin: '8px 0', lineHeight: 1.75 }}>
                    {content}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
