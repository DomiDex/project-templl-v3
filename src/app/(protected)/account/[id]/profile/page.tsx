'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

import { useProfile } from '@/features/account/profile/hooks/useProfile';

export default function Page() {
  const { loading } = useProfile();
  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Profile', href: '/account/profile' },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />

        <div className='max-w-2xl'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
            Profile
          </h1>
        </div>
      </Container>
    </Section>
  );
}
