import { create } from 'zustand';

export const useTimerStore = create((set, get) => ({
  mode: 'pomodoro',
  durations: { pomodoro: 25, short: 5, long: 15 },
  remaining: 1500,
  isRunning: false,
  completedPomos: 0,
  cyclesUntilLong: 4,
  dark: true,
  sound: 'bell',
  setMode: (m: any) =>
    set((s: any) => ({
      mode: m,
      remaining: s.durations[m] * 60,
      isRunning: false,
    })),
  toggleRunning: () => set((s: any) => ({ isRunning: !s.isRunning })),
  reset: () =>
    set((s: any) => ({
      remaining: s.durations[s.mode] * 60,
      isRunning: false,
    })),
  tick: () => {
    const s = get();
    if (!s.isRunning) return;
    if (s.remaining <= 1) {
      set({
        mode:
          s.mode === 'pomodoro'
            ? (s.completedPomos + 1) % s.cyclesUntilLong === 0
              ? 'long'
              : 'short'
            : 'pomodoro',
        remaining:
          s.mode === 'pomodoro'
            ? (s.completedPomos + 1) % s.cyclesUntilLong === 0
              ? s.durations.long * 60
              : s.durations.short * 60
            : s.durations.pomodoro * 60,
        isRunning: false,
        completedPomos:
          s.mode === 'pomodoro' ? s.completedPomos + 1 : s.completedPomos,
      });
    } else {
      set({ remaining: s.remaining - 1 });
    }
  },
}));
