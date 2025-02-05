import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const SERVICE_LIMIT = 3;

export function useServiceCount() {
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchServiceCount = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('service_counts')
          .select('service_count')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setServiceCount(Math.min(data?.service_count || 0, SERVICE_LIMIT));
      } catch (error) {
        console.error('Error fetching service count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCount();
  }, [user, supabase]);

  const canPublishMore = serviceCount < SERVICE_LIMIT;
  const remainingServices = Math.max(SERVICE_LIMIT - serviceCount, 0);
  const totalLimit = SERVICE_LIMIT;

  return {
    serviceCount,
    canPublishMore,
    remainingServices,
    totalLimit,
    loading,
  };
}
