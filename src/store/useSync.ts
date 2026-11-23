import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { buildBackupPayload, type BackupPayload } from '../core/backup';
import {
  areSyncPayloadsEqual,
  createSyncGist,
  fetchSyncGist,
  findExistingSyncGist,
  mergeSyncPayloads,
  updateSyncGist,
  verifyGitHubToken,
} from '../core/sync';
import { safeIdbStorage } from './storage';
import { useProgress } from './useProgress';
import { useSettings } from './useSettings';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';
export type SyncMode = 'merge' | 'push' | 'pull';

export interface SyncActionResult {
  ok: boolean;
  message?: string;
  error?: string;
}

export interface SyncState {
  token: string;
  gistId: string;
  gistUrl: string;
  githubLogin: string;
  autoSync: boolean;
  lastSyncedAt: string | null;

  // Ephemeral UI state (not persisted)
  status: SyncStatus;
  lastMessage: string | null;
  lastError: string | null;

  setAutoSync: (enabled: boolean) => void;
  connect: (token: string, gistId?: string) => Promise<SyncActionResult>;
  syncNow: (
    mode?: SyncMode,
    options?: { silent?: boolean; keepalive?: boolean }
  ) => Promise<SyncActionResult>;
  disconnect: () => void;
}

let applyingRemoteDepth = 0;
let inFlightSync: Promise<SyncActionResult> | null = null;
let pendingFollowUpSync = false;

export function isApplyingRemoteSync(): boolean {
  return applyingRemoteDepth > 0;
}

export function readLocalSyncPayload(now = new Date()): BackupPayload {
  const p = useProgress.getState();
  const s = useSettings.getState();
  return buildBackupPayload(
    {
      cards: p.cards,
      reviews: p.reviews,
      dailyLearnedCount: p.dailyLearnedCount,
      examRecords: p.examRecords,
      idRecords: p.idRecords,
    },
    {
      dailyNewLimit: s.dailyNewLimit,
      requestRetention: s.requestRetention,
      examDate: s.examDate,
      strictPunctuation: s.strictPunctuation,
      practiceMode: s.practiceMode,
      inputMode: s.inputMode,
      theme: s.theme,
      unlockAllLessons: s.unlockAllLessons,
      bodyFontSize: s.bodyFontSize,
    },
    now,
    {
      updatedAt: p.updatedAt,
      settingsUpdatedAt: s.updatedAt,
      resetAt: p.lastResetAt,
    }
  );
}

function applyPayloadToLocalStores(payload: BackupPayload): void {
  applyingRemoteDepth += 1;
  try {
    useProgress.setState({
      cards: payload.progress.cards,
      reviews: payload.progress.reviews,
      dailyLearnedCount: payload.progress.dailyLearnedCount,
      examRecords: payload.progress.examRecords,
      idRecords: payload.progress.idRecords,
      updatedAt: payload.updatedAt ?? payload.exportedAt,
      lastResetAt: payload.resetAt ?? null,
    });
    useSettings.setState({
      dailyNewLimit: payload.settings.dailyNewLimit,
      requestRetention: payload.settings.requestRetention,
      examDate: payload.settings.examDate,
      strictPunctuation: payload.settings.strictPunctuation,
      practiceMode: payload.settings.practiceMode,
      inputMode: payload.settings.inputMode,
      theme: payload.settings.theme,
      unlockAllLessons: payload.settings.unlockAllLessons,
      bodyFontSize: payload.settings.bodyFontSize,
      updatedAt: payload.settingsUpdatedAt ?? null,
    });
  } finally {
    applyingRemoteDepth -= 1;
  }
}

export const useSync = create<SyncState>()(
  persist(
    (set, get) => ({
      token: '',
      gistId: '',
      gistUrl: '',
      githubLogin: '',
      autoSync: true,
      lastSyncedAt: null,
      status: 'idle',
      lastMessage: null,
      lastError: null,

      setAutoSync: (enabled) => set({ autoSync: enabled }),

      connect: async (rawToken, rawGistId = '') => {
        const token = rawToken.trim();
        const manualGistId = rawGistId.trim();
        set({ status: 'syncing', lastError: null, lastMessage: null });

        try {
          const { login } = await verifyGitHubToken(token);
          let gistId = manualGistId;
          let gistUrl = '';

          if (!gistId) {
            const existing = await findExistingSyncGist(token);
            if (existing) {
              gistId = existing;
            }
          }

          if (!gistId) {
            const localPayload = readLocalSyncPayload();
            const created = await createSyncGist(token, localPayload);
            gistId = created.gistId;
            gistUrl = created.htmlUrl;
            const nowIso = new Date().toISOString();
            const cardCount = Object.keys(localPayload.progress.cards).length;
            const msg = `已连接 @${login}，自动创建私有 Gist 并上传本地进度（${cardCount} 张卡片）。`;
            set({
              token,
              gistId,
              gistUrl,
              githubLogin: login,
              autoSync: true,
              lastSyncedAt: nowIso,
              status: 'synced',
              lastMessage: msg,
              lastError: null,
            });
            return { ok: true, message: msg };
          }

          set({
            token,
            gistId,
            gistUrl: gistUrl || `https://gist.github.com/${gistId}`,
            githubLogin: login,
            autoSync: true,
          });

          const res = await get().syncNow('merge');
          if (res.ok) {
            const msg = `已连接 @${login}：${res.message ?? '同步完成'}`;
            set({ lastMessage: msg });
            return { ok: true, message: msg };
          }
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : '连接 GitHub 失败，请重试。';
          set({ status: 'error', lastError: msg });
          return { ok: false, error: msg };
        }
      },

      syncNow: async (mode = 'merge', options) => {
        const { token } = get();
        if (!token.trim()) {
          return { ok: false, error: '尚未连接 GitHub 云同步。' };
        }

        if (inFlightSync) {
          if (mode === 'merge') {
            pendingFollowUpSync = true;
          }
          return inFlightSync;
        }

        const run = async (): Promise<SyncActionResult> => {
          set({ status: 'syncing', lastError: null });
          try {
            const state = get();
            let gistId = state.gistId.trim();
            const localPayload = readLocalSyncPayload();

            if (!gistId) {
              const found = await findExistingSyncGist(state.token);
              if (found) {
                gistId = found;
                set({ gistId });
              } else {
                const created = await createSyncGist(state.token, localPayload);
                const nowIso = new Date().toISOString();
                const msg = `已创建私有 Gist 并上传本地进度（${Object.keys(localPayload.progress.cards).length} 张卡片）。`;
                set({
                  gistId: created.gistId,
                  gistUrl: created.htmlUrl,
                  lastSyncedAt: nowIso,
                  status: 'synced',
                  lastMessage: msg,
                  lastError: null,
                });
                return { ok: true, message: msg };
              }
            }

            if (mode === 'push') {
              const updated = await updateSyncGist(
                state.token,
                gistId,
                localPayload,
                options
              );
              const nowIso = new Date().toISOString();
              const msg = `已用本地数据覆盖云端（共 ${Object.keys(localPayload.progress.cards).length} 张卡片）。`;
              set({
                gistUrl: updated.htmlUrl,
                lastSyncedAt: nowIso,
                status: 'synced',
                lastMessage: msg,
                lastError: null,
              });
              return { ok: true, message: msg };
            }

            const remote = await fetchSyncGist(state.token, gistId);

            if (mode === 'pull') {
              if (!remote.payload) {
                const msg = '云端 Gist 暂无数据，未修改本地进度。';
                set({
                  gistUrl: remote.htmlUrl,
                  status: 'synced',
                  lastMessage: msg,
                  lastError: null,
                });
                return { ok: true, message: msg };
              }
              applyPayloadToLocalStores(remote.payload);
              const nowIso = new Date().toISOString();
              const msg = `已用云端数据覆盖本地（共 ${Object.keys(remote.payload.progress.cards).length} 张卡片）。`;
              set({
                gistUrl: remote.htmlUrl,
                lastSyncedAt: nowIso,
                status: 'synced',
                lastMessage: msg,
                lastError: null,
              });
              return { ok: true, message: msg };
            }

            // Default: bidirectional smart merge
            if (!remote.payload) {
              const updated = await updateSyncGist(
                state.token,
                gistId,
                localPayload,
                options
              );
              const nowIso = new Date().toISOString();
              const msg = `已上传本地数据到云端（共 ${Object.keys(localPayload.progress.cards).length} 张卡片）。`;
              set({
                gistUrl: updated.htmlUrl,
                lastSyncedAt: nowIso,
                status: 'synced',
                lastMessage: msg,
                lastError: null,
              });
              return { ok: true, message: msg };
            }

            const merged = mergeSyncPayloads(localPayload, remote.payload);
            const localChanged = !areSyncPayloadsEqual(localPayload, merged);
            const remoteChanged = !areSyncPayloadsEqual(remote.payload, merged);

            if (localChanged) {
              applyPayloadToLocalStores(merged);
            }

            let htmlUrl = remote.htmlUrl;
            if (remoteChanged) {
              const updated = await updateSyncGist(
                state.token,
                gistId,
                merged,
                options
              );
              htmlUrl = updated.htmlUrl;
            }

            const nowIso = new Date().toISOString();
            const cardCount = Object.keys(merged.progress.cards).length;
            const msg =
              localChanged && remoteChanged
                ? `已双向合并本地与云端进度（共 ${cardCount} 张卡片）。`
                : localChanged
                  ? `已从云端同步最新进度（共 ${cardCount} 张卡片）。`
                  : remoteChanged
                    ? `已将本地进度同步至云端（共 ${cardCount} 张卡片）。`
                    : `数据已是最新（共 ${cardCount} 张卡片）。`;

            set({
              gistUrl: htmlUrl,
              lastSyncedAt: nowIso,
              status: 'synced',
              lastMessage: msg,
              lastError: null,
            });
            return { ok: true, message: msg };
          } catch (err) {
            const msg = err instanceof Error ? err.message : '云同步失败，请稍后重试。';
            set({ status: 'error', lastError: msg });
            return { ok: false, error: msg };
          } finally {
            inFlightSync = null;
            if (pendingFollowUpSync) {
              pendingFollowUpSync = false;
              const current = get();
              if (current.token && current.autoSync) {
                void current.syncNow('merge', { silent: true });
              }
            }
          }
        };

        inFlightSync = run();
        return inFlightSync;
      },

      disconnect: () => {
        pendingFollowUpSync = false;
        set({
          token: '',
          gistId: '',
          gistUrl: '',
          githubLogin: '',
          lastSyncedAt: null,
          status: 'idle',
          lastMessage: null,
          lastError: null,
        });
      },
    }),
    {
      name: 'kaoyan-essay-sync-config',
      version: 1,
      storage: createJSONStorage(() => safeIdbStorage),
      partialize: (state) => ({
        token: state.token,
        gistId: state.gistId,
        gistUrl: state.gistUrl,
        githubLogin: state.githubLogin,
        autoSync: state.autoSync,
        lastSyncedAt: state.lastSyncedAt,
      }),
    }
  )
);
