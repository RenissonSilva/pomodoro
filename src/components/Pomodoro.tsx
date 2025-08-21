import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { TIMER_TABS, TimerType } from '@/constants/timer-types';
import { formatTime } from '@/utils/format-time';
import TimerTabs from './TimerTabs';

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const Pomodoro = () => {
  const [activeTimer, setActiveTimer] = useState<TimerType>('pomodoro');
  const [times, setTimes] = useState({
    pomodoro: POMODORO_TIME,
    shortBreak: SHORT_BREAK_TIME,
    longBreak: LONG_BREAK_TIME,
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimerChange = (type: TimerType) => {
    setIsRunning(false);
    setActiveTimer(type);
    handleRestart();
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(decrementTimer, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const decrementTimer = useCallback(() => {
    setTimes(prevTimes => ({
      ...prevTimes,
      [activeTimer]:
        prevTimes[activeTimer] > 1 ? prevTimes[activeTimer] - 1 : 0,
    }));
  }, [activeTimer]);

  const handleRestart = () => {
    setTimes(prev => ({
      ...prev,
      [activeTimer]:
        activeTimer === 'pomodoro'
          ? POMODORO_TIME
          : activeTimer === 'shortBreak'
          ? SHORT_BREAK_TIME
          : LONG_BREAK_TIME,
    }));
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='p-6'>
        <h1 className='text-4xl text-sage'>Pomodoro</h1>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center'>
        <TimerTabs
          activeTimer={activeTimer}
          onTimerChange={handleTimerChange}
        />

        <div className='w-72 h-72 sm:w-96 sm:h-96 bg-sage rounded-full flex flex-col items-center justify-center shadow-lg relative mt-8'>
          <span className='text-white text-5xl sm:text-6xl font-medium tracking-wider select-none'>
            {formatTime(times[activeTimer])}
          </span>

          <div className='absolute bottom-8 left-0 w-full flex justify-center gap-4'>
            <button
              onClick={handleRestart}
              className='p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-50 hover:bg-white/20 transition-all duration-200'
            >
              <RotateCcw size={24} />
            </button>

            <button
              onClick={() => setIsRunning(prev => !prev)}
              className='p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-50 hover:bg-white/20 transition-all duration-200'
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
