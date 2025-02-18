'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import TemplateCard from './TemplateCard';
import { toast } from 'sonner';

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
  stack_id: string;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

interface TemplatesGridProps {
  userId: string;
}

export default function TemplatesGrid({ userId }: TemplatesGridProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from('templates')
        .select(
          `
          id,
          template_name,
          thumbnail_image_url,
          price,
          path,
          stack_id,
          stacks (
            stack_name
          ),
          profiles (
            username
          )
        `
        )
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
        return;
      }

      const formattedTemplates = (data as unknown as TemplateResponse[]).map(
        (template) => ({
          id: template.id,
          template_name: template.template_name,
          stack_name: template.stacks?.stack_name || '',
          user_username: template.profiles?.username || '',
          thumbnail_image_url:
            template.thumbnail_image_url || '/placeholder-template.jpg',
          price: template.price || 0,
          path: template.path,
        })
      );

      setTemplates(formattedTemplates);
      setLoading(false);
    };

    fetchTemplates();
  }, [userId, supabase]);

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='animate-pulse'>
            <div className='bg-gray-200 dark:bg-gray-700 aspect-[16/9] rounded-md mb-4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          No templates available
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Check back later for new templates
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
