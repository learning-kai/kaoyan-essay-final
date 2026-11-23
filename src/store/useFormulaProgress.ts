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
import {
  deserializeCard,
  serializeCard,
  type SerializedCard,
} from './useProgress';

export interface TimestampedFlag {
  value: boolean;
  updatedAt: string;
}

export interface FormulaReviewRecord {
  formulaId: string;
  rating: Grade;
  timestamp: string;
}

export interface FormulaBackupData {
  cards: Record<string, SerializedCard>;
  reviews: FormulaReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  mastered: Record<string, TimestampedFlag>;
  starred: Record<string, TimestampedFlag>;
  dailyNewLimit: number;
  updatedAt: string | null;
  resetAt: string | null;
}

export interface FormulaProgressState {
  schemaVersion: number;
  cards: Record<string, SerializedCard>;
  reviews: FormulaReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  mastered: Record<string, TimestampedFlag>;
  starred: Record<string, TimestampedFlag>;
  dailyNewLimit: number;
  updatedAt: string | null;
  lastResetAt: string | null;

  reviewFormula: (
    formulaId: string,
    rating: Grade,
    options?: SchedulerOptions,
    writeToFsrs?: boolean
  ) => void;
  setMastered: (formulaId: string, value: boolean) => void;
  setBatchMastered: (formulaIds: string[], value: boolean) => void;
  toggleStarred: (formulaId: string) => void;
  setStarred: (formulaId: string, value: boolean) => void;
  setDailyNewLimit: (limit: number) => void;
  getCard: (formulaId: string) => Card | undefined;
  getTodayLearnedCount: (now?: Date) => number;
  resetFormulas: () => void;
}

export const useFormulaProgress = create<FormulaProgressState>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      cards: {},
      reviews: [],
      dailyLearnedCount: {},
      mastered: {},
      starred: {},
      dailyNewLimit: 15,
      updatedAt: null,
      lastResetAt: null,

      reviewFormula: (formulaId, rating, options, writeToFsrs = true) => {
        const now = new Date();
        const iso = now.toISOString();
        const existing = get().cards[formulaId];
        const baseCard = existing ? deserializeCard(existing) : createInitialCard(now);
        const nextCard = writeToFsrs
          ? reviewCard(baseCard, rating, now, options)
          : baseCard;
        const dateKey = formatLocalDateKey(now);

        set((state) => {
          const wasMastered = Boolean(state.mastered[formulaId]?.value);
          // 若在抽查已熟记题时选择了「重来」或「困难」，自动取消熟记使其回到 FSRS 复习队列
          const nextMastered =
            wasMastered && (rating === Rating.Again || rating === Rating.Hard)
              ? {
                  ...state.mastered,
                  [formulaId]: { value: false, updatedAt: iso },
                }
              : state.mastered;

          return {
            cards: writeToFsrs
              ? {
                  ...state.cards,
                  [formulaId]: serializeCard(nextCard),
                }
              : state.cards,
            reviews: [
              ...state.reviews,
              {
                formulaId,
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

      setMastered: (formulaId, value) => {
        const iso = new Date().toISOString();
        set((state) => ({
          mastered: {
            ...state.mastered,
            [formulaId]: { value, updatedAt: iso },
          },
          updatedAt: iso,
        }));
      },

      setBatchMastered: (formulaIds, value) => {
        if (formulaIds.length === 0) return;
        const iso = new Date().toISOString();
        set((state) => {
          const next = { ...state.mastered };
          for (const id of formulaIds) {
            next[id] = { value, updatedAt: iso };
          }
          return {
            mastered: next,
            updatedAt: iso,
          };
        });
      },

      toggleStarred: (formulaId) => {
        const iso = new Date().toISOString();
        set((state) => {
          const current = Boolean(state.starred[formulaId]?.value);
          return {
            starred: {
              ...state.starred,
              [formulaId]: { value: !current, updatedAt: iso },
            },
            updatedAt: iso,
          };
        });
      },

      setStarred: (formulaId, value) => {
        const iso = new Date().toISOString();
        set((state) => ({
          starred: {
            ...state.starred,
            [formulaId]: { value, updatedAt: iso },
          },
          updatedAt: iso,
        }));
      },

      setDailyNewLimit: (limit) => {
        const clamped = Math.max(5, Math.min(40, Math.round(limit)));
        const iso = new Date().toISOString();
        set({ dailyNewLimit: clamped, updatedAt: iso });
      },

      getCard: (formulaId) => {
        const raw = get().cards[formulaId];
        return raw ? deserializeCard(raw) : undefined;
      },

      getTodayLearnedCount: (now = new Date()) => {
        return get().dailyLearnedCount[formatLocalDateKey(now)] ?? 0;
      },

      resetFormulas: () => {
        const iso = new Date().toISOString();
        set({
          cards: {},
          reviews: [],
          dailyLearnedCount: {},
          mastered: {},
          starred: {},
          updatedAt: iso,
          lastResetAt: iso,
        });
      },
    }),
    {
      name: 'kaoyan-formula-progress',
      version: 1,
      storage: createJSONStorage(() => safeIdbStorage),
      migrate: (persisted: unknown) => {
        const data = (persisted ?? {}) as Partial<FormulaProgressState>;
        return {
          schemaVersion: 1,
          cards: data.cards ?? {},
          reviews: data.reviews ?? [],
          dailyLearnedCount: data.dailyLearnedCount ?? {},
          mastered: data.mastered ?? {},
          starred: data.starred ?? {},
          dailyNewLimit: data.dailyNewLimit ?? 15,
          updatedAt: data.updatedAt ?? null,
          lastResetAt: data.lastResetAt ?? null,
        } as FormulaProgressState;
      },
    }
  )
);
