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
import { MathText } from '../components/MathText';
import {
  collectFormulaMistakes,
  getStarredFormulaIds,
  isFormulaDirectMastered,
  isFormulaStarred,
} from '../core/formulaStats';
import {
  FORMULA_MAP,
  FORMULA_SECTION_MAP,
  FORMULA_SUBJECT_MAP,
} from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import './pages.css';

export function FormulaMistakesPage() {
  const navigate = useNavigate();
  const reviews = useFormulaProgress((s) => s.reviews);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);
  const setMastered = useFormulaProgress((s) => s.setMastered);
  const toggleStarred = useFormulaProgress((s) => s.toggleStarred);

  const [tab, setTab] = useState<'starred' | 'mistakes'>('starred');
  const [hideAnswers, setHideAnswers] = useState(false);

  useEffect(() => {
    document.title = '收藏与错题 · 公式默写';
  }, []);

  const starredIds = useMemo(() => getStarredFormulaIds(starred), [starred]);
  const mistakes = useMemo(
    () => collectFormulaMistakes(reviews, mastered),
    [reviews, mastered]
  );

  // If user has no starred items yet but has mistakes, show mistakes by default on first render
  useEffect(() => {
    if (starredIds.length === 0 && mistakes.length > 0) {
      setTab('mistakes');
    }
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIds =
    tab === 'starred' ? starredIds : mistakes.map((m) => m.formulaId);
  const mistakeById = useMemo(
    () => new Map(mistakes.map((m) => [m.formulaId, m])),
    [mistakes]
  );

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">收藏与错题公式</h1>
          <p className="page-sub">
            标星高危公式与近期点过「重来」或错误率 &gt; 30% 的薄弱公式集中在这里
          </p>
        </div>
        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setHideAnswers((v) => !v)}
          >
            {hideAnswers ? <Eye size={15} /> : <EyeOff size={15} />}
            {hideAnswers ? '显示答案' : '遮住答案'}
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={activeIds.length === 0}
            onClick={() =>
              navigate(
                `/formula/practice?mode=${tab === 'starred' ? 'starred' : 'mistakes'}`
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
          <AlertTriangle size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          错题公式（{mistakes.length}）
        </button>
      </div>

      {activeIds.length === 0 ? (
        <div className="card-surface" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <p className="page-sub" style={{ margin: 0 }}>
            {tab === 'starred'
              ? '还没有标星收藏的公式。在默写或手册中点击星标即可收藏高危公式。'
              : '太棒了，当前没有薄弱错题公式！'}
          </p>
        </div>
      ) : (
        <div className="mistake-list">
          {activeIds.map((id) => {
            const item = FORMULA_MAP[id];
            if (!item) return null;
            const sec = FORMULA_SECTION_MAP[item.sectionId];
            const subj = FORMULA_SUBJECT_MAP[item.subject];
            const m = mistakeById.get(id);
            const itemStarred = isFormulaStarred(id, starred);
            const itemMastered = isFormulaDirectMastered(id, mastered);

            return (
              <div key={id} className="card-surface mistake-card">
                <div className="mistake-meta">
                  <div className="formula-meta-badges">
                    <span className="formula-subj-badge">{subj.name}</span>
                    <span className="formula-sec-badge">
                      <MathText text={sec.fullTitle} />
                    </span>
                    <span className="formula-num-badge tabular-nums">#{item.code}</span>
                    {m && (
                      <span className="formula-tag-warn tabular-nums">
                        重来 {m.againCount}/{m.totalReviews} 次（错率 {Math.round(m.errorRate * 100)}%）
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

                <div className="formula-row-q" style={{ marginTop: 10 }}>
                  <MathText text={item.question} />
                </div>

                {!hideAnswers && (
                  <div className="formula-row-ans" style={{ marginTop: 10 }}>
                    <span className="formula-ans-prefix">答</span>
                    <MathText text={item.answer} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
