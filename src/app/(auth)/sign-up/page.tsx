import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import SignUpForm from '@/features/auth/components/SignUpform';

export default function Page() {
  return (
    <main>
      <Section fullHeight noPadding>
        <Container
          flex
          direction='row'
          items='center'
          justify='between'
          className='h-screen'
          size='full'
          noPadding
        >
          <div className='hidden md:flex md:w-2/3 flex-col items-center justify-center'>
            <div className='relative w-96 h-96'>
              <Image
                src='/images/cool-text.webp'
                alt='Cool Text'
                width={384}
                height={384}
                priority
                className='object-contain'
              />
            </div>
          </div>
          <div className='w-full h-screen md:w-1/3 bg-gray-50 dark:bg-purple-800 flex flex-col items-center justify-center'>
            <div className='w-full max-w-sm px-8'>
              <h1 className='text-2xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50'>
                Sign Up
              </h1>
              <SignUpForm />
              <p className='text-sm text-center mt-6 text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='text-purple-500 hover:text-purple-600 dark:text-purple-200 dark:hover:text-purple-100 transition-colors'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
