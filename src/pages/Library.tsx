import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  Link2,
  ListChecks,
  Volume2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LetterView, speakEnglish, type LetterFilter } from '../components/LetterView';
import { StoryLine } from '../components/StoryLine';
import { BigLogicChain } from '../components/big/BigLogicChain';
import {
  BigVarHoverProvider,
  renderBigSentenceRich,
} from '../components/big/BigVarHighlight';
import { DYNAMIC_CHART_BLOCKS, STATIC_CHART_BLOCKS } from '../data/bigChart';
import {
  BIG_SENTENCES,
  renderBigSentenceText,
  type BigSentence,
} from '../data/bigEssay';
import { SLOT_LIST } from '../data/fillers';
import { TEMPLATES, TEMPLATE_MAP } from '../data/templates';
import type { POS, TemplateId } from '../data/types';
import './pages.css';

type LibraryTab = 'letters' | 'big' | 'fillers' | 'cues';

const POS_GROUPS: { pos: POS; title: string }[] = [
  { pos: 'clause', title: '万能主体要点槽位（简单完整句，零词性坑）' },
  { pos: 'noun', title: '名词短语槽位' },
  { pos: 'verb', title: '动词原形槽位（前接 to / can / could）' },
  { pos: 'doing', title: 'doing 形式槽位（前接介词 / such as）' },
];

const BIG_PARA_META: { para: 1 | 2 | 3; title: string; badge: string }[] = [
  { para: 1, title: '第一段：看到什么 → 说明什么 → 有什么用', badge: '描述' },
  { para: 2, title: '第二段：带来什么 → 为什么变普及 → 为什么受关注 → 反映了什么', badge: '论证' },
  { para: 3, title: '第三段：关键在于 → 社会怎么做 → 个人怎么做 → 只有这样', badge: '建议' },
];

export function LibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<LibraryTab>('letters');
  const [selectedId, setSelectedId] = useState<TemplateId>(() => {
    const param = searchParams.get('template') as TemplateId | null;
    return param && param in TEMPLATE_MAP ? param : 'suggest';
  });
  const [showZh, setShowZh] = useState(true);
  const [filter, setFilter] = useState<LetterFilter>('all');
  const [search, setSearch] = useState('');
  const [showChartBlocks, setShowChartBlocks] = useState(false);

  useEffect(() => {
    const param = searchParams.get('template') as TemplateId | null;
    if (param && param in TEMPLATE_MAP) {
      setActiveTab('letters');
      setSelectedId(param);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const template = TEMPLATE_MAP[selectedId];

  const bigByPara = useMemo(() => {
    const map: Record<1 | 2 | 3, BigSentence[]> = { 1: [], 2: [], 3: [] };
    for (const s of BIG_SENTENCES) {
      map[s.paragraph].push(s);
    }
    return map;
  }, []);

  useEffect(() => {
    document.title =
      activeTab === 'big'
        ? '模板库 · 大作文模板 · 考研英语一'
        : `模板库 · ${template.name} · 小作文`;
  }, [activeTab, template.name]);

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
      <div className="rail-section-title">本题型 3 空位填法</div>
      <StoryLine
        nodes={template.storyLine}
        detail={template.storyLineDetail}
        vertical
      />
      <ul
        style={{
          margin: '12px 0 0',
          paddingLeft: 16,
          fontSize: 12.5,
          color: 'var(--ink-muted)',
          lineHeight: 1.6,
        }}
      >
        {template.slotTips.map((tip, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            {tip}
          </li>
        ))}
      </ul>

      <div className="rail-section-title" style={{ marginTop: 24 }}>
        题型识别关键词
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {template.keywords.map((kw) => (
          <span key={kw} className="drill-tag">
            {kw}
          </span>
        ))}
      </div>

      <div className="rail-section-title" style={{ marginTop: 24 }}>
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

  const bigRightRail = (
    <div>
      <div className="rail-section-title">大作文变量体系</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65 }}>
        <div>
          <strong style={{ color: 'var(--slot)' }}>全局变量 X</strong> · 全文贯穿 7 次，只定一次（须为单数或不可数名词短语）
        </div>
        <div>
          <strong style={{ color: 'var(--ink)' }}>4 个必填项</strong> · X、PIC、B1/B2、DO，其余 17 个局部槽位均有考场默认值
        </div>
        <div>
          <strong style={{ color: 'var(--gold)' }}>P2.S4 可选句</strong> · 时间紧或全文超 200 词时直接删掉，段落仍连贯
        </div>
      </div>

      <div className="rail-section-title" style={{ marginTop: 24 }}>
        联动提示
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, margin: 0 }}>
        鼠标悬停正文任意红色变量胶囊，全文所有同名变量会同步高亮；点击胶囊可查看词性约束与默认值。
      </p>
    </div>
  );

  return (
    <Layout
      rightRail={
        activeTab === 'letters'
          ? rightRail
          : activeTab === 'big'
            ? bigRightRail
            : undefined
      }
    >
      <header className="page-header">
        <div>
          <h1 className="page-title">模板库</h1>
          <p className="page-sub">
            一套万能骨架通杀全部 14 类小作文（{TEMPLATES.length} 套一键切换，只换第 1 段目的句）+ 大作文三段通用骨架
          </p>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'letters' ? 'active' : ''}`}
            onClick={() => setActiveTab('letters')}
          >
            <BookOpen size={15} strokeWidth={1.5} />
            小作文模板
          </button>
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'big' ? 'active' : ''}`}
            onClick={() => setActiveTab('big')}
          >
            <FileText size={15} strokeWidth={1.5} />
            大作文模板
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

      {activeTab === 'big' && (
        <div>
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
            <span className="page-sub">
              悬停红色变量胶囊，全文所有同名变量联动高亮；点击胶囊可查看默认值与词性约束
            </span>
          </div>

          <div className="card-surface story-card">
            <BigLogicChain />
          </div>

          <BigVarHoverProvider>
            <div className="big-lib-paper card-surface">
              {BIG_PARA_META.map((pm) => (
                <section key={pm.para} className="big-lib-para">
                  <div className="big-lib-para-head">
                    <span className="big-logic-para-badge">{pm.badge}</span>
                    <h2 className="big-lib-para-title">{pm.title}</h2>
                  </div>

                  <div className="big-lib-sentences">
                    {bigByPara[pm.para].map((sent) => (
                      <div key={sent.id} className="big-lib-sent-row">
                        <div className="big-lib-sent-meta">
                          <span className="drill-tag">
                            P{sent.paragraph}.S{sent.order} · {sent.role}
                          </span>
                          {sent.optional && (
                            <span className="drill-tag">可选句（超字数可删）</span>
                          )}
                          <button
                            type="button"
                            className="icon-btn"
                            title="朗读本句"
                            aria-label={`朗读 P${sent.paragraph}.S${sent.order}`}
                            onClick={() =>
                              speakEnglish(
                                renderBigSentenceText(sent, {
                                  X: 'traditional culture',
                                  PIC: 'an old craftsman is teaching children to make paper-cuttings',
                                  B1: 'a sense of cultural identity',
                                  B2: 'spiritual enrichment',
                                  DO: 'appreciate the charm of history in daily life',
                                })
                              )
                            }
                          >
                            <Volume2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="big-lib-en en-text">
                          {renderBigSentenceRich(sent.en, {
                            capitalizeFirst: true,
                          })}
                        </p>

                        {showZh && <p className="big-lib-zh zh-text">{sent.zh}</p>}

                        {sent.note && (
                          <div className="big-lib-note">{sent.note}</div>
                        )}

                        {sent.smallEssayLink && (
                          <div className="big-link-callout">
                            <Link2 size={14} strokeWidth={1.5} />
                            <span>{sent.smallEssayLink}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </BigVarHoverProvider>

          <div className="card-surface today-section-card" style={{ marginTop: 18 }}>
            <button
              type="button"
              className="big-collapse-trigger"
              aria-expanded={showChartBlocks}
              onClick={() => setShowChartBlocks((v) => !v)}
            >
              {showChartBlocks ? (
                <ChevronDown size={16} strokeWidth={1.5} />
              ) : (
                <ChevronRight size={16} strokeWidth={1.5} />
              )}
              <span>图表作文句型积木参考（静态 + 动态，英语一备用 / 英语二常考）</span>
            </button>

            {showChartBlocks && (
              <div className="big-chart-ref-wrap" style={{ marginTop: 14 }}>
                <div className="big-chart-ref-group">
                  <h3 className="big-chart-ref-title">静态图句型（饼图 / 静态柱图）</h3>
                  <ul className="big-chart-ref-list">
                    {STATIC_CHART_BLOCKS.map((b) => (
                      <li key={b.id}>
                        <span className="drill-tag">{b.label}</span>
                        <div className="en-text">{b.en}</div>
                        <div className="zh-text">{b.zh}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="big-chart-ref-group">
                  <h3 className="big-chart-ref-title">动态图句型（折线图 / 跨年柱图）</h3>
                  <ul className="big-chart-ref-list">
                    {DYNAMIC_CHART_BLOCKS.map((b) => (
                      <li key={b.id}>
                        <span className="drill-tag">{b.label}</span>
                        <div className="en-text">{b.en}</div>
                        <div className="zh-text">{b.zh}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
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

          <div className="card-surface cue-chain-card">
            <div className="cue-chain-head">
              <h3>大作文 · 三段 11 句通用骨架</h3>
              <span className="drill-tag">图画描述 → 价值论证 → 行动建议</span>
            </div>
            <div className="big-lib-cues-paras">
              {BIG_PARA_META.map((pm) => (
                <div key={pm.para} className="big-lib-cue-row">
                  <span className="big-logic-para-badge">{pm.badge}</span>
                  <p className="cue-chain-text" style={{ margin: 0 }}>
                    {bigByPara[pm.para]
                      .map((s) => `${s.cue}${s.optional ? '（可选）' : ''}`)
                      .join('  →  ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
