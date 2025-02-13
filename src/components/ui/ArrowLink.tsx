import Link from 'next/link';
import { cn } from '@/utils/cn';
import { AnimatedArrow } from './animated-arrow';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export default function ArrowLink({
  href,
  children,
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-100 dark:hover:text-purple-100 transition-colors',
        className
      )}
    >
      {children}
      <AnimatedArrow />
    </Link>
  );
}
