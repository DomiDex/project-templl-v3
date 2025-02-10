import type { Metadata } from 'next';

interface TemplateLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Browse Templates - Templl.dev',
  description:
    'Explore our collection of premium website templates built with Webflow, Framer, and Next.js. Find the perfect starting point for your next web project.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/templates',
    siteName: 'Templl.dev',
    title: 'Browse Templates - Templl.dev',
    description:
      'Explore our collection of premium website templates built with Webflow, Framer, and Next.js. Find the perfect starting point for your next web project.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Templates - Templl.dev',
    description:
      'Explore our collection of premium website templates built with Webflow, Framer, and Next.js. Find the perfect starting point for your next web project.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/templates',
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
  name: 'Browse Templates - Templl.dev',
  description:
    'Explore our collection of premium website templates built with Webflow, Framer, and Next.js. Find the perfect starting point for your next web project.',
  url: 'https://templl.dev/templates',
  provider: {
    '@type': 'Organization',
    name: 'Templl.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://templl.dev/logo.png',
    },
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
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
        name: 'Templates',
        item: 'https://templl.dev/templates',
      },
    ],
  },
};

export default function TemplateLayout({ children }: TemplateLayoutProps) {
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
