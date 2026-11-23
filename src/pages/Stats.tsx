import { useEffect, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Layout } from '../components/Layout';
import {
  compute14DayForecast,
  computeExamTimeSeries,
  computeIdentificationStats,
  computeTemplateMastery,
} from '../core/stats';
import { useProgress } from '../store/useProgress';
import './pages.css';

export function StatsPage() {
  const cards = useProgress((s) => s.cards);
  const examRecords = useProgress((s) => s.examRecords);
  const idRecords = useProgress((s) => s.idRecords);

  useEffect(() => {
    document.title = '统计 · 小作文';
  }, []);

  const masteryRows = useMemo(() => computeTemplateMastery(cards), [cards]);
  const forecast = useMemo(() => compute14DayForecast(cards), [cards]);
  const examSeries = useMemo(() => computeExamTimeSeries(examRecords), [examRecords]);
  const idStats = useMemo(() => computeIdentificationStats(idRecords), [idRecords]);

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">学习统计</h1>
          <p className="page-sub">
            基于 FSRS-5 稳定度、14 天复习预测、实战用时与题型识别统计
          </p>
        </div>
      </header>

      {/* Identification Accuracy Summary */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">题型识别正确率</h2>
          <span className="page-sub tabular-nums">
            累计识题 {idStats.total} 次
          </span>
        </div>
        <div className="today-metrics">
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">
              {idStats.accuracyPct !== null ? `${idStats.accuracyPct}%` : '—'}
            </span>
            <span className="today-metric-cap">正确率</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">
              {idStats.correct} / {idStats.total}
            </span>
            <span className="today-metric-cap">判对 / 总次数</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">
              {examRecords.length}
            </span>
            <span className="today-metric-cap">已完成实战篇数</span>
          </div>
        </div>
      </section>

      {/* Template Mastery Segmented Bars */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">各模板掌握度</h2>
          <div className="mastery-legend">
            <span><i className="m-swatch m-mastered" /> 牢固 (&gt;14天)</span>
            <span><i className="m-swatch m-familiar" /> 熟悉 (3–14天)</span>
            <span><i className="m-swatch m-learning" /> 学习中 (&lt;3天)</span>
            <span><i className="m-swatch m-unlearned" /> 未学</span>
          </div>
        </div>

        <div className="mastery-bar-list">
          {masteryRows.map((row) => (
            <div key={row.templateId} className="mastery-bar-row">
              <div className="mastery-bar-name">{row.name}</div>
              <div className="mastery-segmented-track">
                {row.mastered > 0 && (
                  <div
                    className="m-seg m-mastered"
                    style={{ width: `${(row.mastered / row.total) * 100}%` }}
                    title={`牢固：${row.mastered} 句`}
                  />
                )}
                {row.familiar > 0 && (
                  <div
                    className="m-seg m-familiar"
                    style={{ width: `${(row.familiar / row.total) * 100}%` }}
                    title={`熟悉：${row.familiar} 句`}
                  />
                )}
                {row.learning > 0 && (
                  <div
                    className="m-seg m-learning"
                    style={{ width: `${(row.learning / row.total) * 100}%` }}
                    title={`学习中：${row.learning} 句`}
                  />
                )}
                {row.unlearned > 0 && (
                  <div
                    className="m-seg m-unlearned"
                    style={{ width: `${(row.unlearned / row.total) * 100}%` }}
                    title={`未学：${row.unlearned} 句`}
                  />
                )}
              </div>
              <div className="mastery-bar-count tabular-nums">
                {row.total - row.unlearned}/{row.total}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14-day Forecast BarChart */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">未来 14 天复习量预测</h2>
          <span className="page-sub">按 FSRS 到期日统计</span>
        </div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={forecast} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
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
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 6,
                  fontSize: 13,
                  color: 'var(--ink)',
                }}
              />
              <Bar dataKey="dueCount" name="到期句数" fill="var(--gold)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Full Essay Exam Time Trend LineChart */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">整篇实战用时趋势（分钟）</h2>
          <span className="page-sub">虚线为 10 分钟考场目标</span>
        </div>
        {examSeries.length === 0 ? (
          <p className="page-sub" style={{ padding: '24px 0', textAlign: 'center' }}>
            暂无实战记录。去「实战模式」写完一篇后，这里会自动绘制用时趋势曲线。
          </p>
        ) : (
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={examSeries} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: 'var(--ink-muted)', fontSize: 11 }}
                  axisLine={{ stroke: 'var(--line)' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, (max: number) => Math.max(15, Math.ceil(max + 2))]}
                  tick={{ fill: 'var(--ink-muted)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 6,
                    fontSize: 13,
                    color: 'var(--ink)',
                  }}
                />
                <ReferenceLine
                  y={10}
                  stroke="var(--ok)"
                  strokeDasharray="4 4"
                  label={{ value: '10 分钟目标', fill: 'var(--ok)', fontSize: 11, position: 'insideTopRight' }}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  name="用时（分钟）"
                  stroke="var(--gold)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--gold)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </Layout>
  );
}
