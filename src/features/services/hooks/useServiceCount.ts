import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const SERVICE_LIMIT = 3;

export function useServiceCount() {
  const [serviceCount, setServiceCount] = useState(0);
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

        // Only fetch service count if user is not pro
        if (!userData?.is_pro) {
          const { data, error } = await supabase
            .from('service_counts')
            .select('service_count')
            .eq('user_id', user.id)
            .single();

          if (error) throw error;
          setServiceCount(Math.min(data?.service_count || 0, SERVICE_LIMIT));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  const canPublishMore = isPro || serviceCount < SERVICE_LIMIT;
  const remainingServices = isPro
    ? Infinity
    : Math.max(SERVICE_LIMIT - serviceCount, 0);
  const totalLimit = isPro ? Infinity : SERVICE_LIMIT;

  return {
    serviceCount,
    canPublishMore,
    remainingServices,
    totalLimit,
    loading,
    isPro,
  };
}
