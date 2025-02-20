import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Developer Profiles - Templl.dev',
  description:
    'Discover talented developers on Templl.dev. Browse through developer profiles, their templates, projects, and services.',
  keywords: [
    'developer profiles',
    'web developers',
    'freelance developers',
    'developer portfolio',
    'developer services',
    'developer templates',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/profile',
    siteName: 'Templl.dev',
    title: 'Developer Profiles - Templl.dev',
    description:
      'Discover talented developers on Templl.dev. Browse through developer profiles, their templates, projects, and services.',
    images: [
      {
        url: '/profiles-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Developer Profiles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Profiles - Templl.dev',
    description:
      'Discover talented developers on Templl.dev. Browse through developer profiles, their templates, projects, and services.',
    images: ['/profiles-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/profile',
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

// JSON-LD Schema for Profile Listing Page
const profilesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://templl.dev/profile/#webpage',
  url: 'https://templl.dev/profile',
  name: 'Developer Profiles - Templl.dev',
  description:
    'Discover talented developers on Templl.dev. Browse through developer profiles, their templates, projects, and services.',
  isPartOf: {
    '@id': 'https://templl.dev/#website',
  },
  publisher: {
    '@id': 'https://templl.dev/#organization',
  },
  inLanguage: 'en-US',
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
        name: 'Profiles',
        item: 'https://templl.dev/profile',
      },
    ],
  },
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Profiles', href: '/profile' },
  ];

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilesJsonLd) }}
      />
      <Section padding='lg'>
        <Container>
          <Breadcrumb items={breadcrumbItems} className='mb-6' />
          <div className='min-h-[50vh]'>{children}</div>
        </Container>
      </Section>
    </>
  );
}
