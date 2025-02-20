'use client';

import AccountHero from '@/features/account/components/AccountHero';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ServicesGrid from '@/features/services/components/ServicesGrid';
import TemplateAccountGrid from '@/features/templates/components/TemplateAccountGrid';
import { useParams } from 'next/navigation';
import ProjectAccountGrid from '@/features/projects/components/ProjectAccountGrid';

export default function Page() {
  const params = useParams();
  const userId = params.id as string;

  return (
    <>
      <AccountHero />
      <Section padding='lg'>
        <Container size='lg'>
          <div className='space-y-12'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
                Your Projects
              </h2>
              <ProjectAccountGrid userId={userId} />
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
                Your Services
              </h2>
              <ServicesGrid userId={userId} />
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
                Your Templates
              </h2>
              <TemplateAccountGrid userId={userId} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
