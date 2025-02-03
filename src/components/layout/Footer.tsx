import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

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

  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-purple-800/95'>
      <Container size='lg' className='py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='col-span-1 md:col-span-2'>
            <Logo width={124} height={36} className='mb-4' />
            <p className='text-gray-600 dark:text-gray-300 max-w-md mb-6'>
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

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {['Templates', 'Pricing', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Resources
            </h3>
            <ul className='space-y-3'>
              {['Documentation', 'Blog', 'Support', 'Terms'].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-200 dark:border-gray-700 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              © {currentYear} Templl. All rights reserved. Made with ❤️ by{' '}
              <Link
                href='https://domidex.dev'
                target='_blank'
                rel='noopener noreferrer'
                className='text-purple-500 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-200 transition-colors'
              >
                domidex.dev
              </Link>
            </p>
            <div className='flex space-x-6'>
              <Link
                href='/privacy'
                className='text-sm    text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
              >
                Privacy Policy
              </Link>

              <Link
                href='/terms'
                className='text-sm text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-300 transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
