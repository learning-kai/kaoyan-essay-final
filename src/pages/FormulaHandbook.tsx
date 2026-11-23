import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Info,
  Play,
  Search,
  Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MathText, stripLatexForPlainText } from '../components/MathText';
import {
  getFormulaMasteryLevel,
  isFormulaDirectMastered,
  isFormulaStarred,
} from '../core/formulaStats';
import {
  FORMULAS,
  FORMULA_SECTIONS,
  FORMULA_SECTION_MAP,
  FORMULA_SUBJECTS,
  FORMULA_VERIFICATION_NOTES,
  type FormulaItem,
  type FormulaSubjectId,
} from '../data/formulas';
import { useFormulaProgress } from '../store/useFormulaProgress';
import './pages.css';

type StatusFilter = 'all' | 'active' | 'mastered' | 'starred' | 'unlearned';

export function FormulaHandbookPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cards = useFormulaProgress((s) => s.cards);
  const mastered = useFormulaProgress((s) => s.mastered);
  const starred = useFormulaProgress((s) => s.starred);
  const setMastered = useFormulaProgress((s) => s.setMastered);
  const setBatchMastered = useFormulaProgress((s) => s.setBatchMastered);
  const toggleStarred = useFormulaProgress((s) => s.toggleStarred);

  const initialSection = searchParams.get('section') ?? '';
  const initialSubject: FormulaSubjectId | 'all' = initialSection
    ? FORMULA_SECTION_MAP[initialSection]?.subject ?? 'all'
    : 'all';

  const [subjectFilter, setSubjectFilter] = useState<FormulaSubjectId | 'all'>(
    initialSubject
  );
  const [sectionFilter, setSectionFilter] = useState<string>(initialSection);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [maskAnswers, setMaskAnswers] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    document.title = '公式手册 · 公式默写';
  }, []);

  const availableSections = useMemo(
    () =>
      subjectFilter === 'all'
        ? FORMULA_SECTIONS
        : FORMULA_SECTIONS.filter((s) => s.subject === subjectFilter),
    [subjectFilter]
  );

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FORMULAS.filter((item) => {
      if (subjectFilter !== 'all' && item.subject !== subjectFilter) return false;
      if (sectionFilter && item.sectionId !== sectionFilter) return false;

      const direct = isFormulaDirectMastered(item.id, mastered);
      const star = isFormulaStarred(item.id, starred);
      if (statusFilter === 'active' && direct) return false;
      if (statusFilter === 'mastered' && !direct) return false;
      if (statusFilter === 'starred' && !star) return false;
      if (statusFilter === 'unlearned' && (direct || cards[item.id])) return false;

      if (q) {
        const sec = FORMULA_SECTION_MAP[item.sectionId];
        const hay = `${item.code} ${sec.fullTitle} ${item.question} ${item.answer}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [subjectFilter, sectionFilter, statusFilter, query, cards, mastered, starred]);

  const groupedBySection = useMemo(() => {
    const map = new Map<string, FormulaItem[]>();
    for (const item of filteredItems) {
      const list = map.get(item.sectionId) ?? [];
      list.push(item);
      map.set(item.sectionId, list);
    }
    return FORMULA_SECTIONS.filter((s) => map.has(s.id)).map((sec) => ({
      section: sec,
      items: map.get(sec.id)!,
    }));
  }, [filteredItems]);

  const toggleRevealItem = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">公式默写手册</h1>
          <p className="page-sub">
            共 328 题 · 25 个板块。浏览时可直接一键勾选「已熟记」快速剔除已掌握的基础公式
          </p>
        </div>
        <button
          type="button"
          className={`btn-secondary ${maskAnswers ? 'active' : ''}`}
          onClick={() => {
            setMaskAnswers((v) => !v);
            setRevealedIds(new Set());
          }}
        >
          {maskAnswers ? <EyeOff size={15} /> : <Eye size={15} />}
          {maskAnswers ? '遮罩默写版（点题揭晓）' : '全显背诵版'}
        </button>
      </header>

      <div className="tab-bar" role="tablist" aria-label="按科目筛选">
        <button
          type="button"
          className={`tab-pill ${subjectFilter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setSubjectFilter('all');
            setSectionFilter('');
          }}
        >
          全部（328）
        </button>
        {FORMULA_SUBJECTS.map((subj) => {
          const count = FORMULAS.filter((f) => f.subject === subj.id).length;
          return (
            <button
              key={subj.id}
              type="button"
              className={`tab-pill ${subjectFilter === subj.id ? 'active' : ''}`}
              onClick={() => {
                setSubjectFilter(subj.id);
                setSectionFilter('');
              }}
            >
              {subj.name}（{count}）
            </button>
          );
        })}
      </div>

      <div className="formula-handbook-controls">
        <div className="formula-search-wrap">
          <Search size={15} className="formula-search-icon" />
          <input
            type="text"
            className="search-input formula-search-input"
            placeholder="搜索题号、关键词或公式符号（如 帕塞瓦尔 / 伴随 / ROC / sin）…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="formula-filter-row">
          <select
            className="setting-input formula-sec-select"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            aria-label="按板块筛选"
          >
            <option value="">全部板块（{availableSections.length}）</option>
            {availableSections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {stripLatexForPlainText(sec.fullTitle)}（{sec.questionIds.length}题）
              </option>
            ))}
          </select>

          <div className="toolbar-group">
            {(
              [
                { id: 'all', label: '全部状态' },
                { id: 'active', label: '隐藏已熟记' },
                { id: 'unlearned', label: '仅未学' },
                { id: 'mastered', label: '已熟记' },
                { id: 'starred', label: '标星收藏' },
              ] as { id: StatusFilter; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`btn-secondary formula-mini-btn ${statusFilter === opt.id ? 'active' : ''}`}
                onClick={() => setStatusFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="formula-notes-bar">
        <button
          type="button"
          className="btn-ghost formula-notes-toggle"
          onClick={() => setShowNotes((v) => !v)}
        >
          <Info size={14} strokeWidth={1.6} />
          <span>手册核对与校订说明（{FORMULA_VERIFICATION_NOTES.length} 条）</span>
          {showNotes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <span className="page-sub tabular-nums" style={{ marginTop: 0 }}>
          当前显示 {filteredItems.length} 题
        </span>
      </div>

      {showNotes && (
        <div className="card-surface formula-notes-card">
          <ol className="formula-notes-list">
            {FORMULA_VERIFICATION_NOTES.map((n, idx) => (
              <li key={idx}>
                <strong>{n.title}：</strong>
                <MathText text={n.body} />
              </li>
            ))}
          </ol>
        </div>
      )}

      {groupedBySection.length === 0 ? (
        <div className="card-surface" style={{ padding: '32px 24px', textAlign: 'center' }}>
          <p className="page-sub" style={{ margin: 0 }}>
            没有匹配当前筛选条件的公式，试试放宽筛选或清空搜索词。
          </p>
        </div>
      ) : (
        <div className="formula-handbook-sections">
          {groupedBySection.map(({ section, items }) => {
            const allMasteredInSection = section.questionIds.every((id) =>
              isFormulaDirectMastered(id, mastered)
            );
            const doneInSection = section.questionIds.filter(
              (id) => getFormulaMasteryLevel(id, cards, mastered) === 'mastered'
            ).length;

            return (
              <section key={section.id} className="formula-handbook-group">
                <div className="formula-handbook-sec-head">
                  <div>
                    <h2 className="formula-handbook-sec-title">
                      <MathText text={section.fullTitle} />
                    </h2>
                    <span className="formula-sec-meta tabular-nums">
                      已搞定 {doneInSection} / {section.questionIds.length}
                    </span>
                  </div>
                  <div className="toolbar-group">
                    <button
                      type="button"
                      className="btn-secondary formula-mini-btn"
                      onClick={() =>
                        navigate(`/formula/practice?mode=section&section=${section.id}`)
                      }
                    >
                      <Play size={12} strokeWidth={1.8} />
                      默写本板块
                    </button>
                    <button
                      type="button"
                      className={`btn-ghost formula-mini-btn ${allMasteredInSection ? 'is-ok' : ''}`}
                      onClick={() =>
                        setBatchMastered(section.questionIds, !allMasteredInSection)
                      }
                    >
                      <CheckCircle2 size={13} strokeWidth={1.6} />
                      {allMasteredInSection ? '取消全熟记' : '本板块全标熟记'}
                    </button>
                  </div>
                </div>

                <div className="formula-item-list">
                  {items.map((item) => {
                    const directMastered = isFormulaDirectMastered(item.id, mastered);
                    const itemStarred = isFormulaStarred(item.id, starred);
                    const level = getFormulaMasteryLevel(item.id, cards, mastered);
                    const answerVisible = !maskAnswers || revealedIds.has(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`card-surface formula-row-card ${directMastered ? 'formula-row-mastered' : ''}`}
                      >
                        <div className="formula-row-top">
                          <div className="formula-row-left">
                            <span
                              className={`mastery-dot mastery-${level}`}
                              title={
                                directMastered
                                  ? '已标熟记'
                                  : level === 'mastered'
                                    ? 'FSRS 已掌握'
                                    : level === 'familiar'
                                      ? '熟悉'
                                      : level === 'learning'
                                        ? '学习中'
                                        : '未学'
                              }
                            />
                            <span className="formula-row-num tabular-nums">
                              {item.code}
                            </span>
                            <div className="formula-row-q">
                              <MathText text={item.question} />
                            </div>
                          </div>

                          <div className="formula-row-actions">
                            <button
                              type="button"
                              className={`icon-mini-btn ${itemStarred ? 'is-starred' : ''}`}
                              onClick={() => toggleStarred(item.id)}
                              title={itemStarred ? '取消收藏' : '标星收藏'}
                              aria-label={itemStarred ? '取消收藏' : '标星收藏'}
                            >
                              <Star
                                size={15}
                                strokeWidth={1.6}
                                fill={itemStarred ? 'currentColor' : 'none'}
                              />
                            </button>
                            <button
                              type="button"
                              className={`formula-master-chip ${directMastered ? 'active' : ''}`}
                              onClick={() => setMastered(item.id, !directMastered)}
                              title={
                                directMastered
                                  ? '点击取消熟记，恢复到复习队列'
                                  : '标记为已熟记，跳过不再考'
                              }
                            >
                              <CheckCircle2 size={13} strokeWidth={1.7} />
                              <span>{directMastered ? '已熟记' : '标熟记'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="formula-row-ans-wrap">
                          {answerVisible ? (
                            <div
                              className={`formula-row-ans ${maskAnswers ? 'clickable' : ''}`}
                              onClick={() => {
                                if (maskAnswers) toggleRevealItem(item.id);
                              }}
                            >
                              <span className="formula-ans-prefix">答</span>
                              <MathText text={item.answer} />
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="formula-ans-mask"
                              onClick={() => toggleRevealItem(item.id)}
                            >
                              点击揭晓答案
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
