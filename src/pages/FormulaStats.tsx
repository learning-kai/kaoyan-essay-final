import { useEffect, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Layout } from '../components/Layout';
import {
  computeFormula14DayForecast,
  computeFormulaSectionProgress,
  computeFormulaSubjectMastery,
  getStarredFormulaIds,
} from '../core/formulaStats';
import { FORMULA_IDS } from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import './pages.css';

export function FormulaStatsPage() {
  const cards = useFormulaProgress((s) => s.cards);
  const reviews = useFormulaProgress((s) => s.reviews);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);

  useEffect(() => {
    document.title = '公式统计 · 公式默写';
  }, []);

  const subjectRows = useMemo(
    () => computeFormulaSubjectMastery(cards, mastered),
    [cards, mastered]
  );
  const sectionRows = useMemo(
    () => computeFormulaSectionProgress(cards, mastered),
    [cards, mastered]
  );
  const forecast = useMemo(
    () => computeFormula14DayForecast(cards, mastered),
    [cards, mastered]
  );
  const starredCount = useMemo(
    () => getStarredFormulaIds(starred).length,
    [starred]
  );

  const totalDirect = subjectRows.reduce((s, r) => s + r.directMastered, 0);
  const totalFsrs = subjectRows.reduce((s, r) => s + r.fsrsMastered, 0);
  const totalDone = totalDirect + totalFsrs;

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">公式学习统计</h1>
          <p className="page-sub">
            四大科掌握分布、25 个板块推进进度与未来 14 天 FSRS 复习量预测
          </p>
        </div>
      </header>

      <section className="formula-kpi-grid" style={{ marginBottom: 16 }}>
        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">总搞定率</div>
          <div className="formula-kpi-val tabular-nums">
            {Math.round((totalDone / FORMULA_IDS.length) * 100)}%
          </div>
          <div className="formula-kpi-note tabular-nums">
            {totalDone} / {FORMULA_IDS.length} 题
          </div>
        </div>
        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">直接标熟记</div>
          <div className="formula-kpi-val tabular-nums" style={{ color: 'var(--ok)' }}>
            {totalDirect}
          </div>
          <div className="formula-kpi-note">已跳过日常队列</div>
        </div>
        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">累计 FSRS 默写</div>
          <div className="formula-kpi-val tabular-nums">{reviews.length}</div>
          <div className="formula-kpi-note">已学卡片 {Object.keys(cards).length} 张</div>
        </div>
        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">标星收藏</div>
          <div className="formula-kpi-val tabular-nums" style={{ color: 'var(--gold)' }}>
            {starredCount}
          </div>
          <div className="formula-kpi-note">考前高危清单</div>
        </div>
      </section>

      <section className="card-surface" style={{ padding: '20px 22px', marginBottom: 16 }}>
        <div className="section-head-row">
          <h2 className="section-small-title">四大科掌握度分布</h2>
          <div className="mastery-legend">
            <span>
              <i className="m-swatch m-mastered" /> 已熟记 / 掌握
            </span>
            <span>
              <i className="m-swatch m-familiar" /> 熟悉
            </span>
            <span>
              <i className="m-swatch m-learning" /> 学习中
            </span>
            <span>
              <i className="m-swatch m-unlearned" /> 未学
            </span>
          </div>
        </div>

        <div className="mastery-bar-list">
          {subjectRows.map((row) => {
            const pMastered = (row.doneCount / row.total) * 100;
            const pFamiliar = (row.familiar / row.total) * 100;
            const pLearning = (row.learning / row.total) * 100;
            return (
              <div key={row.subject} className="mastery-bar-row">
                <span className="mastery-bar-name">{row.name}</span>
                <div className="mastery-segmented-track">
                  <div className="m-seg m-mastered" style={{ width: `${pMastered}%` }} />
                  <div className="m-seg m-familiar" style={{ width: `${pFamiliar}%` }} />
                  <div className="m-seg m-learning" style={{ width: `${pLearning}%` }} />
                </div>
                <span className="mastery-bar-count tabular-nums">
                  {row.doneCount}/{row.total}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card-surface" style={{ padding: '20px 22px', marginBottom: 16 }}>
        <div className="section-head-row">
          <h2 className="section-small-title">未来 14 天公式复习量预测</h2>
          <span className="page-sub" style={{ marginTop: 0 }}>
            基于 FSRS 到期日（不含已标熟记公式）
          </span>
        </div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecast} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--ink-muted)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--line)' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: 'var(--ink-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'var(--surface-sunk)' }}
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 6,
                  fontSize: 12,
                }}
                formatter={(val: unknown) => [`${val} 题`, '到期复习']}
              />
              <Bar dataKey="dueCount" fill="var(--gold)" radius={[4, 4, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card-surface" style={{ padding: '20px 22px' }}>
        <div className="section-head-row">
          <h2 className="section-small-title">25 个板块进度一览</h2>
        </div>
        <div className="formula-stats-sec-grid">
          {sectionRows.map((sec) => {
            const done = sec.directMastered + sec.fsrsMastered;
            const pct = Math.round((done / sec.total) * 100);
            return (
              <div key={sec.sectionId} className="formula-stats-sec-card">
                <div className="formula-stats-sec-top">
                  <span className="formula-sec-code">{sec.code}</span>
                  <span className="tabular-nums" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
                    {done}/{sec.total}
                  </span>
                </div>
                <div className="formula-stats-sec-title">{sec.title}</div>
                <div className="course-bar-track" style={{ marginTop: 8 }}>
                  <div
                    className={`course-bar-fill ${pct === 100 ? 'fill-done' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
