import { HelpCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import './components.css';

const SHORTCUTS = [
  { key: 'Enter', desc: '提交答案；判分后按 Enter 接受建议评分并进入下一张' },
  { key: 'Shift + Enter', desc: '输入框内换行' },
  { key: 'Tab', desc: '显示首词提示（cue）' },
  { key: 'Space', desc: '纸笔模式下显示标准原文' },
  { key: '1 / 2 / 3 / 4', desc: '评分：Again / Hard / Good / Easy' },
  { key: 'R', desc: '朗读当前英文句子（焦点不在输入框时）' },
  { key: 'Esc', desc: '退出专注模式或关闭弹窗' },
];

export function ShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
      if (
        e.key === '?' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="help-fab"
        onClick={() => setOpen(true)}
        aria-label="快捷键列表"
        title="快捷键列表 (?)"
      >
        <HelpCircle size={18} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="键盘快捷键"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-surface modal-box animate-card-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2>键盘快捷键</h2>
              <button
                type="button"
                className="icon-mini-btn"
                onClick={() => setOpen(false)}
                aria-label="关闭"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="shortcut-list">
              {SHORTCUTS.map((s) => (
                <div key={s.key} className="shortcut-row">
                  <kbd className="shortcut-kbd">{s.key}</kbd>
                  <span className="shortcut-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
