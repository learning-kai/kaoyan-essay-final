import { Volume2 } from 'lucide-react';
import { Fragment, useMemo } from 'react';
import { getMasteryLevel } from '../core/scheduler';
import { SENTENCES } from '../data/templates';
import type { Sentence, Template } from '../data/types';
import { deserializeCard, useProgress } from '../store/useProgress';
import { SlotChip } from './SlotChip';
import './components.css';

export type LetterFilter = 'all' | 'skeleton' | 'body';

interface LetterViewProps {
  template: Template;
  showZh: boolean;
  filter: LetterFilter;
}

const CONNECTORS = [
  'First and foremost,',
  'More specifically,',
  'Furthermore,',
  'Last but not least,',
  'Taken together,',
];

export function speakEnglish(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleaned = text.replace(/\{\{(\w+)\}\}/g, 'something');
    const utter = new SpeechSynthesisUtterance(cleaned);
    utter.lang = 'en-US';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  } catch {
    // ignore speech errors in restricted environments
  }
}

export function renderSentenceText(
  text: string,
  highlightResultWord?: string
) {
  const tokens = text.split(/(\{\{\w+\}\})/g);
  return tokens.map((part, i) => {
    const match = part.match(/^\{\{(\w+)\}\}$/);
    if (match) {
      return <SlotChip key={`slot-${i}`} slotId={match[1]} />;
    }
    if (highlightResultWord && part.includes(highlightResultWord)) {
      const [before, ...rest] = part.split(highlightResultWord);
      return (
        <Fragment key={`txt-${i}`}>
          {before}
          <span className="result-word-highlight">{highlightResultWord}</span>
          {rest.join(highlightResultWord)}
        </Fragment>
      );
    }
    return <Fragment key={`txt-${i}`}>{part}</Fragment>;
  });
}

function extractConnector(en: string): { connector: string | null; rest: string } {
  for (const c of CONNECTORS) {
    if (en.startsWith(c)) {
      return { connector: c.replace(',', ''), rest: en };
    }
  }
  return { connector: null, rest: en };
}

function SentenceRow({
  sentence,
  showZh,
  dimmed,
}: {
  sentence: Sentence;
  showZh: boolean;
  dimmed: boolean;
}) {
  const rawCard = useProgress((s) => s.cards[sentence.id]);
  const card = useMemo(
    () => (rawCard ? deserializeCard(rawCard) : undefined),
    [rawCard]
  );
  const mastery = getMasteryLevel(card);
  const { connector } = extractConnector(sentence.en);
  const isStudyable = sentence.role !== 'heading' && sentence.role !== 'signoff';

  return (
    <div className={`letter-sentence-row ${dimmed ? 'letter-dimmed' : ''}`}>
      <div className="letter-margin-col">
        {connector && <span className="margin-connector">{connector}</span>}
      </div>
      <div className="letter-text-col">
        <div className="letter-en-line serif-text">
          <span className="letter-en-content">
            {sentence.en.split('\n').map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderSentenceText(line, sentence.resultWord)}
              </Fragment>
            ))}
          </span>
          {isStudyable && (
            <span className="letter-inline-tools">
              <span
                className={`mastery-dot mastery-${mastery}`}
                title={`掌握度：${
                  mastery === 'unlearned'
                    ? '未学'
                    : mastery === 'learning'
                      ? '学习中'
                      : mastery === 'familiar'
                        ? '熟悉'
                        : '牢固'
                }`}
              />
              <button
                type="button"
                className="icon-mini-btn"
                onClick={() => speakEnglish(sentence.en)}
                title="朗读本句"
                aria-label="朗读本句"
              >
                <Volume2 size={14} strokeWidth={1.5} />
              </button>
            </span>
          )}
        </div>
        {showZh && (
          <div className="letter-zh-line zh-text">
            {renderSentenceText(sentence.zh)}
          </div>
        )}
      </div>
    </div>
  );
}

export function LetterView({ template, showZh, filter }: LetterViewProps) {
  const sentences = template.sentenceIds.map((id) => SENTENCES[id]);
  const heading = sentences[0];
  const para1 = sentences.slice(1, 3);
  const para2 = sentences.slice(3, -2);
  const closing = sentences[sentences.length - 2];
  const signoff = sentences[sentences.length - 1];

  const isDimmed = (s: Sentence) => {
    if (filter === 'skeleton') return s.role === 'body';
    if (filter === 'body') return s.role !== 'body' && s.role !== 'lead';
    return false;
  };

  return (
    <article className="letter-sheet card-surface">
      <div className="letter-block">
        <SentenceRow sentence={heading} showZh={showZh} dimmed={isDimmed(heading)} />
      </div>

      <div className="letter-block">
        {para1.map((s) => (
          <SentenceRow key={s.id} sentence={s} showZh={showZh} dimmed={isDimmed(s)} />
        ))}
      </div>

      <div className="letter-block">
        {para2.map((s) => (
          <SentenceRow key={s.id} sentence={s} showZh={showZh} dimmed={isDimmed(s)} />
        ))}
      </div>

      <div className="letter-block">
        <SentenceRow sentence={closing} showZh={showZh} dimmed={isDimmed(closing)} />
      </div>

      <div className="letter-block letter-signoff-block">
        <SentenceRow sentence={signoff} showZh={showZh} dimmed={isDimmed(signoff)} />
      </div>
    </article>
  );
}
