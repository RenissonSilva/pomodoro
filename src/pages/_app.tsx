import { useState } from 'react';
import AppSidebar from '@/components/Sidebar';
import type { AppProps } from 'next/app';
import SettingsDrawer from '@/drawer/SettingsDrawer';

import '@/styles/globals.css';
import { baloo } from '@/styles/font';

export default function App({ Component, pageProps }: AppProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`${baloo.className} flex min-h-screen relative`}>
      <AppSidebar onSettingsClick={() => setIsSettingsOpen(true)} />

      <main className='flex-1 bg-stone-700 relative'>
        <Component {...pageProps} />
      </main>

      {isSettingsOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 transition-opacity'
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-80 bg-neutral-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <SettingsDrawer
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </div>
    </div>
  );
}
