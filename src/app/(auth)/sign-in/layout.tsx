import type { Metadata } from 'next';

interface SignInLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign In - Templl.dev',
  description:
    'Sign in to your Templl.dev account to access your templates, services, and manage your profile.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev/sign-in',
    siteName: 'Templl.dev',
    title: 'Sign In - Templl.dev',
    description:
      'Sign in to your Templl.dev account to access your templates, services, and manage your profile.',
    images: [
      {
        url: '/home-og-image@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev Sign In',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In - Templl.dev',
    description:
      'Sign in to your Templl.dev account to access your templates, services, and manage your profile.',
    images: ['/home-og-image@2x.webp'],
    creator: '@domidex_dev',
    site: '@templl_dev',
  },
  alternates: {
    canonical: 'https://templl.dev/sign-in',
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
  name: 'Sign In - Templl.dev',
  description:
    'Sign in to your Templl.dev account to access your templates, services, and manage your profile.',
  url: 'https://templl.dev/sign-in',
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
        name: 'Sign In',
        item: 'https://templl.dev/sign-in',
      },
    ],
  },
};

export default function SignInLayout({ children }: SignInLayoutProps) {
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
