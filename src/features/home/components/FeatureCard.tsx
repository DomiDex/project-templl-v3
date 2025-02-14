import Link from 'next/link';
import { AnimatedArrow } from '@/components/ui/animated-arrow';

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

export function FeatureCard({ title, description, link }: FeatureCardProps) {
  return (
    <div className=' rounded-lg p-6 transition-colors duration-200'>
      <div className='space-y-4'>
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
