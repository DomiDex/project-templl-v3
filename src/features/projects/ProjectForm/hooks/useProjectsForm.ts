import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProjectFormData } from '@/types';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { generateSlug } from '@/lib/utils';
import { useProjectCount } from '../../hooks/useProjectCount';

export function useProjectsForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { canPublishMore } = useProjectCount();
  const supabase = createClient();

  const createProject = async (
    data: Omit<ProjectFormData, 'user_id' | 'path'>
  ) => {
    if (!user) throw new Error('User not authenticated');
    if (!canPublishMore) {
      throw new Error('You have reached the maximum limit of 3 projects');
    }

    setLoading(true);

    try {
      // Validate required fields
      if (!data.project_name || !data.stack_id) {
        throw new Error('Missing required fields');
      }

      const path = `${generateSlug(data.project_name)}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            project_name: data.project_name,
            stack_id: data.stack_id,
            project_link: data.project_link || null,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null,
            long_description: data.long_description || null,
            og_image_url: data.og_image_url || null,
            user_id: user.id,
            path,
          },
        ])
        .select()
        .single();

      if (projectError) {
        console.error('Project creation error:', projectError);
        throw new Error(projectError.message || 'Failed to create project');
      }

      // Increment project count
      const { error: countError } = await supabase.rpc(
        'increment_project_count',
        { user_id_input: user.id }
      );

      if (countError) {
        console.error('Project count increment error:', countError);
      }

      return project;
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
    createProject,
    loading,
  };
}
