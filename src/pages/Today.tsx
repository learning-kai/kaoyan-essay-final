import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Lock,
  Play,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { renderSentenceText } from '../components/LetterView';
import { formatLocalDateKey, getWeeklyHeatmap } from '../core/mistakes';
import {
  getDaysUntilExam,
  getMasteryLevel,
  isExamSprintActive,
} from '../core/scheduler';
import { LESSONS, SENTENCES, STUDYABLE_SENTENCE_IDS } from '../data/templates';
import { deserializeCard, useProgress } from '../store/useProgress';
import { useSettings } from '../store/useSettings';
import './pages.css';

function getGreeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 6) return '夜深了';
  if (h < 12) return '上午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

export function TodayPage() {
  const navigate = useNavigate();
  const cards = useProgress((s) => s.cards);
  const reviews = useProgress((s) => s.reviews);
  const dailyLearnedCount = useProgress((s) => s.dailyLearnedCount);

  const dailyNewLimit = useSettings((s) => s.dailyNewLimit);
  const examDate = useSettings((s) => s.examDate);
  const unlockAllLessons = useSettings((s) => s.unlockAllLessons);

  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(null);

  useEffect(() => {
    document.title = '今日 · 小作文';
  }, []);

  const dueIds = useMemo(() => {
    const nowMs = Date.now();
    return Object.entries(cards)
      .filter(([, card]) => new Date(card.due).getTime() <= nowMs)
      .map(([id]) => id);
  }, [cards]);

  const todayLearned = useMemo(
    () => dailyLearnedCount[formatLocalDateKey(new Date())] ?? 0,
    [dailyLearnedCount]
  );

  const daysLeft = useMemo(() => getDaysUntilExam(examDate, new Date()), [examDate]);
  const sprintActive = useMemo(() => isExamSprintActive(examDate, new Date()), [examDate]);

  const remainingUnlearned = STUDYABLE_SENTENCE_IDS.filter((id) => !cards[id]).length;
  const newTodayQuota = Math.min(
    Math.max(0, dailyNewLimit - todayLearned),
    remainingUnlearned
  );
  const totalTodayCards = dueIds.length + newTodayQuota;
  const estimatedMinutes = Math.max(
    totalTodayCards > 0 ? 1 : 0,
    Math.round((totalTodayCards * 40) / 60)
  );

  const heatmap = useMemo(() => getWeeklyHeatmap(reviews), [reviews]);

  const isLessonUnlocked = (index: number): boolean => {
    if (unlockAllLessons || index === 0) return true;
    const prev = LESSONS[index - 1];
    return prev.sentenceIds.every((id) => Boolean(cards[id]));
  };

  const handleStartToday = () => {
    if (sprintActive) {
      navigate('/review?mode=sprint');
    } else if (dueIds.length > 0) {
      navigate('/review');
    } else {
      navigate('/learn');
    }
  };

  return (
    <Layout>
      <header className="today-topbar">
        <h1 className="page-title">{getGreeting()}</h1>
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

      {/* Exam 3-day Sprint Banner */}
      {sprintActive && (
        <section className="card-surface sprint-banner">
          <div className="sprint-banner-title">
            考前冲刺模式已自动开启（距考试 ≤ 3 天）
          </div>
          <p className="page-sub" style={{ marginBottom: 12 }}>
            今日冲刺队列已切换为：所有整篇默写卡（E）+ 历史错误率最高的 10 张句子卡。
          </p>
          <div className="toolbar-group">
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/review?mode=sprint')}
            >
              冲刺高错率 10 句
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/drills?type=E')}
            >
              整篇默写冲刺
            </button>
          </div>
        </section>
      )}

      {/* Core Today Task Card */}
      <section className="card-surface today-task-card">
        <div className="today-task-head">
          <div>
            <div className="today-task-label">今日任务</div>
            <div className="today-metrics">
              <div className="today-metric">
                <span className="today-metric-num tabular-nums">{dueIds.length}</span>
                <span className="today-metric-cap">待复习句</span>
              </div>
              <div className="today-metric-sep" />
              <div className="today-metric">
                <span className="today-metric-num tabular-nums">{newTodayQuota}</span>
                <span className="today-metric-cap">今日新句</span>
              </div>
              <div className="today-metric-sep" />
              <div className="today-metric">
                <span className="today-metric-num tabular-nums">
                  {estimatedMinutes > 0 ? `约 ${estimatedMinutes} 分钟` : '已完成'}
                </span>
                <span className="today-metric-cap">预计用时</span>
              </div>
            </div>
          </div>
        </div>

        <div className="today-task-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleStartToday}
          >
            <Play size={15} strokeWidth={1.5} />
            {sprintActive
              ? '进入考前冲刺复习'
              : dueIds.length > 0
                ? '开始今天的练习（先复习）'
                : newTodayQuota > 0
                  ? '开始学习今日新句'
                  : '查看课程或巩固已学'}
          </button>
          {dueIds.length > 0 && newTodayQuota > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/learn')}
            >
              直接学新句
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </section>

      {/* Weekly 7-day Heatmap */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">本周练习</h2>
          <span className="page-sub tabular-nums">
            近 7 天共 {heatmap.reduce((acc, d) => acc + d.count, 0)} 次提交
          </span>
        </div>
        <div className="heatmap-grid" aria-label="本周练习热力图">
          {heatmap.map((day) => (
            <div key={day.dateKey} className="heatmap-cell-wrap">
              <div
                className={`heatmap-cell heat-level-${day.level}`}
                title={`${day.dateKey}：${day.count} 次`}
              >
                {day.count > 0 && (
                  <span className="heatmap-num tabular-nums">{day.count}</span>
                )}
              </div>
              <span className="heatmap-day">{day.weekdayLabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9-Lesson Course Progress */}
      <section className="card-surface today-section-card">
        <div className="section-row-head">
          <h2 className="section-small-title">课程进度（9 课）</h2>
          <span className="page-sub tabular-nums">
            已学 {Object.keys(cards).length} / {STUDYABLE_SENTENCE_IDS.length} 句
          </span>
        </div>

        <div className="course-progress-list">
          {LESSONS.map((lesson, idx) => {
            const unlocked = isLessonUnlocked(idx);
            const doneCount = lesson.sentenceIds.filter((id) => Boolean(cards[id])).length;
            const total = lesson.sentenceIds.length;
            const pct = Math.round((doneCount / total) * 100);
            const status = !unlocked
              ? '未解锁'
              : doneCount === total
                ? '已学'
                : doneCount > 0
                  ? '学习中'
                  : '待开始';
            const isOpen = expandedLessonId === lesson.id;

            return (
              <div
                key={lesson.id}
                className={`course-item ${!unlocked ? 'course-locked' : ''}`}
              >
                <button
                  type="button"
                  className="course-item-trigger"
                  onClick={() => setExpandedLessonId(isOpen ? null : lesson.id)}
                  aria-expanded={isOpen}
                >
                  <span className="course-chevron">
                    {!unlocked ? (
                      <Lock size={14} strokeWidth={1.5} />
                    ) : isOpen ? (
                      <ChevronDown size={15} strokeWidth={1.5} />
                    ) : (
                      <ChevronRight size={15} strokeWidth={1.5} />
                    )}
                  </span>
                  <div className="course-main">
                    <div className="course-top-line">
                      <span className="course-title">{lesson.title}</span>
                      <span className={`course-status status-${status}`}>
                        {status} · <span className="tabular-nums">{doneCount}/{total}</span>
                      </span>
                    </div>
                    <div className="course-bar-track">
                      <div
                        className={`course-bar-fill ${doneCount === total ? 'fill-done' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="course-detail">
                    <ul className="course-sentence-list">
                      {lesson.sentenceIds.map((sid) => {
                        const s = SENTENCES[sid];
                        const raw = cards[sid];
                        const mastery = getMasteryLevel(
                          raw ? deserializeCard(raw) : undefined
                        );
                        return (
                          <li key={sid} className="course-sentence-item">
                            <span className={`mastery-dot mastery-${mastery}`} />
                            <span className="course-sentence-text">
                              {renderSentenceText(s.zh)}
                            </span>
                            <span className="course-mastery-tag">
                              {mastery === 'unlearned'
                                ? '未学'
                                : mastery === 'learning'
                                  ? '学习中'
                                  : mastery === 'familiar'
                                    ? '熟悉'
                                    : '牢固'}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    {unlocked && (
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ marginTop: 10 }}
                        onClick={() => navigate(`/learn?lesson=${lesson.id}`)}
                      >
                        进入本课学习
                      </button>
                    )}
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
