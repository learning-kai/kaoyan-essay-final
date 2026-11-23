import { Download, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/Layout';
import { parseBackup, serializeBackup } from '../core/backup';
import { formatLocalDateKey } from '../core/mistakes';
import { useProgress } from '../store/useProgress';
import { useSettings, type InputMode, type ThemeMode } from '../store/useSettings';
import './pages.css';

export function SettingsPage() {
  const settings = useSettings();
  const progress = useProgress();

  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetDone, setResetDone] = useState(false);
  const [backupMsg, setBackupMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = '设置 · 小作文';
  }, []);

  const handleExport = () => {
    const json = serializeBackup(
      {
        cards: progress.cards,
        reviews: progress.reviews,
        dailyLearnedCount: progress.dailyLearnedCount,
        examRecords: progress.examRecords,
        idRecords: progress.idRecords,
      },
      {
        dailyNewLimit: settings.dailyNewLimit,
        requestRetention: settings.requestRetention,
        examDate: settings.examDate,
        strictPunctuation: settings.strictPunctuation,
        practiceMode: settings.practiceMode,
        inputMode: settings.inputMode,
        theme: settings.theme,
        unlockAllLessons: settings.unlockAllLessons,
        bodyFontSize: settings.bodyFontSize,
      }
    );

    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kaoyan-essay-backup-${formatLocalDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg({ type: 'ok', text: '已导出 JSON 备份文件。' });
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseBackup(text);
      if (!parsed.ok) {
        setBackupMsg({ type: 'err', text: parsed.error });
        return;
      }
      useProgress.setState({
        cards: parsed.data.progress.cards,
        reviews: parsed.data.progress.reviews,
        dailyLearnedCount: parsed.data.progress.dailyLearnedCount,
        examRecords: parsed.data.progress.examRecords,
        idRecords: parsed.data.progress.idRecords,
      });
      settings.updateSettings(parsed.data.settings);
      setBackupMsg({
        type: 'ok',
        text: `恢复成功：已导入 ${Object.keys(parsed.data.progress.cards).length} 张卡片与全部记录。`,
      });
    } catch {
      setBackupMsg({ type: 'err', text: '读取文件失败，请重试。' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    if (resetConfirmText.trim() !== '重置') return;
    progress.resetAll();
    setResetConfirmText('');
    setResetDone(true);
    window.setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">设置</h1>
          <p className="page-sub">学习计划、输入方式、外观与数据备份</p>
        </div>
      </header>

      <div className="settings-stack">
        <section className="card-surface settings-card">
          <h2 className="section-small-title">学习与调度</h2>

          <div className="setting-row">
            <div>
              <div className="setting-label">考试日期</div>
              <div className="setting-desc">
                距考试 ≤ 30 天时自动收紧 FSRS 最大间隔；≤ 3 天自动开启考前冲刺模式
              </div>
            </div>
            <input
              type="date"
              className="setting-input"
              value={settings.examDate ?? ''}
              onChange={(e) =>
                settings.updateSettings({ examDate: e.target.value || null })
              }
            />
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">每日新句子上限</div>
              <div className="setting-desc">范围 4–15 句，默认 8 句</div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={4}
                max={15}
                step={1}
                value={settings.dailyNewLimit}
                onChange={(e) =>
                  settings.updateSettings({ dailyNewLimit: Number(e.target.value) })
                }
              />
              <span className="tabular-nums setting-val">{settings.dailyNewLimit} 句</span>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">目标记忆保持率</div>
              <div className="setting-desc">FSRS-5 参数，范围 0.85–0.95，默认 0.90</div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={0.85}
                max={0.95}
                step={0.01}
                value={settings.requestRetention}
                onChange={(e) =>
                  settings.updateSettings({ requestRetention: Number(e.target.value) })
                }
              />
              <span className="tabular-nums setting-val">
                {Math.round(settings.requestRetention * 100)}%
              </span>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">解锁全部课程与专项卡</div>
              <div className="setting-desc">适合已背过部分模板、想自由跳课复习的用户</div>
            </div>
            <button
              type="button"
              className={`btn-secondary ${settings.unlockAllLessons ? 'active' : ''}`}
              onClick={() =>
                settings.updateSettings({
                  unlockAllLessons: !settings.unlockAllLessons,
                })
              }
            >
              {settings.unlockAllLessons ? '已开启' : '未开启'}
            </button>
          </div>
        </section>

        <section className="card-surface settings-card">
          <h2 className="section-small-title">默写与判分</h2>

          <div className="setting-row">
            <div>
              <div className="setting-label">默认输入方式</div>
              <div className="setting-desc">复习页也可随时单次切换</div>
            </div>
            <div className="toolbar-group">
              {(['typing', 'paper'] as InputMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`btn-secondary ${settings.inputMode === mode ? 'active' : ''}`}
                  onClick={() => settings.updateSettings({ inputMode: mode })}
                >
                  {mode === 'typing' ? '打字模式' : '纸笔模式'}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">默认槽位练法</div>
              <div className="setting-desc">框架模式只考固定句型，实填模式检查词性</div>
            </div>
            <div className="toolbar-group">
              <button
                type="button"
                className={`btn-secondary ${settings.practiceMode === 'framework' ? 'active' : ''}`}
                onClick={() => settings.updateSettings({ practiceMode: 'framework' })}
              >
                框架模式
              </button>
              <button
                type="button"
                className={`btn-secondary ${settings.practiceMode === 'fill' ? 'active' : ''}`}
                onClick={() => settings.updateSettings({ practiceMode: 'fill' })}
              >
                实填模式
              </button>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">严格标点</div>
              <div className="setting-desc">开启后同时核对逗号数量与句号</div>
            </div>
            <button
              type="button"
              className={`btn-secondary ${settings.strictPunctuation ? 'active' : ''}`}
              onClick={() =>
                settings.updateSettings({
                  strictPunctuation: !settings.strictPunctuation,
                })
              }
            >
              {settings.strictPunctuation ? '已开启' : '未开启'}
            </button>
          </div>
        </section>

        <section className="card-surface settings-card">
          <h2 className="section-small-title">外观</h2>

          <div className="setting-row">
            <div>
              <div className="setting-label">主题</div>
              <div className="setting-desc">浅色暖纸面或深色暖黑夜读</div>
            </div>
            <div className="toolbar-group">
              {(
                [
                  { id: 'light', label: '浅色' },
                  { id: 'dark', label: '深色' },
                  { id: 'system', label: '跟随系统' },
                ] as { id: ThemeMode; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`btn-secondary ${settings.theme === t.id ? 'active' : ''}`}
                  onClick={() => settings.updateSettings({ theme: t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">英文正文字号</div>
              <div className="setting-desc">16–22px，默认 19px</div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={16}
                max={22}
                step={1}
                value={settings.bodyFontSize}
                onChange={(e) =>
                  settings.updateSettings({ bodyFontSize: Number(e.target.value) })
                }
              />
              <span className="tabular-nums setting-val">{settings.bodyFontSize}px</span>
            </div>
          </div>
        </section>

        <section className="card-surface settings-card">
          <h2 className="section-small-title">数据备份与恢复</h2>
          <p className="setting-desc" style={{ marginBottom: 14 }}>
            所有进度保存在浏览器本地 IndexedDB 中，可随时导出为 JSON 文件并在新设备导入恢复。
          </p>
          <div className="toolbar-group">
            <button type="button" className="btn-secondary" onClick={handleExport}>
              <Download size={15} strokeWidth={1.5} />
              导出 JSON 备份
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={15} strokeWidth={1.5} />
              导入 JSON 恢复
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />
          </div>
          {backupMsg && (
            <p
              style={{
                marginTop: 10,
                fontSize: 13,
                color: backupMsg.type === 'ok' ? 'var(--ok)' : 'var(--err)',
              }}
            >
              {backupMsg.text}
            </p>
          )}
        </section>

        <section className="card-surface settings-card">
          <h2 className="section-small-title" style={{ color: 'var(--err)' }}>
            重置学习进度
          </h2>
          <p className="setting-desc" style={{ marginBottom: 12 }}>
            将清空全部 FSRS 卡片、复习与实战记录。输入「重置」两个字后方可确认执行。
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="setting-input"
              placeholder="输入“重置”确认"
              value={resetConfirmText}
              onChange={(e) => setResetConfirmText(e.target.value)}
            />
            <button
              type="button"
              className="btn-secondary"
              disabled={resetConfirmText.trim() !== '重置'}
              style={{
                borderColor: resetConfirmText.trim() === '重置' ? 'var(--err)' : undefined,
                color: resetConfirmText.trim() === '重置' ? 'var(--err)' : undefined,
              }}
              onClick={handleReset}
            >
              确认重置
            </button>
            {resetDone && (
              <span style={{ fontSize: 13, color: 'var(--ok)' }}>已重置全部进度</span>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
