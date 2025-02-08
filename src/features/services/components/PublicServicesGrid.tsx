'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ServiceCard from './ServiceCard';
import { toast } from 'sonner';

interface Service {
  id: string;
  service_name: string;
  stack_name: string;
  user_username: string;
  og_image_url: string;
  price: number;
  path: string;
}

interface ServiceResponse {
  id: string;
  service_name: string;
  og_image_url: string | null;
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

export default function PublicServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select(`
          id,
          service_name,
          og_image_url,
          price,
          path,
          stack_id,
          stacks (
            stack_name
          ),
          profiles (
            username
          )
        `);

      if (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
        return;
      }

      const formattedServices = (data as ServiceResponse[]).map((service) => ({
        id: service.id,
        service_name: service.service_name,
        stack_name: service.stacks?.stack_name || '',
        user_username: service.profiles?.username || '',
        og_image_url: service.og_image_url || '/placeholder-service.jpg',
        price: service.price || 0,
        path: service.path,
      }));

      setServices(formattedServices);
      setLoading(false);
    };

    fetchServices();
  }, [supabase]);

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

  if (services.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          No services available
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Check back later for new services
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
