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
import type { Deck, TemplateId } from '../data/types';
import { safeIdbStorage } from './storage';

export interface SerializedCard extends Omit<Card, 'due' | 'last_review'> {
  due: string;
  last_review?: string;
  deck?: Deck;
}

export function inferCardDeck(sentenceId: string, explicit?: Deck): Deck {
  if (explicit === 'small' || explicit === 'big') return explicit;
  return sentenceId.startsWith('big.') ? 'big' : 'small';
}

export function serializeCard(card: Card, deck?: Deck): SerializedCard {
  const out: SerializedCard = {
    ...card,
    due: card.due.toISOString(),
    last_review: card.last_review ? card.last_review.toISOString() : undefined,
  };
  if (deck) out.deck = deck;
  return out;
}

export function deserializeCard(card: SerializedCard): Card {
  return {
    ...card,
    due: new Date(card.due),
    last_review: card.last_review ? new Date(card.last_review) : undefined,
  };
}

export function migrateProgressCards(
  rawCards: Record<string, SerializedCard> | undefined
): Record<string, SerializedCard> {
  if (!rawCards || typeof rawCards !== 'object') return {};
  const out: Record<string, SerializedCard> = {};
  for (const [id, c] of Object.entries(rawCards)) {
    if (!c || typeof c !== 'object') continue;
    out[id] = {
      ...c,
      deck: inferCardDeck(id, c.deck),
    };
  }
  return out;
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

export interface BigPlanRecord {
  id: string;
  promptId: string;
  durationSec: number;
  allRequiredFilled: boolean;
  grammarPassed: boolean;
  wordCount: number;
  timestamp: string;
}

export interface BigExamRecord {
  id: string;
  promptId: string;
  level: 'completion' | 'semi' | 'independent';
  durationSec: number;
  wordCount: number;
  fixedAccuracy: number;
  timestamp: string;
}

export interface BigPackIdRecord {
  promptId: string;
  expectedPackId: string;
  chosenPackId: string;
  correct: boolean;
  durationSec: number;
  timestamp: string;
}

export interface BigChartRecord {
  kind: 'pie' | 'bar' | 'line';
  selectionCorrect: boolean;
  fillCorrect: boolean;
  timestamp: string;
}

export interface BigEssayBackupData {
  bigDailyLearnedCount: Record<string, number>;
  bigPlanRecords: BigPlanRecord[];
  bigExamRecords: BigExamRecord[];
  bigPackIdRecords: BigPackIdRecord[];
  bigChartRecords: BigChartRecord[];
}

export interface ProgressState {
  schemaVersion: number;
  cards: Record<string, SerializedCard>;
  reviews: ReviewRecord[];
  dailyLearnedCount: Record<string, number>;
  examRecords: ExamRecord[];
  idRecords: IdentificationRecord[];
  bigDailyLearnedCount: Record<string, number>;
  bigPlanRecords: BigPlanRecord[];
  bigExamRecords: BigExamRecord[];
  bigPackIdRecords: BigPackIdRecord[];
  bigChartRecords: BigChartRecord[];
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
  recordBigPlan: (record: Omit<BigPlanRecord, 'id' | 'timestamp'>) => void;
  recordBigExam: (record: Omit<BigExamRecord, 'id' | 'timestamp'>) => void;
  recordBigPackId: (record: Omit<BigPackIdRecord, 'timestamp'>) => void;
  recordBigChart: (record: Omit<BigChartRecord, 'timestamp'>) => void;
  getCard: (sentenceId: string) => Card | undefined;
  getDueSentenceIds: (now?: Date, deckFilter?: Deck | 'all') => string[];
  getTodayLearnedCount: (now?: Date) => number;
  getTodayBigLearnedCount: (now?: Date) => number;
  resetAll: () => void;
  resetBigEssay: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      schemaVersion: 4,
      cards: {},
      reviews: [],
      dailyLearnedCount: {},
      examRecords: [],
      idRecords: [],
      bigDailyLearnedCount: {},
      bigPlanRecords: [],
      bigExamRecords: [],
      bigPackIdRecords: [],
      bigChartRecords: [],
      updatedAt: null,
      lastResetAt: null,

      completeNewSentence: (sentenceId, options) => {
        const now = new Date();
        const deck = inferCardDeck(sentenceId);
        const existing = get().cards[sentenceId];
        const baseCard = existing ? deserializeCard(existing) : createInitialCard(now);
        const nextCard = reviewCard(baseCard, Rating.Good, now, options);
        const dateKey = formatLocalDateKey(now);
        const iso = now.toISOString();

        set((state) => ({
          cards: {
            ...state.cards,
            [sentenceId]: serializeCard(nextCard, deck),
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
          dailyLearnedCount:
            deck === 'small'
              ? {
                  ...state.dailyLearnedCount,
                  [dateKey]: (state.dailyLearnedCount[dateKey] ?? 0) + (existing ? 0 : 1),
                }
              : state.dailyLearnedCount,
          bigDailyLearnedCount:
            deck === 'big'
              ? {
                  ...state.bigDailyLearnedCount,
                  [dateKey]: (state.bigDailyLearnedCount[dateKey] ?? 0) + (existing ? 0 : 1),
                }
              : state.bigDailyLearnedCount,
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
        const deck = inferCardDeck(sentenceId);
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
                [sentenceId]: serializeCard(updatedCard, deck),
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

      recordBigPlan: (record) => {
        const now = new Date();
        const iso = now.toISOString();
        set((state) => ({
          bigPlanRecords: [
            ...state.bigPlanRecords,
            {
              ...record,
              id: `bplan-${now.getTime()}`,
              timestamp: iso,
            },
          ],
          updatedAt: iso,
        }));
      },

      recordBigExam: (record) => {
        const now = new Date();
        const iso = now.toISOString();
        set((state) => ({
          bigExamRecords: [
            ...state.bigExamRecords,
            {
              ...record,
              id: `bexam-${now.getTime()}`,
              timestamp: iso,
            },
          ],
          updatedAt: iso,
        }));
      },

      recordBigPackId: (record) => {
        const iso = new Date().toISOString();
        set((state) => ({
          bigPackIdRecords: [
            ...state.bigPackIdRecords,
            {
              ...record,
              timestamp: iso,
            },
          ],
          updatedAt: iso,
        }));
      },

      recordBigChart: (record) => {
        const iso = new Date().toISOString();
        set((state) => ({
          bigChartRecords: [
            ...state.bigChartRecords,
            {
              ...record,
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

      getDueSentenceIds: (now = new Date(), deckFilter = 'all') => {
        const cards = get().cards;
        return Object.entries(cards)
          .filter(([id, card]) => {
            if (deckFilter !== 'all' && inferCardDeck(id, card.deck) !== deckFilter) {
              return false;
            }
            return new Date(card.due).getTime() <= now.getTime();
          })
          .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
          .map(([id]) => id);
      },

      getTodayLearnedCount: (now = new Date()) => {
        return get().dailyLearnedCount[formatLocalDateKey(now)] ?? 0;
      },

      getTodayBigLearnedCount: (now = new Date()) => {
        return get().bigDailyLearnedCount[formatLocalDateKey(now)] ?? 0;
      },

      resetAll: () => {
        const iso = new Date().toISOString();
        set((state) => {
          // Keep big essay cards intact when resetting small essay only!
          const keptBigCards: Record<string, SerializedCard> = {};
          for (const [id, c] of Object.entries(state.cards)) {
            if (inferCardDeck(id, c.deck) === 'big') keptBigCards[id] = c;
          }
          const keptBigReviews = state.reviews.filter((r) =>
            inferCardDeck(r.sentenceId) === 'big'
          );
          return {
            cards: keptBigCards,
            reviews: keptBigReviews,
            dailyLearnedCount: {},
            examRecords: [],
            idRecords: [],
            updatedAt: iso,
            lastResetAt: iso,
          };
        });
      },

      resetBigEssay: () => {
        const iso = new Date().toISOString();
        set((state) => {
          const keptSmallCards: Record<string, SerializedCard> = {};
          for (const [id, c] of Object.entries(state.cards)) {
            if (inferCardDeck(id, c.deck) === 'small') keptSmallCards[id] = c;
          }
          const keptSmallReviews = state.reviews.filter(
            (r) => inferCardDeck(r.sentenceId) === 'small'
          );
          return {
            cards: keptSmallCards,
            reviews: keptSmallReviews,
            bigDailyLearnedCount: {},
            bigPlanRecords: [],
            bigExamRecords: [],
            bigPackIdRecords: [],
            bigChartRecords: [],
            updatedAt: iso,
          };
        });
      },
    }),
    {
      name: 'kaoyan-essay-progress',
      version: 4,
      storage: createJSONStorage(() => safeIdbStorage),
      migrate: (persisted: unknown) => {
        const data = (persisted ?? {}) as Partial<ProgressState>;
        return {
          schemaVersion: 4,
          cards: migrateProgressCards(data.cards),
          reviews: data.reviews ?? [],
          dailyLearnedCount: data.dailyLearnedCount ?? {},
          examRecords: data.examRecords ?? [],
          idRecords: data.idRecords ?? [],
          bigDailyLearnedCount: data.bigDailyLearnedCount ?? {},
          bigPlanRecords: data.bigPlanRecords ?? [],
          bigExamRecords: data.bigExamRecords ?? [],
          bigPackIdRecords: data.bigPackIdRecords ?? [],
          bigChartRecords: data.bigChartRecords ?? [],
          updatedAt: data.updatedAt ?? null,
          lastResetAt: data.lastResetAt ?? null,
        } as ProgressState;
      },
    }
  )
);
