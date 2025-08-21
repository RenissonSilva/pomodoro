import AppSidebar from '@/components/Sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Trocar de modo de acordo com o toggle, deixar default como 'dark'
    localStorage.setItem('theme', 'dark');

    // Aqui se usuário alterou o tema, vamos aplicar
    const selectedTheme = localStorage.getItem('theme');

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
      // Ou se o usuário não escolheu, vamos verificar a preferência do sistema
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
  }, []);

  return (
    <>
      <AppSidebar />
      <Component {...pageProps} />;
    </>
  );
}
