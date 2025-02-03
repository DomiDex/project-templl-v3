import React from 'react';
import { cn } from '@/lib/utils';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export default function FormLabel({
  children,
  required,
  className,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium',
        'text-gray-700 dark:text-gray-200',
        required &&
          'after:content-["*"] after:ml-0.5 after:text-error-light dark:after:text-error-dark',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
