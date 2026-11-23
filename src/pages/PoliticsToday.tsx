import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Image,
  Layers,
  Play,
  Star,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  collectPoliticsMistakes,
  computePoliticsMajorProgress,
  computePoliticsTopicProgress,
  getDuePoliticsIds,
  getPoliticsWeeklyHeatmap,
  getStarredPoliticsIds,
  getUnlearnedPoliticsIds,
} from '../core/politicsStats';
import { getDaysUntilExam } from '../core/scheduler';
import {
  POLITICS_CARD_IDS,
  POLITICS_PREFACE,
  POLITICS_TIMELINE_IMAGE,
  type PoliticsMajorId,
} from '../data/politics';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

function getGreeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 6) return '夜深了';
  if (h < 12) return '上午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

export function PoliticsTodayPage() {
  const navigate = useNavigate();
  const cards = usePoliticsProgress((s) => s.cards);
  const reviews = usePoliticsProgress((s) => s.reviews);
  const mastered = usePoliticsProgress((s) => s.mastered);
  const starred = usePoliticsProgress((s) => s.starred);
  const dailyNewLimit = usePoliticsProgress((s) => s.dailyNewLimit);
  const getTodayLearnedCount = usePoliticsProgress((s) => s.getTodayLearnedCount);
  const examDate = useSettings((s) => s.examDate);

  const [expandedMajor, setExpandedMajor] = useState<PoliticsMajorId | null>(null);
  const [prefaceOpen, setPrefaceOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  useEffect(() => {
    document.title = '今日政治 · 政治一页纸';
  }, []);

  const daysLeft = useMemo(
    () => getDaysUntilExam(examDate, new Date()),
    [examDate]
  );
  const dueIds = useMemo(
    () => getDuePoliticsIds(cards, mastered),
    [cards, mastered]
  );
  const unlearnedIds = useMemo(
    () => getUnlearnedPoliticsIds(cards, mastered),
    [cards, mastered]
  );
  const starredIds = useMemo(() => getStarredPoliticsIds(starred), [starred]);
  const mistakes = useMemo(
    () => collectPoliticsMistakes(reviews, mastered),
    [reviews, mastered]
  );
  const todayLearned = getTodayLearnedCount();
  const newTodayQuota = Math.min(
    Math.max(0, dailyNewLimit - todayLearned),
    unlearnedIds.length
  );

  const majorRows = useMemo(
    () => computePoliticsMajorProgress(cards, mastered),
    [cards, mastered]
  );
  const topicRows = useMemo(
    () => computePoliticsTopicProgress(cards, mastered),
    [cards, mastered]
  );
  const heatmap = useMemo(
    () => getPoliticsWeeklyHeatmap(reviews, mastered),
    [reviews, mastered]
  );

  const totalDirect = majorRows.reduce((s, r) => s + r.directMastered, 0);
  const totalFsrs = majorRows.reduce((s, r) => s + r.fsrsMastered, 0);
  const totalDone = totalDirect + totalFsrs;

  const handlePrimaryStart = () => {
    if (dueIds.length > 0) {
      navigate('/politics/practice?mode=due');
    } else if (newTodayQuota > 0) {
      navigate('/politics/practice?mode=new');
    } else {
      navigate('/politics/practice?mode=custom');
    }
  };

  return (
    <Layout>
      <header className="today-topbar">
        <h1 className="page-title">{getGreeting()} · 政治一页纸</h1>
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

      {/* Unified Primary Today Task Card */}
      <section className="card-surface today-task-card">
        <div className="section-row-head" style={{ marginBottom: 14 }}>
          <div className="today-task-label" style={{ marginBottom: 0 }}>
            今日政治任务
          </div>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            总搞定 {totalDone} / {POLITICS_CARD_IDS.length}（熟记 {totalDirect} · 掌握 {totalFsrs}）
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
            <span className="today-metric-cap">待复习卡</span>
          </div>
          <div className="today-metric-sep" />
          <div className="today-metric">
            <span className="today-metric-num tabular-nums">{newTodayQuota}</span>
            <span className="today-metric-cap">今日新卡</span>
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
              ? `开始到期复习（${dueIds.length} 张）`
              : newTodayQuota > 0
                ? `开始学习今日新卡（${newTodayQuota} 张）`
                : '自由选专题刷卡'}
          </button>

          {dueIds.length > 0 && newTodayQuota > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/politics/practice?mode=new')}
            >
              直接学新卡
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          )}

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/politics/drills')}
          >
            <Zap size={14} strokeWidth={1.5} />
            会议速配 / 排雷 / 计算
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/politics/handbook')}
          >
            <BookOpen size={14} strokeWidth={1.5} />
            浏览原色一页纸
          </button>

          {starredIds.length > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/politics/practice?mode=starred')}
            >
              <Star size={14} strokeWidth={1.5} />
              刷收藏 ({starredIds.length})
            </button>
          )}
        </div>
      </section>

      {/* Quick Reference Strip: Preface + Shigang Timeline */}
      <section className="card-surface today-section-card">
        <div className="section-row-head" style={{ marginBottom: 12 }}>
          <h2 className="section-small-title">导学与核心脉络图</h2>
          <span className="page-sub" style={{ marginTop: 0 }}>
            先看前言明确主次，史纲脉络随时对照
          </span>
        </div>
        <div className="toolbar-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setTimelineOpen(true)}
          >
            <Image size={15} strokeWidth={1.5} />
            查看《史纲整体脉络》原图
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setPrefaceOpen(true)}
          >
            <FileText size={15} strokeWidth={1.5} />
            阅读作者前言（使用指南）
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/politics/drills?tab=meeting')}
          >
            <Layers size={15} strokeWidth={1.5} />
            直奔每年必考《会议大观》速配
          </button>
        </div>
      </section>

      {/* Weekly 7-day Politics Heatmap */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">本周政治练习</h2>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            近 7 天共 {heatmap.reduce((acc, d) => acc + d.count, 0)} 次刷卡 / 标熟记
          </span>
        </div>
        <div className="heatmap-grid" aria-label="本周政治练习热力图">
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

      {/* 3 Majors & Expandable Topics */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">
            三大板块进度（{topicRows.length} 专题 · 100 卡）
          </h2>
          <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
            已搞定 {totalDone} / {POLITICS_CARD_IDS.length} 张
          </span>
        </div>

        <div className="course-progress-list">
          {majorRows.map((m) => {
            const isOpen = expandedMajor === m.major;
            const topics = topicRows.filter((t) => t.major === m.major);
            const pct = m.total > 0 ? Math.round((m.doneCount / m.total) * 100) : 0;

            return (
              <div key={m.major} className="course-item">
                <button
                  type="button"
                  className="course-item-trigger"
                  onClick={() => setExpandedMajor(isOpen ? null : m.major)}
                >
                  <span className="course-chevron">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                  <div className="course-main">
                    <div className="course-top-line">
                      <span className="course-title">
                        {m.name} · {m.fullName}
                      </span>
                      <span className="course-status tabular-nums">
                        已搞定 {m.doneCount}/{m.total}（{pct}%）
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
                      {topics.map((tp) => {
                        const tpDone = tp.directMastered + tp.fsrsMastered;
                        const allDone = tpDone === tp.total;
                        return (
                          <div key={tp.topicId} className="formula-sec-row">
                            <div className="formula-sec-info">
                              <div className="formula-sec-name">
                                {allDone && (
                                  <CheckCircle2
                                    size={14}
                                    style={{ color: 'var(--ok)', flexShrink: 0 }}
                                  />
                                )}
                                <span className="formula-sec-code">{m.name}</span>
                                <span>{tp.title}</span>
                              </div>
                              <div className="formula-sec-meta tabular-nums">
                                熟记 {tp.directMastered} · 掌握 {tp.fsrsMastered} · 在学{' '}
                                {tp.inProgress} · 未学 {tp.unlearned}
                                {tp.dueCount > 0 && (
                                  <span style={{ color: 'var(--gold)', marginLeft: 8 }}>
                                    到期 {tp.dueCount}
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
                                    `/politics/practice?mode=topic&topic=${tp.topicId}`
                                  )
                                }
                              >
                                刷卡
                              </button>
                              <button
                                type="button"
                                className="btn-ghost formula-mini-btn"
                                onClick={() =>
                                  navigate(`/politics/handbook?topic=${tp.topicId}`)
                                }
                              >
                                一页纸
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
                  <span key={j} className={t.highlight ? 'pc-c-FF0000 pc-bold' : undefined}>
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
