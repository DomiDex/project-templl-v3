'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../stores/theme-store';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className='rounded-md bg-background p-2 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <Moon className='h-5 w-5' />
      ) : (
        <Sun className='h-5 w-5' />
      )}
    </button>
  );
}
