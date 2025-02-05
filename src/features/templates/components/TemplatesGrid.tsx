'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import TemplateAccountCard from './TemplateAccountCard';
import { toast } from 'sonner';
import Link from 'next/link';

interface Template {
  id: string;
  template_name: string;
  stack_name: string;
  user_username: string;
  thumbnail_url: string;
  price: number;
}

interface TemplatesGridProps {
  userId: string;
}

interface TemplateResponse {
  id: string;
  template_name: string;
  thumbnail_image_url: string | null;
  price: number;
  stack_id: string;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
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

      console.log('Templates data:', data);

      const formattedTemplates = (data as unknown as TemplateResponse[]).map(
        (template) => ({
          id: template.id,
          template_name: template.template_name,
          stack_name: template.stacks?.stack_name || '',
          user_username: template.profiles?.username || '',
          thumbnail_url:
            template.thumbnail_image_url || '/placeholder-template.jpg',
          price: template.price || 0,
        })
      );

      setTemplates(formattedTemplates);
      setLoading(false);
    };

    fetchTemplates();
  }, [userId, supabase]);

  const handleEdit = (template: Template) => {
    console.log('Edit template:', template);
  };

  const handleDelete = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      setTemplates(templates.filter((t) => t.id !== templateId));
      toast.success('Template deleted successfully');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse'>
            <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link
          href={`/account/${userId}/add-templates`}
          className='group relative overflow-hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg p-6 h-48 border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-4'
        >
          <div className='h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200'>
            <svg
              className='w-6 h-6 text-purple-600 dark:text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              Add Your First Template
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Click here to share your templates
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {templates.map((template) => (
        <TemplateAccountCard
          key={template.id}
          template={template}
          onEdit={() => handleEdit(template)}
          onDelete={() => handleDelete(template.id)}
        />
      ))}
    </div>
  );
}
