'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const toggleDarkMode = () => {
    setDark(!dark);
  };

  return (
    <div
      className={`font-sans min-h-screen p-8 sm:p-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center transition-colors duration-300 ${
        dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <button
          onClick={toggleDarkMode}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
            dark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Toggle {dark ? 'Light' : 'Dark'} Mode
        </button>

        <div className='text-center sm:text-left'>
          <h1
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              dark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            Olá, Tailwind com Dark Mode! 🌙
          </h1>
          <p
            className={`text-lg mb-6 transition-colors duration-300 ${
              dark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Clique no botão acima para alternar entre os temas claro e escuro.
          </p>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
              dark
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            Clique aqui
          </button>
        </div>

        <div
          className={`mt-8 p-6 rounded-xl transition-all duration-300 ${
            dark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-slate-100 border border-slate-200'
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              dark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Status do Tema
          </h2>
          <p
            className={`transition-colors duration-300 ${
              dark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Modo atual:{' '}
            <span className='font-bold'>{dark ? 'Escuro 🌙' : 'Claro ☀️'}</span>
          </p>
        </div>
      </main>
    </div>
  );
}
