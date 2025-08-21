import Pomodoro from '@/components/Pomodoro';
import baloo from '@/styles/font';

export default function Home() {
  return (
    <div
      className={`h-screen flex items-center justify-center ${baloo.className}`}
    >
      <Pomodoro />
    </div>
  );
}
