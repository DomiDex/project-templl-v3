'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavDropdown } from './NavDropdown';
import { MobileNav } from './MobileNav';
import { cn } from '@/utils/cn';

export interface NavigationItem {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
  }[];
}

interface MainNavProps {
  items?: NavigationItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className='flex gap-6 md:gap-10'>
      <nav className='hidden lg:flex gap-6'>
        {items?.map((item, index) => {
          if (item.items) {
            return (
              <NavDropdown key={index} label={item.label} items={item.items} />
            );
          }
          return (
            <Link
              key={index}
              href={item.href!}
              className={cn(
                'flex items-center text-base font-medium transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <MobileNav items={items} />
    </div>
  );
}
