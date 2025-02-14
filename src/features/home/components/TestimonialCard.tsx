import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export function TestimonialCard({
  content,
  author,
  role,
  company,
  image,
}: TestimonialCardProps) {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200'>
      <div className='space-y-6'>
        <div className='text-purple-600 dark:text-purple-400'>
          <svg className='h-8 w-8' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
          </svg>
        </div>
        <p className='text-gray-600 dark:text-gray-300 text-lg'>{content}</p>
        <div className='flex items-center gap-4'>
          <Image
            src={image}
            alt={author}
            width={48}
            height={48}
            className='rounded-full'
          />
          <div>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
              {author}
            </h4>
            <div className='text-gray-500 dark:text-gray-400 text-sm'>
              {role} at {company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
