export const TIMER_TABS = [
  { type: 'pomodoro', label: 'Pomodoro' },
  { type: 'shortBreak', label: 'Pausa Curta' },
  { type: 'longBreak', label: 'Pausa Longa' },
] as const;

export type TimerType = (typeof TIMER_TABS)[number]['type'];
