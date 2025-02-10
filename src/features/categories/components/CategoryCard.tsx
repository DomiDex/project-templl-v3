import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  if (!category) return null;

  const { path, category_name, og_image, meta_description } = category;

  return (
    <Link href={`/categories/${path}`} className='block group'>
      <div className='bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-purple-800 transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-700'>
          {og_image ? (
            <Image
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
              src={og_image}
              alt={category_name}
              width={400}
              height={225}
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
                  d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                />
              </svg>
            </div>
          )}
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200'>
            {category_name}
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
