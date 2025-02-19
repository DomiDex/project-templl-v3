import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { InputCard } from './InputCard';

const inputs = [
  {
    title: 'Find Top Talent with Our Advanced Search Filters',
    description:
      'Easily narrow down your search to find the perfect developer.',
    link: '/developers',
    icon: '🔍',
  },
  {
    title: 'Find Top Services that fit your needs',
    description: 'Discorver high quality services that meet your requirement',
    link: '/services',
    icon: '⚡',
  },
  {
    title: 'Showcase Your Work with Project Portfolios',
    description:
      'Highlight your skills and past projects to attract potential clients.',
    link: '/sign-up',
    icon: '✨',
  },
];

export function InputsSection() {
  return (
    <Section padding='lg' className='bg-gray-50 dark:bg-purple-900/50'>
      <Container size='lg'>
        <div className='space-y-12'>
          <div className='flex justify-between items-center'>
            <div className='space-y-4'>
              <h2 className='text-4xl font-bold'>
                Explore the Templl for Your <br className='hidden md:block' />{' '}
                Project Requirement
              </h2>
              <p className='text-gray-600 dark:text-gray-400 max-w-2xl'>
                Find the perfect solution for your development needs
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {inputs.map((input) => (
              <InputCard key={input.title} {...input} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
