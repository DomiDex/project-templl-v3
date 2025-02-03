'use client';

import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavDropdownProps {
  label: string;
  items: {
    label: string;
    href: string;
  }[];
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const pathname = usePathname();
  const isActive = items.some((item) => item.href === pathname);

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
        className='min-w-[8rem] bg-gray-50 dark:bg-purple-700 mt-3'
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className={cn(
                'w-full text-sm transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
