import { Rating, type Grade } from 'ts-fsrs';
import type { IntervalPreview } from '../core/scheduler';
import './components.css';

interface GradeBarProps {
  suggested: Rating;
  intervals: IntervalPreview;
  onSelect: (rating: Grade) => void;
}

const OPTIONS: { rating: Grade; label: string; keyHint: string; tone: string }[] = [
  { rating: Rating.Again, label: 'Again · 重来', keyHint: '1', tone: 'again' },
  { rating: Rating.Hard, label: 'Hard · 困难', keyHint: '2', tone: 'hard' },
  { rating: Rating.Good, label: 'Good · 良好', keyHint: '3', tone: 'good' },
  { rating: Rating.Easy, label: 'Easy · 简单', keyHint: '4', tone: 'easy' },
];

export function GradeBar({ suggested, intervals, onSelect }: GradeBarProps) {
  return (
    <div className="grade-bar" role="group" aria-label="选择记忆评分">
      {OPTIONS.map((opt) => {
        const isSuggested = opt.rating === suggested;
        return (
          <button
            key={opt.rating}
            type="button"
            className={`grade-btn grade-${opt.tone} ${isSuggested ? 'grade-suggested' : ''}`}
            onClick={() => onSelect(opt.rating)}
          >
            <span className="grade-top">
              <span className="grade-label">{opt.label}</span>
              <kbd className="grade-kbd">{opt.keyHint}</kbd>
            </span>
            <span className="grade-interval tabular-nums">
              {intervals[opt.rating]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
