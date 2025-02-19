import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'About Templl.dev - Our Mission & Vision',
  description:
    'Learn about Templl.dev, the premier marketplace for developer templates and services. Discover our mission to empower developers and streamline web development.',
  keywords: [
    'about Templl.dev',
    'developer marketplace',
    'web development platform',
    'template marketplace',
    'developer services',
    'company mission',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/about',
    siteName: 'Templl.dev',
    title: 'About Templl.dev - Our Mission & Vision',
    description:
      'Learn about Templl.dev, the premier marketplace for developer templates and services. Discover our mission to empower developers and streamline web development.',
    images: [
      {
        url: '/about-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'About Templl.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Templl.dev - Our Mission & Vision',
    description:
      'Learn about Templl.dev, the premier marketplace for developer templates and services. Discover our mission to empower developers and streamline web development.',
    images: ['/about-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Schema for About Page
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://templl.dev/about/#webpage',
  url: 'https://templl.dev/about',
  name: 'About Templl.dev - Our Mission & Vision',
  description:
    'Learn about Templl.dev, the premier marketplace for developer templates and services. Discover our mission to empower developers and streamline web development.',
  isPartOf: {
    '@id': 'https://templl.dev/#website',
  },
  publisher: {
    '@id': 'https://templl.dev/#organization',
  },
  inLanguage: 'en-US',
  mainEntity: {
    '@type': 'Organization',
    name: 'Templl.dev',
    description:
      'A premier marketplace for developer templates and services, empowering developers to create better web applications faster.',
    foundingDate: '2024',
    foundingLocation: 'Online',
    email: 'contact@templl.dev',
    sameAs: [
      'https://twitter.com/templl_dev',
      // Add other social media URLs here
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://templl.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://templl.dev/about',
      },
    ],
  },
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <Section padding='lg'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd),
        }}
      />
      <Container size='lg'>
        <div className='max-w-4xl mx-auto'>
          <div className='space-y-4 mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 text-center'>
              About Templl.dev
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 text-center'>
              Empowering developers to create better web applications faster
            </p>
          </div>

          {/* Navigation Pills */}
          <nav className='flex flex-wrap justify-center gap-2 mb-12'>
            <a
              href='#mission'
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Our Mission
            </a>
            <a
              href='#team'
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Our Team
            </a>
            <a
              href='#values'
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Our Values
            </a>
            <a
              href='#contact'
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Contact Us
            </a>
          </nav>

          {/* Main Content */}
          <div className='prose prose-purple dark:prose-invert max-w-none'>
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
