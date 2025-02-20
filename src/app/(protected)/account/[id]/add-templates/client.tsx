'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import TemplatesForm from '@/features/templates/TemplateForm/components/TemplatesForm';
import TemplateAccountGrid from '@/features/templates/components/TemplateAccountGrid';
import { useParams } from 'next/navigation';

const AddTemplateClient = () => {
  const params = useParams();
  const userId = params.id as string;

  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Add Template', href: '/account/add-templates' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='space-y-12'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
              Add Your Template
            </h1>
            <TemplatesForm />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
              Your Templates
            </h2>
            <TemplateAccountGrid userId={userId} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AddTemplateClient;
