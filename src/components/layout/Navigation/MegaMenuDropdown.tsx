'use client';

import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MegaMenuDropdownProps {
  label: string;
  items: {
    label: string;
    href: string;
  }[];
  description?: string;
  columns?: 2 | 3 | 4;
}

export function MegaMenuDropdown({
  label,
  items,
  description,
  columns = 2,
}: MegaMenuDropdownProps) {
  const pathname = usePathname();
  const isActive = items.some((item) => item.href === pathname);

  const getWidth = () => {
    switch (columns) {
      case 2:
        return 'w-[500px]';
      case 3:
        return 'w-[700px]';
      case 4:
        return 'w-[900px]';
      default:
        return 'w-[500px]';
    }
  };

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-2';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center text-base font-medium transition-colors hover:text-foreground/80 gap-1',
          isActive ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        {label}
        <ChevronDown className='h-4 w-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className={cn(
          'bg-white dark:bg-gray-950 p-6 shadow-lg rounded-xl border border-purple-100/30',
          getWidth()
        )}
      >
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-1'>{label}</h3>
          {description && (
            <p className='text-sm text-muted-foreground'>{description}</p>
          )}
        </div>
        <div className={cn('grid gap-3', getGridCols())}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group rounded-lg p-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors',
                pathname === item.href
                  ? 'bg-purple-50 dark:bg-purple-900/30'
                  : 'text-foreground/60'
              )}
            >
              <div className='font-medium mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400'>
                {item.label}
              </div>
              <p className='text-sm text-muted-foreground line-clamp-2'>
                Explore {item.label} templates and resources
              </p>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
