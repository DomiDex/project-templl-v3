import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ProfilesGridWrapper from '@/features/profile/components/ProfilesGridWrapper';

export default function ProfilesPage() {
  const breadcrumbItems = [{ label: 'Profiles', href: '/profile' }];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='space-y-12'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
              Discover Top Developers
            </h1>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mb-12'>
              Connect with talented developers, explore their projects,
              templates, and services. Find the perfect match for your next
              project.
            </p>
          </div>
          <ProfilesGridWrapper />
        </div>
      </Container>
    </Section>
  );
}
