/**
 * iOS Home Screen Web App / PWA 环境检测、持久化存储与在线检查更新工具
 */

export function isIosDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isClassicIos = /iPhone|iPad|iPod/i.test(ua);
  // iPadOS 13+ desktop Safari reports Macintosh + touch points
  const isIpadOs =
    navigator.platform === 'MacIntel' &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;
  return isClassicIos || isIpadOs;
}

export function isStandaloneApp(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { standalone?: boolean };
  if (nav.standalone === true) return true;
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches
  ) {
    return true;
  }
  return false;
}

/**
 * 静默申请持久化本地存储，降低 iOS / 浏览器清理 IndexedDB 缓存的概率
 */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.storage &&
      typeof navigator.storage.persist === 'function'
    ) {
      return await navigator.storage.persist();
    }
  } catch {
    // ignore unsupported environments
  }
  return false;
}

export type PwaUpdateResult = 'updating' | 'up-to-date' | 'reloading';

/**
 * 在主屏幕全屏 App 模式（无浏览器刷新按钮）下，手动检查并拉取最新 PWA 版本
 * 不会清空 IndexedDB 中的学习进度
 */
export async function checkAndApplyPwaUpdate(): Promise<PwaUpdateResult> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    window.location.reload();
    return 'reloading';
  }
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      window.location.reload();
      return 'reloading';
    }
    await reg.update();
    if (reg.waiting || reg.installing) {
      const worker = reg.waiting ?? reg.installing;
      if (worker) {
        await new Promise<void>((resolve) => {
          const timer = window.setTimeout(resolve, 2500);
          worker.addEventListener('statechange', () => {
            if (worker.state === 'activated' || worker.state === 'redundant') {
              window.clearTimeout(timer);
              resolve();
            }
          });
        });
      }
      window.location.reload();
      return 'updating';
    }
    return 'up-to-date';
  } catch {
    window.location.reload();
    return 'reloading';
  }
}
