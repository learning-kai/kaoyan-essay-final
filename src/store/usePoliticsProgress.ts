import { Rating, type Card, type Grade } from 'ts-fsrs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { formatLocalDateKey } from '../core/mistakes';
import {
  createInitialCard,
  reviewCard,
  type SchedulerOptions,
} from '../core/scheduler';
import { safeIdbStorage } from './storage';
import type { TimestampedFlag } from './useFormulaProgress';
import {
  deserializeCard,
  serializeCard,
  type SerializedCard,
} from './useProgress';

export interface PoliticsReviewRecord {
  cardId: string;
  rating: Grade;
  timestamp: string;
}

export interface PoliticsDrillStats {
  meetingCorrect: number;
  meetingTotal: number;
  trapCorrect: number;
  trapTotal: number;
  calcCorrect: number;
  calcTotal: number;
}

export interface PoliticsBackupData {
  cards: Record<string, SerializedCard>;
  reviews: PoliticsReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  mastered: Record<string, TimestampedFlag>;
  starred: Record<string, TimestampedFlag>;
  drillStats: PoliticsDrillStats;
  dailyNewLimit: number;
  updatedAt: string | null;
  resetAt: string | null;
}

export const EMPTY_DRILL_STATS: PoliticsDrillStats = {
  meetingCorrect: 0,
  meetingTotal: 0,
  trapCorrect: 0,
  trapTotal: 0,
  calcCorrect: 0,
  calcTotal: 0,
};

export interface PoliticsProgressState {
  schemaVersion: number;
  cards: Record<string, SerializedCard>;
  reviews: PoliticsReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  mastered: Record<string, TimestampedFlag>;
  starred: Record<string, TimestampedFlag>;
  drillStats: PoliticsDrillStats;
  dailyNewLimit: number;
  updatedAt: string | null;
  lastResetAt: string | null;

  reviewPoliticsCard: (
    cardId: string,
    rating: Grade,
    options?: SchedulerOptions,
    writeToFsrs?: boolean
  ) => void;
  setMastered: (cardId: string, value: boolean) => void;
  setBatchMastered: (cardIds: string[], value: boolean) => void;
  toggleStarred: (cardId: string) => void;
  recordDrillAttempt: (
    kind: 'meeting' | 'trap' | 'calc',
    correct: boolean
  ) => void;
  setDailyNewLimit: (limit: number) => void;
  getCard: (cardId: string) => Card | undefined;
  getTodayLearnedCount: (now?: Date) => number;
  resetPolitics: () => void;
}

export const usePoliticsProgress = create<PoliticsProgressState>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      cards: {},
      reviews: [],
      dailyLearnedCount: {},
      mastered: {},
      starred: {},
      drillStats: { ...EMPTY_DRILL_STATS },
      dailyNewLimit: 10,
      updatedAt: null,
      lastResetAt: null,

      reviewPoliticsCard: (cardId, rating, options, writeToFsrs = true) => {
        const now = new Date();
        const iso = now.toISOString();
        const existing = get().cards[cardId];
        const baseCard = existing ? deserializeCard(existing) : createInitialCard(now);
        const nextCard = writeToFsrs
          ? reviewCard(baseCard, rating, now, options)
          : baseCard;
        const dateKey = formatLocalDateKey(now);

        set((state) => {
          const wasMastered = Boolean(state.mastered[cardId]?.value);
          const nextMastered =
            wasMastered && (rating === Rating.Again || rating === Rating.Hard)
              ? {
                  ...state.mastered,
                  [cardId]: { value: false, updatedAt: iso },
                }
              : state.mastered;

          return {
            cards: writeToFsrs
              ? {
                  ...state.cards,
                  [cardId]: serializeCard(nextCard),
                }
              : state.cards,
            reviews: [
              ...state.reviews,
              {
                cardId,
                rating,
                timestamp: iso,
              },
            ],
            dailyLearnedCount: existing
              ? state.dailyLearnedCount
              : {
                  ...state.dailyLearnedCount,
                  [dateKey]: (state.dailyLearnedCount[dateKey] ?? 0) + 1,
                },
            mastered: nextMastered,
            updatedAt: iso,
          };
        });
      },

      setMastered: (cardId, value) => {
        const iso = new Date().toISOString();
        set((state) => ({
          mastered: {
            ...state.mastered,
            [cardId]: { value, updatedAt: iso },
          },
          updatedAt: iso,
        }));
      },

      setBatchMastered: (cardIds, value) => {
        if (cardIds.length === 0) return;
        const iso = new Date().toISOString();
        set((state) => {
          const next = { ...state.mastered };
          for (const id of cardIds) {
            next[id] = { value, updatedAt: iso };
          }
          return { mastered: next, updatedAt: iso };
        });
      },

      toggleStarred: (cardId) => {
        const iso = new Date().toISOString();
        set((state) => {
          const current = Boolean(state.starred[cardId]?.value);
          return {
            starred: {
              ...state.starred,
              [cardId]: { value: !current, updatedAt: iso },
            },
            updatedAt: iso,
          };
        });
      },

      recordDrillAttempt: (kind, correct) => {
        const iso = new Date().toISOString();
        set((state) => {
          const ds = { ...state.drillStats };
          if (kind === 'meeting') {
            ds.meetingTotal += 1;
            if (correct) ds.meetingCorrect += 1;
          } else if (kind === 'trap') {
            ds.trapTotal += 1;
            if (correct) ds.trapCorrect += 1;
          } else {
            ds.calcTotal += 1;
            if (correct) ds.calcCorrect += 1;
          }
          return { drillStats: ds, updatedAt: iso };
        });
      },

      setDailyNewLimit: (limit) => {
        const clamped = Math.max(3, Math.min(30, Math.round(limit)));
        const iso = new Date().toISOString();
        set({ dailyNewLimit: clamped, updatedAt: iso });
      },

      getCard: (cardId) => {
        const raw = get().cards[cardId];
        return raw ? deserializeCard(raw) : undefined;
      },

      getTodayLearnedCount: (now = new Date()) => {
        return get().dailyLearnedCount[formatLocalDateKey(now)] ?? 0;
      },

      resetPolitics: () => {
        const iso = new Date().toISOString();
        set({
          cards: {},
          reviews: [],
          dailyLearnedCount: {},
          mastered: {},
          starred: {},
          drillStats: { ...EMPTY_DRILL_STATS },
          updatedAt: iso,
          lastResetAt: iso,
        });
      },
    }),
    {
      name: 'kaoyan-politics-progress',
      version: 1,
      storage: createJSONStorage(() => safeIdbStorage),
      migrate: (persisted: unknown) => {
        const data = (persisted ?? {}) as Partial<PoliticsProgressState>;
        return {
          schemaVersion: 1,
          cards: data.cards ?? {},
          reviews: data.reviews ?? [],
          dailyLearnedCount: data.dailyLearnedCount ?? {},
          mastered: data.mastered ?? {},
          starred: data.starred ?? {},
          drillStats: { ...EMPTY_DRILL_STATS, ...(data.drillStats ?? {}) },
          dailyNewLimit: data.dailyNewLimit ?? 10,
          updatedAt: data.updatedAt ?? null,
          lastResetAt: data.lastResetAt ?? null,
        } as PoliticsProgressState;
      },
    }
  )
);
