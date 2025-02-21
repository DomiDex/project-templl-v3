import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteFont } from '@/fonts';
import { ThemeProvider } from '@/features/theme/components/theme-provider';
import ToastProvider from '@/components/providers/ToastProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://templl.dev'),
  title: {
    default: 'Templl.dev - Developer Templates and Services',
    template: '%s | Templl.dev',
  },
  description:
    'Discover and share developer templates, projects, and services. Connect with top developers and find the perfect starting point for your next web project.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templl.dev',
    siteName: 'Templl.dev',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Templl.dev - Developer Templates and Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@templl_dev',
    creator: '@domidex_dev',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#242424' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${siteFont.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
