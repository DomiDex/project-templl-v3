import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { TestimonialCard } from './TestimonialCard';

const testimonials = [
  {
    content:
      'Working with Templl has been transformative for our development process. The quality of developers and the seamless collaboration platform have exceeded our expectations.',
    author: 'Sarah Johnson',
    role: 'Tech Lead',
    company: 'iLaboratory',
    image: '/images/sarah-profile@X2.webp',
  },
  {
    content:
      "As a developer, Templl has opened up amazing opportunities for me. The platform's focus on quality and the supportive community have helped me grow professionally.",
    author: 'Michael Barbier',
    role: 'Senior Developer',
    company: 'freelance',
    image: '/images/micheal-profile@2X.webp',
  },
  {
    content:
      "The talent pool on Templl is exceptional. We've found amazing developers who've brought fresh perspectives and superior skills to our projects.",
    author: 'Diego Rodriguez',
    role: 'Product Manager',
    company: 'CredibleFlow',
    image: '/images/diego-profile@2X.webp',
  },
];

export function Testimonials() {
  return (
    <Section padding='lg' className='bg-gray-50 dark:bg-gray-800/50'>
      <Container size='lg'>
        <div className='space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-4xl font-bold'>What Our Community Says</h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Discover why developers and clients choose Templl for their
              development needs
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
