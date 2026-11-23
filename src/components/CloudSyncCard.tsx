import {
  Check,
  Cloud,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Link2,
  QrCode,
  RefreshCw,
  Unlink,
} from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  buildSyncPairingUrl,
  decodeSyncPairing,
  encodeSyncPairing,
  GITHUB_TOKEN_CREATE_URL,
} from '../core/sync';
import { useSync } from '../store/useSync';

function formatSyncDateTime(iso: string | null): string {
  if (!iso) return '尚未同步';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '尚未同步';
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function CloudSyncCard() {
  const sync = useSync();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tokenInput, setTokenInput] = useState('');
  const [gistIdInput, setGistIdInput] = useState('');
  const [showToken, setShowToken] = useState(false);

  const [pairingInput, setPairingInput] = useState('');
  const [showPairingInput, setShowPairingInput] = useState(false);

  const [showPairPanel, setShowPairPanel] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedKind, setCopiedKind] = useState<'code' | 'url' | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const handledUrlSyncRef = useRef(false);
  const isConnected = Boolean(sync.token);

  // Auto-pair when opening a QR pairing link: #/settings?sync=<encoded>
  useEffect(() => {
    const syncParam = searchParams.get('sync');
    if (!syncParam || handledUrlSyncRef.current) return;
    handledUrlSyncRef.current = true;

    // Immediately strip sensitive pairing token from address bar
    navigate('/settings', { replace: true });

    const decoded = decodeSyncPairing(syncParam);
    if (!decoded.ok) {
      setFeedback({ type: 'err', text: decoded.error });
      return;
    }

    setFeedback({ type: 'ok', text: '检测到配对链接，正在自动连接并合并云端进度…' });
    void sync.connect(decoded.config.token, decoded.config.gistId).then((res) => {
      if (res.ok) {
        setFeedback({ type: 'ok', text: res.message ?? '配对并同步成功！' });
      } else {
        setFeedback({ type: 'err', text: res.error ?? '配对失败，请重试。' });
      }
    });
  }, [searchParams, navigate, sync]);

  // Generate local offline QR code only when user opens pairing panel
  useEffect(() => {
    if (!showPairPanel || !sync.token || !sync.gistId) {
      setQrDataUrl('');
      return;
    }
    let cancelled = false;
    const pairingUrl = buildSyncPairingUrl(
      { token: sync.token, gistId: sync.gistId },
      window.location.href
    );
    void QRCode.toDataURL(pairingUrl, {
      width: 216,
      margin: 2,
      color: {
        dark: '#1F1D1A',
        light: '#FFFDF9',
      },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl('');
      });

    return () => {
      cancelled = true;
    };
  }, [showPairPanel, sync.token, sync.gistId]);

  const handleConnect = async () => {
    setFeedback(null);
    const res = await sync.connect(tokenInput, gistIdInput);
    if (res.ok) {
      setTokenInput('');
      setGistIdInput('');
      setFeedback({ type: 'ok', text: res.message ?? '已连接云同步。' });
    } else {
      setFeedback({ type: 'err', text: res.error ?? '连接失败。' });
    }
  };

  const handleConnectWithPairing = async () => {
    setFeedback(null);
    const decoded = decodeSyncPairing(pairingInput);
    if (!decoded.ok) {
      setFeedback({ type: 'err', text: decoded.error });
      return;
    }
    const res = await sync.connect(decoded.config.token, decoded.config.gistId);
    if (res.ok) {
      setPairingInput('');
      setShowPairingInput(false);
      setFeedback({ type: 'ok', text: res.message ?? '配对同步成功。' });
    } else {
      setFeedback({ type: 'err', text: res.error ?? '配对失败。' });
    }
  };

  const handleManualSync = async (mode: 'merge' | 'push' | 'pull' = 'merge') => {
    setFeedback(null);
    const res = await sync.syncNow(mode);
    if (res.ok) {
      setFeedback({ type: 'ok', text: res.message ?? '同步完成。' });
    } else {
      setFeedback({ type: 'err', text: res.error ?? '同步失败。' });
    }
  };

  const handleCopy = async (kind: 'code' | 'url') => {
    if (!sync.token || !sync.gistId) return;
    const text =
      kind === 'code'
        ? encodeSyncPairing({ token: sync.token, gistId: sync.gistId })
        : buildSyncPairingUrl(
            { token: sync.token, gistId: sync.gistId },
            window.location.href
          );
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKind(kind);
      window.setTimeout(() => setCopiedKind(null), 2000);
    } catch {
      setFeedback({ type: 'err', text: '浏览器限制自动复制，请手动长按下方文本复制。' });
    }
  };

  const pairingCode =
    sync.token && sync.gistId
      ? encodeSyncPairing({ token: sync.token, gistId: sync.gistId })
      : '';

  return (
    <section className="card-surface settings-card sync-card">
      <div className="sync-card-head">
        <div className="sync-card-title-row">
          <Cloud size={18} strokeWidth={1.6} style={{ color: 'var(--gold)' }} />
          <h2 className="section-small-title" style={{ marginBottom: 0 }}>
            多端云同步（GitHub 私有 Gist）
          </h2>
        </div>
        <span
          className={`sync-status-pill ${
            sync.status === 'error'
              ? 'sync-pill-err'
              : isConnected
                ? 'sync-pill-ok'
                : 'sync-pill-idle'
          }`}
        >
          {sync.status === 'syncing'
            ? '同步中…'
            : sync.status === 'error'
              ? '同步异常'
              : isConnected
                ? `已连接${sync.githubLogin ? ` @${sync.githubLogin}` : ''}`
                : '未开启'}
        </span>
      </div>

      <p className="setting-desc" style={{ marginTop: 8, marginBottom: 14 }}>
        利用你自己的 GitHub 私有 Gist 自动同步电脑与手机进度，采用<strong>双向智能合并</strong>（分别背诵不同句子不会互相覆盖），数据仅存于你的私有账号中。
      </p>

      {!isConnected ? (
        <div className="sync-setup-wrap">
          <div className="sync-steps-box">
            <div className="sync-step-line">
              <strong>第 1 台设备：</strong>
              <a
                href={GITHUB_TOKEN_CREATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sync-link"
              >
                点此打开 GitHub 生成仅勾选 gist 权限的 Token
                <ExternalLink size={12} strokeWidth={1.6} />
              </a>
              ，粘贴到下方并点击连接（Gist ID 留空将自动查找或新建）。
            </div>
            <div className="sync-step-line">
              <strong>第 2 台设备（如手机）：</strong>
              在已连接的设备点「手机扫码 / 同步码配对」，扫码或粘贴同步码即可一键连入。
            </div>
          </div>

          <div className="sync-form-grid">
            <label className="sync-field">
              <span className="sync-field-label">GitHub Token（仅需 gist 权限）</span>
              <div className="sync-input-with-btn">
                <input
                  type={showToken ? 'text' : 'password'}
                  className="setting-input sync-full-input"
                  placeholder="粘贴 ghp_... 开头的 Token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="btn-ghost sync-eye-btn"
                  onClick={() => setShowToken((v) => !v)}
                  aria-label={showToken ? '隐藏 Token' : '显示 Token'}
                >
                  {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>

            <label className="sync-field">
              <span className="sync-field-label">Gist ID（可选，留空自动查找或创建）</span>
              <input
                type="text"
                className="setting-input sync-full-input"
                placeholder="首次使用留空即可"
                value={gistIdInput}
                onChange={(e) => setGistIdInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </label>
          </div>

          <div className="toolbar-group" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn-primary"
              disabled={!tokenInput.trim() || sync.status === 'syncing'}
              onClick={() => void handleConnect()}
            >
              <Cloud size={15} strokeWidth={1.6} />
              {sync.status === 'syncing' ? '正在连接…' : '连接并立即同步'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowPairingInput((v) => !v)}
            >
              <Link2 size={15} strokeWidth={1.6} />
              用同步码快速接入
            </button>
          </div>

          {showPairingInput && (
            <div className="sync-pair-import-box">
              <div className="sync-field-label" style={{ marginBottom: 6 }}>
                粘贴另一台设备生成的同步码（kaoyan-sync:...）或配对链接：
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="setting-input"
                  style={{ flex: 1, minWidth: 200 }}
                  placeholder="kaoyan-sync:..."
                  value={pairingInput}
                  onChange={(e) => setPairingInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!pairingInput.trim() || sync.status === 'syncing'}
                  onClick={() => void handleConnectWithPairing()}
                >
                  接入并同步
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="sync-connected-wrap">
          <div className="sync-meta-bar">
            <div>
              <span className="sync-meta-label">上次同步：</span>
              <strong className="tabular-nums">
                {formatSyncDateTime(sync.lastSyncedAt)}
              </strong>
            </div>
            {sync.gistId && (
              <div>
                <span className="sync-meta-label">私有 Gist：</span>
                <a
                  href={sync.gistUrl || `https://gist.github.com/${sync.gistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sync-link tabular-nums"
                >
                  {sync.gistId.slice(0, 10)}…
                  <ExternalLink size={12} strokeWidth={1.6} />
                </a>
              </div>
            )}
          </div>

          <div className="setting-row" style={{ marginTop: 8 }}>
            <div>
              <div className="setting-label">自动双向同步</div>
              <div className="setting-desc">
                打开网页、切回前台及每次背诵后自动与云端合并，离线背诵恢复联网后也会自动补传
              </div>
            </div>
            <button
              type="button"
              className={`btn-secondary ${sync.autoSync ? 'active' : ''}`}
              onClick={() => sync.setAutoSync(!sync.autoSync)}
            >
              {sync.autoSync ? '已开启' : '已关闭'}
            </button>
          </div>

          <div className="toolbar-group" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn-primary"
              disabled={sync.status === 'syncing'}
              onClick={() => void handleManualSync('merge')}
            >
              <RefreshCw
                size={15}
                strokeWidth={1.6}
                className={sync.status === 'syncing' ? 'spin-icon' : ''}
              />
              {sync.status === 'syncing' ? '同步中…' : '立即同步'}
            </button>

            <button
              type="button"
              className={`btn-secondary ${showPairPanel ? 'active' : ''}`}
              onClick={() => setShowPairPanel((v) => !v)}
            >
              <QrCode size={15} strokeWidth={1.6} />
              {showPairPanel ? '收起手机配对' : '手机扫码 / 同步码配对'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowAdvanced((v) => !v)}
            >
              高级选项
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{ color: 'var(--err)' }}
              onClick={() => {
                sync.disconnect();
                setShowPairPanel(false);
                setShowAdvanced(false);
                setFeedback({ type: 'ok', text: '已断开云同步（本地与云端数据均保留）。' });
              }}
            >
              <Unlink size={15} strokeWidth={1.6} />
              断开连接
            </button>
          </div>

          {showPairPanel && (
            <div className="sync-qr-panel">
              <div className="sync-qr-layout">
                {qrDataUrl && (
                  <div className="sync-qr-frame">
                    <img
                      src={qrDataUrl}
                      alt="手机扫码配对二维码"
                      width={180}
                      height={180}
                      style={{ display: 'block', borderRadius: 6 }}
                    />
                  </div>
                )}
                <div className="sync-qr-info">
                  <div className="setting-label">用手机相机 / 浏览器扫码即可自动配对</div>
                  <p className="setting-desc" style={{ marginTop: 4, marginBottom: 10 }}>
                    扫码后手机会自动连接同一个私有 Gist 并合并进度，配对完成后网址中的凭证会自动清除。也可以复制下方同步码发到手机粘贴接入。
                  </p>
                  <div className="toolbar-group">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => void handleCopy('code')}
                    >
                      {copiedKind === 'code' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedKind === 'code' ? '已复制同步码' : '复制同步码'}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => void handleCopy('url')}
                    >
                      {copiedKind === 'url' ? <Check size={14} /> : <Link2 size={14} />}
                      {copiedKind === 'url' ? '已复制配对链接' : '复制配对链接'}
                    </button>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={pairingCode}
                    className="setting-input sync-code-readonly"
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <div className="sync-security-tip">
                    安全提示：二维码和同步码包含你的 GitHub Token，仅限自己设备使用，切勿截图或转发给他人。
                  </div>
                </div>
              </div>
            </div>
          )}

          {showAdvanced && (
            <div className="sync-advanced-box">
              <div className="setting-desc" style={{ marginBottom: 8 }}>
                正常情况用「立即同步」自动合并即可；仅在需要强制以某一端为准时使用下方覆盖操作：
              </div>
              <div className="toolbar-group">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={sync.status === 'syncing'}
                  onClick={() => void handleManualSync('pull')}
                >
                  强制以云端覆盖本地
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={sync.status === 'syncing'}
                  onClick={() => void handleManualSync('push')}
                >
                  强制以本地覆盖云端
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {(feedback || sync.lastError || (isConnected && sync.lastMessage)) && (
        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontSize: 13,
            color:
              feedback?.type === 'err' || (!feedback && sync.lastError)
                ? 'var(--err)'
                : 'var(--ok)',
          }}
        >
          {feedback ? feedback.text : sync.lastError || sync.lastMessage}
        </p>
      )}
    </section>
  );
}
