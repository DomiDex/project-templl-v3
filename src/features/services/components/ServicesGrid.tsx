'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ServiceAccountCard from '@/features/services/components/ServiceAccountCard';
import { toast } from 'sonner';
import Link from 'next/link';

interface Service {
  id: string;
  service_name: string;
  stack_name: string;
  user_username: string;
  og_image_url: string;
  price: number;
}

interface ServicesGridProps {
  userId: string;
}

interface ServiceResponse {
  id: string;
  service_name: string;
  og_image_url: string | null;
  price: number;
  stack_id: string;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

export default function ServicesGrid({ userId }: ServicesGridProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select(
          `
          id,
          service_name,
          og_image_url,
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
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
        return;
      }

      console.log('Services data:', data);

      const formattedServices = (data as unknown as ServiceResponse[]).map(
        (service) => ({
          id: service.id,
          service_name: service.service_name,
          stack_name: service.stacks?.stack_name || '',
          user_username: service.profiles?.username || '',
          og_image_url: service.og_image_url || '/placeholder-service.jpg',
          price: service.price || 0,
        })
      );

      setServices(formattedServices);
      setLoading(false);
    };

    fetchServices();
  }, [userId, supabase]);

  const handleEdit = (service: Service) => {
    console.log('Edit service:', service);
  };

  const handleDelete = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      setServices(services.filter((s) => s.id !== serviceId));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
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

  if (services.length === 0) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link
          href={`/account/${userId}/add-services`}
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
              Add Your First Service
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Click here to offer your services
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {services.map((service) => (
        <ServiceAccountCard
          key={service.id}
          service={service}
          onEdit={() => handleEdit(service)}
          onDelete={() => handleDelete(service.id)}
        />
      ))}
    </div>
  );
}
