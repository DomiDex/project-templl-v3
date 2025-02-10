import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ServiceLayoutProps): Promise<Metadata> {
  const supabase = createClient();

  try {
    const { data: service, error } = await supabase
      .from('services')
      .select(
        `
        service_name,
        meta_description,
        og_image_url,
        price,
        stacks (
          stack_name
        ),
        profiles (
          username
        )
      `
      )
      .eq('path', params.id)
      .single();

    if (error || !service) {
      return {
        title: 'Service Not Found - Templl.dev',
        description: 'The requested service could not be found.',
      };
    }

    const title = `${service.service_name} - Templl.dev`;
    const description =
      service.meta_description ||
      `${service.service_name} by ${service.profiles?.username}. Built with ${service.stacks?.stack_name}. Available on Templl.dev`;

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `https://templl.dev/services/${params.id}`,
        siteName: 'Templl.dev',
        title,
        description,
        images: [
          {
            url: service.og_image_url || '/home-og-image@2x.webp',
            width: 1200,
            height: 630,
            alt: service.service_name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [service.og_image_url || '/home-og-image@2x.webp'],
        creator: '@domidex_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/services/${params.id}`,
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
    console.error('Error fetching service metadata:', error);
    return {
      title: 'Service - Templl.dev',
      description:
        'Professional web development and design services on Templl.dev',
    };
  }
}

// JSON-LD Schema for better SEO
const generateJsonLd = async (params: { id: string }) => {
  const supabase = createClient();
  const { data: service } = await supabase
    .from('services')
    .select(
      `
      service_name,
      meta_description,
      og_image_url,
      price,
      stacks (stack_name),
      profiles (username)
    `
    )
    .eq('path', params.id)
    .single();

  if (!service) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.service_name,
    description: service.meta_description,
    provider: {
      '@type': 'Person',
      name: service.profiles?.username,
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD',
    },
    image: service.og_image_url || '/home-og-image@2x.webp',
    url: `https://templl.dev/services/${params.id}`,
    category: service.stacks?.stack_name,
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
          name: 'Services',
          item: 'https://templl.dev/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.service_name,
          item: `https://templl.dev/services/${params.id}`,
        },
      ],
    },
  };
};

export default async function ServiceLayout({
  children,
  params,
}: ServiceLayoutProps) {
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
