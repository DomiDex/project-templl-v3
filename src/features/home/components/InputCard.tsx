import Link from 'next/link';
import { AnimatedArrow } from '@/components/ui/animated-arrow';

interface InputCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

export function InputCard({ title, description, link, icon }: InputCardProps) {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-200'>
      <div className='space-y-4'>
        <div className='text-4xl mb-6'>{icon}</div>
        <h3 className='text-2xl font-semibold text-gray-900 dark:text-gray-50'>
          {title}
        </h3>
        <p className='text-gray-600 dark:text-gray-400'>{description}</p>
        <Link
          href={link}
          className='inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors group'
        >
          Explore
          <AnimatedArrow />
        </Link>
      </div>
    </div>
  );
}
