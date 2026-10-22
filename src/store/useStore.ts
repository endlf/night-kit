import { create } from 'zustand';
import type { AppPhase, CampfireState, EmotionScene } from '../data/types';
import config from '../data/config';

interface AppState {
  phase: AppPhase;
  campfireState: CampfireState;
  selectedScene: EmotionScene | null;
  isMusicOn: boolean;
  ambientVolume: number;

  openKit: () => void;
  selectScene: (scene: EmotionScene) => void;
  backToCampfire: () => void;
  toggleMusic: () => void;
  setAmbientVolume: (v: number) => void;
  goToBirthday: () => void;
}

export const useStore = create<AppState>((set) => ({
  phase: 'dark',
  campfireState: 'normal',
  selectedScene: null,
  isMusicOn: false,
  ambientVolume: 0.3,

  openKit: () => set({ phase: 'campfire', campfireState: 'normal' }),

  selectScene: (scene) =>
    set({ phase: 'emotion', campfireState: 'dimmed', selectedScene: scene }),

  backToCampfire: () =>
    set({ phase: 'campfire', campfireState: 'normal', selectedScene: null }),

  toggleMusic: () => set((s) => ({ isMusicOn: !s.isMusicOn })),

  setAmbientVolume: (v) => set({ ambientVolume: v }),

  goToBirthday: () => set({ phase: 'birthday' }),
}));
