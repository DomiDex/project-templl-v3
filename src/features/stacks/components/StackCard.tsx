import Link from 'next/link';
import Image from 'next/image';
import { Stack } from '@/types';

interface StackCardProps {
  stack: Stack;
}

export default function StackCard({ stack }: StackCardProps) {
  if (!stack) return null;

  const { path, stack_name, icon, meta_description } = stack;

  return (
    <Link href={`/stacks/${path}`} className='block group'>
      <div className='bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-purple-800 transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-700'>
          {icon ? (
            <Image
              className='w-24 h-24 object-contain group-hover:scale-105 transition-transform duration-200'
              src={icon}
              alt={stack_name}
              width={96}
              height={96}
            />
          ) : (
            <div className='w-24 h-24 flex items-center justify-center text-gray-400'>
              <svg
                className='w-12 h-12'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
                />
              </svg>
            </div>
          )}
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200'>
            {stack_name}
          </h3>
          {meta_description && (
            <p className='text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2'>
              {meta_description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
