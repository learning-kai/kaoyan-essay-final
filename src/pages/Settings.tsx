import { Download, RefreshCw, Share, Smartphone, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CloudSyncCard } from '../components/CloudSyncCard';
import { Layout } from '../components/Layout';
import { parseBackup, serializeBackup } from '../core/backup';
import { formatLocalDateKey } from '../core/mistakes';
import { checkAndApplyPwaUpdate, isStandaloneApp } from '../core/pwa';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import { useProgress } from '../store/useProgress';
import { useSettings, type InputMode, type ThemeMode } from '../store/useSettings';
import './pages.css';

interface EditableLimitValueProps {
  value: number;
  unit: string;
  sliderMax: number;
  minInput?: number;
  maxInput?: number;
  ariaLabel: string;
  onCommit: (next: number) => void;
}

function EditableLimitValue({
  value,
  unit,
  sliderMax,
  minInput = 1,
  maxInput = 999,
  ariaLabel,
  onCommit,
}: EditableLimitValueProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(String(value));
    setEditing(true);
  };

  const commit = () => {
    const parsed = Number.parseInt(draft.trim(), 10);
    if (Number.isFinite(parsed) && !Number.isNaN(parsed)) {
      const clamped = Math.max(minInput, Math.min(maxInput, parsed));
      onCommit(clamped);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(String(value));
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="setting-val-edit">
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          min={minInput}
          max={maxInput}
          step={1}
          aria-label={ariaLabel}
          className="setting-val-input tabular-nums"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              cancel();
            }
          }}
        />
        <span className="setting-val-unit">{unit}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`setting-val-btn tabular-nums ${value > sliderMax ? 'is-custom' : ''}`}
      onClick={startEdit}
      title="点击手动输入自定义上限"
      aria-label={`${ariaLabel}：当前 ${value} ${unit}，点击手动输入`}
    >
      {value} {unit}
    </button>
  );
}

export function SettingsPage() {
  const settings = useSettings();
  const progress = useProgress();
  const formulaProgress = useFormulaProgress();
  const politicsProgress = usePoliticsProgress();

  const [resetScope, setResetScope] = useState<'essay' | 'big' | 'formula' | 'politics'>('essay');
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetDoneMsg, setResetDoneMsg] = useState<string | null>(null);
  const [backupMsg, setBackupMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );
  const [pwaMsg, setPwaMsg] = useState<string | null>(null);
  const [pwaChecking, setPwaChecking] = useState(false);
  const runningStandalone = isStandaloneApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckPwaUpdate = async () => {
    setPwaChecking(true);
    setPwaMsg(null);
    const res = await checkAndApplyPwaUpdate();
    setPwaChecking(false);
    if (res === 'up-to-date') {
      setPwaMsg('当前已是最新版本（已支持离线访问）。');
    }
  };

  useEffect(() => {
    document.title = '设置 · 考研背诵';
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
        bigDailyNewLimit: settings.bigDailyNewLimit,
        enableBigPackCards: settings.enableBigPackCards,
        requestRetention: settings.requestRetention,
        examDate: settings.examDate,
        strictPunctuation: settings.strictPunctuation,
        practiceMode: settings.practiceMode,
        inputMode: settings.inputMode,
        theme: settings.theme,
        unlockAllLessons: settings.unlockAllLessons,
        bodyFontSize: settings.bodyFontSize,
      },
      new Date(),
      {
        updatedAt: progress.updatedAt,
        settingsUpdatedAt: settings.updatedAt,
        resetAt: progress.lastResetAt,
        bigEssayProgress: {
          bigDailyLearnedCount: progress.bigDailyLearnedCount,
          bigPlanRecords: progress.bigPlanRecords,
          bigExamRecords: progress.bigExamRecords,
          bigPackIdRecords: progress.bigPackIdRecords,
          bigChartRecords: progress.bigChartRecords,
        },
        formulaProgress: {
          cards: formulaProgress.cards,
          reviews: formulaProgress.reviews,
          dailyLearnedCount: formulaProgress.dailyLearnedCount,
          mastered: formulaProgress.mastered,
          starred: formulaProgress.starred,
          dailyNewLimit: formulaProgress.dailyNewLimit,
          updatedAt: formulaProgress.updatedAt,
          resetAt: formulaProgress.lastResetAt,
        },
        politicsProgress: {
          cards: politicsProgress.cards,
          reviews: politicsProgress.reviews,
          dailyLearnedCount: politicsProgress.dailyLearnedCount,
          mastered: politicsProgress.mastered,
          starred: politicsProgress.starred,
          drillStats: politicsProgress.drillStats,
          dailyNewLimit: politicsProgress.dailyNewLimit,
          updatedAt: politicsProgress.updatedAt,
          resetAt: politicsProgress.lastResetAt,
        },
      }
    );

    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kaoyan-backup-${formatLocalDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg({
      type: 'ok',
      text: '已导出 JSON 备份文件（含大小作文、公式默写与政治一页纸进度）。',
    });
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
      const nowIso = new Date().toISOString();
      const bp = parsed.data.bigEssayProgress;
      useProgress.setState({
        cards: parsed.data.progress.cards,
        reviews: parsed.data.progress.reviews,
        dailyLearnedCount: parsed.data.progress.dailyLearnedCount,
        examRecords: parsed.data.progress.examRecords,
        idRecords: parsed.data.progress.idRecords,
        ...(bp
          ? {
              bigDailyLearnedCount: bp.bigDailyLearnedCount,
              bigPlanRecords: bp.bigPlanRecords,
              bigExamRecords: bp.bigExamRecords,
              bigPackIdRecords: bp.bigPackIdRecords,
              bigChartRecords: bp.bigChartRecords,
            }
          : {}),
        updatedAt: nowIso,
        lastResetAt: parsed.data.resetAt ?? null,
      });
      settings.updateSettings(parsed.data.settings, nowIso);
      if (parsed.data.formulaProgress) {
        const fp = parsed.data.formulaProgress;
        useFormulaProgress.setState({
          cards: fp.cards,
          reviews: fp.reviews,
          dailyLearnedCount: fp.dailyLearnedCount,
          mastered: fp.mastered,
          starred: fp.starred,
          dailyNewLimit: fp.dailyNewLimit,
          updatedAt: nowIso,
          lastResetAt: fp.resetAt ?? null,
        });
      }
      if (parsed.data.politicsProgress) {
        const pp = parsed.data.politicsProgress;
        usePoliticsProgress.setState({
          cards: pp.cards,
          reviews: pp.reviews,
          dailyLearnedCount: pp.dailyLearnedCount,
          mastered: pp.mastered,
          starred: pp.starred,
          drillStats: pp.drillStats,
          dailyNewLimit: pp.dailyNewLimit,
          updatedAt: nowIso,
          lastResetAt: pp.resetAt ?? null,
        });
      }
      const formulaCount = parsed.data.formulaProgress
        ? Object.keys(parsed.data.formulaProgress.cards).length
        : 0;
      const politicsCount = parsed.data.politicsProgress
        ? Object.keys(parsed.data.politicsProgress.cards).length
        : 0;
      setBackupMsg({
        type: 'ok',
        text: `恢复成功：已导入大小作文 ${Object.keys(parsed.data.progress.cards).length} 张卡片${
          parsed.data.formulaProgress ? `、公式 ${formulaCount} 张卡片` : ''
        }${
          parsed.data.politicsProgress ? `、政治 ${politicsCount} 张卡片` : ''
        }及熟记/收藏记录。`,
      });
    } catch {
      setBackupMsg({ type: 'err', text: '读取文件失败，请重试。' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    if (resetConfirmText.trim() !== '重置') return;
    if (resetScope === 'essay') {
      progress.resetAll();
      setResetDoneMsg('已重置英语小作文进度（大作文、公式与政治不受影响）');
    } else if (resetScope === 'big') {
      progress.resetBigEssay();
      setResetDoneMsg('已重置英语大作文进度（小作文、公式与政治不受影响）');
    } else if (resetScope === 'formula') {
      formulaProgress.resetFormulas();
      setResetDoneMsg('已重置公式默写进度（大小作文与政治不受影响）');
    } else {
      politicsProgress.resetPolitics();
      setResetDoneMsg('已重置政治一页纸进度（大小作文与公式不受影响）');
    }
    setResetConfirmText('');
    window.setTimeout(() => setResetDoneMsg(null), 3500);
  };

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1 className="page-title">设置</h1>
          <p className="page-sub">多端云同步、学习计划、输入方式、外观与数据备份</p>
        </div>
      </header>

      <div className="settings-stack">
        <CloudSyncCard />

        <section className="card-surface settings-card">
          <div className="sync-card-head" style={{ marginBottom: 10 }}>
            <div className="sync-card-title-row">
              <Smartphone size={17} strokeWidth={1.6} />
              <h2 className="section-small-title" style={{ margin: 0 }}>
                iPhone 桌面 App 与离线模式（PWA）
              </h2>
            </div>
            <span
              className={`sync-status-pill ${
                runningStandalone ? 'sync-pill-ok' : 'sync-pill-idle'
              }`}
            >
              {runningStandalone ? '已以 App 模式运行' : '浏览器模式'}
            </span>
          </div>

          <div className="sync-steps-box" style={{ marginBottom: 12 }}>
            <div>
              <strong>添加到 iPhone 主屏幕：</strong>在 <strong>Safari</strong> 中打开本站 → 点击底部{' '}
              <Share
                size={13}
                strokeWidth={1.8}
                style={{ verticalAlign: '-2px', margin: '0 2px' }}
              />
              「分享」→ 下滑选「添加到主屏幕」→ 点击右上角「添加」。
            </div>
            <div>
              <strong>已适配原生体验：</strong>高清桌面图标、灵动岛/底部小白条安全区、浅/深色启动页与状态栏适配、点击输入框防自动缩放、无网离线背诵。
            </div>
            <div style={{ color: 'var(--warn)' }}>
              <strong>进度同步提醒：</strong>iOS 桌面 App 与 Safari 浏览器的本地缓存相互独立。首次从桌面图标打开后，请在上方「多端云同步」扫码或粘贴同步码，即可一键拉取全部记录。
            </div>
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              className="btn-secondary"
              disabled={pwaChecking}
              onClick={() => void handleCheckPwaUpdate()}
            >
              <RefreshCw
                size={15}
                strokeWidth={1.5}
                className={pwaChecking ? 'spin-icon' : ''}
              />
              {pwaChecking ? '检查更新中…' : '检查并更新到最新版'}
            </button>
          </div>
          {pwaMsg && (
            <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ok)' }}>{pwaMsg}</p>
          )}
        </section>

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
              <div className="setting-label">小作文 · 每日新句子上限</div>
              <div className="setting-desc">
                滑块 4–15 句，默认 8 句（点右侧数字可手动输入更大上限）
              </div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={4}
                max={15}
                step={1}
                value={Math.min(15, Math.max(4, settings.dailyNewLimit))}
                onChange={(e) =>
                  settings.updateSettings({ dailyNewLimit: Number(e.target.value) })
                }
              />
              <EditableLimitValue
                value={settings.dailyNewLimit}
                unit="句"
                sliderMax={15}
                ariaLabel="小作文每日新句子上限"
                onCommit={(next) => settings.updateSettings({ dailyNewLimit: next })}
              />
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">大作文 · 每日新句子上限</div>
              <div className="setting-desc">
                滑块 1–8 句，默认 3 句（与小作文独立计额，点右侧数字可手动输入）
              </div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={Math.min(8, Math.max(1, settings.bigDailyNewLimit))}
                onChange={(e) =>
                  settings.updateSettings({ bigDailyNewLimit: Number(e.target.value) })
                }
              />
              <EditableLimitValue
                value={settings.bigDailyNewLimit}
                unit="句"
                sliderMax={8}
                ariaLabel="大作文每日新句子上限"
                onCommit={(next) => settings.updateSettings({ bigDailyNewLimit: next })}
              />
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">大作文 · 素材包加入 FSRS 复习队列</div>
              <div className="setting-desc">
                默认关闭；开启后可在「大作文 · 素材包」中将重点主题加入间隔复习
              </div>
            </div>
            <button
              type="button"
              className={`btn-secondary ${settings.enableBigPackCards ? 'active' : ''}`}
              onClick={() =>
                settings.updateSettings({
                  enableBigPackCards: !settings.enableBigPackCards,
                })
              }
            >
              {settings.enableBigPackCards ? '已开启' : '未开启'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">公式默写 · 每日新公式上限</div>
              <div className="setting-desc">
                滑块 5–40 题，默认 15 题（已标熟记不占名额，点右侧数字可手动输入更大上限）
              </div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={Math.min(40, Math.max(5, formulaProgress.dailyNewLimit))}
                onChange={(e) =>
                  formulaProgress.setDailyNewLimit(Number(e.target.value))
                }
              />
              <EditableLimitValue
                value={formulaProgress.dailyNewLimit}
                unit="题"
                sliderMax={40}
                ariaLabel="公式默写每日新公式上限"
                onCommit={(next) => formulaProgress.setDailyNewLimit(next)}
              />
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">政治一页纸 · 每日新卡上限</div>
              <div className="setting-desc">
                滑块 3–30 张，默认 10 张（已标熟记不占名额，点右侧数字可手动输入更大上限）
              </div>
            </div>
            <div className="setting-range-wrap">
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={Math.min(30, Math.max(3, politicsProgress.dailyNewLimit))}
                onChange={(e) =>
                  politicsProgress.setDailyNewLimit(Number(e.target.value))
                }
              />
              <EditableLimitValue
                value={politicsProgress.dailyNewLimit}
                unit="张"
                sliderMax={30}
                ariaLabel="政治一页纸每日新卡上限"
                onCommit={(next) => politicsProgress.setDailyNewLimit(next)}
              />
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
            四块进度相互独立，可按需单独清空。选择目标并输入「重置」两个字后方可确认执行。
          </p>
          <div className="toolbar-group" style={{ marginBottom: 12 }}>
            <button
              type="button"
              className={`btn-secondary ${resetScope === 'essay' ? 'active' : ''}`}
              onClick={() => setResetScope('essay')}
            >
              仅重置小作文进度
            </button>
            <button
              type="button"
              className={`btn-secondary ${resetScope === 'big' ? 'active' : ''}`}
              onClick={() => setResetScope('big')}
            >
              仅重置大作文进度
            </button>
            <button
              type="button"
              className={`btn-secondary ${resetScope === 'formula' ? 'active' : ''}`}
              onClick={() => setResetScope('formula')}
            >
              仅重置公式默写进度
            </button>
            <button
              type="button"
              className={`btn-secondary ${resetScope === 'politics' ? 'active' : ''}`}
              onClick={() => setResetScope('politics')}
            >
              仅重置政治一页纸进度
            </button>
          </div>
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
              {resetScope === 'essay'
                ? '确认重置小作文'
                : resetScope === 'big'
                  ? '确认重置大作文'
                  : resetScope === 'formula'
                    ? '确认重置公式'
                    : '确认重置政治'}
            </button>
            {resetDoneMsg && (
              <span style={{ fontSize: 13, color: 'var(--ok)' }}>{resetDoneMsg}</span>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
