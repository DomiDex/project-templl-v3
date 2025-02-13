import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import ArrowLink from '@/components/ui/ArrowLink';
import HeroImageAnimation from './HeroImageAnimation';

export default function HomeHero() {
  return (
    <Section padding='lg' className='bg-background'>
      <Container size='lg'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='w-full md:w-1/2 flex flex-col   space-y-6'>
            <h1 className='text-4xl font-bold'>
              Discover Top Developers <br className='hidden md:block' /> in One
              Easy Place
            </h1>
            <p className='text-muted-foreground'>
              Welcome to our Developer Directory, where you can find skilled
              developers ready to bring your projects to life. Whether you're
              looking to hire or join our community, we have the resources you
              need.
            </p>
            <div className='flex justify-left items-center gap-4'>
              <Link
                href='/templates'
                className='px-4 py-1 rounded-md bg-purple-500 dark:bg-purple-100 text-white dark:text-purple-900'
              >
                Explore Templates
              </Link>
              <Link href='/sign-up' className='w-fit'>
                <ArrowLink href='/sign-up'>Register as a Talent</ArrowLink>
              </Link>
            </div>
          </div>
          <div className='w-1/3'>
            <HeroImageAnimation />
          </div>
        </div>
      </Container>
    </Section>
  );
}
