import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Layers,
  Monitor,
  Moon,
  MoreHorizontal,
  PenLine,
  RotateCcw,
  Settings,
  Sun,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { collectMistakes } from '../core/mistakes';
import { STUDYABLE_SENTENCE_IDS } from '../data/templates';
import { useProgress } from '../store/useProgress';
import { useSettings, type ThemeMode } from '../store/useSettings';
import { ShortcutsModal } from './ShortcutsModal';
import './components.css';

interface LayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
  focusMode?: boolean;
}

export function Layout({ children, rightRail, focusMode = false }: LayoutProps) {
  const cards = useProgress((s) => s.cards);
  const reviews = useProgress((s) => s.reviews);
  const [moreOpen, setMoreOpen] = useState(false);

  const dueCount = useMemo(() => {
    const nowMs = Date.now();
    return Object.values(cards).filter(
      (c) => new Date(c.due).getTime() <= nowMs
    ).length;
  }, [cards]);

  const learnedCount = Object.keys(cards).length;
  const mistakeCount = useMemo(() => collectMistakes(reviews).length, [reviews]);

  const theme = useSettings((s) => s.theme);
  const bodyFontSize = useSettings((s) => s.bodyFontSize);
  const updateSettings = useSettings((s) => s.updateSettings);

  useEffect(() => {
    const applyTheme = () => {
      const resolved =
        theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : theme;
      document.documentElement.setAttribute('data-theme', resolved);
    };
    applyTheme();

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', applyTheme);
      return () => mq.removeEventListener('change', applyTheme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--body-size', `${bodyFontSize}px`);
  }, [bodyFontSize]);

  const cycleTheme = () => {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    updateSettings({ theme: next });
  };

  if (focusMode) {
    return (
      <div className="app-shell">
        <main className="main-area">
          <div className="main-column">{children}</div>
        </main>
        <ShortcutsModal />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">L</span>
          <div className="brand-text">
            <div className="brand-title">小作文</div>
            <div className="brand-sub">考研英语一</div>
          </div>
        </div>

        <nav className="nav-list">
          <NavLink
            to="/today"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <CalendarDays size={18} strokeWidth={1.5} />
            <span className="nav-label">今日</span>
          </NavLink>

          <NavLink
            to="/learn"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <GraduationCap size={18} strokeWidth={1.5} />
            <span className="nav-label">学习新句</span>
            <span className="nav-badge tabular-nums">
              {learnedCount}/{STUDYABLE_SENTENCE_IDS.length}
            </span>
          </NavLink>

          <NavLink
            to="/review"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <RotateCcw size={18} strokeWidth={1.5} />
            <span className="nav-label">间隔复习</span>
            {dueCount > 0 && (
              <span className="nav-badge tabular-nums">{dueCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/exam"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <PenLine size={18} strokeWidth={1.5} />
            <span className="nav-label">实战模式</span>
          </NavLink>

          <NavLink
            to="/drills"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Layers size={18} strokeWidth={1.5} />
            <span className="nav-label">专项卡片</span>
          </NavLink>

          <NavLink
            to="/mistakes"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <AlertTriangle size={18} strokeWidth={1.5} />
            <span className="nav-label">错题本</span>
            {mistakeCount > 0 && (
              <span className="nav-badge tabular-nums">{mistakeCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BarChart3 size={18} strokeWidth={1.5} />
            <span className="nav-label">统计</span>
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} strokeWidth={1.5} />
            <span className="nav-label">模板库</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={18} strokeWidth={1.5} />
            <span className="nav-label">设置</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="btn-ghost theme-toggle-btn"
            onClick={cycleTheme}
            title="切换浅色 / 深色 / 跟随系统"
          >
            {theme === 'light' && <Sun size={15} strokeWidth={1.5} />}
            {theme === 'dark' && <Moon size={15} strokeWidth={1.5} />}
            {theme === 'system' && <Monitor size={15} strokeWidth={1.5} />}
            <span>
              {theme === 'light' ? '浅色纸面' : theme === 'dark' ? '深色夜读' : '跟随系统'}
            </span>
          </button>
          <div style={{ marginTop: 8 }}>
            已掌握 {learnedCount} / {STUDYABLE_SENTENCE_IDS.length} 句
          </div>
        </div>
      </aside>

      <main className="main-area">
        <div className="main-column">{children}</div>
      </main>

      {rightRail && <aside className="right-rail">{rightRail}</aside>}

      {/* Mobile 5-tab bar: 今日 / 学习 / 复习 / 实战 / 更多 */}
      <nav className="mobile-nav" aria-label="底部导航">
        <NavLink
          to="/today"
          onClick={() => setMoreOpen(false)}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <CalendarDays size={18} strokeWidth={1.5} />
          <span>今日</span>
        </NavLink>
        <NavLink
          to="/learn"
          onClick={() => setMoreOpen(false)}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <GraduationCap size={18} strokeWidth={1.5} />
          <span>学习</span>
        </NavLink>
        <NavLink
          to="/review"
          onClick={() => setMoreOpen(false)}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <RotateCcw size={18} strokeWidth={1.5} />
          <span>复习{dueCount > 0 ? `(${dueCount})` : ''}</span>
        </NavLink>
        <NavLink
          to="/exam"
          onClick={() => setMoreOpen(false)}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <PenLine size={18} strokeWidth={1.5} />
          <span>实战</span>
        </NavLink>
        <button
          type="button"
          className={`mobile-nav-item mobile-nav-btn ${moreOpen ? 'active' : ''}`}
          onClick={() => setMoreOpen((v) => !v)}
        >
          <MoreHorizontal size={18} strokeWidth={1.5} />
          <span>更多</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="mobile-more-backdrop" onClick={() => setMoreOpen(false)}>
          <div
            className="card-surface mobile-more-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink to="/drills" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <Layers size={16} strokeWidth={1.5} /> 专项卡片
            </NavLink>
            <NavLink to="/mistakes" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <AlertTriangle size={16} strokeWidth={1.5} /> 错题本
            </NavLink>
            <NavLink to="/stats" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <BarChart3 size={16} strokeWidth={1.5} /> 学习统计
            </NavLink>
            <NavLink to="/library" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <BookOpen size={16} strokeWidth={1.5} /> 模板库
            </NavLink>
            <NavLink to="/settings" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <Settings size={16} strokeWidth={1.5} /> 设置
            </NavLink>
          </div>
        </div>
      )}

      <ShortcutsModal />
    </div>
  );
}
