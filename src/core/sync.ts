import type { ReviewRecord } from './mistakes';
import {
  parseBackup,
  type BackupPayload,
} from './backup';
import type {
  ExamRecord,
  IdentificationRecord,
  SerializedCard,
} from '../store/useProgress';

export const SYNC_FILENAME = 'kaoyan-essay-sync.json';
export const SYNC_GIST_DESCRIPTION = '考研英语一小作文背诵数据同步（私有，请勿删除）';
export const GITHUB_TOKEN_CREATE_URL =
  'https://github.com/settings/tokens/new?scopes=gist&description=kaoyan-essay-sync';

const GITHUB_API = 'https://api.github.com';
const PAIRING_PREFIX = 'kaoyan-sync:';

export interface SyncPairingConfig {
  token: string;
  gistId: string;
}

function parseIsoMs(iso?: string | null): number {
  if (!iso) return 0;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? ms : 0;
}

function hasAnyProgress(p: BackupPayload['progress']): boolean {
  return (
    Object.keys(p.cards).length > 0 ||
    p.reviews.length > 0 ||
    p.examRecords.length > 0 ||
    p.idRecords.length > 0 ||
    Object.keys(p.dailyLearnedCount).length > 0
  );
}

function pickNewerCard(a: SerializedCard, b: SerializedCard): SerializedCard {
  const aLast = parseIsoMs(a.last_review);
  const bLast = parseIsoMs(b.last_review);
  if (aLast !== bLast) return aLast > bLast ? a : b;
  if (a.reps !== b.reps) return a.reps > b.reps ? a : b;
  if (a.lapses !== b.lapses) return a.lapses > b.lapses ? a : b;
  const aDue = parseIsoMs(a.due);
  const bDue = parseIsoMs(b.due);
  return aDue >= bDue ? a : b;
}

function mergeReviews(a: ReviewRecord[], b: ReviewRecord[]): ReviewRecord[] {
  const map = new Map<string, ReviewRecord>();
  for (const item of [...a, ...b]) {
    const key = `${item.timestamp}|${item.sentenceId}|${item.rating}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, item);
    } else if (!existing.wordMistakes && item.wordMistakes) {
      map.set(key, item);
    }
  }
  return Array.from(map.values()).sort((x, y) =>
    x.timestamp.localeCompare(y.timestamp)
  );
}

function mergeDailyLearned(
  a: Record<string, number>,
  b: Record<string, number>
): Record<string, number> {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)])).sort();
  const out: Record<string, number> = {};
  for (const k of keys) {
    const val = Math.max(a[k] ?? 0, b[k] ?? 0);
    if (val > 0) out[k] = val;
  }
  return out;
}

function mergeExamRecords(a: ExamRecord[], b: ExamRecord[]): ExamRecord[] {
  const map = new Map<string, ExamRecord>();
  for (const item of [...a, ...b]) {
    const key = `${item.id}|${item.timestamp}`;
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values()).sort((x, y) =>
    x.timestamp.localeCompare(y.timestamp)
  );
}

function mergeIdRecords(
  a: IdentificationRecord[],
  b: IdentificationRecord[]
): IdentificationRecord[] {
  const map = new Map<string, IdentificationRecord>();
  for (const item of [...a, ...b]) {
    const key = `${item.timestamp}|${item.promptId}|${item.chosen}`;
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values()).sort((x, y) =>
    x.timestamp.localeCompare(y.timestamp)
  );
}

/**
 * 双向智能合并本地与云端备份数据：
 * - 支持显式重置传播（较新的 resetAt 不会被旧设备数据复活）
 * - FSRS 卡片按 last_review / reps 取较新状态
 * - 复习、实战、识题记录按时间戳去重并集
 * - 每日新学计数按日期取最大值
 * - 设置按 settingsUpdatedAt 取较新一方
 */
export function mergeSyncPayloads(
  local: BackupPayload,
  remote: BackupPayload,
  now = new Date()
): BackupPayload {
  const localResetMs = parseIsoMs(local.resetAt);
  const remoteResetMs = parseIsoMs(remote.resetAt);
  const localUpdatedMs = parseIsoMs(local.updatedAt ?? (hasAnyProgress(local.progress) ? local.exportedAt : null));
  const remoteUpdatedMs = parseIsoMs(remote.updatedAt ?? (hasAnyProgress(remote.progress) ? remote.exportedAt : null));

  let mergedProgress: BackupPayload['progress'];
  let mergedResetAt: string | null = null;
  let mergedUpdatedAt: string | null = null;

  if (localResetMs > 0 && localResetMs > remoteUpdatedMs && localResetMs >= remoteResetMs) {
    mergedProgress = { ...local.progress };
    mergedResetAt = local.resetAt ?? null;
    mergedUpdatedAt = local.updatedAt ?? local.resetAt ?? null;
  } else if (remoteResetMs > 0 && remoteResetMs > localUpdatedMs && remoteResetMs >= localResetMs) {
    mergedProgress = { ...remote.progress };
    mergedResetAt = remote.resetAt ?? null;
    mergedUpdatedAt = remote.updatedAt ?? remote.resetAt ?? null;
  } else {
    const allCardIds = Array.from(
      new Set([
        ...Object.keys(local.progress.cards),
        ...Object.keys(remote.progress.cards),
      ])
    ).sort();
    const mergedCards: Record<string, SerializedCard> = {};
    for (const id of allCardIds) {
      const lc = local.progress.cards[id];
      const rc = remote.progress.cards[id];
      if (lc && rc) {
        mergedCards[id] = pickNewerCard(lc, rc);
      } else if (lc) {
        mergedCards[id] = lc;
      } else if (rc) {
        mergedCards[id] = rc;
      }
    }

    mergedProgress = {
      cards: mergedCards,
      reviews: mergeReviews(local.progress.reviews, remote.progress.reviews),
      dailyLearnedCount: mergeDailyLearned(
        local.progress.dailyLearnedCount,
        remote.progress.dailyLearnedCount
      ),
      examRecords: mergeExamRecords(
        local.progress.examRecords,
        remote.progress.examRecords
      ),
      idRecords: mergeIdRecords(
        local.progress.idRecords,
        remote.progress.idRecords
      ),
    };

    const maxResetMs = Math.max(localResetMs, remoteResetMs);
    mergedResetAt =
      maxResetMs === 0
        ? null
        : localResetMs >= remoteResetMs
          ? (local.resetAt ?? null)
          : (remote.resetAt ?? null);

    const maxUpdatedMs = Math.max(localUpdatedMs, remoteUpdatedMs);
    mergedUpdatedAt =
      maxUpdatedMs === 0
        ? null
        : localUpdatedMs >= remoteUpdatedMs
          ? (local.updatedAt ?? local.exportedAt)
          : (remote.updatedAt ?? remote.exportedAt);
  }

  const localSettingsMs = parseIsoMs(local.settingsUpdatedAt);
  const remoteSettingsMs = parseIsoMs(remote.settingsUpdatedAt);
  let mergedSettings = local.settings;
  let mergedSettingsUpdatedAt: string | null = local.settingsUpdatedAt ?? null;

  if (remoteSettingsMs > localSettingsMs) {
    mergedSettings = remote.settings;
    mergedSettingsUpdatedAt = remote.settingsUpdatedAt ?? null;
  } else if (localSettingsMs > remoteSettingsMs) {
    mergedSettings = local.settings;
    mergedSettingsUpdatedAt = local.settingsUpdatedAt ?? null;
  } else if (localSettingsMs === 0 && remoteSettingsMs === 0) {
    // 均无设置时间戳时：若本地是空白新设备而云端有数据，采用云端设置
    if (!hasAnyProgress(local.progress) && hasAnyProgress(remote.progress)) {
      mergedSettings = remote.settings;
    } else if (remoteUpdatedMs > localUpdatedMs) {
      mergedSettings = remote.settings;
    }
  }

  return {
    app: 'kaoyan-essay',
    schemaVersion: 3,
    exportedAt: now.toISOString(),
    updatedAt: mergedUpdatedAt,
    settingsUpdatedAt: mergedSettingsUpdatedAt,
    resetAt: mergedResetAt,
    progress: mergedProgress,
    settings: mergedSettings,
  };
}

function canonicalSnapshot(p: BackupPayload): string {
  const sortedCards: Record<string, SerializedCard> = {};
  for (const k of Object.keys(p.progress.cards).sort()) {
    sortedCards[k] = p.progress.cards[k];
  }
  const sortedDaily: Record<string, number> = {};
  for (const k of Object.keys(p.progress.dailyLearnedCount).sort()) {
    sortedDaily[k] = p.progress.dailyLearnedCount[k];
  }
  return JSON.stringify({
    resetAt: p.resetAt ?? null,
    settingsUpdatedAt: p.settingsUpdatedAt ?? null,
    cards: sortedCards,
    reviews: p.progress.reviews,
    dailyLearnedCount: sortedDaily,
    examRecords: p.progress.examRecords,
    idRecords: p.progress.idRecords,
    settings: p.settings,
  });
}

export function areSyncPayloadsEqual(a: BackupPayload, b: BackupPayload): boolean {
  return canonicalSnapshot(a) === canonicalSnapshot(b);
}

// ========== Pairing Code / URL helpers ==========

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeSyncPairing(config: SyncPairingConfig): string {
  const raw = JSON.stringify({
    v: 1,
    t: config.token.trim(),
    g: config.gistId.trim(),
  });
  return `${PAIRING_PREFIX}${toBase64Url(raw)}`;
}

export function buildSyncPairingUrl(
  config: SyncPairingConfig,
  pageBaseUrl: string
): string {
  const encoded = encodeSyncPairing(config).slice(PAIRING_PREFIX.length);
  const cleanBase = pageBaseUrl.split('#')[0].split('?')[0];
  return `${cleanBase}#/settings?sync=${encodeURIComponent(encoded)}`;
}

export function decodeSyncPairing(
  input: string
): { ok: true; config: SyncPairingConfig } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: '请输入同步码或配对链接。' };
  }

  let encoded = trimmed;
  // Support pasting full pairing URL like https://.../#/settings?sync=xxxx
  const urlMatch = trimmed.match(/[?&]sync=([A-Za-z0-9_-]+)/);
  if (urlMatch) {
    encoded = urlMatch[1];
  } else if (trimmed.startsWith(PAIRING_PREFIX)) {
    encoded = trimmed.slice(PAIRING_PREFIX.length);
  }

  try {
    const json = fromBase64Url(encoded);
    const parsed = JSON.parse(json) as { v?: number; t?: unknown; g?: unknown };
    if (
      !parsed ||
      typeof parsed.t !== 'string' ||
      !parsed.t.trim()
    ) {
      return { ok: false, error: '同步码内容不完整，缺少 GitHub Token。' };
    }
    return {
      ok: true,
      config: {
        token: parsed.t.trim(),
        gistId: typeof parsed.g === 'string' ? parsed.g.trim() : '',
      },
    };
  } catch {
    return { ok: false, error: '无法解析同步码，请确认完整复制了整串同步码或链接。' };
  }
}

// ========== GitHub Gist API client ==========

function buildHeaders(token: string, hasBody = false): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token.trim()}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

function mapGitHubError(status: number, fallback: string): Error {
  if (status === 401) {
    return new Error('Token 无效或已过期，请重新生成勾选 gist 权限的 Token。');
  }
  if (status === 403) {
    return new Error('权限不足或请求过于频繁，请确认 Token 已勾选 gist 权限。');
  }
  if (status === 404) {
    return new Error('未找到对应的私有 Gist（可能已被删除），请清空 Gist ID 后重新连接。');
  }
  return new Error(`${fallback}（HTTP ${status}）`);
}

async function safeFetch(
  url: string,
  init: RequestInit
): Promise<Response> {
  try {
    return await fetch(url, { ...init, cache: 'no-store' });
  } catch {
    throw new Error('无法连接 GitHub 接口，请检查网络连接后重试。');
  }
}

export async function verifyGitHubToken(token: string): Promise<{ login: string }> {
  const clean = token.trim();
  if (!clean) {
    throw new Error('请先输入 GitHub Token。');
  }
  const res = await safeFetch(`${GITHUB_API}/user`, {
    method: 'GET',
    headers: buildHeaders(clean),
  });
  if (!res.ok) {
    throw mapGitHubError(res.status, '验证 GitHub Token 失败');
  }
  const scopesHeader = res.headers.get('x-oauth-scopes');
  if (scopesHeader !== null) {
    const scopes = scopesHeader
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!scopes.includes('gist')) {
      throw new Error('该 Token 未勾选 gist 权限，请重新生成并勾选 gist。');
    }
  }
  const data = (await res.json()) as { login?: string };
  return { login: data.login ?? 'GitHub 用户' };
}

interface GistListItem {
  id: string;
  files?: Record<string, { filename?: string }>;
}

export async function findExistingSyncGist(token: string): Promise<string | null> {
  const res = await safeFetch(`${GITHUB_API}/gists?per_page=100`, {
    method: 'GET',
    headers: buildHeaders(token),
  });
  if (!res.ok) {
    throw mapGitHubError(res.status, '查询已有同步 Gist 失败');
  }
  const list = (await res.json()) as GistListItem[];
  const found = list.find((g) => Boolean(g.files && g.files[SYNC_FILENAME]));
  return found ? found.id : null;
}

interface GistFileResponse {
  content?: string;
  truncated?: boolean;
  raw_url?: string;
}

interface GistDetailResponse {
  id: string;
  html_url?: string;
  updated_at?: string;
  files?: Record<string, GistFileResponse>;
}

export async function fetchSyncGist(
  token: string,
  gistId: string
): Promise<{
  payload: BackupPayload | null;
  htmlUrl: string;
  gistUpdatedAt: string | null;
}> {
  const res = await safeFetch(
    `${GITHUB_API}/gists/${encodeURIComponent(gistId.trim())}`,
    {
      method: 'GET',
      headers: buildHeaders(token),
    }
  );
  if (!res.ok) {
    throw mapGitHubError(res.status, '拉取云端同步数据失败');
  }
  const detail = (await res.json()) as GistDetailResponse;
  const file = detail.files?.[SYNC_FILENAME];
  const htmlUrl = detail.html_url ?? `https://gist.github.com/${gistId.trim()}`;

  if (!file) {
    return {
      payload: null,
      htmlUrl,
      gistUpdatedAt: detail.updated_at ?? null,
    };
  }

  let content = file.content ?? '';
  if (file.truncated && file.raw_url) {
    const rawRes = await safeFetch(file.raw_url, { method: 'GET' });
    if (rawRes.ok) {
      content = await rawRes.text();
    }
  }

  if (!content.trim()) {
    return {
      payload: null,
      htmlUrl,
      gistUpdatedAt: detail.updated_at ?? null,
    };
  }

  const parsed = parseBackup(content);
  if (!parsed.ok) {
    throw new Error(`云端同步数据格式异常：${parsed.error}`);
  }
  return {
    payload: parsed.data,
    htmlUrl,
    gistUpdatedAt: detail.updated_at ?? null,
  };
}

export async function createSyncGist(
  token: string,
  payload: BackupPayload
): Promise<{ gistId: string; htmlUrl: string }> {
  const body = JSON.stringify({
    description: SYNC_GIST_DESCRIPTION,
    public: false,
    files: {
      [SYNC_FILENAME]: {
        content: JSON.stringify(payload, null, 2),
      },
    },
  });

  const res = await safeFetch(`${GITHUB_API}/gists`, {
    method: 'POST',
    headers: buildHeaders(token, true),
    body,
  });
  if (!res.ok) {
    throw mapGitHubError(res.status, '创建私有同步 Gist 失败');
  }
  const data = (await res.json()) as GistDetailResponse;
  return {
    gistId: data.id,
    htmlUrl: data.html_url ?? `https://gist.github.com/${data.id}`,
  };
}

export async function updateSyncGist(
  token: string,
  gistId: string,
  payload: BackupPayload,
  options?: { keepalive?: boolean }
): Promise<{ htmlUrl: string }> {
  const body = JSON.stringify({
    description: SYNC_GIST_DESCRIPTION,
    files: {
      [SYNC_FILENAME]: {
        content: JSON.stringify(payload, null, 2),
      },
    },
  });

  // keepalive in browsers has a 64KB limit; only enable when payload is safely under it
  const useKeepalive = Boolean(options?.keepalive && body.length < 55_000);

  const res = await safeFetch(
    `${GITHUB_API}/gists/${encodeURIComponent(gistId.trim())}`,
    {
      method: 'PATCH',
      headers: buildHeaders(token, true),
      body,
      keepalive: useKeepalive,
    }
  );
  if (!res.ok) {
    throw mapGitHubError(res.status, '上传数据到云端 Gist 失败');
  }
  const data = (await res.json()) as GistDetailResponse;
  return {
    htmlUrl: data.html_url ?? `https://gist.github.com/${gistId.trim()}`,
  };
}
