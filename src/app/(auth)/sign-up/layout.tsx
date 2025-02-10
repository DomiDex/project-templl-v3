import type { Metadata } from 'next';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign Up - Templl.dev',
  description:
    'Create your Templl.dev account to start selling templates and services, or to purchase from our marketplace.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/sign-up',
    siteName: 'Templl.dev',
    title: 'Sign Up - Templl.dev',
    description:
      'Create your Templl.dev account to start selling templates and services, or to purchase from our marketplace.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Sign Up',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up - Templl.dev',
    description:
      'Create your Templl.dev account to start selling templates and services, or to purchase from our marketplace.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/sign-up',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
  name: 'Sign Up - Templl.dev',
  description:
    'Create your Templl.dev account to start selling templates and services, or to purchase from our marketplace.',
  url: 'https://templl.dev/sign-up',
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
        name: 'Sign Up',
        item: 'https://templl.dev/sign-up',
      },
    ],
  },
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
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
