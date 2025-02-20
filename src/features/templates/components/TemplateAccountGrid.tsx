'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import TemplateAccountCard from './TemplateAccountCard';
import EditTemplateModal from './EditTemplateModal';

interface SupabaseTemplate {
  id: string;
  template_name: string;
  stack_id: string | null;
  category_id: string | null;
  user_id: string;
  price: number;
  template_link: string | null;
  meta_title: string | null;
  meta_description: string | null;
  long_description: string | null;
  og_image_url: string | null;
  thumbnail_image_url: string | null;
  featured: boolean;
  stacks: { stack_name: string }[] | null;
  profiles: { username: string }[] | null;
}

interface TemplateWithRelations {
  id: string;
  template_name: string;
  stack_id?: string;
  category_id?: string;
  user_id: string;
  price: number;
  template_link?: string;
  meta_title?: string;
  meta_description?: string;
  long_description?: string;
  og_image_url?: string;
  thumbnail_image_url?: string;
  featured: boolean;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

interface TemplateAccountGridProps {
  userId: string;
}

export default function TemplateAccountGrid({
  userId,
}: TemplateAccountGridProps) {
  const [templates, setTemplates] = useState<TemplateWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateWithRelations | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const supabase = createClient();

  const fetchTemplates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select(
          `
          id,
          template_name,
          stack_id,
          category_id,
          user_id,
          price,
          template_link,
          meta_title,
          meta_description,
          long_description,
          og_image_url,
          thumbnail_image_url,
          featured,
          stacks (
            stack_name
          ),
          profiles (
            username
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to handle null values and array relations
      const transformedData = ((data as SupabaseTemplate[]) || []).map(
        (template) => ({
          ...template,
          stack_id: template.stack_id || undefined,
          category_id: template.category_id || undefined,
          template_link: template.template_link || undefined,
          meta_title: template.meta_title || undefined,
          meta_description: template.meta_description || undefined,
          long_description: template.long_description || undefined,
          og_image_url: template.og_image_url || undefined,
          thumbnail_image_url: template.thumbnail_image_url || undefined,
          stacks: template.stacks?.[0] || null,
          profiles: template.profiles?.[0] || null,
        })
      );

      setTemplates(transformedData);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleEdit = (template: TemplateWithRelations) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast.success('Template deleted successfully');
      fetchTemplates(); // Refresh the list
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

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

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {templates.map((template) => (
          <TemplateAccountCard
            key={template.id}
            template={{
              id: template.id,
              template_name: template.template_name,
              stack_name: template.stacks?.stack_name || '',
              user_username: template.profiles?.username || '',
              thumbnail_url:
                template.thumbnail_image_url || '/placeholder-template.jpg',
              price: template.price,
            }}
            onEdit={() => handleEdit(template)}
            onDelete={() => handleDelete(template.id)}
          />
        ))}
      </div>

      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTemplate(null);
        }}
        template={
          selectedTemplate
            ? {
                id: selectedTemplate.id,
                template_name: selectedTemplate.template_name,
                stack_id: selectedTemplate.stack_id,
                category_id: selectedTemplate.category_id,
                price: selectedTemplate.price,
                template_link: selectedTemplate.template_link,
                meta_title: selectedTemplate.meta_title,
                meta_description: selectedTemplate.meta_description,
                long_description: selectedTemplate.long_description,
                og_image_url: selectedTemplate.og_image_url,
                thumbnail_image_url: selectedTemplate.thumbnail_image_url,
              }
            : null
        }
      />
    </>
  );
}
