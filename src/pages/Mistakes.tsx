import { RotateCcw, Volume2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { renderSentenceText, speakEnglish } from '../components/LetterView';
import { collectMistakes } from '../core/mistakes';
import { SENTENCES, getTemplatesUsingSentence } from '../data/templates';
import { useProgress } from '../store/useProgress';
import './pages.css';

export function MistakesPage() {
  const navigate = useNavigate();
  const reviews = useProgress((s) => s.reviews);

  const mistakes = useMemo(() => collectMistakes(reviews), [reviews]);

  useEffect(() => {
    document.title = `错题本 (${mistakes.length}) · 小作文`;
  }, [mistakes.length]);

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">错题本</h1>
          <p className="page-sub">
            自动收录最近 30 天评过 Again 或历史错误率高于 30% 的句子
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/review?mode=mistakes')}
          >
            <RotateCcw size={15} strokeWidth={1.5} />
            只练错题（{mistakes.length} 句）
          </button>
        )}
      </header>

      {mistakes.length === 0 ? (
        <div className="card-surface empty-state">
          <h2>目前没有错题</h2>
          <p>
            复习过程中评为 Again 或错误率超过 30% 的句子会自动收录到这里，并标记你最常写错的词。
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/review')}
          >
            去间隔复习
          </button>
        </div>
      ) : (
        <div className="mistake-list">
          {mistakes.map((item) => {
            const sentence = SENTENCES[item.sentenceId];
            if (!sentence) return null;
            const tpls = getTemplatesUsingSentence(sentence.id);
            const errPct = Math.round(item.errorRate * 100);

            return (
              <article key={item.sentenceId} className="card-surface mistake-card">
                <div className="mistake-meta">
                  <span className="drill-tag">
                    {tpls.length > 2
                      ? `共用骨架（${tpls.length} 套）`
                      : tpls.map((t) => t.name).join(' / ')}
                  </span>
                  <div className="mistake-stats tabular-nums">
                    <span>Again {item.againCount} 次</span>
                    <span>错误率 {errPct}%</span>
                    <button
                      type="button"
                      className="icon-mini-btn"
                      onClick={() => speakEnglish(sentence.en)}
                      aria-label="朗读"
                    >
                      <Volume2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="serif-text" style={{ marginTop: 10 }}>
                  {renderSentenceText(sentence.en, sentence.resultWord)}
                </div>
                <div className="zh-text" style={{ fontSize: 14, marginTop: 6 }}>
                  {renderSentenceText(sentence.zh)}
                </div>

                {item.topMistakeText && (
                  <div className="mistake-highlight">
                    高频易错：{item.topMistakeText}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
