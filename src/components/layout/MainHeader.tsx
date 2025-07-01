'use client';

import { Logo } from '@/components/ui/logo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { NavigationItem } from './Navigation/MainNav';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Stack, Category } from '@/types';

const ThemeSwitch = dynamic(
  () =>
    import('@/features/theme/components/theme-switch').then(
      (mod) => mod.ThemeSwitch
    ),
  { ssr: false }
);

const SignInSystem = dynamic(
  () => import('@/features/auth/components/SignInSystem'),
  { ssr: false }
);

const MegaMenuDropdown = dynamic(
  () =>
    import('./Navigation/MegaMenuDropdown').then((mod) => mod.MegaMenuDropdown),
  { ssr: false }
);

const MobileNav = dynamic(
  () => import('./Navigation/MobileNav').then((mod) => mod.MobileNav),
  { ssr: false }
);

export default function MainHeader() {
  const [stacks, setStacks] = useState<
    Pick<Stack, 'id' | 'stack_name' | 'path'>[]
  >([]);
  const [categories, setCategories] = useState<
    Pick<Category, 'id' | 'category_name' | 'path'>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stacksResponse, categoriesResponse] = await Promise.all([
          supabase
            .from('stacks')
            .select('id, stack_name, path')
            .order('stack_name'),
          supabase
            .from('categories')
            .select('id, category_name, path')
            .order('category_name'),
        ]);

        if (stacksResponse.data) {
          setStacks(stacksResponse.data);
        }

        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const navigationItems: NavigationItem[] = [
    {
      label: 'Templates',
      href: '/templates',
    },
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Find a Talent',
      href: '/profile',
    },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b border-purple-100 dark:border-purple-100/30 bg-gradient-to-b from-white/70 to-purple-50/50 dark:from-gray-900/80 dark:to-purple-900/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1 px-4'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6'>
          <Logo width={90} height={30} />
        </Link>
        <div className='flex gap-6 md:gap-10'>
          <nav className='hidden lg:flex gap-6 items-center'>
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href!}
                className='flex items-center text-base font-medium transition-colors hover:text-foreground/80 text-foreground/60'
              >
                {item.label}
              </Link>
            ))}
            {!isLoading && (
              <>
                <MegaMenuDropdown
                  label='Stacks'
                  items={stacks.map((stack) => ({
                    label: stack.stack_name,
                    href: `/stacks/${stack.path}`,
                  }))}
                  description='Explore our curated collection of technology stacks'
                />
                <MegaMenuDropdown
                  label='Categories'
                  items={categories.map((category) => ({
                    label: category.category_name,
                    href: `/categories/${category.path}`,
                  }))}
                  description='Browse templates by category'
                  columns={4}
                />
              </>
            )}
          </nav>
          <MobileNav
            items={[
              ...navigationItems,
              {
                label: 'Stacks',
                items: isLoading
                  ? []
                  : stacks.map((stack) => ({
                      label: stack.stack_name,
                      href: `/stacks/${stack.path}`,
                    })),
              },
              {
                label: 'Categories',
                items: isLoading
                  ? []
                  : categories.map((category) => ({
                      label: category.category_name,
                      href: `/categories/${category.path}`,
                    })),
              },
            ]}
          />
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <ThemeSwitch />
          <SignInSystem />
        </div>
      </div>
    </header>
  );
}
