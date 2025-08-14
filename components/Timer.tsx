'use client';
import { useEffect } from 'react';
import { useTimerStore } from '@/lib/store';
import { formatTime } from '@/lib/format';

export default function Timer() {
  const {
    mode,
    remaining,
    isRunning,
    setMode,
    toggleRunning,
    reset,
    tick,
    durations,
  } = useTimerStore();

  useEffect(() => {
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    document.title = `${formatTime(remaining)} • Pomodoro`;
  }, [remaining]);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex gap-2 mb-6'>
        {(['pomodoro', 'short', 'long'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-2xl text-sm border ${mode === m ? 'bg-red-500 text-white border-red-400' : 'bg-neutral-900 border-neutral-700 hover:bg-neutral-800'}`}
          >
            {m === 'pomodoro'
              ? 'Pomodoro'
              : m === 'short'
                ? 'Pausa Curta'
                : 'Pausa Longa'}
          </button>
        ))}
      </div>
      <div className='text-[7rem] font-black tabular-nums select-none'>
        {formatTime(remaining)}
      </div>
      <div className='mt-6 flex gap-3'>
        <button
          onClick={toggleRunning}
          className='px-6 py-3 rounded-2xl bg-white text-black font-semibold'
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={reset}
          className='px-6 py-3 rounded-2xl border border-neutral-700'
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
