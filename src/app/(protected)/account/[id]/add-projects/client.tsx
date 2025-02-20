'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ProjectsForm from '@/features/projects/ProjectForm/components/ProjectsForm';
import ProjectAccountGrid from '@/features/projects/components/ProjectAccountGrid';
import { useParams } from 'next/navigation';

export default function AddProjectClient() {
  const params = useParams();
  const userId = params.id as string;

  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Add Project', href: '/account/add-project' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='space-y-12'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
              Add Your Project
            </h1>
            <ProjectsForm />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
              Your Projects
            </h2>
            <ProjectAccountGrid userId={userId} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
