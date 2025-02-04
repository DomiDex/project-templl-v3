import { Section } from '@/components/ui/section';

import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ServicesForm from '@/features/services/ServiceForm/components/ServicesForm';

export default function AddServicesPage() {
  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Add Services', href: '/account/add-services' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />

        <div className='max-w-2xl'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
            Add Your Services
          </h1>
          <ServicesForm />
        </div>
      </Container>
    </Section>
  );
}
