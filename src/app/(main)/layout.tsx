import Footer from '@/components/layout/Footer';
import MainHeader from '@/components/layout/MainHeader';
import type { Metadata } from 'next';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'Templl.dev - Developer Templates and Services Marketplace',
    template: '%s | Templl.dev',
  },
  description:
    'Discover and purchase high-quality developer templates and services. A marketplace for developers to showcase their work and connect with clients.',
  applicationName: 'Templl.dev',
  authors: [{ name: 'Templl.dev Team' }],
  generator: 'Next.js',
  keywords: [
    'developer templates',
    'web development',
    'developer services',
    'marketplace',
    'Next.js templates',
    'React templates',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Templl.dev Team',
  publisher: 'Templl.dev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev',
    siteName: 'Templl.dev',
    title: 'Templl.dev - Developer Templates and Services Marketplace',
    description:
      'Discover and purchase high-quality developer templates and services. A marketplace for developers to showcase their work and connect with clients.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev - Developer Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templl.dev - Developer Templates and Services Marketplace',
    description:
      'Discover and purchase high-quality developer templates and services. A marketplace for developers to showcase their work and connect with clients.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev',
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
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4F394C',
      },
    ],
  },
  other: {
    'msapplication-TileColor': '#4F394C',
  },
};

// JSON-LD Schema for Organization
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://templl.dev/#organization',
  name: 'Templl.dev',
  url: 'https://templl.dev',
  logo: {
    '@type': 'ImageObject',
    url: 'https://templl.dev/logo.png',
    width: '180',
    height: '60',
  },
  sameAs: [
    'https://twitter.com/templl_dev',
    // Add other social media URLs here
  ],
  description:
    'A marketplace for developers to showcase and sell their templates and services.',
};

// JSON-LD Schema for WebSite
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://templl.dev/#website',
  name: 'Templl.dev',
  url: 'https://templl.dev',
  publisher: {
    '@id': 'https://templl.dev/#organization',
  },
  description:
    'Discover and purchase high-quality developer templates and services. A marketplace for developers to showcase their work and connect with clients.',
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://templl.dev/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  ],
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}
