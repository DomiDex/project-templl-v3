'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ServicesForm from '@/features/services/ServiceForm/components/ServicesForm';
import ServicesGrid from '@/features/services/components/ServicesGrid';
import { useParams } from 'next/navigation';

export default function AddServicesClient() {
  const params = useParams();
  const userId = params.id as string;

  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Add Services', href: '/account/add-services' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='space-y-12'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
              Add Your Services
            </h1>
            <ServicesForm />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
              Your Services
            </h2>
            <ServicesGrid userId={userId} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
