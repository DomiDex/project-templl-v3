'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  dynamicData?: {
    label: string;
    href: string;
  };
}

export function Breadcrumb({ items, className, dynamicData }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if no items provided
  const breadcrumbItems =
    items ||
    pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, array) => {
        const href = `/${array.slice(0, index + 1).join('/')}`;
        // Replace dynamic data if it matches the current segment
        if (dynamicData && segment === array[array.length - 1]) {
          return dynamicData;
        }
        return {
          label:
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, ' '),
          href,
        };
      });

  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('flex items-center space-x-1 text-sm', className)}
    >
      <Link
        href='/'
        className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
      >
        Home
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className='flex items-center'>
          <ChevronRight className='h-4 w-4 text-gray-400 dark:text-gray-500' />
          <Link
            href={item.href}
            className={cn(
              'ml-1',
              index === breadcrumbItems.length - 1
                ? 'text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
              'transition-colors'
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
