'use client';
import { useEffect } from 'react';

export default function Header() {
  useEffect(() => {
    'serviceWorker' in navigator &&
      navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);
  return (
    <header className='container-prose py-4 flex items-center justify-between'>
      <a href='/' className='font-black text-xl tracking-tight'>
        FocusZen
      </a>
      <nav className='flex items-center gap-4'>
        <a
          href='/tecnica-pomodoro'
          className='text-sm opacity-80 hover:opacity-100'
        >
          Técnica Pomodoro
        </a>
        <a href='/blog' className='text-sm opacity-80 hover:opacity-100'>
          Blog
        </a>
      </nav>
    </header>
  );
}
