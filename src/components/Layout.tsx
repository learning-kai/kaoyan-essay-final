import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  Cloud,
  CloudOff,
  FileText,
  GraduationCap,
  Layers,
  Monitor,
  Moon,
  MoreHorizontal,
  PenLine,
  RefreshCw,
  RotateCcw,
  Settings,
  Share,
  Sigma,
  Star,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  collectFormulaMistakes,
  getDueFormulaIds,
  getFormulaMasteryLevel,
  getStarredFormulaIds,
} from '../core/formulaStats';
import { collectMistakes } from '../core/mistakes';
import {
  collectPoliticsMistakes,
  getDuePoliticsIds,
  getPoliticsMasteryLevel,
  getStarredPoliticsIds,
} from '../core/politicsStats';
import {
  checkAndApplyPwaUpdate,
  isIosDevice,
  isStandaloneApp,
} from '../core/pwa';
import { BIG_SENTENCE_IDS } from '../data/bigEssay';
import { FORMULA_IDS } from '../data/formulas';
import { POLITICS_CARD_IDS } from '../data/politics';
import { STUDYABLE_SENTENCE_IDS } from '../data/templates';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import { useProgress } from '../store/useProgress';
import { useSettings, type ThemeMode } from '../store/useSettings';
import { useSync } from '../store/useSync';
import { ShortcutsModal } from './ShortcutsModal';
import './components.css';

type ActiveModule = 'essay' | 'formula' | 'politics';

let lastActiveModule: ActiveModule = 'essay';

function formatSyncTimeShort(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diffSec < 60) return '刚刚';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} 分钟前`;
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

interface LayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
  focusMode?: boolean;
  wideColumn?: boolean;
}

export function Layout({
  children,
  rightRail,
  focusMode = false,
  wideColumn = false,
}: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeModule: ActiveModule = useMemo(() => {
    if (location.pathname.startsWith('/formula')) {
      lastActiveModule = 'formula';
      return 'formula';
    }
    if (location.pathname.startsWith('/politics')) {
      lastActiveModule = 'politics';
      return 'politics';
    }
    if (location.pathname === '/settings') {
      return lastActiveModule;
    }
    lastActiveModule = 'essay';
    return 'essay';
  }, [location.pathname]);

  const cards = useProgress((s) => s.cards);
  const reviews = useProgress((s) => s.reviews);
  const enableBigPackCards = useSettings((s) => s.enableBigPackCards);

  const formulaCards = useFormulaProgress((s) => s.cards);
  const formulaReviews = useFormulaProgress((s) => s.reviews);
  const formulaMastered = useFormulaProgress((s) => s.mastered);
  const formulaStarred = useFormulaProgress((s) => s.starred);

  const politicsCards = usePoliticsProgress((s) => s.cards);
  const politicsReviews = usePoliticsProgress((s) => s.reviews);
  const politicsMastered = usePoliticsProgress((s) => s.mastered);
  const politicsStarred = usePoliticsProgress((s) => s.starred);

  const [moreOpen, setMoreOpen] = useState(false);
  const [pwaCheckStatus, setPwaCheckStatus] = useState<'idle' | 'checking' | 'latest'>('idle');
  const [showIosTip, setShowIosTip] = useState<boolean>(() => {
    try {
      if (!isIosDevice() || isStandaloneApp()) return false;
      return window.localStorage.getItem('kaoyan-ios-a2hs-dismissed') !== '1';
    } catch {
      return false;
    }
  });

  const dismissIosTip = () => {
    setShowIosTip(false);
    try {
      window.localStorage.setItem('kaoyan-ios-a2hs-dismissed', '1');
    } catch {
      // ignore storage errors
    }
  };

  const handleMobileUpdateCheck = async () => {
    setPwaCheckStatus('checking');
    const res = await checkAndApplyPwaUpdate();
    if (res === 'up-to-date') {
      setPwaCheckStatus('latest');
      window.setTimeout(() => setPwaCheckStatus('idle'), 2800);
    }
  };

  const dueCount = useMemo(() => {
    const nowMs = Date.now();
    return Object.entries(cards).filter(([id, c]) => {
      if (!enableBigPackCards && id.startsWith('big.pack.')) return false;
      return new Date(c.due).getTime() <= nowMs;
    }).length;
  }, [cards, enableBigPackCards]);

  const learnedCount = useMemo(
    () => STUDYABLE_SENTENCE_IDS.filter((id) => Boolean(cards[id])).length,
    [cards]
  );
  const bigLearnedCount = useMemo(
    () => BIG_SENTENCE_IDS.filter((id) => Boolean(cards[id])).length,
    [cards]
  );
  const mistakeCount = useMemo(() => collectMistakes(reviews).length, [reviews]);

  const formulaDueCount = useMemo(
    () => getDueFormulaIds(formulaCards, formulaMastered).length,
    [formulaCards, formulaMastered]
  );
  const formulaDoneCount = useMemo(
    () =>
      FORMULA_IDS.filter(
        (id) => getFormulaMasteryLevel(id, formulaCards, formulaMastered) === 'mastered'
      ).length,
    [formulaCards, formulaMastered]
  );
  const formulaFlagCount = useMemo(() => {
    const mistakeIds = new Set(
      collectFormulaMistakes(formulaReviews, formulaMastered).map((m) => m.formulaId)
    );
    for (const id of getStarredFormulaIds(formulaStarred)) {
      mistakeIds.add(id);
    }
    return mistakeIds.size;
  }, [formulaReviews, formulaMastered, formulaStarred]);

  const politicsDueCount = useMemo(
    () => getDuePoliticsIds(politicsCards, politicsMastered).length,
    [politicsCards, politicsMastered]
  );
  const politicsDoneCount = useMemo(
    () =>
      POLITICS_CARD_IDS.filter(
        (id) =>
          getPoliticsMasteryLevel(id, politicsCards, politicsMastered) ===
          'mastered'
      ).length,
    [politicsCards, politicsMastered]
  );
  const politicsFlagCount = useMemo(() => {
    const flagged = new Set(
      collectPoliticsMistakes(politicsReviews, politicsMastered).map(
        (m) => m.cardId
      )
    );
    for (const id of getStarredPoliticsIds(politicsStarred)) {
      flagged.add(id);
    }
    return flagged.size;
  }, [politicsReviews, politicsMastered, politicsStarred]);

  const theme = useSettings((s) => s.theme);
  const bodyFontSize = useSettings((s) => s.bodyFontSize);
  const updateSettings = useSettings((s) => s.updateSettings);

  const syncToken = useSync((s) => s.token);
  const syncStatus = useSync((s) => s.status);
  const lastSyncedAt = useSync((s) => s.lastSyncedAt);
  const syncNow = useSync((s) => s.syncNow);
  const syncConnected = Boolean(syncToken);

  useEffect(() => {
    const applyTheme = () => {
      const resolved =
        theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : theme;
      document.documentElement.setAttribute('data-theme', resolved);

      // Keep iOS Safari & standalone PWA status bar color seamlessly matched
      const barColor =
        resolved === 'dark'
          ? focusMode
            ? '#171613'
            : '#201E1A'
          : focusMode
            ? '#F7F4EE'
            : '#FFFDF9';
      let metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.name = 'theme-color';
        document.head.appendChild(metaTheme);
      }
      metaTheme.content = barColor;
    };
    applyTheme();

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', applyTheme);
      return () => mq.removeEventListener('change', applyTheme);
    }
  }, [theme, focusMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--body-size', `${bodyFontSize}px`);
  }, [bodyFontSize]);

  const cycleTheme = () => {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    updateSettings({ theme: next });
  };

  const switchModule = (target: ActiveModule) => {
    setMoreOpen(false);
    lastActiveModule = target;
    if (target === 'formula') {
      if (!location.pathname.startsWith('/formula')) {
        navigate('/formula/today');
      }
    } else if (target === 'politics') {
      if (!location.pathname.startsWith('/politics')) {
        navigate('/politics/today');
      }
    } else {
      if (
        location.pathname.startsWith('/formula') ||
        location.pathname.startsWith('/politics') ||
        location.pathname === '/settings'
      ) {
        navigate('/today');
      }
    }
  };

  if (focusMode) {
    return (
      <div className="app-shell app-shell-focus">
        <main className="main-area">
          <div className={`main-column ${wideColumn ? 'main-column-wide' : ''}`}>{children}</div>
        </main>
        <ShortcutsModal />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            {activeModule === 'formula'
              ? '∑'
              : activeModule === 'politics'
                ? '政'
                : 'L'}
          </span>
          <div className="brand-text">
            <div className="brand-title">
              {activeModule === 'formula'
                ? '公式默写'
                : activeModule === 'politics'
                  ? '政治一页纸'
                  : '英语作文'}
            </div>
            <div className="brand-sub">
              {activeModule === 'formula'
                ? '高数·线代·概率·信号'
                : activeModule === 'politics'
                  ? '马原·史纲·高频考点'
                  : '考研英语一 · 大小作文'}
            </div>
          </div>
        </div>

        <div className="module-switcher" role="tablist" aria-label="科目切换">
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'essay'}
            className={`module-switch-btn ${activeModule === 'essay' ? 'active' : ''}`}
            onClick={() => switchModule('essay')}
            title="考研英语一 · 小作文与大作文"
          >
            <span className="module-switch-full">作文</span>
            <span className="module-switch-short">文</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'formula'}
            className={`module-switch-btn ${activeModule === 'formula' ? 'active' : ''}`}
            onClick={() => switchModule('formula')}
            title={`公式默写手册（${FORMULA_IDS.length}题）`}
          >
            <span className="module-switch-full">公式</span>
            <span className="module-switch-short">∑</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'politics'}
            className={`module-switch-btn ${activeModule === 'politics' ? 'active' : ''}`}
            onClick={() => switchModule('politics')}
            title="27考研政治一页纸（100卡）"
          >
            <span className="module-switch-full">政治</span>
            <span className="module-switch-short">政</span>
          </button>
        </div>

        {activeModule === 'essay' ? (
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
              <span className="nav-label">小作文新句</span>
              <span className="nav-badge tabular-nums">
                {learnedCount}/{STUDYABLE_SENTENCE_IDS.length}
              </span>
            </NavLink>

            <NavLink
              to="/big"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <FileText size={18} strokeWidth={1.5} />
              <span className="nav-label">大作文</span>
              <span className="nav-badge tabular-nums">
                {bigLearnedCount}/{BIG_SENTENCE_IDS.length}
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
              <span className="nav-label">小作文实战</span>
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
        ) : activeModule === 'formula' ? (
          <nav className="nav-list">
            <NavLink
              to="/formula/today"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <CalendarDays size={18} strokeWidth={1.5} />
              <span className="nav-label">今日公式</span>
            </NavLink>

            <NavLink
              to="/formula/practice"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Sigma size={18} strokeWidth={1.5} />
              <span className="nav-label">默写复习</span>
              {formulaDueCount > 0 && (
                <span className="nav-badge tabular-nums">{formulaDueCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/formula/handbook"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={18} strokeWidth={1.5} />
              <span className="nav-label">公式手册</span>
              <span className="nav-badge tabular-nums">
                {formulaDoneCount}/{FORMULA_IDS.length}
              </span>
            </NavLink>

            <NavLink
              to="/formula/mistakes"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Star size={18} strokeWidth={1.5} />
              <span className="nav-label">收藏与错题</span>
              {formulaFlagCount > 0 && (
                <span className="nav-badge tabular-nums">{formulaFlagCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/formula/stats"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <BarChart3 size={18} strokeWidth={1.5} />
              <span className="nav-label">公式统计</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Settings size={18} strokeWidth={1.5} />
              <span className="nav-label">设置</span>
            </NavLink>
          </nav>
        ) : (
          <nav className="nav-list">
            <NavLink
              to="/politics/today"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <CalendarDays size={18} strokeWidth={1.5} />
              <span className="nav-label">今日政治</span>
            </NavLink>

            <NavLink
              to="/politics/practice"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <RotateCcw size={18} strokeWidth={1.5} />
              <span className="nav-label">卡片复习</span>
              {politicsDueCount > 0 && (
                <span className="nav-badge tabular-nums">{politicsDueCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/politics/drills"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Zap size={18} strokeWidth={1.5} />
              <span className="nav-label">专项快刷</span>
            </NavLink>

            <NavLink
              to="/politics/handbook"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={18} strokeWidth={1.5} />
              <span className="nav-label">一页纸总览</span>
              <span className="nav-badge tabular-nums">
                {politicsDoneCount}/{POLITICS_CARD_IDS.length}
              </span>
            </NavLink>

            <NavLink
              to="/politics/mistakes"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Star size={18} strokeWidth={1.5} />
              <span className="nav-label">收藏与错题</span>
              {politicsFlagCount > 0 && (
                <span className="nav-badge tabular-nums">{politicsFlagCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Settings size={18} strokeWidth={1.5} />
              <span className="nav-label">设置</span>
            </NavLink>
          </nav>
        )}

        <div className="sidebar-footer">
          {syncConnected ? (
            <button
              type="button"
              className={`btn-ghost theme-toggle-btn sync-sidebar-btn ${syncStatus === 'error' ? 'sync-sidebar-err' : ''}`}
              onClick={() => void syncNow('merge')}
              disabled={syncStatus === 'syncing'}
              title="点击立即双向同步云端进度"
            >
              {syncStatus === 'syncing' ? (
                <RefreshCw size={15} strokeWidth={1.5} className="spin-icon" />
              ) : (
                <Cloud size={15} strokeWidth={1.5} />
              )}
              <span>
                {syncStatus === 'syncing'
                  ? '同步中…'
                  : syncStatus === 'error'
                    ? '同步失败，点此重试'
                    : lastSyncedAt
                      ? `已同步 · ${formatSyncTimeShort(lastSyncedAt)}`
                      : '点击同步云端'}
              </span>
            </button>
          ) : (
            <NavLink
              to="/settings"
              className="btn-ghost theme-toggle-btn sync-sidebar-link"
              title="配置 GitHub 私有 Gist 多端同步"
            >
              <CloudOff size={15} strokeWidth={1.5} />
              <span>开启多端同步</span>
            </NavLink>
          )}
          <button
            type="button"
            className="btn-ghost theme-toggle-btn"
            style={{ marginTop: 4 }}
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
            {activeModule === 'formula'
              ? `已搞定 ${formulaDoneCount} / ${FORMULA_IDS.length} 题`
              : activeModule === 'politics'
                ? `已搞定 ${politicsDoneCount} / ${POLITICS_CARD_IDS.length} 卡`
                : `小 ${learnedCount}/${STUDYABLE_SENTENCE_IDS.length} · 大 ${bigLearnedCount}/${BIG_SENTENCE_IDS.length}`}
          </div>
        </div>
      </aside>

      {/* Mobile top mode switcher */}
      <div className="mobile-mode-bar" role="tablist" aria-label="移动端科目切换">
        <div className="mobile-mode-pills">
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'essay'}
            className={`mobile-mode-pill ${activeModule === 'essay' ? 'active' : ''}`}
            onClick={() => switchModule('essay')}
          >
            作文
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'formula'}
            className={`mobile-mode-pill ${activeModule === 'formula' ? 'active' : ''}`}
            onClick={() => switchModule('formula')}
          >
            公式
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'politics'}
            className={`mobile-mode-pill ${activeModule === 'politics' ? 'active' : ''}`}
            onClick={() => switchModule('politics')}
          >
            政治
          </button>
        </div>
      </div>

      <main className="main-area">
        <div className={`main-column ${wideColumn ? 'main-column-wide' : ''}`}>
          {showIosTip && (
            <div className="ios-a2hs-banner" role="region" aria-label="添加到主屏幕提示">
              <div className="ios-a2hs-text">
                <Share size={15} strokeWidth={1.7} />
                <span>
                  在 Safari 底部点「分享」→「添加到主屏幕」，即可全屏离线像 App 一样背诵
                </span>
              </div>
              <button
                type="button"
                className="ios-a2hs-close"
                aria-label="关闭提示"
                onClick={dismissIosTip}
              >
                <X size={15} strokeWidth={1.7} />
              </button>
            </div>
          )}
          {children}
        </div>
      </main>

      {rightRail && <aside className="right-rail">{rightRail}</aside>}

      {/* Mobile 5-tab bar */}
      {activeModule === 'essay' ? (
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
            <span>小作文</span>
          </NavLink>
          <NavLink
            to="/big"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <FileText size={18} strokeWidth={1.5} />
            <span>大作文</span>
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
          <button
            type="button"
            className={`mobile-nav-item mobile-nav-btn ${moreOpen ? 'active' : ''}`}
            onClick={() => setMoreOpen((v) => !v)}
          >
            <MoreHorizontal size={18} strokeWidth={1.5} />
            <span>更多</span>
          </button>
        </nav>
      ) : activeModule === 'formula' ? (
        <nav className="mobile-nav" aria-label="公式底部导航">
          <NavLink
            to="/formula/today"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <CalendarDays size={18} strokeWidth={1.5} />
            <span>今日</span>
          </NavLink>
          <NavLink
            to="/formula/practice"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Sigma size={18} strokeWidth={1.5} />
            <span>默写{formulaDueCount > 0 ? `(${formulaDueCount})` : ''}</span>
          </NavLink>
          <NavLink
            to="/formula/handbook"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen size={18} strokeWidth={1.5} />
            <span>手册</span>
          </NavLink>
          <NavLink
            to="/formula/mistakes"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Star size={18} strokeWidth={1.5} />
            <span>收藏错题</span>
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
      ) : (
        <nav className="mobile-nav" aria-label="政治底部导航">
          <NavLink
            to="/politics/today"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <CalendarDays size={18} strokeWidth={1.5} />
            <span>今日</span>
          </NavLink>
          <NavLink
            to="/politics/practice"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <RotateCcw size={18} strokeWidth={1.5} />
            <span>复习{politicsDueCount > 0 ? `(${politicsDueCount})` : ''}</span>
          </NavLink>
          <NavLink
            to="/politics/drills"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Zap size={18} strokeWidth={1.5} />
            <span>快刷</span>
          </NavLink>
          <NavLink
            to="/politics/handbook"
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen size={18} strokeWidth={1.5} />
            <span>一页纸</span>
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
      )}

      {moreOpen && (
        <div className="mobile-more-backdrop" onClick={() => setMoreOpen(false)}>
          <div
            className="card-surface mobile-more-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {syncConnected && (
              <button
                type="button"
                className="mobile-more-link mobile-sync-btn"
                disabled={syncStatus === 'syncing'}
                onClick={() => {
                  void syncNow('merge');
                }}
              >
                {syncStatus === 'syncing' ? (
                  <RefreshCw size={16} strokeWidth={1.5} className="spin-icon" />
                ) : (
                  <Cloud size={16} strokeWidth={1.5} />
                )}
                <span>
                  {syncStatus === 'syncing'
                    ? '云端同步中…'
                    : syncStatus === 'error'
                      ? '云同步失败，点此重试'
                      : lastSyncedAt
                        ? `立即同步（上次 ${formatSyncTimeShort(lastSyncedAt)}）`
                        : '立即同步云端'}
                </span>
              </button>
            )}
            {activeModule === 'essay' ? (
              <>
                <NavLink to="/exam" onClick={() => setMoreOpen(false)} className="mobile-more-link">
                  <PenLine size={16} strokeWidth={1.5} /> 小作文实战
                </NavLink>
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
              </>
            ) : activeModule === 'formula' ? (
              <NavLink to="/formula/stats" onClick={() => setMoreOpen(false)} className="mobile-more-link">
                <BarChart3 size={16} strokeWidth={1.5} /> 公式统计
              </NavLink>
            ) : (
              <NavLink to="/politics/mistakes" onClick={() => setMoreOpen(false)} className="mobile-more-link">
                <Star size={16} strokeWidth={1.5} /> 政治收藏与错题
              </NavLink>
            )}
            <NavLink to="/settings" onClick={() => setMoreOpen(false)} className="mobile-more-link">
              <Settings size={16} strokeWidth={1.5} /> 设置与多端同步
            </NavLink>
            <button
              type="button"
              className="mobile-more-link mobile-sync-btn"
              onClick={cycleTheme}
            >
              {theme === 'light' && <Sun size={16} strokeWidth={1.5} />}
              {theme === 'dark' && <Moon size={16} strokeWidth={1.5} />}
              {theme === 'system' && <Monitor size={16} strokeWidth={1.5} />}
              <span>
                外观：{theme === 'light' ? '浅色纸面' : theme === 'dark' ? '深色夜读' : '跟随系统'}（点此切换）
              </span>
            </button>
            <button
              type="button"
              className="mobile-more-link mobile-sync-btn"
              disabled={pwaCheckStatus === 'checking'}
              onClick={() => void handleMobileUpdateCheck()}
            >
              <RefreshCw
                size={16}
                strokeWidth={1.5}
                className={pwaCheckStatus === 'checking' ? 'spin-icon' : ''}
              />
              <span>
                {pwaCheckStatus === 'checking'
                  ? '正在检查新版本…'
                  : pwaCheckStatus === 'latest'
                    ? '当前已是最新版本'
                    : '检查更新 / 刷新 App'}
              </span>
            </button>
          </div>
        </div>
      )}

      <ShortcutsModal />
    </div>
  );
}
