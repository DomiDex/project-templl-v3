'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import PublicTemplateCard from '@/features/templates/components/PublicTemplateCard';
import { toast } from 'sonner';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const breadcrumbItems = [{ label: 'Templates', href: '/templates' }];

interface Template {
  id: string;
  template_name: string;
  stack_name: string;
  user_username: string;
  thumbnail_image_url: string;
  price: number;
  path: string;
}

interface TemplateResponse {
  id: string;
  template_name: string;
  thumbnail_image_url: string | null;
  price: number;
  path: string;
  stacks:
    | {
        stack_name: string;
      }[]
    | null;
  profiles:
    | {
        username: string;
      }[]
    | null;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data: rawData, error } = await supabase.from('templates').select(`
        id,
        template_name,
        thumbnail_image_url,
        price,
        path,
        stacks!inner (
          stack_name
        ),
        profiles!inner (
          username
        )
      `);

      if (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
        return;
      }

      const data = rawData as TemplateResponse[];

      setTemplates(
        data.map((template) => ({
          id: template.id,
          template_name: template.template_name,
          stack_name: template.stacks?.stack_name || '',
          user_username: template.profiles?.username || '',
          thumbnail_image_url: template.thumbnail_image_url || '',
          price: template.price,
          path: template.path,
        }))
      );
      setLoading(false);
    };

    fetchTemplates();
  }, [supabase]);

  if (loading) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-8' />
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
          Templates
        </h1>

        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          See all templates that freelancers offer.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {templates.map((template) => (
            <PublicTemplateCard key={template.id} template={template} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
