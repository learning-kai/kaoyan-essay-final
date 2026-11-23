import { ArrowRight } from 'lucide-react';
import './components.css';

interface StoryLineProps {
  nodes: string[];
  activeIndex?: number;
  detail?: string;
  vertical?: boolean;
}

export function StoryLine({
  nodes,
  activeIndex = -1,
  detail,
  vertical = false,
}: StoryLineProps) {
  return (
    <div className={`storyline ${vertical ? 'storyline-vertical' : ''}`}>
      <div className="storyline-track">
        {nodes.map((node, idx) => {
          const state =
            activeIndex === -1
              ? 'idle'
              : idx < activeIndex
                ? 'done'
                : idx === activeIndex
                  ? 'active'
                  : 'upcoming';

          return (
            <div key={`${node}-${idx}`} className="storyline-item">
              <span className={`storyline-node storyline-${state}`}>
                <span className="storyline-dot" />
                <span className="storyline-label">{node}</span>
              </span>
              {idx < nodes.length - 1 && (
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="storyline-arrow"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
      {detail && <p className="storyline-detail">{detail}</p>}
    </div>
  );
}
