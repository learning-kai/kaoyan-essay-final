import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  CHART_DEGREE_ADVERBS,
  DYNAMIC_CHART_BLOCKS,
  generateRandomChart,
  STATIC_CHART_BLOCKS,
  type ChartKind,
  type ChartNature,
  type GeneratedChartProblem,
} from '../../data/bigChart';
import { useProgress } from '../../store/useProgress';

const CHART_COLORS = ['#A8862F', '#B0524C', '#315A9B', '#4F7A5A', '#8A63A8'];

export function BigChartTab() {
  const recordBigChart = useProgress((s) => s.recordBigChart);
  const bigChartRecords = useProgress((s) => s.bigChartRecords);

  const [kindFilter, setKindFilter] = useState<ChartKind | 'random'>('random');
  const [problem, setProblem] = useState<GeneratedChartProblem>(() =>
    generateRandomChart('pie')
  );

  // Step 1: Nature & Overall feature selection
  const [chosenNature, setChosenNature] = useState<ChartNature | null>(null);
  const [chosenOverallId, setChosenOverallId] = useState<string | null>(null);
  // Step 2: Detail sentences selection
  const [chosenDetails, setChosenDetails] = useState<string[]>([]);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  // Step 3: Fill-in-data check
  const [fillValues, setFillValues] = useState<Record<string, string>>({});
  const [fillChecked, setFillChecked] = useState(false);

  const [showBlocksRef, setShowBlocksRef] = useState(false);

  const regenerate = (nextFilter?: ChartKind | 'random') => {
    const f = nextFilter ?? kindFilter;
    setProblem(generateRandomChart(f === 'random' ? undefined : f));
    setChosenNature(null);
    setChosenOverallId(null);
    setChosenDetails([]);
    setDetailsSubmitted(false);
    setFillValues({});
    setFillChecked(false);
  };

  const overallOptions =
    problem.nature === 'static'
      ? STATIC_CHART_BLOCKS.filter((b) => b.stage === 'overall')
      : DYNAMIC_CHART_BLOCKS.filter((b) => b.stage === 'overall');

  const detailOptions =
    problem.nature === 'static'
      ? STATIC_CHART_BLOCKS.filter((b) => b.stage === 'detail')
      : DYNAMIC_CHART_BLOCKS.filter((b) => b.stage === 'detail');

  const natureCorrect = chosenNature === problem.nature;
  const overallCorrect = chosenOverallId === problem.expectedOverallId;

  const detailScoreOk =
    detailsSubmitted &&
    problem.recommendedDetailIds.some((id) => chosenDetails.includes(id));

  const checkBlank = (expected: string, actual: string): boolean => {
    const norm = (s: string) => s.trim().replace(/\s+/g, '').replace(/,/g, '').toLowerCase();
    return norm(expected) === norm(actual);
  };

  const blanks = problem.fillTask.templateParts.filter(
    (p): p is { kind: 'blank'; id: string; label: string; expected: string } =>
      p.kind === 'blank'
  );
  const allBlanksOk =
    fillChecked &&
    blanks.every((b) => checkBlank(b.expected, fillValues[b.id] ?? ''));

  const handleSubmitFill = () => {
    if (fillChecked) return;
    setFillChecked(true);
    const okFill = blanks.every((b) =>
      checkBlank(b.expected, fillValues[b.id] ?? '')
    );
    recordBigChart({
      kind: problem.kind,
      selectionCorrect: natureCorrect && overallCorrect,
      fillCorrect: okFill,
    });
  };

  return (
    <div>
      <section className="card-surface today-section-card">
        <div className="section-row-head" style={{ marginBottom: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h2 className="section-small-title">图表作文积木训练（选句 + 填数）</h2>
              <span className="formula-tag-warn">英语二常考 · 英语一备用</span>
            </div>
            <p className="page-sub" style={{ marginTop: 4 }}>
              图表第一段是「引入 → 总体特征 → 数据细节」积木组合，随机图表无限练，重点练选句与数字/respectively 核对。
            </p>
          </div>
          <span className="page-sub tabular-nums" style={{ margin: 0 }}>
            已完成 {bigChartRecords.length} 题
          </span>
        </div>

        <div className="toolbar-group">
          {(
            [
              { id: 'random', label: '随机图表' },
              { id: 'pie', label: '饼图（静态%）' },
              { id: 'bar', label: '柱状图（静态数值）' },
              { id: 'line', label: '折线图（动态趋势）' },
            ] as { id: ChartKind | 'random'; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`btn-secondary formula-mini-btn ${kindFilter === opt.id ? 'active' : ''}`}
              onClick={() => {
                setKindFilter(opt.id);
                regenerate(opt.id);
              }}
            >
              {opt.label}
            </button>
          ))}
          <button
            type="button"
            className="btn-primary formula-mini-btn"
            onClick={() => regenerate()}
          >
            <RefreshCw size={13} />
            换一张新图
          </button>
        </div>
      </section>

      {/* Random Recharts Chart + Data Table */}
      <section className="card-surface today-section-card">
        <div className="section-row-head" style={{ marginBottom: 10 }}>
          <h3 className="section-small-title">{problem.titleZh}</h3>
          <span className="drill-tag">{problem.chartNameEn}</span>
        </div>

        <div className="big-chart-visual">
          <ResponsiveContainer width="100%" height={250}>
            {problem.kind === 'pie' && problem.staticData ? (
              <PieChart>
                <Pie
                  data={problem.staticData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={84}
                  isAnimationActive={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {problem.staticData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            ) : problem.kind === 'bar' && problem.staticData ? (
              <BarChart
                data={problem.staticData}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'var(--ink-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--ink-muted)', fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name={problem.unit}
                  fill="var(--gold)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            ) : (
              <LineChart
                data={problem.dynamicData ?? []}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: 'var(--ink-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--ink-muted)', fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {(problem.series ?? []).map((s, idx) => (
                  <Line
                    key={s.name}
                    type="monotone"
                    dataKey={s.name}
                    stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Exact data readout strip */}
        <div className="big-chart-data-strip tabular-nums">
          {problem.staticData
            ? problem.staticData.map((d) => (
                <span key={d.name} className="drill-tag">
                  {d.name}:{' '}
                  <strong>
                    {d.value}
                    {problem.isPercentage ? '%' : ` ${problem.unit}`}
                  </strong>
                </span>
              ))
            : (problem.series ?? []).map((s) => (
                <span key={s.name} className="drill-tag">
                  {s.name}:{' '}
                  <strong>
                    {s.values.join(' → ')} ({problem.unit})
                  </strong>
                </span>
              ))}
        </div>
      </section>

      {/* Step 1: Static vs Dynamic + Overall feature */}
      <section className="card-surface today-section-card">
        <h3 className="section-small-title" style={{ marginBottom: 10 }}>
          第一步：判断动静 &amp; 选择总体特征句
        </h3>

        <div className="toolbar-group" style={{ marginBottom: 12 }}>
          <span className="setting-desc" style={{ margin: 0 }}>
            1. 这是静态图还是动态图？
          </span>
          {(
            [
              { id: 'static', label: '静态图（看比例 / 大小对比）' },
              { id: 'dynamic', label: '动态图（看时间变化趋势）' },
            ] as { id: ChartNature; label: string }[]
          ).map((opt) => {
            let cls = 'btn-secondary formula-mini-btn';
            if (chosenNature !== null) {
              if (opt.id === problem.nature) cls += ' choice-ok';
              else if (opt.id === chosenNature) cls += ' choice-err';
            }
            return (
              <button
                key={opt.id}
                type="button"
                className={cls}
                disabled={chosenNature !== null}
                onClick={() => setChosenNature(opt.id)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {chosenNature !== null && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 13,
                color: natureCorrect ? 'var(--ok)' : 'var(--err)',
                marginBottom: 10,
              }}
            >
              {natureCorrect
                ? `判断正确！这是${problem.nature === 'static' ? '静态' : '动态'}图。`
                : `这是${problem.nature === 'static' ? '静态' : '动态'}图（${
                    problem.nature === 'static' ? '无时间轴，比类别大小' : '有年份横轴，看趋势变化'
                  }）。`}
            </div>

            <div className="setting-desc" style={{ marginBottom: 8 }}>
              2. 应该选用哪一句「总体特征 / 总体趋势」？
            </div>
            <div className="politics-choice-list">
              {overallOptions.map((blk) => {
                let cls = 'id-choice-btn politics-choice-btn';
                if (chosenOverallId !== null) {
                  if (blk.id === problem.expectedOverallId) cls += ' choice-ok';
                  else if (blk.id === chosenOverallId) cls += ' choice-err';
                }
                return (
                  <button
                    key={blk.id}
                    type="button"
                    disabled={chosenOverallId !== null}
                    className={cls}
                    onClick={() => setChosenOverallId(blk.id)}
                  >
                    <span className="politics-choice-text">
                      <strong>【{blk.label}】</strong> {blk.en}
                    </span>
                  </button>
                );
              })}
            </div>

            {chosenOverallId !== null && (
              <div className="id-feedback">
                <div
                  className="id-feedback-head"
                  style={{ color: overallCorrect ? 'var(--ok)' : 'var(--err)' }}
                >
                  {overallCorrect ? '选句精准！' : '建议换一句更贴合图中数据的总起句'}
                </div>
                <p className="politics-drill-explain">{problem.overallReasonZh}</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Step 2: Detail sentence blocks */}
      {chosenOverallId !== null && (
        <section className="card-surface today-section-card">
          <h3 className="section-small-title" style={{ marginBottom: 10 }}>
            第二步：勾选适合本题的数据细节功能句（可多选）
          </h3>
          <div className="politics-choice-list">
            {detailOptions.map((blk) => {
              const checked = chosenDetails.includes(blk.id);
              const isRec = problem.recommendedDetailIds.includes(blk.id);
              let cls = 'id-choice-btn politics-choice-btn';
              if (detailsSubmitted) {
                if (isRec) cls += ' choice-ok';
                else if (checked) cls += ' choice-err';
              } else if (checked) {
                cls += ' active';
              }
              return (
                <button
                  key={blk.id}
                  type="button"
                  disabled={detailsSubmitted}
                  className={cls}
                  onClick={() =>
                    setChosenDetails((prev) =>
                      prev.includes(blk.id)
                        ? prev.filter((x) => x !== blk.id)
                        : [...prev, blk.id]
                    )
                  }
                >
                  <span className="politics-choice-text">
                    <strong>{blk.label}</strong>：{blk.en}
                    {blk.note && (
                      <div className="setting-desc" style={{ margin: 0 }}>
                        {blk.note}
                      </div>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {!detailsSubmitted ? (
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: 12 }}
              disabled={chosenDetails.length === 0}
              onClick={() => setDetailsSubmitted(true)}
            >
              核对选句
            </button>
          ) : (
            <div className="id-feedback">
              <div
                className="id-feedback-head"
                style={{ color: detailScoreOk ? 'var(--ok)' : 'var(--warn)' }}
              >
                {detailScoreOk ? '细节句搭配合理！' : '可参考高亮绿色推荐功能句：'}
              </div>
              <p className="politics-drill-explain">{problem.detailReasonZh}</p>
              {problem.recommendedAdverb && problem.adverbReasonZh && (
                <div className="big-link-callout" style={{ marginTop: 8 }}>
                  <span>
                    程度副词建议：<strong>{problem.recommendedAdverb}</strong> —{' '}
                    {problem.adverbReasonZh}
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Step 3: Fill-in-data verification */}
      {detailsSubmitted && (
        <section className="card-surface today-section-card">
          <h3 className="section-small-title" style={{ marginBottom: 8 }}>
            第三步：填数核对（校验数值、百分号与 respectively 对应顺序）
          </h3>
          <p className="setting-desc" style={{ marginBottom: 12 }}>
            {problem.fillTask.promptZh}
          </p>

          <div className="big-chart-fill-box serif-text">
            {problem.fillTask.templateParts.map((part, idx) => {
              if (part.kind === 'text') {
                return <Fragment key={idx}>{part.text}</Fragment>;
              }
              const val = fillValues[part.id] ?? '';
              const ok = fillChecked && checkBlank(part.expected, val);
              return (
                <span key={part.id} className="big-chart-blank-wrap">
                  <input
                    type="text"
                    className={`big-chart-blank-input ${
                      fillChecked ? (ok ? 'blank-ok' : 'blank-err') : ''
                    }`}
                    disabled={fillChecked}
                    placeholder={part.label}
                    value={val}
                    onChange={(e) =>
                      setFillValues((prev) => ({
                        ...prev,
                        [part.id]: e.target.value,
                      }))
                    }
                  />
                  {fillChecked && !ok && (
                    <span className="big-chart-expected">({part.expected})</span>
                  )}
                </span>
              );
            })}
          </div>

          <div className="toolbar-group" style={{ marginTop: 14 }}>
            {!fillChecked ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleSubmitFill}
              >
                核对填数结果
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => regenerate()}
              >
                <RefreshCw size={14} />
                再练一张新图
              </button>
            )}
          </div>

          {fillChecked && (
            <div className="id-feedback">
              <div
                className="id-feedback-head"
                style={{
                  color: allBlanksOk ? 'var(--ok)' : 'var(--err)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {allBlanksOk && <CheckCircle2 size={16} />}
                {allBlanksOk
                  ? '全部数字、单位与 respectively 顺序完全正确！'
                  : '有几处数据不一致，括号中已标出正确填法。'}
              </div>
              <div className="answer-reveal" style={{ marginTop: 10 }}>
                <div className="answer-reveal-label">完整图表第一段参考范文</div>
                <div className="serif-text" style={{ fontSize: 16 }}>
                  {problem.fillTask.referenceParagraph}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Collapsible Chart Building Blocks Quick Reference */}
      <section className="card-surface today-section-card">
        <button
          type="button"
          className="big-collapse-trigger"
          onClick={() => setShowBlocksRef((v) => !v)}
        >
          <span className="section-small-title" style={{ margin: 0 }}>
            图表积木句型速查表（静态 + 动态 + 4 个程度副词）
          </span>
          {showBlocksRef ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showBlocksRef && (
          <div style={{ marginTop: 14 }}>
            <div className="setting-label" style={{ marginBottom: 6 }}>
              趋势程度副词（接在 rose / fell / increased / decreased 后）
            </div>
            <div className="toolbar-group" style={{ marginBottom: 14 }}>
              {CHART_DEGREE_ADVERBS.map((a) => (
                <span key={a.word} className="drill-tag">
                  <strong>{a.word}</strong> · {a.zh}（{a.rule}）
                </span>
              ))}
            </div>

            <div className="setting-label" style={{ marginBottom: 6 }}>
              静态图句型积木
            </div>
            <ul className="big-chart-ref-list">
              {STATIC_CHART_BLOCKS.map((b) => (
                <li key={b.id}>
                  <strong>{b.label}：</strong>
                  <span className="serif-text">{b.en}</span>
                  <div className="setting-desc">{b.zh}</div>
                </li>
              ))}
            </ul>

            <div className="setting-label" style={{ marginTop: 12, marginBottom: 6 }}>
              动态图句型积木
            </div>
            <ul className="big-chart-ref-list">
              {DYNAMIC_CHART_BLOCKS.map((b) => (
                <li key={b.id}>
                  <strong>{b.label}：</strong>
                  <span className="serif-text">{b.en}</span>
                  <div className="setting-desc">{b.zh}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
