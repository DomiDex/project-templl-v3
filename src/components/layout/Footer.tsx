'use client';

import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Stack, Category } from '@/types';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/DomiDex',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/domidex_dev',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/domidex',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/domidex.dev',
    icon: Instagram,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [stacks, setStacks] = useState<Pick<Stack, 'id' | 'stack_name'>[]>([]);
  const [categories, setCategories] = useState<
    Pick<Category, 'id' | 'category_name'>[]
  >([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stacksResponse, categoriesResponse] = await Promise.all([
          supabase.from('stacks').select('id, stack_name').order('stack_name'),
          supabase
            .from('categories')
            .select('id, category_name')
            .order('category_name'),
        ]);

        if (stacksResponse.data) {
          setStacks(stacksResponse.data);
        }

        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-purple-800/95'>
      <Container size='lg' className='py-12'>
        <div className='flex flex-col md:flex-row justify-between gap-8'>
          {/* Logo and Description */}
          <div className='col-span-1 md:col-span-1'>
            <Logo width={124} height={36} className='mb-4' />
            <p className='text-gray-600 dark:text-gray-300 w-full  mb-6'>
              Create stunning website templates using Webflow, Framer, and
              Next.js. Join our community of designers and developers.
            </p>
            {/* Social Media Links */}
            <div className='flex space-x-4'>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                  aria-label={social.name}
                >
                  <social.icon className='w-5 h-5' />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Links */}
          <div className='flex flex-col gap-4 w-full md:w-1/4'>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Main Links
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/templates'
                  className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Stacks */}
          <div className='flex flex-col gap-4 w-full md:w-1/4'>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Stacks
            </h3>
            <ul className='space-y-3'>
              {stacks.map((stack) => (
                <li key={stack.id}>
                  <Link
                    href={`/stacks/${stack.id}`}
                    className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                  >
                    {stack.stack_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className='flex flex-col gap-4 w-full md:w-1/4'>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Categories
            </h3>
            <ul className='space-y-3'>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                  >
                    {category.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-300 flex justify-between items-center'>
          <p className='text-sm'>
            © {currentYear} Templl.dev. All rights reserved. made with love ❤️
            by{' '}
            <Link
              href='https://domidex.dev'
              className='hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              DomiDex
            </Link>
          </p>
          <div className='flex gap-4'>
            <Link
              href='/terms'
              className='text-sm hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/privacy'
              className='text-sm hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
