import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Layers,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  collectFormulaMistakes,
  computeFormulaSectionProgress,
  computeFormulaSubjectMastery,
  getDueFormulaIds,
  getStarredFormulaIds,
  getUnlearnedFormulaIds,
} from '../core/formulaStats';
import { getDaysUntilExam } from '../core/scheduler';
import { FORMULA_IDS, type FormulaSubjectId } from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

export function FormulaTodayPage() {
  const navigate = useNavigate();
  const cards = useFormulaProgress((s) => s.cards);
  const reviews = useFormulaProgress((s) => s.reviews);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);
  const dailyNewLimit = useFormulaProgress((s) => s.dailyNewLimit);
  const getTodayLearnedCount = useFormulaProgress((s) => s.getTodayLearnedCount);
  const examDate = useSettings((s) => s.examDate);

  const [expandedSubject, setExpandedSubject] = useState<FormulaSubjectId | null>(
    'calculus'
  );

  useEffect(() => {
    document.title = '今日公式 · 公式默写';
  }, []);

  const examDays = useMemo(
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
  const todayNewCount = Math.min(remainingNewQuota, unlearnedIds.length);

  const subjectRows = useMemo(
    () => computeFormulaSubjectMastery(cards, mastered),
    [cards, mastered]
  );
  const sectionRows = useMemo(
    () => computeFormulaSectionProgress(cards, mastered),
    [cards, mastered]
  );

  const totalDirectMastered = subjectRows.reduce((s, r) => s + r.directMastered, 0);
  const totalFsrsMastered = subjectRows.reduce((s, r) => s + r.fsrsMastered, 0);
  const totalDone = totalDirectMastered + totalFsrsMastered;

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">今日公式</h1>
          <p className="page-sub">
            高数 · 线代 · 概率统计 · 信号系统（共 {FORMULA_IDS.length} 题，支持直接标熟记与 FSRS 间隔复习）
          </p>
        </div>
        {examDays !== null && (
          <div className="exam-pill tabular-nums">
            {examDays >= 0 ? `距考试 ${examDays} 天` : `考后第 ${Math.abs(examDays)} 天`}
          </div>
        )}
      </header>

      <section className="formula-kpi-grid">
        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">已搞定总进度</div>
          <div className="formula-kpi-val tabular-nums">
            {totalDone} <span className="formula-kpi-sub">/ {FORMULA_IDS.length}</span>
          </div>
          <div className="formula-kpi-note tabular-nums">
            熟记 {totalDirectMastered} · FSRS 掌握 {totalFsrsMastered}
          </div>
        </div>

        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">今日待复习</div>
          <div
            className="formula-kpi-val tabular-nums"
            style={{ color: dueIds.length > 0 ? 'var(--gold)' : 'var(--ok)' }}
          >
            {dueIds.length}
          </div>
          <div className="formula-kpi-note">已标熟记自动排除</div>
        </div>

        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">今日新公式</div>
          <div className="formula-kpi-val tabular-nums">
            {todayLearned}{' '}
            <span className="formula-kpi-sub">/ {dailyNewLimit}</span>
          </div>
          <div className="formula-kpi-note tabular-nums">
            剩余未学 {unlearnedIds.length} 题
          </div>
        </div>

        <div className="card-surface formula-kpi-card">
          <div className="formula-kpi-label">收藏 / 错题</div>
          <div className="formula-kpi-val tabular-nums">
            {starredIds.length}{' '}
            <span className="formula-kpi-sub">/ {mistakes.length}</span>
          </div>
          <div className="formula-kpi-note">考前高危重点</div>
        </div>
      </section>

      <section className="task-grid" style={{ marginTop: 16 }}>
        <div className="card-surface task-card">
          <div className="task-card-head">
            <span className="task-tag">FSRS 到期复习</span>
            <RotateCcw size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
          </div>
          <div className="task-big tabular-nums">
            {dueIds.length > 0 ? `${dueIds.length} 题待巩固` : '今日已清零'}
          </div>
          <p className="task-desc">
            纸笔默写 + Space 翻面自评，会的题随时按 M 一键标熟记跳过。
          </p>
          <button
            type="button"
            className={dueIds.length > 0 ? 'btn-primary' : 'btn-secondary'}
            onClick={() => navigate('/formula/practice?mode=due')}
          >
            {dueIds.length > 0 ? '开始复习' : '去自由刷题'}
            <ArrowRight size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="card-surface task-card">
          <div className="task-card-head">
            <span className="task-tag">学习新公式</span>
            <Sparkles size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
          </div>
          <div className="task-big tabular-nums">
            {unlearnedIds.length === 0
              ? '全部已覆盖'
              : todayNewCount > 0
                ? `今日还可学 ${todayNewCount} 题`
                : '今日新题已达上限'}
          </div>
          <p className="task-desc">
            遇到早就会的基础公式，直接点「已熟记」秒过，不占复习队列。
          </p>
          <div className="toolbar-group">
            <button
              type="button"
              className="btn-primary"
              disabled={unlearnedIds.length === 0}
              onClick={() => navigate('/formula/practice?mode=new')}
            >
              开始新题默写
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/formula/handbook')}
            >
              <BookOpen size={14} strokeWidth={1.5} />
              去手册先勾熟记
            </button>
          </div>
        </div>
      </section>

      <section className="card-surface" style={{ padding: '18px 20px', marginTop: 16 }}>
        <div className="section-head-row" style={{ marginBottom: 12 }}>
          <h2 className="section-small-title">快捷刷题入口</h2>
        </div>
        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/formula/practice?mode=custom')}
          >
            <Layers size={15} strokeWidth={1.5} />
            自由选科 / 选板块抽查
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={starredIds.length === 0}
            onClick={() => navigate('/formula/practice?mode=starred')}
          >
            <Star size={15} strokeWidth={1.5} />
            只刷标星收藏（{starredIds.length}）
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={mistakes.length === 0}
            onClick={() => navigate('/formula/practice?mode=mistakes')}
          >
            专攻错题公式（{mistakes.length}）
          </button>
        </div>
      </section>

      <section className="card-surface" style={{ padding: '20px 22px', marginTop: 16 }}>
        <div className="section-head-row">
          <h2 className="section-small-title">4 大科目与 25 个知识点板块</h2>
          <span className="page-sub" style={{ marginTop: 0 }}>
            点击展开各板块，可单独默写或在手册中勾选熟记
          </span>
        </div>

        <div className="course-progress-list">
          {subjectRows.map((subj) => {
            const isOpen = expandedSubject === subj.subject;
            const secs = sectionRows.filter((s) => s.subject === subj.subject);
            const pct = subj.total > 0 ? Math.round((subj.doneCount / subj.total) * 100) : 0;

            return (
              <div key={subj.subject} className="course-item">
                <button
                  type="button"
                  className="course-item-trigger"
                  onClick={() =>
                    setExpandedSubject(isOpen ? null : subj.subject)
                  }
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
                                <span>{sec.title}</span>
                              </div>
                              <div className="formula-sec-meta tabular-nums">
                                熟记 {sec.directMastered} · 掌握 {sec.fsrsMastered} · 在学 {sec.inProgress} · 未学 {sec.unlearned}
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
