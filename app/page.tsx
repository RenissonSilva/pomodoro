import Timer from '@/components/Timer';
import AdSlot from '@/components/AdSlot';

export const revalidate = 60;

export default function Home() {
  return (
    <div className='space-y-10'>
      <section className='text-center space-y-6'>
        <h1 className='text-4xl md:text-6xl font-extrabold'>Pomodoro Online</h1>
        <p className='text-lg opacity-80 max-w-2xl mx-auto'>
          Cronômetro Pomodoro gratuito com PWA e foco em produtividade.
        </p>
        <div className='flex justify-center'>
          <AdSlot />
        </div>
      </section>
      <section>
        <Timer />
      </section>
      <section className='prose-zen'>
        <h2>Como funciona?</h2>
        <p>
          Trabalhe 25 minutos e descanse 5. A cada 4 ciclos, faça uma pausa
          longa.
        </p>
      </section>
    </div>
  );
}
