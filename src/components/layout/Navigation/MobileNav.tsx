'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { NavigationItem } from './MainNav';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface MobileNavProps {
  items?: NavigationItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mobileMenu = (
    <div
      className={cn(
        'fixed inset-0 z-[100] lg:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/20 backdrop-blur-sm',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Nav Panel */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-3/4 max-w-xs bg-background border-r shadow-xl',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-end p-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 text-foreground/60 hover:text-foreground transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
          <nav className='flex-1 px-4 pb-4 space-y-6 overflow-y-auto'>
            {items?.map((item, index) => {
              if (item.items) {
                return (
                  <div key={index} className='space-y-3'>
                    <p className='text-sm font-medium text-foreground'>
                      {item.label}
                    </p>
                    <div className='ml-4 space-y-2'>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className='block py-2 text-sm text-foreground/60 hover:text-foreground transition-colors'
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={item.href!}
                  className='block py-2 text-base font-medium text-foreground/60 hover:text-foreground transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden p-2 text-foreground/60 hover:text-foreground transition-colors'
        aria-label='Toggle navigation menu'
      >
        {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </button>
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
