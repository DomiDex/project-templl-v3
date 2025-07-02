import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <Section fullHeight noPadding>
      <Container
        flex
        direction='col'
        items='center'
        justify='center'
        className='h-screen'
      >
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
            Authentication Error
          </h1>
          <p className='text-gray-600 dark:text-gray-400 max-w-sm'>
            There was an error during the authentication process. Please try again.
          </p>
          <div className='pt-4 space-x-4'>
            <Link
              href='/sign-in'
              className='bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 transition-colors inline-block'
            >
              Sign In
            </Link>
            <Link
              href='/sign-up'
              className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors inline-block'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}