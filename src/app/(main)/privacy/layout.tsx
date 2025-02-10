import type { Metadata } from 'next';

interface PrivacyLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Privacy Policy - Templl.dev',
  description:
    'Learn about how we collect, use, and protect your personal information at Templl.dev. Our privacy policy outlines our commitment to data security and user privacy.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/privacy',
    siteName: 'Templl.dev',
    title: 'Privacy Policy - Templl.dev',
    description:
      'Learn about how we collect, use, and protect your personal information at Templl.dev. Our privacy policy outlines our commitment to data security and user privacy.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Templl.dev',
    description:
      'Learn about how we collect, use, and protect your personal information at Templl.dev. Our privacy policy outlines our commitment to data security and user privacy.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/privacy',
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
  '@type': 'WebPage',
  name: 'Privacy Policy - Templl.dev',
  description:
    'Learn about how we collect, use, and protect your personal information at Templl.dev. Our privacy policy outlines our commitment to data security and user privacy.',
  url: 'https://templl.dev/privacy',
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
        name: 'Privacy Policy',
        item: 'https://templl.dev/privacy',
      },
    ],
  },
};

export default function PrivacyLayout({ children }: PrivacyLayoutProps) {
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
