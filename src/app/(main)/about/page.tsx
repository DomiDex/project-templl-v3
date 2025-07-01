import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import Image from 'next/image';
const breadcrumb = [
  {
    label: 'About',
    href: '/about',
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className='py-20'>
        <Container className='flex flex-col gap-10'>
          <Breadcrumb items={breadcrumb} className='mb-2' />
          <h1 className='text-4xl font-bold'>Who is behind Templl.dev?</h1>
          <div className='w-full md:w-1/2 space-y-6 text-lg'>
            <Image
              src='/images/about.webp'
              alt='About'
              width={500}
              height={500}
              className='rounded-full'
            />
            <p>
              DomiDex&apos;s journey into the world of web development began with a
              personal quest to create a website that was not only visually
              appealing but also easy to use and navigate.
            </p>
            <p>
              This desire led him to explore the capabilities of various tools
              and technologies, ultimately discovering the power of Webflow for
              its intuitive visual interface and the versatility of React.js for
              building dynamic and interactive experiences. Along the way, he
              was drawn to the clean and efficient styling offered by Tailwind
              CSS, which allowed him to create visually appealing and responsive
              designs with ease.
            </p>
            <p>
              DomiDex&apos;s passion for web development grew as he realized the
              potential of websites to connect people and share information. He
              was inspired by the idea of creating online spaces that were not
              only functional but also enjoyable to use. This led him to focus
              on user experience (UX) design, ensuring that his websites were
              not only visually appealing but also intuitive and user-friendly.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
