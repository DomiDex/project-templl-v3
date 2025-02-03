import { Logo } from '@/components/ui/logo';
import { MainNav } from './Navigation/MainNav';
import { ThemeSwitch } from '@/features/theme/components/theme-switch';
import SignInSystem from '@/features/auth/components/SignInSystem';
import Link from 'next/link';
import { NavigationItem } from './Navigation/MainNav';

export default function MainHeader() {
  const navigationItems: NavigationItem[] = [
    {
      label: 'Templates',
      items: [
        {
          label: 'Webflow',
          href: '/templates/webflow',
        },
        {
          label: 'Framer',
          href: '/templates/framer',
        },
        {
          label: 'Next.js',
          href: '/templates/nextjs',
        },
      ],
    },
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Resources',
      items: [
        {
          label: 'Blog',
          href: '/blog',
        },
        {
          label: 'Documentation',
          href: '/docs',
        },
        {
          label: 'Support',
          href: '/support',
        },
      ],
    },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b border-purple-100 dark:border-purple-100/30 bg-gradient-to-b from-white/70 to-purple-50/50 dark:from-gray-900/80 dark:to-purple-900/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1 px-4'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6'>
          <Logo width={90} height={30} />
        </Link>
        <MainNav items={navigationItems} />
        <div className='ml-auto flex items-center gap-2'>
          <ThemeSwitch />
          <SignInSystem />
        </div>
      </div>
    </header>
  );
}
