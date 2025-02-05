import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ServiceFormData } from '@/types';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { generateSlug } from '@/lib/utils';
import { useServiceCount } from '../../hooks/useServiceCount';

export function useServicesForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { canPublishMore } = useServiceCount();
  const supabase = createClient();

  const createService = async (
    data: Omit<ServiceFormData, 'user_id' | 'path'>
  ) => {
    if (!user) throw new Error('User not authenticated');
    if (!canPublishMore) {
      throw new Error('You have reached the maximum limit of 3 services');
    }

    setLoading(true);

    try {
      // Validate required fields
      if (!data.service_name || !data.stack_id || !data.price) {
        throw new Error('Missing required fields');
      }

      const path = `${generateSlug(data.service_name)}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;

      const { data: service, error: serviceError } = await supabase
        .from('services')
        .insert([
          {
            service_name: data.service_name,
            stack_id: data.stack_id,
            price: data.price,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null,
            long_description: data.long_description || null,
            og_image_url: data.og_image_url || null,
            user_id: user.id,
            path,
            featured: false,
          },
        ])
        .select()
        .single();

      if (serviceError) {
        console.error('Service creation error:', serviceError);
        throw new Error(serviceError.message || 'Failed to create service');
      }

      // Increment service count
      const { error: countError } = await supabase.rpc(
        'increment_service_count',
        { user_id_input: user.id }
      );

      if (countError) {
        console.error('Service count increment error:', countError);
      }

      return service;
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
    createService,
    loading,
  };
}
