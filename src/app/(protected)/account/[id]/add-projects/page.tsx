import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ProjectsForm from '@/features/projects/ProjectForm/components/ProjectsForm';

export default function AddProjectPage() {
  const breadcrumbItems = [
    { label: 'Account', href: '/account' },
    { label: 'Add Project', href: '/account/add-project' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='max-w-2xl'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
            Add Your Project
          </h1>
          <ProjectsForm />
        </div>
      </Container>
    </Section>
  );
}
