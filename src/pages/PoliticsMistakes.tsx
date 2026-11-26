import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Play,
  Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PoliticsCardView, PoliticsTitle } from '../components/PoliticsCardView';
import {
  collectPoliticsMistakes,
  getStarredPoliticsIds,
  isPoliticsDirectMastered,
  isPoliticsStarred,
} from '../core/politicsStats';
import { POLITICS_CARD_MAP, POLITICS_MAJOR_MAP } from '../data/politics';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import './pages.css';

export function PoliticsMistakesPage() {
  const navigate = useNavigate();
  const reviews = usePoliticsProgress((s) => s.reviews);
  const mastered = usePoliticsProgress((s) => s.mastered);
  const starred = usePoliticsProgress((s) => s.starred);
  const setMastered = usePoliticsProgress((s) => s.setMastered);
  const toggleStarred = usePoliticsProgress((s) => s.toggleStarred);

  const [tab, setTab] = useState<'starred' | 'mistakes'>('starred');
  const [clozeMode, setClozeMode] = useState(false);
  const [revealedMap, setRevealedMap] = useState<Record<string, Set<number>>>(
    {}
  );

  useEffect(() => {
    document.title = '收藏与错题 · 政治一页纸';
  }, []);

  const starredIds = useMemo(() => getStarredPoliticsIds(starred), [starred]);
  const mistakes = useMemo(
    () => collectPoliticsMistakes(reviews, mastered),
    [reviews, mastered]
  );

  useEffect(() => {
    if (starredIds.length === 0 && mistakes.length > 0) {
      setTab('mistakes');
    }
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIds =
    tab === 'starred' ? starredIds : mistakes.map((m) => m.cardId);
  const mistakeById = useMemo(
    () => new Map(mistakes.map((m) => [m.cardId, m])),
    [mistakes]
  );

  const handleToggleCloze = (cardId: string, groupIndex: number) => {
    setRevealedMap((prev) => {
      const next = new Set(prev[cardId] ?? []);
      if (next.has(groupIndex)) next.delete(groupIndex);
      else next.add(groupIndex);
      return { ...prev, [cardId]: next };
    });
  };

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">政治收藏与错题</h1>
          <p className="page-sub">
            标星高危考点与近期点过「重来」或错率 &gt; 30% 的薄弱卡片集中复习
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
            className="btn-primary"
            disabled={activeIds.length === 0}
            onClick={() =>
              navigate(
                `/politics/practice?mode=${tab === 'starred' ? 'starred' : 'mistakes'}`
              )
            }
          >
            <Play size={14} strokeWidth={1.8} />
            只刷当前列表（{activeIds.length}）
          </button>
        </div>
      </header>

      <div className="tab-bar">
        <button
          type="button"
          className={`tab-pill ${tab === 'starred' ? 'active' : ''}`}
          onClick={() => setTab('starred')}
        >
          <Star size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          标星收藏（{starredIds.length}）
        </button>
        <button
          type="button"
          className={`tab-pill ${tab === 'mistakes' ? 'active' : ''}`}
          onClick={() => setTab('mistakes')}
        >
          <AlertTriangle
            size={14}
            style={{ verticalAlign: -2, marginRight: 5 }}
          />
          错题卡片（{mistakes.length}）
        </button>
      </div>

      {activeIds.length === 0 ? (
        <div
          className="card-surface"
          style={{ padding: '36px 24px', textAlign: 'center' }}
        >
          <p className="page-sub" style={{ margin: 0 }}>
            {tab === 'starred'
              ? '还没有标星收藏的政治卡片。刷卡或看一页纸时按 S 或点星标即可加入。'
              : '太棒了，当前没有薄弱错题卡片！'}
          </p>
        </div>
      ) : (
        <div className="mistake-list">
          {activeIds.map((id) => {
            const card = POLITICS_CARD_MAP[id];
            if (!card) return null;
            const majorMeta = POLITICS_MAJOR_MAP[card.major];
            const m = mistakeById.get(id);
            const itemStarred = isPoliticsStarred(id, starred);
            const itemMastered = isPoliticsDirectMastered(id, mastered);

            return (
              <article key={id} className="card-surface mistake-card">
                <div className="mistake-meta">
                  <div className="formula-meta-badges">
                    <span className={`politics-major-badge pm-${card.major}`}>
                      {majorMeta.name}
                    </span>
                    <span className="formula-sec-badge">{card.topic}</span>
                    <span className="formula-num-badge tabular-nums">
                      知识点 {card.code}
                    </span>
                    {m && (
                      <span className="formula-tag-warn tabular-nums">
                        重来 {m.againCount}/{m.totalReviews} 次（错率{' '}
                        {Math.round(m.errorRate * 100)}%）
                      </span>
                    )}
                  </div>

                  <div className="formula-row-actions">
                    <button
                      type="button"
                      className={`icon-mini-btn ${itemStarred ? 'is-starred' : ''}`}
                      onClick={() => toggleStarred(id)}
                      title={itemStarred ? '取消收藏' : '标星收藏'}
                    >
                      <Star
                        size={15}
                        strokeWidth={1.6}
                        fill={itemStarred ? 'currentColor' : 'none'}
                      />
                    </button>
                    <button
                      type="button"
                      className={`formula-master-chip ${itemMastered ? 'active' : ''}`}
                      onClick={() => setMastered(id, !itemMastered)}
                    >
                      <CheckCircle2 size={13} strokeWidth={1.7} />
                      <span>{itemMastered ? '已熟记' : '标熟记'}</span>
                    </button>
                  </div>
                </div>

                <h3 className="politics-handbook-card-title" style={{ marginTop: 10 }}>
                  <PoliticsTitle card={card} />
                </h3>

                <div className="politics-handbook-body">
                  <PoliticsCardView
                    card={card}
                    clozeMode={clozeMode}
                    revealedClozes={revealedMap[id]}
                    onToggleCloze={(gIdx) => handleToggleCloze(id, gIdx)}
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
