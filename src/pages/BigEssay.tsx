import {
  BarChart2,
  BookOpen,
  ClipboardList,
  Columns3,
  GraduationCap,
  Library,
  PenTool,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BigChartTab } from '../components/big/BigChartTab';
import { BigExamDecisionCard } from '../components/big/BigExamDecisionCard';
import { BigExamplesTab } from '../components/big/BigExamplesTab';
import { BigLearnTab } from '../components/big/BigLearnTab';
import { BigPacksTab } from '../components/big/BigPacksTab';
import { BigPlanTab } from '../components/big/BigPlanTab';
import { BigPracticeTab } from '../components/big/BigPracticeTab';
import './pages.css';

export type BigTab = 'learn' | 'plan' | 'practice' | 'ref';
export type BigRefSubTab = 'examples' | 'packs' | 'chart';

const BIG_TABS: { id: BigTab; label: string; icon: typeof GraduationCap }[] = [
  { id: 'learn', label: '① 背骨架（12句）', icon: GraduationCap },
  { id: 'plan', label: '② 60秒填5空', icon: ClipboardList },
  { id: 'practice', label: '③ 15分钟整篇实战', icon: PenTool },
  { id: 'ref', label: '参考库', icon: Library },
];

const REF_SUB_TABS: { id: BigRefSubTab; label: string; icon: typeof Columns3 }[] = [
  { id: 'examples', label: '三篇样例对比', icon: Columns3 },
  { id: 'packs', label: '10 主题素材包', icon: BookOpen },
  { id: 'chart', label: '随机图表专项', icon: BarChart2 },
];

function parseRouteTab(raw: string | null): { tab: BigTab; refSub?: BigRefSubTab } {
  if (raw === 'plan' || raw === 'practice' || raw === 'ref') {
    return { tab: raw };
  }
  if (raw === 'examples' || raw === 'packs' || raw === 'chart') {
    return { tab: 'ref', refSub: raw };
  }
  return { tab: 'learn' };
}

export function BigEssayPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initial = parseRouteTab(searchParams.get('tab'));
  const [activeTab, setActiveTab] = useState<BigTab>(initial.tab);
  const [refSubTab, setRefSubTab] = useState<BigRefSubTab>(initial.refSub ?? 'examples');
  const [handoffPromptId, setHandoffPromptId] = useState<string | undefined>(undefined);
  const [handoffVars, setHandoffVars] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const parsed = parseRouteTab(searchParams.get('tab'));
    setActiveTab(parsed.tab);
    if (parsed.refSub) setRefSubTab(parsed.refSub);
  }, [searchParams]);

  useEffect(() => {
    const label = BIG_TABS.find((t) => t.id === activeTab)?.label ?? '大作文';
    document.title = `大作文 · ${label} · 考研英语一`;
  }, [activeTab]);

  const switchTab = (next: BigTab, promptId?: string) => {
    if (promptId) setHandoffPromptId(promptId);
    setActiveTab(next);
    setSearchParams({ tab: next }, { replace: true });
  };

  return (
    <Layout wideColumn={activeTab === 'ref' && refSubTab === 'examples'}>
      <header className="page-header">
        <div>
          <h1 className="page-title">考研英语一大作文</h1>
          <p className="page-sub">
            4 天极速通关：死背 12 句真·万能骨架 → 60 秒只填 5 个空 → 15 分钟写完 190 词一档作文（纯图画 / 纯图表 / 图文全通杀）
          </p>
        </div>
      </header>

      {/* Top Hero: 4-Day Sprint Roadmap + 60-Second Exam Decision Card */}
      <BigExamDecisionCard onNavigateTab={(t, pid) => switchTab(t, pid)} />

      {/* 3-Step Main Track + 1 Reference Library Tab */}
      <div className="tab-bar" role="tablist" aria-label="大作文 3 步通关导航" style={{ marginTop: 14 }}>
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
        <BigLearnTab
          onNavigateTab={(t) => {
            if (t === 'chart') {
              setRefSubTab('chart');
              switchTab('ref');
            } else if (t === 'packs') {
              setRefSubTab('packs');
              switchTab('ref');
            } else {
              switchTab(t);
            }
          }}
        />
      )}

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

      {activeTab === 'ref' && (
        <div>
          <div className="toolbar-group" style={{ marginBottom: 14 }}>
            {REF_SUB_TABS.map((st) => {
              const Icon = st.icon;
              return (
                <button
                  key={st.id}
                  type="button"
                  className={`btn-secondary formula-mini-btn ${refSubTab === st.id ? 'active' : ''}`}
                  onClick={() => setRefSubTab(st.id)}
                >
                  <Icon size={13} strokeWidth={1.6} />
                  {st.label}
                </button>
              );
            })}
          </div>

          {refSubTab === 'examples' && <BigExamplesTab />}
          {refSubTab === 'packs' && <BigPacksTab />}
          {refSubTab === 'chart' && <BigChartTab />}
        </div>
      )}
    </Layout>
  );
}
