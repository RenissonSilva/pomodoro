import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';

const INITIAL_TIME = 25 * 60;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const Pomodoro: React.FC = () => {
  const [time, setTime] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const handleRestart = () => {
    setTime(INITIAL_TIME);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='p-6'>
        <h1 className='text-4xl text-sage'>Pomodoro</h1>
      </div>

      <div className='flex-1 flex items-center justify-center -mt-16'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 bg-sage rounded-full flex flex-col items-center justify-center shadow-lg relative'>
          <span className='text-white text-5xl sm:text-6xl font-medium tracking-wider select-none'>
            {formatTime(time)}
          </span>

          <div className='absolute bottom-8 left-0 w-full flex justify-center gap-4'>
            <button
              onClick={handleRestart}
              className='p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-50 hover:bg-white/20 transition-all duration-200'
            >
              <RotateCcw size={24} />
            </button>

            <button
              onClick={handleStartPause}
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
