'use client';

import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import Image from 'next/image';
import ArrowLink from '@/components/ui/ArrowLink';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Service } from '@/types';
import { toast } from 'sonner';

interface ServiceWithRelations extends Service {
  stack_name?: string;
  user_username?: string;
}

export function ServiceSection() {
  const [services, setServices] = useState<ServiceWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      const { data: rawData, error } = await supabase
        .from('services')
        .select(
          `
          *,
          stacks!inner (
            stack_name
          ),
          profiles!inner (
            username
          )
        `
        )
        .limit(8)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
        return;
      }

      const formattedServices = rawData.map((service: any) => ({
        ...service,
        stack_name: service.stacks?.stack_name || '',
        user_username: service.profiles?.username || '',
      }));

      setServices(formattedServices);
      setLoading(false);
    };

    fetchServices();
  }, [supabase]);

  if (loading) {
    return (
      <Section padding='lg' className='bg-background'>
        <Container size='lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg' className='bg-background'>
      <Container size='lg'>
        <div className='space-y-12'>
          <div className='flex justify-between items-center'>
            <div className='space-y-4'>
              <h2 className='text-4xl font-bold'>Explore Available Services</h2>
              <p className='text-gray-600 dark:text-gray-400 max-w-2xl'>
                Connect with skilled developers offering professional services
              </p>
            </div>
            <Link href='/services' className='hidden md:block'>
              <ArrowLink href='/services'>View All Services</ArrowLink>
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.path}`}
                className='block group'
              >
                <div className='bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg p-2 h-full'>
                  <div className='aspect-[16/9] overflow-hidden rounded-md'>
                    <Image
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                      src={service.og_image_url || '/placeholder-service.jpg'}
                      alt={service.service_name}
                      width={500}
                      height={280}
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200'>
                      {service.service_name}
                    </h3>
                    <p className='text-purple-600 dark:text-purple-400 font-semibold'>
                      ${service.price}
                    </p>
                  </div>
                  <div className='flex flex-row justify-between items-center gap-2 px-4 pb-4'>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                      by {service.user_username}
                    </p>
                    <p className='text-gray-500 dark:text-gray-500 text-xs sm:text-sm'>
                      {service.stack_name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href='/services' className='block md:hidden text-center'>
            <ArrowLink href='/services'>View All Services</ArrowLink>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
