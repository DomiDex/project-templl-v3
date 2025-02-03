import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className='w-full'>
        <input
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors',
            'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500',
            'hover:border-purple-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2',
            'dark:bg-purple-800/20 dark:border-purple-400 dark:text-gray-50',
            'dark:placeholder:text-gray-400 dark:hover:border-purple-600',
            'dark:ring-offset-purple-900 dark:focus-visible:ring-purple-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-error-light dark:border-error-dark focus-visible:ring-error-light dark:focus-visible:ring-error-dark',
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              'mt-1 text-sm',
              error
                ? 'text-error-light dark:text-error-dark'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
