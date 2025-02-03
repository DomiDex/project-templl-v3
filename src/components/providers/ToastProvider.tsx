'use client';

import { Toaster } from 'sonner';
import { useThemeStore } from '@/features/theme/stores/theme-store';

export default function ToastProvider() {
  const { theme } = useThemeStore();

  return (
    <Toaster
      position='top-right'
      expand
      richColors
      theme={theme as 'light' | 'dark'}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
}
