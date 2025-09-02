import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { TimerType } from '@/constants/timer-types';
import { formatTime } from '@/utils/format-time';
import TimerTabs from './TimerTabs';
import Steps from './Steps';

const TIMER_PRESETS = {
  pomodoro: 0.05 * 60,
  shortBreak: 0.05 * 60,
  longBreak: 0.05 * 60,
} as const;

const Pomodoro = () => {
  const [activeTimer, setActiveTimer] = useState<TimerType>('pomodoro');
  const [times, setTimes] = useState({
    pomodoro: TIMER_PRESETS['pomodoro'],
    shortBreak: TIMER_PRESETS['shortBreak'],
    longBreak: TIMER_PRESETS['longBreak'],
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const isTransitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getProgress = () => {
    const totalTime = TIMER_PRESETS[activeTimer];
    const currentTime = times[activeTimer];
    const progress = (currentTime / totalTime) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const switchToNextTimer = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    setTimeout(() => {
      if (activeTimer === 'pomodoro') {
        setCurrentStep(prev => {
          const newStep = prev + 1;

          if (newStep === 4) {
            setActiveTimer('longBreak');
            setTimes(prevTimes => ({
              ...prevTimes,
              longBreak: TIMER_PRESETS.longBreak,
            }));
          } else {
            setActiveTimer('shortBreak');
            setTimes(prevTimes => ({
              ...prevTimes,
              shortBreak: TIMER_PRESETS.shortBreak,
            }));
          }

          return newStep;
        });
      } else {
        if (activeTimer === 'longBreak') {
          setCurrentStep(0);
        }

        setActiveTimer('pomodoro');
        setTimes(prevTimes => ({
          ...prevTimes,
          pomodoro: TIMER_PRESETS.pomodoro,
        }));
      }

      setTimeout(() => {
        setIsTransitioning(false);
        setIsRunning(true);
        isTransitioningRef.current = false;
      }, 300);
    }, 300);
  }, [activeTimer]);

  const handleTimerChange = (type: TimerType) => {
    setIsRunning(false);
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveTimer(type);
      resetCurrentTimer(type);
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }, 200);
  };

  const getTimerColorClass = (activeTimer: TimerType): string => {
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

  const getTimerBgColorClass = (activeTimer: TimerType): string => {
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

  const resetCurrentTimer = (timerType: TimerType = activeTimer) => {
    const initialTime = TIMER_PRESETS[timerType];

    setTimes(prev => ({
      ...prev,
      [timerType]: initialTime,
    }));
  };

  useEffect(() => {
    if (isRunning && !isTransitioningRef.current) {
      intervalRef.current = setInterval(() => {
        setTimes(prevTimes => {
          const currentTime = prevTimes[activeTimer];

          if (currentTime <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            switchToNextTimer();
            return {
              ...prevTimes,
              [activeTimer]: 0,
            };
          }

          return {
            ...prevTimes,
            [activeTimer]: currentTime - 1,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, activeTimer, switchToNextTimer]);

  const handleRestart = () => {
    resetCurrentTimer();
    setIsRunning(false);
    isTransitioningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='p-6'>
        <h1 className={`text-4xl ${getTimerColorClass(activeTimer)}`}>
          Pomodoro
        </h1>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center'>
        <TimerTabs
          activeTimer={activeTimer}
          onTimerChange={handleTimerChange}
        />

        <div className='relative my-16'>
          <div
            className={`
              w-72 h-72 sm:w-96 sm:h-96 rounded-full flex flex-col items-center justify-center shadow-lg relative 
              transition-all duration-500 ease-in-out transform
              ${getTimerBgColorClass(activeTimer)}
              ${isTransitioning ? 'scale-105 animate-pulse' : 'scale-100'}
            `}
          >
            <svg
              className={`
                absolute inset-0 w-full h-full transform -rotate-90
                transition-opacity duration-300
                ${isTransitioning ? 'opacity-50' : 'opacity-100'}
              `}
              viewBox='0 0 200 200'
            >
              <circle
                cx='100'
                cy='100'
                r='90'
                stroke='rgba(255, 255, 255, 0.1)'
                strokeWidth='3'
                fill='none'
              />
              <circle
                cx='100'
                cy='100'
                r='90'
                stroke='rgba(255, 255, 255, 0.8)'
                strokeWidth='3'
                fill='none'
                strokeLinecap='round'
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - getProgress() / 100)}
                style={{
                  transition: isRunning
                    ? 'stroke-dashoffset 1s linear'
                    : 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </svg>

            <span
              className={`
                text-white text-5xl sm:text-6xl font-medium tracking-wider select-none relative z-10
                transition-all duration-300
                ${
                  isTransitioning
                    ? 'scale-110 opacity-75'
                    : 'scale-100 opacity-100'
                }
              `}
            >
              {formatTime(times[activeTimer])}
            </span>

            <div
              className={`
                absolute bottom-14 left-0 w-full flex justify-center gap-4 z-10
                transition-all duration-300
              `}
            >
              <button
                onClick={handleRestart}
                disabled={isTransitioning}
                className={`
                  p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-50 
                  transition-all duration-200
                  ${
                    isTransitioning
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-white/20 hover:scale-105'
                  }
                `}
              >
                <RotateCcw size={24} />
              </button>

              <button
                onClick={() => setIsRunning(prev => !prev)}
                disabled={isTransitioning}
                className={`
                  p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-50 
                  transition-all duration-200
                  ${
                    isTransitioning
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-white/20 hover:scale-105'
                  }
                `}
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'scale-105' : 'scale-100'
          }`}
        >
          <Steps currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
