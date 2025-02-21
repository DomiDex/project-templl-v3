import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteFont } from '@/fonts';
import { ThemeProvider } from '@/features/theme/components/theme-provider';
import ToastProvider from '@/components/providers/ToastProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://templl.dev'),
  title: 'Templl.dev - Developer Templates and Services Marketplace',
  description:
    'Discover and purchase high-quality developer templates and services. A marketplace for developers to showcase their work and connect with clients.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#242424' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content={viewport.toString()} />
      </head>
      <body className={`${siteFont.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
