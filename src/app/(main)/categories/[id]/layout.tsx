import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  const supabase = createClient();

  try {
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('path', params.id)
      .single();

    if (error || !category) {
      return {
        title: 'Category Not Found - Templl.dev',
        description: 'The requested category could not be found.',
      };
    }

    return {
      title: `${category.category_name} - Templl.dev`,
      description:
        category.meta_description ||
        `Browse ${category.category_name} templates and services on Templl.dev`,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `https://templl.dev/categories/${params.id}`,
        siteName: 'Templl.dev',
        title: `${category.category_name} - Templl.dev`,
        description:
          category.meta_description ||
          `Browse ${category.category_name} templates and services on Templl.dev`,
        images: [
          {
            url: category.og_image || '/home-og-image@2x.webp',
            width: 1200,
            height: 630,
            alt: `${category.category_name} - Templl.dev`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${category.category_name} - Templl.dev`,
        description:
          category.meta_description ||
          `Browse ${category.category_name} templates and services on Templl.dev`,
        images: [category.og_image || '/home-og-image@2x.webp'],
        creator: '@domidex_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/categories/${params.id}`,
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
    console.error('Error fetching category metadata:', error);
    return {
      title: 'Category - Templl.dev',
      description: 'Browse templates and services by category on Templl.dev',
    };
  }
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>;
}
