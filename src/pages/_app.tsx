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

        <SettingsDrawer
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </main>
    </div>
  );
}
