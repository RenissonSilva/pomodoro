import { Check } from 'lucide-react';

interface StepsProps {
  currentStep: number;
  totalSteps?: number;
}

const Steps = ({ currentStep, totalSteps = 4 }: StepsProps) => {
  return (
    <div className='relative flex items-center justify-center gap-3'>
      <div className='absolute h-1 bg-white/10 w-[calc(100%-2rem)] rounded-full'>
        <div
          className='h-full bg-sage rounded-full transition-all duration-300'
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className='relative flex gap-3 items-center'>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-300 z-10
              ${
                index < currentStep
                  ? 'bg-sage text-white scale-110'
                  : 'bg-white/10 text-gray-400'
              }
            `}
          >
            {index < currentStep ? (
              <Check size={16} className='text-white' />
            ) : (
              <div className='w-2 h-2 rounded-full bg-white/10' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
