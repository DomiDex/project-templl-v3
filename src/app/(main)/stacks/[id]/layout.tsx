import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

interface StackLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: StackLayoutProps): Promise<Metadata> {
  const { id } = await params;
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
      .eq('path', id)
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

// JSON-LD generation removed - layouts cannot be async in Next.js
// Consider moving this to the page component or a separate metadata file

export default function StackLayout({
  children,
}: StackLayoutProps) {
  return <>{children}</>;
}
