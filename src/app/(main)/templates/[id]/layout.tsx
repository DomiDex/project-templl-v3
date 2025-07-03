import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface TemplateLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TemplateLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  try {
    const { data: template, error } = await supabase
      .from('templates')
      .select(
        `
        template_name,
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
      .eq('path', id)
      .single();

    if (error || !template) {
      return {
        title: 'Template Not Found - Templl.dev',
        description: 'The requested template could not be found.',
      };
    }

    const title = `${template.template_name} - Templl.dev`;
    const description =
      template.meta_description ||
      `${template.template_name} by ${template.profiles?.[0]?.username}. Built with ${template.stacks?.[0]?.stack_name}. Available on Templl.dev`;

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `https://templl.dev/templates/${id}`,
        siteName: 'Templl.dev',
        title,
        description,
        images: [
          {
            url: template.og_image_url || '/home-og-image@2x.webp',
            width: 1200,
            height: 630,
            alt: template.template_name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [template.og_image_url || '/home-og-image@2x.webp'],
        creator: '@domidex_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/templates/${id}`,
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
    console.error('Error fetching template metadata:', error);
    return {
      title: 'Template - Templl.dev',
      description: 'Professional website templates on Templl.dev',
    };
  }
}

const generateJsonLd = async (params: Promise<{ id: string }>) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data: template } = await supabase
    .from('templates')
    .select(
      `
      template_name,
      meta_description,
      og_image_url,
      price,
      stacks (stack_name),
      profiles (username)
    `
    )
    .eq('path', id)
    .single();

  if (!template) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: template.template_name,
    description: template.meta_description,
    image: template.og_image_url || '/home-og-image@2x.webp',
    url: `https://templl.dev/templates/${id}`,
    brand: {
      '@type': 'Brand',
      name: 'Templl.dev',
    },
    author: {
      '@type': 'Person',
      name: template.profiles?.[0]?.username,
    },
    offers: {
      '@type': 'Offer',
      price: template.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    category: template.stacks?.[0]?.stack_name,
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
        {
          '@type': 'ListItem',
          position: 3,
          name: template.template_name,
          item: `https://templl.dev/templates/${id}`,
        },
      ],
    },
  };
};

export default async function TemplateLayout({
  children,
  params,
}: TemplateLayoutProps) {
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
