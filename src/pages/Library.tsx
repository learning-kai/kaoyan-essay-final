import { AlertCircle, BookOpen, Eye, EyeOff, ListChecks } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { LetterView, type LetterFilter } from '../components/LetterView';
import { StoryLine } from '../components/StoryLine';
import { SLOT_LIST } from '../data/fillers';
import { TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { POS, TemplateId } from '../data/types';
import './pages.css';

type LibraryTab = 'letters' | 'fillers' | 'cues';

const POS_GROUPS: { pos: POS; title: string }[] = [
  { pos: 'noun', title: '名词短语槽位' },
  { pos: 'verb', title: '动词原形槽位（前接 to / can / could）' },
  { pos: 'doing', title: 'doing 形式槽位（前接介词 / such as）' },
];

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('letters');
  const [selectedId, setSelectedId] = useState<TemplateId>('suggest');
  const [showZh, setShowZh] = useState(true);
  const [filter, setFilter] = useState<LetterFilter>('all');
  const [search, setSearch] = useState('');

  const template = TEMPLATE_MAP[selectedId];

  useEffect(() => {
    document.title = `模板库 · ${template.name} · 小作文`;
  }, [template.name]);

  const filteredSlots = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SLOT_LIST;
    return SLOT_LIST.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.filler.toLowerCase().includes(q) ||
        s.fillerZh.toLowerCase().includes(q)
    );
  }, [search]);

  const rightRail = (
    <div>
      <div className="rail-section-title">故事线结构</div>
      <StoryLine
        nodes={template.storyLine}
        detail={template.storyLineDetail}
        vertical
      />

      <div className="rail-section-title" style={{ marginTop: 28 }}>
        题型识别关键词
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {template.keywords.map((kw) => (
          <span key={kw} className="drill-tag">
            {kw}
          </span>
        ))}
      </div>

      <div className="rail-section-title" style={{ marginTop: 28 }}>
        颜色图例
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--ink-muted)' }}>
        <div><span style={{ color: 'var(--ink)', fontWeight: 600 }}>墨色</span> · 固定英文句型，原样默写</div>
        <div><span style={{ color: 'var(--slot)', fontWeight: 600 }}>红色胶囊</span> · 槽位，悬停查看词性与万能词</div>
        <div><span style={{ color: 'var(--gold)', fontWeight: 600 }}>金色下划线</span> · 后半句结果词提示</div>
        <div><span style={{ color: 'var(--zh)', fontWeight: 600 }}>蓝色</span> · 逐句中文提示</div>
      </div>
    </div>
  );

  return (
    <Layout rightRail={activeTab === 'letters' ? rightRail : undefined}>
      <header className="page-header">
        <div>
          <h1 className="page-title">模板库</h1>
          <p className="page-sub">
            7 套模板原文逐字收录 · 点击红色槽位可查看词性与万能填充词
          </p>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'letters' ? 'active' : ''}`}
            onClick={() => setActiveTab('letters')}
          >
            <BookOpen size={15} strokeWidth={1.5} />
            信件模板
          </button>
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'fillers' ? 'active' : ''}`}
            onClick={() => setActiveTab('fillers')}
          >
            <ListChecks size={15} strokeWidth={1.5} />
            万能填充词
          </button>
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'cues' ? 'active' : ''}`}
            onClick={() => setActiveTab('cues')}
          >
            首词链自测
          </button>
        </div>
      </header>

      {activeTab === 'letters' && (
        <>
          <div className="tab-bar" role="tablist" aria-label="选择模板类型">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                role="tab"
                aria-selected={tpl.id === selectedId}
                className={`tab-pill ${tpl.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(tpl.id)}
              >
                {tpl.name}
              </button>
            ))}
          </div>

          <div className="toolbar-row">
            <div className="toolbar-group">
              <button
                type="button"
                className="btn-secondary"
                aria-pressed={showZh}
                onClick={() => setShowZh((v) => !v)}
              >
                {showZh ? (
                  <Eye size={15} strokeWidth={1.5} />
                ) : (
                  <EyeOff size={15} strokeWidth={1.5} />
                )}
                {showZh ? '隐藏中文' : '显示中文'}
              </button>
            </div>

            <div className="toolbar-group" role="group" aria-label="层级筛选">
              <button
                type="button"
                className={`btn-secondary ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                全文
              </button>
              <button
                type="button"
                className={`btn-secondary ${filter === 'skeleton' ? 'active' : ''}`}
                onClick={() => setFilter('skeleton')}
              >
                仅看骨架
              </button>
              <button
                type="button"
                className={`btn-secondary ${filter === 'body' ? 'active' : ''}`}
                onClick={() => setFilter('body')}
              >
                仅看主体
              </button>
            </div>
          </div>

          <div className="card-surface story-card">
            <StoryLine
              nodes={template.storyLine}
              detail={template.storyLineDetail}
            />
          </div>

          <LetterView template={template} showZh={showZh} filter={filter} />

          {template.warnings.length > 0 && (
            <div className="warning-box">
              <div className="warning-box-title">
                <AlertCircle size={15} strokeWidth={1.5} />
                易错提醒
              </div>
              <ul>
                {template.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {activeTab === 'fillers' && (
        <div>
          <input
            type="search"
            className="search-input"
            placeholder="搜索槽位名称、英文万能词或中文含义..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {POS_GROUPS.map((group) => {
            const items = filteredSlots.filter((s) => s.pos === group.pos);
            if (items.length === 0) return null;
            return (
              <section key={group.pos} className="filler-group">
                <h2 className="filler-group-title">{group.title}</h2>
                <table className="clean-table">
                  <thead>
                    <tr>
                      <th style={{ width: '24%' }}>槽位</th>
                      <th style={{ width: '44%' }}>万能填法</th>
                      <th>中文 / 提示</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((slot) => (
                      <tr key={slot.id}>
                        <td>
                          <span className="slot-chip">{slot.label}</span>
                        </td>
                        <td className="filler-en-cell">{slot.filler}</td>
                        <td>
                          <div className="zh-text">{slot.fillerZh}</div>
                          {slot.hint && (
                            <div style={{ fontSize: 12, color: 'var(--warn)', marginTop: 2 }}>
                              {slot.hint}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      )}

      {activeTab === 'cues' && (
        <div>
          <p className="page-sub" style={{ marginBottom: 16 }}>
            只看首词链，尝试在纸上或脑中把整篇模板完整默写出来。
          </p>
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="card-surface cue-chain-card">
              <div className="cue-chain-head">
                <h3>{tpl.name}</h3>
                <span className="drill-tag">{tpl.storyLine.join(' → ')}</span>
              </div>
              <p className="cue-chain-text">{tpl.cueChain}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
