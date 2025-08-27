import { TimerType } from '@/constants/timer-types';

export const getTimerColorClass = (activeTimer: TimerType): string => {
  switch (activeTimer) {
    case 'pomodoro':
      return `text-rose-400`;
    case 'shortBreak':
      return `text-sage`;
    case 'longBreak':
      return `text-blue-300`;
    default:
      return `text-sage`;
  }
};

export const getTimerBgColorClass = (activeTimer: TimerType): string => {
  switch (activeTimer) {
    case 'pomodoro':
      return `bg-rose-400`;
    case 'shortBreak':
      return `bg-sage`;
    case 'longBreak':
      return `bg-blue-300`;
    default:
      return `bg-sage`;
  }
};
