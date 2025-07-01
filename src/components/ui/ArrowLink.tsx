import { cn } from '@/lib/utils';
import AnimatedArrow from './AnimatedArrow';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ArrowLink({
  children,
  className,
}: Omit<ArrowLinkProps, 'href'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-100 dark:hover:text-purple-100 transition-colors cursor-pointer',
        className
      )}
    >
      {children}
      <AnimatedArrow />
    </span>
  );
}
