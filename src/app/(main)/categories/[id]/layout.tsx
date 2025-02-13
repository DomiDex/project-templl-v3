import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  const supabase = await createClient();

  try {
    const { data: category, error } = await supabase
      .from('categories')
      .select(
        `
        category_name,
        meta_description,
        og_image,
        path
      `
      )
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
      openGraph: category.og_image
        ? {
            images: [{ url: category.og_image }],
          }
        : undefined,
    };
  } catch (error) {
    console.error('Error generating category metadata:', error);
    return {
      title: 'Category - Templl.dev',
      description: 'Explore category templates and services on Templl.dev',
    };
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
