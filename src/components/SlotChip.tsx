import { useState } from 'react';
import { SLOTS } from '../data/fillers';
import type { POS } from '../data/types';
import './components.css';

function posLabel(pos: POS): string {
  if (pos === 'verb') return '动词原形';
  if (pos === 'doing') return 'doing 形式';
  if (pos === 'clause') return '简单完整句';
  return '名词短语';
}

interface SlotChipProps {
  slotId: string;
  compact?: boolean;
}

export function SlotChip({ slotId, compact = false }: SlotChipProps) {
  const [open, setOpen] = useState(false);
  const slot = SLOTS[slotId];
  if (!slot) {
    return <span className="slot-chip">{slotId}</span>;
  }

  return (
    <span
      className="slot-chip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`slot-chip ${compact ? 'slot-chip-compact' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {slot.label}
      </button>
      {open && (
        <span className="slot-popover" role="tooltip">
          <span className="slot-popover-head">
            <span className="slot-pos-tag">{posLabel(slot.pos)}</span>
            <span className="slot-popover-label">[{slot.label}]</span>
          </span>
          <span className="slot-popover-filler">{slot.filler}</span>
          <span className="slot-popover-zh">{slot.fillerZh}</span>
          {slot.hint && <span className="slot-popover-hint">{slot.hint}</span>}
        </span>
      )}
    </span>
  );
}
