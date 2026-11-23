import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PracticeMode } from '../core/grader';
import { safeIdbStorage } from './storage';

export type InputMode = 'typing' | 'paper';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface SettingsState {
  schemaVersion: number;
  dailyNewLimit: number;
  requestRetention: number;
  examDate: string | null;
  strictPunctuation: boolean;
  practiceMode: PracticeMode;
  inputMode: InputMode;
  theme: ThemeMode;
  unlockAllLessons: boolean;
  bodyFontSize: number;
  updatedAt: string | null;
  updateSettings: (
    partial: Partial<Omit<SettingsState, 'updateSettings' | 'schemaVersion' | 'updatedAt'>>,
    explicitUpdatedAt?: string | null
  ) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      schemaVersion: 2,
      dailyNewLimit: 8,
      requestRetention: 0.9,
      examDate: null,
      strictPunctuation: false,
      practiceMode: 'framework',
      inputMode: 'typing',
      theme: 'light',
      unlockAllLessons: false,
      bodyFontSize: 19,
      updatedAt: null,
      updateSettings: (partial, explicitUpdatedAt) =>
        set((state) => ({
          ...state,
          ...partial,
          updatedAt:
            explicitUpdatedAt !== undefined
              ? explicitUpdatedAt
              : new Date().toISOString(),
        })),
    }),
    {
      name: 'kaoyan-essay-settings',
      version: 2,
      storage: createJSONStorage(() => safeIdbStorage),
      migrate: (persisted: unknown) => {
        const data = (persisted ?? {}) as Partial<SettingsState>;
        return {
          schemaVersion: 2,
          dailyNewLimit: data.dailyNewLimit ?? 8,
          requestRetention: data.requestRetention ?? 0.9,
          examDate: data.examDate ?? null,
          strictPunctuation: data.strictPunctuation ?? false,
          practiceMode: data.practiceMode ?? 'framework',
          inputMode: data.inputMode ?? 'typing',
          theme: data.theme ?? 'light',
          unlockAllLessons: data.unlockAllLessons ?? false,
          bodyFontSize: data.bodyFontSize ?? 19,
          updatedAt: data.updatedAt ?? null,
        } as SettingsState;
      },
    }
  )
);
