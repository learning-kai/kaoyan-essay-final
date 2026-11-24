import {
  BarChart2,
  BookOpen,
  ClipboardList,
  Columns3,
  GraduationCap,
  PenTool,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BigChartTab } from '../components/big/BigChartTab';
import { BigExamplesTab } from '../components/big/BigExamplesTab';
import { BigLearnTab } from '../components/big/BigLearnTab';
import { BigPacksTab } from '../components/big/BigPacksTab';
import { BigPlanTab } from '../components/big/BigPlanTab';
import { BigPracticeTab } from '../components/big/BigPracticeTab';
import './pages.css';

export type BigTab = 'learn' | 'examples' | 'plan' | 'practice' | 'packs' | 'chart';

const BIG_TABS: { id: BigTab; label: string; icon: typeof GraduationCap }[] = [
  { id: 'learn', label: '学习', icon: GraduationCap },
  { id: 'examples', label: '样例', icon: Columns3 },
  { id: 'plan', label: '规划', icon: ClipboardList },
  { id: 'practice', label: '实战', icon: PenTool },
  { id: 'packs', label: '素材包', icon: BookOpen },
  { id: 'chart', label: '图表（可选）', icon: BarChart2 },
];

export function BigEssayPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseTab = (raw: string | null): BigTab => {
    if (
      raw === 'examples' ||
      raw === 'plan' ||
      raw === 'practice' ||
      raw === 'packs' ||
      raw === 'chart'
    ) {
      return raw;
    }
    return 'learn';
  };

  const [activeTab, setActiveTab] = useState<BigTab>(() =>
    parseTab(searchParams.get('tab'))
  );
  const [handoffPromptId, setHandoffPromptId] = useState<string | undefined>(
    undefined
  );
  const [handoffVars, setHandoffVars] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    setActiveTab(parseTab(searchParams.get('tab')));
  }, [searchParams]);

  useEffect(() => {
    const label = BIG_TABS.find((t) => t.id === activeTab)?.label ?? '大作文';
    document.title = `大作文 · ${label} · 考研英语一`;
  }, [activeTab]);

  const switchTab = (next: BigTab) => {
    setActiveTab(next);
    setSearchParams({ tab: next }, { replace: true });
  };

  return (
    <Layout wideColumn={activeTab === 'examples'}>
      <header className="page-header">
        <div>
          <h1 className="page-title">考研英语一大作文</h1>
          <p className="page-sub">
            背得出（11 句固定骨架 + FSRS）+ 套得出（3 分钟规划卡 → 20 分钟写出 160–200 词新文章）
          </p>
        </div>
      </header>

      <div className="tab-bar" role="tablist" aria-label="大作文二级导航">
        {BIG_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === t.id}
              className={`tab-pill ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => switchTab(t.id)}
            >
              <Icon size={14} strokeWidth={1.6} style={{ verticalAlign: -2, marginRight: 5 }} />
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'learn' && (
        <BigLearnTab onNavigateTab={(t) => switchTab(t)} />
      )}
      {activeTab === 'examples' && <BigExamplesTab />}
      {activeTab === 'plan' && (
        <BigPlanTab
          initialPromptId={handoffPromptId}
          onProceedToPractice={(pid, vars) => {
            setHandoffPromptId(pid);
            setHandoffVars(vars);
            switchTab('practice');
          }}
        />
      )}
      {activeTab === 'practice' && (
        <BigPracticeTab
          initialPromptId={handoffPromptId}
          initialVars={handoffVars}
        />
      )}
      {activeTab === 'packs' && <BigPacksTab />}
      {activeTab === 'chart' && <BigChartTab />}
    </Layout>
  );
}
