import { cn } from '@/lib/utils';
import { forwardRef, useState, useEffect } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  maxCharacters?: number;
  showCharacterCount?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      error,
      helperText,
      maxCharacters = 0,
      showCharacterCount = false,
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const [characterCount, setCharacterCount] = useState(0);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
      const currentCount = value?.toString().length || 0;
      setCharacterCount(currentCount);
      setShowError(maxCharacters > 0 && currentCount > maxCharacters);
    }, [value, maxCharacters]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxCharacters > 0 && e.target.value.length > maxCharacters) {
        return;
      }
      onChange?.(e);
    };

    return (
      <div className='w-full'>
        <textarea
          className={cn(
            'flex w-full rounded-md border px-3 py-2 text-sm transition-colors min-h-[100px] resize-y',
            'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500',
            'hover:border-purple-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2',
            'dark:bg-purple-800/20 dark:border-purple-400 dark:text-gray-50',
            'dark:placeholder:text-gray-400 dark:hover:border-purple-600',
            'dark:ring-offset-purple-900 dark:focus-visible:ring-purple-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            (error || showError) &&
              'border-error-light dark:border-error-dark focus-visible:ring-error-light dark:focus-visible:ring-error-dark',
            className
          )}
          ref={ref}
          onChange={handleChange}
          value={value}
          {...props}
        />
        <div className='flex justify-between mt-1'>
          {(helperText || showError) && (
            <p
              className={cn(
                'text-sm',
                error || showError
                  ? 'text-error-light dark:text-error-dark'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {showError
                ? `Maximum ${maxCharacters} characters allowed`
                : helperText}
            </p>
          )}
          {showCharacterCount && (
            <p
              className={cn(
                'text-sm ml-auto',
                showError
                  ? 'text-error-light dark:text-error-dark'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {characterCount}/{maxCharacters}
            </p>
          )}
        </div>
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea };
