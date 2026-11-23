import type { DiffToken } from '../core/diff';
import './components.css';

interface DiffResultProps {
  tokens: DiffToken[];
  accuracy: number;
  warnings: string[];
}

export function DiffResult({ tokens, accuracy, warnings }: DiffResultProps) {
  const pct = Math.round(accuracy * 100);

  return (
    <div className="diff-panel">
      <div className="diff-header">
        <span className="diff-title">逐词比对</span>
        <span
          className={`diff-score tabular-nums ${
            pct >= 98 ? 'score-ok' : pct >= 85 ? 'score-warn' : 'score-err'
          }`}
        >
          准确率 {pct}%
        </span>
      </div>

      <div className="diff-tokens serif-text">
        {tokens.map((tok, idx) => {
          const delayMs = Math.min(idx * 15, 380);
          const style = { animationDelay: `${delayMs}ms` };

          if (tok.status === 'correct') {
            return (
              <span key={idx} className="diff-tok diff-correct" style={style}>
                {tok.text}
              </span>
            );
          }

          if (tok.status === 'missing') {
            return (
              <span
                key={idx}
                className="diff-tok diff-missing"
                style={style}
                title={`漏写：${tok.text}`}
              >
                {tok.text}
              </span>
            );
          }

          if (tok.status === 'extra') {
            return (
              <span
                key={idx}
                className="diff-tok diff-extra"
                style={style}
                title="多写"
              >
                {tok.text}
              </span>
            );
          }

          if (tok.status === 'misspelled') {
            return (
              <span
                key={idx}
                className="diff-tok diff-misspelled"
                style={style}
                title={`拼写应为：${tok.expected ?? ''}`}
              >
                {tok.text}
                {tok.expected && (
                  <span className="diff-correction">{tok.expected}</span>
                )}
              </span>
            );
          }

          if (tok.status === 'wrongForm') {
            return (
              <span
                key={idx}
                className="diff-tok diff-wrongform"
                style={style}
                title={`词形应为：${tok.expected ?? ''}`}
              >
                {tok.text}
                {tok.expected && (
                  <span className="diff-correction">{tok.expected}</span>
                )}
              </span>
            );
          }

          return (
            <span
              key={idx}
              className={`diff-tok diff-slot ${tok.slotWarning ? 'diff-slot-warn' : ''}`}
              style={style}
              title={tok.slotWarning ?? tok.expected}
            >
              {tok.text}
            </span>
          );
        })}
      </div>

      <div className="diff-legend">
        <span><i className="legend-mark legend-missing" /> 漏写</span>
        <span><i className="legend-mark legend-extra" /> 多写</span>
        <span><i className="legend-mark legend-misspelled" /> 拼写误差</span>
        <span><i className="legend-mark legend-wrongform" /> 词形误差</span>
      </div>

      {warnings.length > 0 && (
        <ul className="diff-warnings">
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
