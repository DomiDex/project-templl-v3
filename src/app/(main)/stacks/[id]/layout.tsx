'use server';

import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface StackLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: StackLayoutProps): Promise<Metadata> {
  const supabase = await createClient();

  try {
    const { data: stack, error } = await supabase
      .from('stacks')
      .select(
        `
        stack_name,
        meta_description,
        icon,
        og_image
      `
      )
      .eq('path', params.id)
      .single();

    if (error || !stack) {
      console.error('Stack fetch error:', error);
      return {
        title: 'Stack Not Found - Templl.dev',
        description: 'The requested stack could not be found.',
      };
    }

    return {
      title: `${stack.stack_name} - Templl.dev`,
      description:
        stack.meta_description ||
        `${stack.stack_name} templates and services available on Templl.dev`,
      openGraph: stack.og_image
        ? {
            images: [{ url: stack.og_image }],
          }
        : undefined,
    };
  } catch (error) {
    console.error('Error generating stack metadata:', error);
    return {
      title: 'Stack - Templl.dev',
      description: 'Explore stack templates and services on Templl.dev',
    };
  }
}

const generateJsonLd = async (params: { id: string }) => {
  const supabase = await createClient();
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
