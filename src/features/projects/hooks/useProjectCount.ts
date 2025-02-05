import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const PROJECT_LIMIT = 3;

export function useProjectCount() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch user's pro status
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;
        setIsPro(userData?.is_pro || false);

        // Only fetch project count if user is not pro
        if (!userData?.is_pro) {
          const { data, error } = await supabase
            .from('project_counts')
            .select('project_count')
            .eq('user_id', user.id)
            .single();

          if (error) throw error;
          setProjectCount(Math.min(data?.project_count || 0, PROJECT_LIMIT));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  const canPublishMore = isPro || projectCount < PROJECT_LIMIT;
  const remainingProjects = isPro
    ? Infinity
    : Math.max(PROJECT_LIMIT - projectCount, 0);
  const totalLimit = isPro ? Infinity : PROJECT_LIMIT;

  return {
    projectCount,
    canPublishMore,
    remainingProjects,
    totalLimit,
    loading,
    isPro,
  };
}
