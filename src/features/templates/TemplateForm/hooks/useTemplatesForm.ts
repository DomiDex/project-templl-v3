import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { TemplateFormData } from '@/types';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { generateSlug } from '@/lib/utils';

export function useTemplatesForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const supabase = createClient();

  const createTemplate = async (
    data: Omit<TemplateFormData, 'user_id' | 'path'>
  ) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);

    try {
      // Validate required fields
      if (!data.template_name || !data.category_id || !data.price) {
        throw new Error('Missing required fields');
      }

      // Generate path from template name
      const path = `${generateSlug(data.template_name)}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;

      const { data: template, error: templateError } = await supabase
        .from('templates')
        .insert([
          {
            template_name: data.template_name,
            category_id: data.category_id,
            stack_id: data.stack_id || null,
            price: data.price,
            template_link: data.template_link || null,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null,
            long_description: data.long_description || null,
            og_image_url: data.og_image_url || null,
            thumbnail_image_url: data.thumbnail_image_url || null,
            user_id: user.id,
            path: path,
            featured: false,
          },
        ])
        .select()
        .single();

      if (templateError) {
        console.error('Template creation error:', templateError);
        throw new Error(templateError.message || 'Failed to create template');
      }

      return template;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    createTemplate,
    loading,
  };
}
