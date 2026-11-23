import { useEffect, useRef } from 'react';
import { useFormulaProgress } from '../store/useFormulaProgress';
import { usePoliticsProgress } from '../store/usePoliticsProgress';
import { useProgress } from '../store/useProgress';
import { useSettings } from '../store/useSettings';
import { isApplyingRemoteSync, useSync } from '../store/useSync';

const DEBOUNCE_MS = 2500;
const VISIBILITY_COOLDOWN_MS = 15_000;

function waitForHydration(
  store: { persist: { hasHydrated: () => boolean; onFinishHydration: (cb: () => void) => () => void } }
): Promise<void> {
  if (store.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    const unsub = store.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}

export function SyncManager() {
  const timerRef = useRef<number | null>(null);
  const hydratedRef = useRef(false);
  const dirtyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const scheduleAutoSync = () => {
      if (!hydratedRef.current || isApplyingRemoteSync()) return;
      const sync = useSync.getState();
      if (!sync.token || !sync.autoSync) return;

      dirtyRef.current = true;
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        if (cancelled) return;
        const latest = useSync.getState();
        if (!latest.token || !latest.autoSync) return;
        if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
        dirtyRef.current = false;
        void latest.syncNow('merge', { silent: true });
      }, DEBOUNCE_MS);
    };

    const triggerPullOrFlush = (force = false) => {
      if (!hydratedRef.current) return;
      const sync = useSync.getState();
      if (!sync.token || !sync.autoSync) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

      const lastMs = sync.lastSyncedAt ? Date.parse(sync.lastSyncedAt) : 0;
      const elapsed = Date.now() - (Number.isFinite(lastMs) ? lastMs : 0);
      if (force || dirtyRef.current || elapsed >= VISIBILITY_COOLDOWN_MS) {
        clearTimer();
        dirtyRef.current = false;
        void sync.syncNow('merge', { silent: true });
      }
    };

    const unsubProgress = useProgress.subscribe((state, prev) => {
      if (
        state.cards !== prev.cards ||
        state.reviews !== prev.reviews ||
        state.dailyLearnedCount !== prev.dailyLearnedCount ||
        state.examRecords !== prev.examRecords ||
        state.idRecords !== prev.idRecords ||
        state.lastResetAt !== prev.lastResetAt
      ) {
        scheduleAutoSync();
      }
    });

    const unsubSettings = useSettings.subscribe((state, prev) => {
      if (
        state.dailyNewLimit !== prev.dailyNewLimit ||
        state.requestRetention !== prev.requestRetention ||
        state.examDate !== prev.examDate ||
        state.strictPunctuation !== prev.strictPunctuation ||
        state.practiceMode !== prev.practiceMode ||
        state.inputMode !== prev.inputMode ||
        state.theme !== prev.theme ||
        state.unlockAllLessons !== prev.unlockAllLessons ||
        state.bodyFontSize !== prev.bodyFontSize
      ) {
        scheduleAutoSync();
      }
    });

    const unsubFormula = useFormulaProgress.subscribe((state, prev) => {
      if (
        state.cards !== prev.cards ||
        state.reviews !== prev.reviews ||
        state.dailyLearnedCount !== prev.dailyLearnedCount ||
        state.mastered !== prev.mastered ||
        state.starred !== prev.starred ||
        state.dailyNewLimit !== prev.dailyNewLimit ||
        state.lastResetAt !== prev.lastResetAt
      ) {
        scheduleAutoSync();
      }
    });

    const unsubPolitics = usePoliticsProgress.subscribe((state, prev) => {
      if (
        state.cards !== prev.cards ||
        state.reviews !== prev.reviews ||
        state.dailyLearnedCount !== prev.dailyLearnedCount ||
        state.mastered !== prev.mastered ||
        state.starred !== prev.starred ||
        state.drillStats !== prev.drillStats ||
        state.dailyNewLimit !== prev.dailyNewLimit ||
        state.lastResetAt !== prev.lastResetAt
      ) {
        scheduleAutoSync();
      }
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        triggerPullOrFlush(false);
      }
    };

    const onOnline = () => {
      triggerPullOrFlush(true);
    };

    const onPageHide = () => {
      if (!hydratedRef.current || !dirtyRef.current) return;
      const sync = useSync.getState();
      if (!sync.token || !sync.autoSync) return;
      clearTimer();
      dirtyRef.current = false;
      void sync.syncNow('merge', { silent: true, keepalive: true });
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('online', onOnline);
    window.addEventListener('pagehide', onPageHide);

    void Promise.all([
      waitForHydration(useProgress),
      waitForHydration(useSettings),
      waitForHydration(useFormulaProgress),
      waitForHydration(usePoliticsProgress),
      waitForHydration(useSync),
    ]).then(() => {
      if (cancelled) return;
      hydratedRef.current = true;
      const sync = useSync.getState();
      if (
        sync.token &&
        sync.autoSync &&
        (typeof navigator === 'undefined' || navigator.onLine !== false)
      ) {
        void sync.syncNow('merge', { silent: true });
      }
    });

    return () => {
      cancelled = true;
      clearTimer();
      unsubProgress();
      unsubSettings();
      unsubFormula();
      unsubPolitics();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  return null;
}
