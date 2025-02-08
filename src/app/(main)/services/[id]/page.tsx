'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import ProfileCard from '@/features/profile/components/ProfileCard';

interface ServiceDetail {
  id: string;
  service_name: string;
  og_image_url: string;
  price: number;
  long_description: string | null;
  meta_description: string | null;
  user_id: string;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
    id: string;
  } | null;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase
        .from('services')
        .select(
          `
          id,
          service_name,
          og_image_url,
          price,
          long_description,
          meta_description,
          user_id,
          stacks (
            stack_name
          ),
          profiles!services_user_id_fkey (
            id,
            username
          )
        `
        )
        .eq('path', params.id)
        .single();

      if (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
        return;
      }

      setService(data);
      setLoading(false);
    };

    fetchService();
  }, [params.id, supabase]);

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: service?.service_name || 'Loading...', href: '#' },
  ];

  if (loading) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='animate-pulse'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8' />
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4' />
            <div className='aspect-[21/9] bg-gray-200 dark:bg-gray-700 rounded-lg mb-8' />
            <div className='space-y-4'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6' />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (!service) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='text-center py-12'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Service not found
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              The service you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />

        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left side - Service details */}
          <div className='flex-1 space-y-8'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
              {service.service_name}
            </h1>

            <div className='flex items-center gap-4'>
              <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                ${service.price}
              </p>
              <span className='text-gray-400'>|</span>
              <p className='text-gray-600 dark:text-gray-400'>
                by {service.profiles?.username}
              </p>
              <span className='text-gray-400'>|</span>
              <p className='text-gray-500 dark:text-gray-500'>
                {service.stacks?.stack_name}
              </p>
            </div>

            <div className='relative aspect-[16/9] rounded-lg overflow-hidden'>
              <Image
                src={service.og_image_url || '/placeholder-service.jpg'}
                alt={service.service_name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>

            <div className='prose dark:prose-invert max-w-none'>
              {service.long_description || service.meta_description || (
                <p className='text-gray-600 dark:text-gray-400'>
                  No description available.
                </p>
              )}
            </div>
          </div>

          {/* Right side - Profile Card */}
          <div className='lg:w-1/3 order-first lg:order-last'>
            {service?.profiles?.id && (
              <ProfileCard userId={service.profiles.id} />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
