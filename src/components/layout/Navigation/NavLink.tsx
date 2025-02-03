'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-gray-50 dark:bg-gray-800 transition-colors duration-200',
        isActive && 'font-medium text-purple-500 dark:text-purple-400',
        className
      )}
    >
      {children}
    </Link>
  );
}
