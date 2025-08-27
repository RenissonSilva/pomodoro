import { TIMER_TABS, TimerType } from '@/constants/timer-types';
import { getTimerBgColorClass } from '@/utils/timer-utils';

interface TimerTabsProps {
  activeTimer: TimerType;
  onTimerChange: (type: TimerType) => void;
}

export const TimerTabs = ({ activeTimer, onTimerChange }: TimerTabsProps) => {
  return (
    <div className='flex justify-center'>
      <div className='bg-white/10 backdrop-blur-sm rounded-lg p-1 flex gap-1'>
        {TIMER_TABS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onTimerChange(type as TimerType)}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTimer === type
                ? getTimerBgColorClass(activeTimer)
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerTabs;
