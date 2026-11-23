import { Rating, type Card, type Grade } from 'ts-fsrs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  formatLocalDateKey,
  type ReviewRecord,
  type WordMistakePair,
} from '../core/mistakes';
import {
  createInitialCard,
  reviewCard,
  type SchedulerOptions,
} from '../core/scheduler';
import type { TemplateId } from '../data/types';
import { safeIdbStorage } from './storage';

export interface SerializedCard extends Omit<Card, 'due' | 'last_review'> {
  due: string;
  last_review?: string;
}

export function serializeCard(card: Card): SerializedCard {
  return {
    ...card,
    due: card.due.toISOString(),
    last_review: card.last_review ? card.last_review.toISOString() : undefined,
  };
}

export function deserializeCard(card: SerializedCard): Card {
  return {
    ...card,
    due: new Date(card.due),
    last_review: card.last_review ? new Date(card.last_review) : undefined,
  };
}

export interface ExamRecord {
  id: string;
  promptId: string;
  templateId: TemplateId;
  identifiedCorrectly: boolean;
  durationSec: number;
  wordCount: number;
  overallAccuracy: number;
  timestamp: string;
}

export interface IdentificationRecord {
  promptId: string;
  expected: TemplateId;
  chosen: TemplateId;
  correct: boolean;
  timestamp: string;
}

export interface ProgressState {
  schemaVersion: number;
  cards: Record<string, SerializedCard>;
  reviews: ReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  examRecords: ExamRecord[];
  idRecords: IdentificationRecord[];
  updatedAt: string | null;
  lastResetAt: string | null;
  completeNewSentence: (sentenceId: string, options?: SchedulerOptions) => void;
  recordReview: (
    sentenceId: string,
    rating: Grade,
    accuracy: number,
    options?: SchedulerOptions,
    writeToFsrs?: boolean,
    wordMistakes?: WordMistakePair[]
  ) => void;
  recordExam: (record: Omit<ExamRecord, 'id' | 'timestamp'>) => void;
  recordIdentification: (
    promptId: string,
    expected: TemplateId,
    chosen: TemplateId
  ) => void;
  getCard: (sentenceId: string) => Card | undefined;
  getDueSentenceIds: (now?: Date) => string[];
  getTodayLearnedCount: (now?: Date) => number;
  resetAll: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      schemaVersion: 3,
      cards: {},
      reviews: [],
      dailyLearnedCount: {},
      examRecords: [],
      idRecords: [],
      updatedAt: null,
      lastResetAt: null,

      completeNewSentence: (sentenceId, options) => {
        const now = new Date();
        const existing = get().cards[sentenceId];
        const baseCard = existing ? deserializeCard(existing) : createInitialCard(now);
        const nextCard = reviewCard(baseCard, Rating.Good, now, options);
        const dateKey = formatLocalDateKey(now);
        const iso = now.toISOString();

        set((state) => ({
          cards: {
            ...state.cards,
            [sentenceId]: serializeCard(nextCard),
          },
          reviews: [
            ...state.reviews,
            {
              sentenceId,
              rating: Rating.Good,
              accuracy: 1,
              timestamp: iso,
            },
          ],
          dailyLearnedCount: {
            ...state.dailyLearnedCount,
            [dateKey]: (state.dailyLearnedCount[dateKey] ?? 0) + (existing ? 0 : 1),
          },
          updatedAt: iso,
        }));
      },

      recordReview: (
        sentenceId,
        rating,
        accuracy,
        options,
        writeToFsrs = true,
        wordMistakes
      ) => {
        const now = new Date();
        const existing = get().cards[sentenceId];
        const baseCard = existing ? deserializeCard(existing) : createInitialCard(now);
        const updatedCard = writeToFsrs
          ? reviewCard(baseCard, rating, now, options)
          : baseCard;
        const iso = now.toISOString();

        set((state) => ({
          cards: writeToFsrs
            ? {
                ...state.cards,
                [sentenceId]: serializeCard(updatedCard),
              }
            : state.cards,
          reviews: [
            ...state.reviews,
            {
              sentenceId,
              rating,
              accuracy,
              timestamp: iso,
              wordMistakes: wordMistakes && wordMistakes.length > 0 ? wordMistakes : undefined,
            },
          ],
          updatedAt: iso,
        }));
      },

      recordExam: (record) => {
        const now = new Date();
        const iso = now.toISOString();
        set((state) => ({
          examRecords: [
            ...state.examRecords,
            {
              ...record,
              id: `exam-${now.getTime()}`,
              timestamp: iso,
            },
          ],
          updatedAt: iso,
        }));
      },

      recordIdentification: (promptId, expected, chosen) => {
        const iso = new Date().toISOString();
        set((state) => ({
          idRecords: [
            ...state.idRecords,
            {
              promptId,
              expected,
              chosen,
              correct: expected === chosen,
              timestamp: iso,
            },
          ],
          updatedAt: iso,
        }));
      },

      getCard: (sentenceId) => {
        const raw = get().cards[sentenceId];
        return raw ? deserializeCard(raw) : undefined;
      },

      getDueSentenceIds: (now = new Date()) => {
        const cards = get().cards;
        return Object.entries(cards)
          .filter(([, card]) => new Date(card.due).getTime() <= now.getTime())
          .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
          .map(([id]) => id);
      },

      getTodayLearnedCount: (now = new Date()) => {
        return get().dailyLearnedCount[formatLocalDateKey(now)] ?? 0;
      },

      resetAll: () => {
        const iso = new Date().toISOString();
        set({
          cards: {},
          reviews: [],
          dailyLearnedCount: {},
          examRecords: [],
          idRecords: [],
          updatedAt: iso,
          lastResetAt: iso,
        });
      },
    }),
    {
      name: 'kaoyan-essay-progress',
      version: 3,
      storage: createJSONStorage(() => safeIdbStorage),
      migrate: (persisted: unknown) => {
        const data = (persisted ?? {}) as Partial<ProgressState>;
        return {
          schemaVersion: 3,
          cards: data.cards ?? {},
          reviews: data.reviews ?? [],
          dailyLearnedCount: data.dailyLearnedCount ?? {},
          examRecords: data.examRecords ?? [],
          idRecords: data.idRecords ?? [],
          updatedAt: data.updatedAt ?? null,
          lastResetAt: data.lastResetAt ?? null,
        } as ProgressState;
      },
    }
  )
);
