import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import dynamic from 'next/dynamic';

const PublicServicesGrid = dynamic(
  () => import('@/features/services/components/PublicServicesGrid'),
  { ssr: false }
);

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />

        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
          All Services
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          See all services that freelancers offer.
        </p>
        <PublicServicesGrid />
      </Container>
    </Section>
  );
}
