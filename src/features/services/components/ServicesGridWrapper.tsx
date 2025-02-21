'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const PublicServicesGrid = dynamic(() => import('./PublicServicesGrid'), {
  loading: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
        </div>
      ))}
    </div>
  ),
});

const ServicesGridWrapper: FC = () => {
  return <PublicServicesGrid />;
};

export default ServicesGridWrapper;
