import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Layers,
  Play,
  Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MathText } from '../components/MathText';
import {
  collectFormulaMistakes,
  computeFormulaSectionProgress,
  computeFormulaSubjectMastery,
  getDueFormulaIds,
  getFormulaWeeklyHeatmap,
  getStarredFormulaIds,
  getUnlearnedFormulaIds,
} from '../core/formulaStats';
import { getDaysUntilExam } from '../core/scheduler';
import { FORMULA_IDS, type FormulaSubjectId } from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

function getGreeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 6) return '夜深了';
  if (h < 12) return '上午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

export function FormulaTodayPage() {
  const navigate = useNavigate();
  const cards = useFormulaProgress((s) => s.cards);
  const reviews = useFormulaProgress((s) => s.reviews);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);
  const dailyNewLimit = useFormulaProgress((s) => s.dailyNewLimit);
  const getTodayLearnedCount = useFormulaProgress((s) => s.getTodayLearnedCount);
  const examDate = useSettings((s) => s.examDate);

  const [expandedSubject, setExpandedSubject] = useState<FormulaSubjectId | null>(null);

  useEffect(() => {
    document.title = '今日公式 · 公式默写';
  }, []);

  const daysLeft = useMemo(
    () => getDaysUntilExam(examDate, new Date()),
    [examDate]
  );
  const dueIds = useMemo(
    () => getDueFormulaIds(cards, mastered),
    [cards, mastered]
  );
  const unlearnedIds = useMemo(
    () => getUnlearnedFormulaIds(cards, mastered),
    [cards, mastered]
  );
  const starredIds = useMemo(() => getStarredFormulaIds(starred), [starred]);
  const mistakes = useMemo(
    () => collectFormulaMistakes(reviews, mastered),
    [reviews, mastered]
  );
  const todayLearned = getTodayLearnedCount();
  const remainingNewQuota = Math.max(0, dailyNewLimit - todayLearned);
  const newTodayQuota = Math.min(remainingNewQuota, unlearnedIds.length);

  const subjectRows = useMemo(
    () => computeFormulaSubjectMastery(cards, mastered),
    [cards, mastered]
  );
  const sectionRows = useMemo(
    () => computeFormulaSectionProgress(cards, mastered),
    [cards, mastered]
  );
  const heatmap = useMemo(
    () => getFormulaWeeklyHeatmap(reviews, mastered),
    [reviews, mastered]
  );

  const totalDirectMastered = subjectRows.reduce((s, r) => s + r.directMastered, 0);
  const totalFsrsMastered = subjectRows.reduce((s, r) => s + r.fsrsMastered, 0);
  const totalDone = totalDirectMastered + totalFsrsMastered;

  const handlePrimaryStart = () => {
    if (dueIds.length > 0) {
      navigate('/formula/practice?mode=due');
    } else if (newTodayQuota > 0) {
      navigate('/formula/practice?mode=new');
    } else {
      navigate('/formula/practice?mode=custom');
    }
  };

  return (
    <Layout>
      <header className="today-topbar">
        <div>
          <h1 className="page-title">{getGreeting()} · 公式默写</h1>
        </div>
        {daysLeft !== null ? (
          <span className="exam-countdown tabular-nums">
            {daysLeft > 0 ? `距考试 ${daysLeft} 天` : '考试日已到'}
          </span>
        ) : (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate('/settings')}
          >
            设置考试日期
          </button>
        )}
      </header>

      {/* Unified Primary Today Task Card (consistent with Essay Today page) */}
      <section className="card-surface today-task-card">
        <div className="section-row-head" style={{ marginBottom: 14 }}>
          <div className="today-task-label" style={{ marginBottom: 0 }}>
            今日公式任务
          </div>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            总搞定 {totalDone} / {FORMULA_IDS.length}（熟记 {totalDirectMastered} · 掌握 {totalFsrsMastered}）
          </span>
        </div>

        <div className="today-metrics formula-today-metrics">
          <div className="today-metric">
            <span
              className="today-metric-num tabular-nums"
              style={{ color: dueIds.length > 0 ? 'var(--gold)' : undefined }}
            >
              {dueIds.length}
            </span>
            <span className="today-metric-cap">待复习公式</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">{newTodayQuota}</span>
            <span className="today-metric-cap">今日新公式</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">{starredIds.length}</span>
            <span className="today-metric-cap">标星收藏</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span
              className="today-metric-num tabular-nums"
              style={{ color: mistakes.length > 0 ? 'var(--err)' : undefined }}
            >
              {mistakes.length}
            </span>
            <span className="today-metric-cap">薄弱错题</span>
          </div>
        </div>

        <div className="today-task-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handlePrimaryStart}
          >
            <Play size={15} strokeWidth={1.5} />
            {dueIds.length > 0
              ? `开始到期复习（${dueIds.length} 题）`
              : newTodayQuota > 0
                ? `开始学习今日新公式（${newTodayQuota} 题）`
                : '自由选章抽查默写'}
          </button>

          {dueIds.length > 0 && newTodayQuota > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/formula/practice?mode=new')}
            >
              直接学新题
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          )}

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/formula/handbook')}
          >
            <BookOpen size={14} strokeWidth={1.5} />
            去手册勾熟记
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/formula/practice?mode=custom')}
          >
            <Layers size={14} strokeWidth={1.5} />
            自由选章抽查
          </button>

          {starredIds.length > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/formula/practice?mode=starred')}
            >
              <Star size={14} strokeWidth={1.5} />
              刷收藏 ({starredIds.length})
            </button>
          )}
        </div>
      </section>

      {/* Weekly 7-day Formula Heatmap */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">本周公式练习</h2>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            近 7 天共 {heatmap.reduce((acc, d) => acc + d.count, 0)} 次默写 / 标熟记
          </span>
        </div>
        <div className="heatmap-grid" aria-label="本周公式练习热力图">
          {heatmap.map((day) => (
            <div key={day.dateKey} className="heatmap-cell-wrap">
              <div
                className={`heatmap-cell heat-level-${day.level} tabular-nums`}
                title={`${day.dateKey}：${day.count} 次`}
              >
                {day.count > 0 ? day.count : ''}
              </div>
              <span className="heatmap-day">{day.weekdayLabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Subjects & 25 Expandable Sections */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">四大科目进度（25 板块）</h2>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            已搞定 {totalDone} / {FORMULA_IDS.length} 题
          </span>
        </div>

        <div className="course-progress-list">
          {subjectRows.map((subj) => {
            const isOpen = expandedSubject === subj.subject;
            const secs = sectionRows.filter((s) => s.subject === subj.subject);
            const pct =
              subj.total > 0 ? Math.round((subj.doneCount / subj.total) * 100) : 0;

            return (
              <div key={subj.subject} className="course-item">
                <button
                  type="button"
                  className="course-item-trigger"
                  onClick={() => setExpandedSubject(isOpen ? null : subj.subject)}
                >
                  <span className="course-chevron">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                  <div className="course-main">
                    <div className="course-top-line">
                      <span className="course-title">
                        {subj.name} · {subj.fullName}
                      </span>
                      <span className="course-status tabular-nums">
                        已搞定 {subj.doneCount}/{subj.total}（{pct}%）
                      </span>
                    </div>
                    <div className="course-bar-track">
                      <div
                        className={`course-bar-fill ${pct === 100 ? 'fill-done' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="course-detail" style={{ paddingLeft: 16 }}>
                    <div className="formula-sec-list">
                      {secs.map((sec) => {
                        const secDone = sec.directMastered + sec.fsrsMastered;
                        const allDone = secDone === sec.total;
                        return (
                          <div key={sec.sectionId} className="formula-sec-row">
                            <div className="formula-sec-info">
                              <div className="formula-sec-name">
                                {allDone && (
                                  <CheckCircle2
                                    size={14}
                                    style={{ color: 'var(--ok)', flexShrink: 0 }}
                                  />
                                )}
                                <span className="formula-sec-code">{sec.code}</span>
                                <MathText text={sec.title} />
                              </div>
                              <div className="formula-sec-meta tabular-nums">
                                熟记 {sec.directMastered} · 掌握 {sec.fsrsMastered} · 在学{' '}
                                {sec.inProgress} · 未学 {sec.unlearned}
                                {sec.dueCount > 0 && (
                                  <span style={{ color: 'var(--gold)', marginLeft: 8 }}>
                                    到期 {sec.dueCount}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="formula-sec-actions">
                              <button
                                type="button"
                                className="btn-secondary formula-mini-btn"
                                onClick={() =>
                                  navigate(
                                    `/formula/practice?mode=section&section=${sec.sectionId}`
                                  )
                                }
                              >
                                默写
                              </button>
                              <button
                                type="button"
                                className="btn-ghost formula-mini-btn"
                                onClick={() =>
                                  navigate(`/formula/handbook?section=${sec.sectionId}`)
                                }
                              >
                                手册
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
