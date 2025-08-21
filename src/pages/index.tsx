import Card from '@/components/Card';
import baloo from '@/styles/font';

export default function Home() {
  return (
    <main
      className={`grid place-content-center min-h-screen p-24 ${baloo.className}`}
    >
      <Card />
    </main>
  );
}
