import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface StackLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: StackLayoutProps): Promise<Metadata> {
  const supabase = createClient();

  try {
    const { data: stack, error } = await supabase
      .from('stacks')
      .select(
        `
        stack_name,
        meta_description,
        og_image_url,
        logo_url
      `
      )
      .eq('path', params.id)
      .single();

    if (error || !stack) {
      return {
        title: 'Stack Not Found - Templl.dev',
        description: 'The requested technology stack could not be found.',
      };
    }

    const title = `${stack.stack_name} Templates & Services - Templl.dev`;
    const description =
      stack.meta_description ||
      `Explore ${stack.stack_name} templates and professional services on Templl.dev. Find the perfect starting point for your next project.`;

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `https://templl.dev/stacks/${params.id}`,
        siteName: 'Templl.dev',
        title,
        description,
        images: [
          {
            url: stack.og_image_url || '/home-og-image@2x.webp',
            width: 1200,
            height: 630,
            alt: `${stack.stack_name} - Templl.dev`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [stack.og_image_url || '/home-og-image@2x.webp'],
        creator: '@domidex_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/stacks/${params.id}`,
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
  } catch (error) {
    console.error('Error fetching stack metadata:', error);
    return {
      title: 'Technology Stack - Templl.dev',
      description:
        'Explore technology stack templates and services on Templl.dev',
    };
  }
}

const generateJsonLd = async (params: { id: string }) => {
  const supabase = createClient();
  const { data: stack } = await supabase
    .from('stacks')
    .select(
      `
      stack_name,
      meta_description,
      og_image_url,
      logo_url
    `
    )
    .eq('path', params.id)
    .single();

  if (!stack) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${stack.stack_name} Templates & Services - Templl.dev`,
    description: stack.meta_description,
    url: `https://templl.dev/stacks/${params.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'Templl.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://templl.dev/logo.png',
      },
    },
    image: stack.logo_url || stack.og_image_url || '/home-og-image@2x.webp',
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
          name: 'Stacks',
          item: 'https://templl.dev/stacks',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: stack.stack_name,
          item: `https://templl.dev/stacks/${params.id}`,
        },
      ],
    },
  };
};

export default async function StackLayout({
  children,
  params,
}: StackLayoutProps) {
  const jsonLd = await generateJsonLd(params);

  return (
    <>
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
