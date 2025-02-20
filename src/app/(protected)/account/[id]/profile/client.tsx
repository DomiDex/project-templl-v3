'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ProfileForm from '@/features/account/profile/components/ProfileForm';
import { useProfile } from '@/features/account/profile/hooks/useProfile';

export default function ProfileClient() {
  const { loading } = useProfile();

  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Profile', href: '/account/profile' },
  ];

  const pageContent = (
    <div className='space-y-12'>
      <div className='max-w-2xl'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
          Profile
        </h1>
        <ProfileForm />
      </div>
    </div>
  );

  const loadingSkeleton = (
    <div className='space-y-12'>
      <div className='max-w-2xl animate-pulse'>
        <div className='h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8' />
        <div className='space-y-6'>
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded-lg' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2' />
                <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded' />
              </div>
            ))}
          </div>
          <div>
            <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2' />
            <div className='h-24 bg-gray-200 dark:bg-gray-700 rounded' />
          </div>
        </div>
      </div>

      <div className='max-w-3xl animate-pulse'>
        <div className='h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6' />
        <div className='flex gap-4'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full'
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        {loading ? loadingSkeleton : pageContent}
      </Container>
    </Section>
  );
}
