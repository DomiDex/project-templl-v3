import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function Page() {
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
            Check your email
          </h1>
          <p className='text-gray-600 dark:text-gray-400 max-w-sm'>
            We sent you a verification link. Please check your email to verify
            your account.
          </p>
          <div className='pt-4'>
            <Link
              href='/sign-in'
              className='bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 transition-colors'
            >
              Return to sign in
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
