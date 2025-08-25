import { X } from 'lucide-react';
import { useState } from 'react';

export default function SettingsDrawer({ isSettingsOpen, setIsSettingsOpen }) {
  return (
    <>
      {isSettingsOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300'
          onClick={() => setIsSettingsOpen(false)}
        ></div>
      )}

      <div
        className={`
              fixed top-0 right-0 h-full w-80 bg-neutral-900 text-gray-200 shadow-xl p-6 z-50
              transform transition-transform duration-300 ease-in-out
              ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
      >
        <div className='flex items-center mb-4'>
          <h2 className='flex-1 text-xl font-semibold text-white'>
            Configurações
          </h2>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className='text-gray-400 hover:text-white transition-colors'
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
