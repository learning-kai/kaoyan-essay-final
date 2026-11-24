import {
  ArrowRight,
  Clock,
  Eye,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BIG_PROMPTS,
  MATERIAL_PACKS,
  MATERIAL_PACK_MAP,
  type BigPrompt,
  type MaterialPack,
} from '../../data/bigEssay';
import { useProgress } from '../../store/useProgress';
import { useSettings } from '../../store/useSettings';
import { BigEssayPaperPreview } from './BigEssayPaper';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface PackIdQuestion {
  prompt: BigPrompt;
  expectedPack: MaterialPack;
  options: MaterialPack[];
}

function buildPackIdQuestion(prevPromptId?: string): PackIdQuestion {
  const pool = BIG_PROMPTS.filter((p) => p.id !== prevPromptId);
  const prompt = pool[Math.floor(Math.random() * pool.length)] ?? BIG_PROMPTS[0];
  const expectedPack = MATERIAL_PACK_MAP[prompt.recommendedPackId];
  const distractors = shuffle(
    MATERIAL_PACKS.filter((p) => p.id !== expectedPack.id)
  ).slice(0, 3);
  return {
    prompt,
    expectedPack,
    options: shuffle([expectedPack, ...distractors]),
  };
}

export function BigPacksTab() {
  const enableBigPackCards = useSettings((s) => s.enableBigPackCards);
  const updateSettings = useSettings((s) => s.updateSettings);
  const cards = useProgress((s) => s.cards);
  const bigPackIdRecords = useProgress((s) => s.bigPackIdRecords);
  const recordBigPackId = useProgress((s) => s.recordBigPackId);
  const completeNewSentence = useProgress((s) => s.completeNewSentence);

  const [subMode, setSubMode] = useState<'browse' | 'drill'>('browse');
  const [query, setQuery] = useState('');
  const [previewPackId, setPreviewPackId] = useState<string | null>(null);

  // 10-second interleaved identification drill
  const [question, setQuestion] = useState<PackIdQuestion>(() =>
    buildPackIdQuestion()
  );
  const [pickedPackId, setPickedPackId] = useState<string | null>(null);
  const [remainSec, setRemainSec] = useState(10);
  const qStartRef = useRef(Date.now());

  useEffect(() => {
    if (subMode !== 'drill' || pickedPackId !== null) return;
    const id = window.setInterval(() => {
      setRemainSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [subMode, pickedPackId]);

  const handleChoosePack = useCallback(
    (packId: string) => {
      if (pickedPackId !== null) return;
      const elapsed = Math.max(
        1,
        Math.round((Date.now() - qStartRef.current) / 1000)
      );
      setPickedPackId(packId);
      recordBigPackId({
        promptId: question.prompt.id,
        expectedPackId: question.expectedPack.id,
        chosenPackId: packId,
        correct: packId === question.expectedPack.id,
        durationSec: elapsed,
      });
    },
    [pickedPackId, question, recordBigPackId]
  );

  const handleNextQuestion = useCallback(() => {
    setQuestion((prev) => buildPackIdQuestion(prev.prompt.id));
    setPickedPackId(null);
    setRemainSec(10);
    qStartRef.current = Date.now();
  }, []);

  // Keyboard 1-4 / Enter in drill mode
  useEffect(() => {
    if (subMode !== 'drill') return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (pickedPackId === null) {
        const n = Number(e.key);
        if (n >= 1 && n <= question.options.length) {
          e.preventDefault();
          handleChoosePack(question.options[n - 1].id);
        }
      } else if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [subMode, pickedPackId, question.options, handleChoosePack, handleNextQuestion]);

  const filteredPacks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MATERIAL_PACKS;
    return MATERIAL_PACKS.filter((p) => {
      const hay = [
        p.theme,
        ...p.triggers,
        ...Object.values(p.vars),
        ...p.picExamples,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const drillTotal = bigPackIdRecords.length;
  const drillCorrect = bigPackIdRecords.filter((r) => r.correct).length;
  const drillPct =
    drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : null;

  return (
    <div>
      <section className="card-surface today-section-card">
        <div className="section-row-head" style={{ marginBottom: 12 }}>
          <div>
            <h2 className="section-small-title">
              10 大高频主题素材包（附录 B）
            </h2>
            <p className="page-sub" style={{ marginTop: 4 }}>
              每个素材包保证 X 为单数/不可数、四六级词汇、代入去 P2.S4 后严格落在 160–220 词
            </p>
          </div>
          <div className="toolbar-group">
            <button
              type="button"
              className={`btn-secondary formula-mini-btn ${subMode === 'browse' ? 'active' : ''}`}
              onClick={() => setSubMode('browse')}
            >
              <Sparkles size={13} />
              素材包列表（10）
            </button>
            <button
              type="button"
              className={`btn-secondary formula-mini-btn ${subMode === 'drill' ? 'active' : ''}`}
              onClick={() => {
                setSubMode('drill');
                handleNextQuestion();
              }}
            >
              <Zap size={13} />
              10 秒识包训练
            </button>
          </div>
        </div>

        {/* Optional FSRS enrollment setting toggle (default OFF per spec 4.4) */}
        <div className="big-pack-fsrs-bar">
          <span className="setting-desc" style={{ margin: 0 }}>
            素材包变量默认<strong>不进入</strong>日常 FSRS 复习队列；如需背诵素材包变量，可手动开启（也可在「设置」中调整）：
          </span>
          <button
            type="button"
            className={`btn-secondary formula-mini-btn ${enableBigPackCards ? 'active' : ''}`}
            onClick={() =>
              updateSettings({ enableBigPackCards: !enableBigPackCards })
            }
          >
            {enableBigPackCards ? '已开启素材包 FSRS 复习' : '默认关闭（点击开启）'}
          </button>
        </div>
      </section>

      {subMode === 'browse' ? (
        <div>
          <div className="formula-search-wrap" style={{ marginBottom: 14 }}>
            <Search size={15} className="formula-search-icon" />
            <input
              type="text"
              className="search-input formula-search-input"
              placeholder="搜索主题、关键词或英文变量（如 传统 / AI / learning / green）…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="big-pack-grid">
            {filteredPacks.map((pack) => {
              const packCardId = `big.pack.${pack.id}`;
              const enrolled = Boolean(cards[packCardId]);
              const isPreviewing = previewPackId === pack.id;

              return (
                <article key={pack.id} className="card-surface big-pack-card">
                  <div className="big-pack-head">
                    <div>
                      <h3 className="big-pack-title">{pack.theme}</h3>
                      <div className="big-pack-triggers">
                        {pack.triggers.slice(0, 6).map((kw) => (
                          <span key={kw} className="drill-tag">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="toolbar-group">
                      <button
                        type="button"
                        className={`btn-ghost formula-mini-btn ${isPreviewing ? 'active' : ''}`}
                        onClick={() =>
                          setPreviewPackId(isPreviewing ? null : pack.id)
                        }
                      >
                        <Eye size={13} />
                        {isPreviewing ? '收起范文' : '代入看全文'}
                      </button>
                      {enableBigPackCards && (
                        <button
                          type="button"
                          className={`btn-secondary formula-mini-btn ${enrolled ? 'is-ok' : ''}`}
                          disabled={enrolled}
                          onClick={() => completeNewSentence(packCardId)}
                        >
                          {enrolled ? '已在复习队列' : '加入 FSRS'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="big-pack-vars">
                    {(['X', 'G', 'B1', 'B2', 'DO', 'LIMIT'] as const).map((k) => (
                      <div key={k} className="big-pack-var-row">
                        <span className="slot-chip">{k}</span>
                        <span className="serif-text" style={{ fontSize: 15 }}>
                          {pack.vars[k]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="big-pack-pics">
                    <div className="sync-field-label" style={{ marginBottom: 4 }}>
                      图片描述示例（2 个）：
                    </div>
                    <ol className="big-pack-pic-list serif-text">
                      {pack.picExamples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ol>
                  </div>

                  {isPreviewing && (
                    <div style={{ marginTop: 12 }}>
                      <BigEssayPaperPreview
                        vars={{ ...pack.vars, PIC: pack.picExamples[0] }}
                        title={`${pack.theme} · 代入效果`}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <section className="card-surface politics-drill-card">
          <div className="big-plan-head" style={{ marginBottom: 12 }}>
            <span className="drill-tag">
              10 秒素材包识别（累计 {drillTotal} 题
              {drillPct !== null ? ` · 正确率 ${drillPct}%` : ''}）
            </span>
            <div
              className={`big-plan-timer tabular-nums ${remainSec <= 3 ? 'is-amber' : ''}`}
            >
              <Clock size={14} strokeWidth={1.7} />
              <span>{remainSec}s</span>
            </div>
          </div>

          <div className="politics-drill-prompt">
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
              {question.prompt.title}
            </div>
            <p className="politics-drill-stem" style={{ fontSize: 15 }}>
              {question.prompt.pictureDescZh}
            </p>
          </div>

          <div className="id-choice-grid">
            {question.options.map((opt, idx) => {
              let cls = 'id-choice-btn politics-choice-btn';
              if (pickedPackId !== null) {
                if (opt.id === question.expectedPack.id) cls += ' choice-ok';
                else if (opt.id === pickedPackId) cls += ' choice-err';
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={pickedPackId !== null}
                  className={cls}
                  onClick={() => handleChoosePack(opt.id)}
                >
                  <span className="politics-choice-idx tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="politics-choice-text">
                    <strong>{opt.theme}</strong>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>{opt.vars.X}</div>
                  </span>
                </button>
              );
            })}
          </div>

          {pickedPackId !== null && (
            <div className="id-feedback">
              <div
                className="id-feedback-head"
                style={{
                  color:
                    pickedPackId === question.expectedPack.id
                      ? 'var(--ok)'
                      : 'var(--err)',
                }}
              >
                {pickedPackId === question.expectedPack.id
                  ? `识别准确！对应「${question.expectedPack.theme}」`
                  : `最匹配的素材包是「${question.expectedPack.theme}」`}
              </div>
              <p className="politics-drill-explain">
                主题词 X：<strong>{question.expectedPack.vars.X}</strong> · 触发关键词：
                {question.expectedPack.triggers.join(' / ')}
              </p>
              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: 12 }}
                onClick={handleNextQuestion}
              >
                下一题 (Enter)
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
