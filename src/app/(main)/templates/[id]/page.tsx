'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

import BuyTemplateCard from '@/features/templates/components/BuyTemplateCard';

interface TemplateDetail {
  id: string;
  template_name: string;
  og_image_url: string | null;
  thumbnail_image_url: string | null;
  price: number;
  template_link: string | null;
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

export default function TemplateDetailPage() {
  const params = useParams();
  const [template, setTemplate] = useState<TemplateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplate = async () => {
      const { data: rawData, error } = await supabase
        .from('templates')
        .select(
          `
          id,
          template_name,
          og_image_url,
          thumbnail_image_url,
          price,
          template_link,
          long_description,
          meta_description,
          user_id,
          stacks (
            stack_name
          ),
          profiles!templates_user_id_fkey (
            id,
            username
          )
        `
        )
        .eq('path', params.id)
        .single();

      if (error) {
        console.error('Error fetching template:', error);
        toast.error('Failed to load template details');
        return;
      }

      // Transform the data to match the TemplateDetail interface
      const data: TemplateDetail = {
        ...rawData,
        stacks: rawData.stacks?.[0] || null,
        profiles: rawData.profiles?.[0] || null,
      };

      setTemplate(data);
      setLoading(false);
    };

    fetchTemplate();
  }, [params.id, supabase]);

  const breadcrumbItems = [
    { label: 'Templates', href: '/templates' },
    { label: template?.template_name || 'Loading...', href: '#' },
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

  if (!template) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='text-center py-12'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Template not found
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              The template you&apos;re looking for doesn&apos;t exist or has
              been removed.
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
          {/* Left side - Template details */}
          <div className='flex-1 space-y-8'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
              {template.template_name}
            </h1>

            <div className='flex items-center gap-4'>
              <p className='text-gray-600 dark:text-gray-400'>
                by {template.profiles?.username}
              </p>
              <span className='text-gray-400'>|</span>
              <p className='text-gray-500 dark:text-gray-500'>
                {template.stacks?.stack_name}
              </p>
            </div>

            <div className='relative aspect-[16/9] rounded-lg overflow-hidden'>
              <Image
                src={
                  template.og_image_url ||
                  template.thumbnail_image_url ||
                  '/placeholder-template.jpg'
                }
                alt={template.template_name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>

            <div className='prose dark:prose-invert max-w-none'>
              {template.long_description || template.meta_description || (
                <p className='text-gray-600 dark:text-gray-400'>
                  No description available.
                </p>
              )}
            </div>
          </div>

          {/* Right side - Profile Card */}
          <div className='lg:w-1/3 order-first lg:order-last'>
            <div className='sticky top-6'>
              <BuyTemplateCard
                price={template.price}
                templateLink={template.template_link}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
