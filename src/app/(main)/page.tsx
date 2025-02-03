import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ThemeSwitch } from '@/features/theme/components/theme-switch';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section background='purple.500' darkBackground='purple.700' padding='xl'>
        <Container flex direction='col' items='center' justify='center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            Welcome to Our Site
          </h1>
          <p className='text-lg text-gray-100 mb-8 text-center max-w-2xl'>
            A modern Next.js template with TypeScript, Tailwind CSS, and more.
          </p>
          <ThemeSwitch />
        </Container>
      </Section>

      {/* Features Section */}
      <Section background='background' padding='lg'>
        <Container>
          <h2 className='text-3xl font-bold mb-8 text-center'>Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md'
              >
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background='purple.400' darkBackground='purple.600' padding='lg'>
        <Container flex direction='col' items='center' justify='center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Get Started Today
          </h2>
          <p className='text-lg text-gray-100 mb-8 text-center max-w-2xl'>
            Join us and start building amazing applications with our template.
          </p>
          <button className='bg-white text-purple-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors'>
            Start Building
          </button>
        </Container>
      </Section>
    </>
  );
}

const features = [
  {
    title: 'Type-Safe Development',
    description:
      'Built with TypeScript for enhanced developer experience and fewer bugs.',
  },
  {
    title: 'Modern Styling',
    description:
      'Utilizes Tailwind CSS for rapid and responsive UI development.',
  },
  {
    title: 'Dark Mode Support',
    description:
      'Seamless dark mode integration with system preference detection.',
  },
];
