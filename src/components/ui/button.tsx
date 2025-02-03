import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'md', fullWidth, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700':
              variant === 'default',
            'border border-purple-500 bg-transparent text-purple-500 hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-400':
              variant === 'outline',
            'text-purple-500 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/50':
              variant === 'ghost',
            'h-9 px-4': size === 'sm',
            'h-10 px-8': size === 'md',
            'h-11 px-8': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
