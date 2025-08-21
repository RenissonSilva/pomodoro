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

  // Calcula o progresso baseado no tempo restante (100% = cheio, 0% = vazio)
  const getProgress = () => {
    const totalTime = TIMER_PRESETS[activeTimer];
    const currentTime = times[activeTimer];
    const progress = (currentTime / totalTime) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const handleTimerChange = (type: TimerType) => {
    setIsRunning(false);
    setActiveTimer(type);
    resetCurrentTimer(type);
    isTransitioningRef.current = false;
  };

  const resetCurrentTimer = (timerType: TimerType = activeTimer) => {
    const initialTime = TIMER_PRESETS[timerType];

    setTimes(prev => ({
      ...prev,
      [timerType]: initialTime,
    }));
  };

  const switchToNextTimer = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

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
        // Pausa terminou, volta para pomodoro
        if (activeTimer === 'longBreak') {
          setCurrentStep(0);
        }

        setActiveTimer('pomodoro');
        setTimes(prevTimes => ({
          ...prevTimes,
          pomodoro: TIMER_PRESETS.pomodoro,
        }));
      }

      // Inicia o próximo timer após um pequeno delay
      setTimeout(() => {
        setIsRunning(true);
        isTransitioningRef.current = false;
      }, 200);
    }, 100);
  }, [activeTimer]);

  useEffect(() => {
    if (isRunning && !isTransitioningRef.current) {
      intervalRef.current = setInterval(() => {
        setTimes(prevTimes => {
          const currentTime = prevTimes[activeTimer];

          if (currentTime <= 1) {
            // Para o timer e inicia a transição
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
      // Limpa o intervalo quando não está rodando
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
        <h1 className='text-4xl text-[#679F96]'>Pomodoro</h1>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center'>
        <TimerTabs
          activeTimer={activeTimer}
          onTimerChange={handleTimerChange}
        />

        <div className='relative my-16'>
          {/* Círculo principal do timer */}
          <div className='w-72 h-72 sm:w-96 sm:h-96 bg-[#679F96] rounded-full flex flex-col items-center justify-center shadow-lg relative'>
            {/* SVG para o anel de progresso - posicionado dentro do círculo */}
            <svg
              className='absolute inset-0 w-full h-full transform -rotate-90'
              viewBox='0 0 200 200'
            >
              {/* Círculo de fundo (semi-transparente) */}
              <circle
                cx='100'
                cy='100'
                r='90'
                stroke='rgba(255, 255, 255, 0.2)'
                strokeWidth='2'
                fill='none'
              />
              {/* Círculo de progresso */}
              <circle
                cx='100'
                cy='100'
                r='90'
                stroke='rgba(255, 255, 255, 0.9)'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - getProgress() / 100)}
                style={{
                  transition: isRunning
                    ? 'stroke-dashoffset 1s linear'
                    : 'stroke-dashoffset 0.3s ease',
                }}
              />
            </svg>

            <span className='text-white text-5xl sm:text-6xl font-medium tracking-wider select-none relative z-10'>
              {formatTime(times[activeTimer])}
            </span>

            <div className='absolute bottom-14 left-0 w-full flex justify-center gap-4 z-10'>
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

        <Steps currentStep={currentStep} />
      </div>
    </div>
  );
};

export default Pomodoro;
