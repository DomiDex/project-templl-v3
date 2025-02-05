import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const PROJECT_LIMIT = 3;

export function useProjectCount() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchProjectCount = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('project_counts')
          .select('project_count')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        // Ensure count never exceeds limit
        setProjectCount(Math.min(data?.project_count || 0, PROJECT_LIMIT));
      } catch (error) {
        console.error('Error fetching project count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectCount();
  }, [user, supabase]);

  const canPublishMore = projectCount < PROJECT_LIMIT;
  const remainingProjects = Math.max(PROJECT_LIMIT - projectCount, 0);
  const totalLimit = PROJECT_LIMIT;

  return {
    projectCount,
    canPublishMore,
    remainingProjects,
    totalLimit,
    loading,
  };
}
