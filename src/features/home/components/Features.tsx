import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLink from '@/components/ui/ArrowLink';

export function Features() {
  return (
    <Section padding='lg'>
      <Container size='lg'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='w-full md:w-1/2 flex justify-center mt-8 md:mt-0'>
            <Image
              src='/images/features@2x.webp'
              alt='Features Illustration'
              width={500}
              height={500}
              className='object-contain'
              priority
            />
          </div>
          <div className='w-full md:w-1/2 space-y-8'>
            <h2 className='text-4xl font-bold'>
              Advantages of Templl for Developers and Clients
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              Utilizing our developer directory enhances visibility for
              developers while providing clients access to top-tier talent.
              Experience unparalleled networking opportunities that foster
              collaboration and innovation.
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
        </div>
      </Container>
    </Section>
  );
}
