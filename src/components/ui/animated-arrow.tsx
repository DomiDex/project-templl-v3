import { cn } from '@/utils/cn';

interface AnimatedArrowProps {
  className?: string;
}

export function AnimatedArrow({ className }: AnimatedArrowProps) {
  return (
    <div className={cn('inline-flex items-center', className)}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1'
      >
        <path
          d='M4 12H20M20 12L14 6M20 12L14 18'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
