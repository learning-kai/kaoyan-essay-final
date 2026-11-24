import { BIG_LOGIC_CHAIN } from '../../data/bigEssay';
import { StoryLine } from '../StoryLine';
import '../components.css';

interface BigLogicChainProps {
  activeParagraph?: 1 | 2 | 3;
  activeNodeIndex?: number;
  compact?: boolean;
}

export function BigLogicChain({
  activeParagraph,
  activeNodeIndex = -1,
  compact = false,
}: BigLogicChainProps) {
  return (
    <div className={`big-logic-chain ${compact ? 'big-logic-compact' : ''}`}>
      <div className="big-logic-overall">
        <span className="big-logic-tag">总逻辑</span>
        <StoryLine nodes={BIG_LOGIC_CHAIN.overall} activeIndex={activeParagraph ? activeParagraph - 1 : -1} />
      </div>

      <div className="big-logic-paras">
        {BIG_LOGIC_CHAIN.paragraphs.map((p) => {
          const isCurrent = activeParagraph === p.paragraph;
          return (
            <div
              key={p.paragraph}
              className={`big-logic-para-row ${isCurrent ? 'is-active' : ''}`}
            >
              <span className="big-logic-para-badge">{p.roleLabel}</span>
              <div className="big-logic-para-track">
                <div className="big-logic-para-title">{p.title}</div>
                <StoryLine
                  nodes={p.nodes}
                  activeIndex={isCurrent ? activeNodeIndex : -1}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
