import type { Metadata } from 'next';

interface ServiceLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Professional Services - Templl.dev',
  description:
    'Discover our range of professional web development and design services. From custom development to template customization, find the perfect service for your project.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/services',
    siteName: 'Templl.dev',
    title: 'Professional Services - Templl.dev',
    description:
      'Discover our range of professional web development and design services. From custom development to template customization, find the perfect service for your project.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Services - Templl.dev',
    description:
      'Discover our range of professional web development and design services. From custom development to template customization, find the perfect service for your project.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/services',
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
  '@type': 'Service',
  name: 'Professional Web Development Services - Templl.dev',
  description:
    'Discover our range of professional web development and design services. From custom development to template customization, find the perfect service for your project.',
  provider: {
    '@type': 'Organization',
    name: 'Templl.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://templl.dev/logo.png',
    },
  },
  url: 'https://templl.dev/services',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Template Customization',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Development',
        },
      },
    ],
  },
};

export default function ServiceLayout({ children }: ServiceLayoutProps) {
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
