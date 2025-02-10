import type { Metadata } from 'next';

interface CategoryLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Browse Categories - Templl.dev',
  description:
    'Explore our curated collection of website templates and services organized by categories. Find the perfect template for your next web project.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/categories',
    siteName: 'Templl.dev',
    title: 'Browse Categories - Templl.dev',
    description:
      'Explore our curated collection of website templates and services organized by categories. Find the perfect template for your next web project.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Categories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Categories - Templl.dev',
    description:
      'Explore our curated collection of website templates and services organized by categories. Find the perfect template for your next web project.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/categories',
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

// JSON-LD Schema for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Browse Categories - Templl.dev',
  description:
    'Explore our curated collection of website templates and services organized by categories. Find the perfect template for your next web project.',
  url: 'https://templl.dev/categories',
  publisher: {
    '@type': 'Organization',
    name: 'Templl.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://templl.dev/logo.png',
    },
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
        name: 'Categories',
        item: 'https://templl.dev/categories',
      },
    ],
  },
};

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
