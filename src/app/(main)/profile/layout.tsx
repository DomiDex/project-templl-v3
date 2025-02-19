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
    <Section padding='lg'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilesJsonLd),
        }}
      />
      <Container size='lg'>
        <div className='max-w-7xl mx-auto'>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className='mb-8' />

          {/* Page Header */}
          <div className='mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
              Developer Profiles
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl'>
              Discover talented developers and their work. Browse through
              profiles, templates, projects, and services.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className='mb-8 flex flex-col sm:flex-row gap-4'>
            {/* Search Input */}
            <div className='flex-1'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search developers...'
                  className='w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400'
                />
                <svg
                  className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className='flex gap-2'>
              <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
                Stack
              </button>
              <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
                Category
              </button>
              <button className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors'>
                Pro Only
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className='flex justify-between items-center mb-8'>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Showing <span className='font-medium'>50</span> developers
            </div>
            <select className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400'>
              <option value='newest'>Newest First</option>
              <option value='oldest'>Oldest First</option>
              <option value='popular'>Most Popular</option>
              <option value='templates'>Most Templates</option>
            </select>
          </div>

          {/* Main Content */}
          <div className='min-h-[50vh]'>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
