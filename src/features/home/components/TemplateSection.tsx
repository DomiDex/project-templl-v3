'use client';

import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import Image from 'next/image';
import ArrowLink from '@/components/ui/ArrowLink';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

interface Template {
  id: string;
  path: string;
  thumbnail_image_url: string;
  template_name: string;
  price: string;
  user_username: string;
  stack_name: string;
}

export function TemplateSection() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data: rawData, error } = await supabase
        .from('templates')
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
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
        return;
      }

      const formattedTemplates = rawData.map((template: any) => ({
        ...template,
        stack_name: template.stacks?.stack_name || '',
        user_username: template.profiles?.username || '',
      }));

      setTemplates(formattedTemplates);
      setLoading(false);
    };

    fetchTemplates();
  }, [supabase]);

  if (loading) {
    return (
      <Section padding='lg' className='bg-gray-50 dark:bg-gray-800/50'>
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
    <Section padding='lg' className='bg-gray-50 dark:bg-gray-800/50'>
      <Container size='lg'>
        <div className='space-y-12'>
          <div className='flex justify-between items-center'>
            <div className='space-y-4'>
              <h2 className='text-4xl font-bold'>Explore Our Templates</h2>
              <p className='text-gray-600 dark:text-gray-400 max-w-2xl'>
                Discover high-quality templates built with modern technologies
              </p>
            </div>
            <Link href='/templates' className='hidden md:block'>
              <ArrowLink href='/templates'>View All Templates</ArrowLink>
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {templates.map((template) => (
              <Link
                key={template.path}
                href={`/templates/${template.path}`}
                className='block group'
              >
                <div className='bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg p-2 h-full'>
                  <div className='aspect-[16/9] overflow-hidden rounded-md'>
                    <Image
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                      src={
                        template.thumbnail_image_url ||
                        '/placeholder-template.jpg'
                      }
                      alt={template.template_name}
                      width={500}
                      height={280}
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200'>
                      {template.template_name}
                    </h3>
                    <p className='text-purple-600 dark:text-purple-400 font-semibold'>
                      ${template.price}
                    </p>
                  </div>
                  <div className='flex flex-row justify-between items-center gap-2 px-4 pb-4'>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                      by {template.user_username}
                    </p>
                    <p className='text-gray-500 dark:text-gray-500 text-xs sm:text-sm'>
                      {template.stack_name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href='/templates' className='block md:hidden text-center'>
            <ArrowLink href='/templates'>View All Templates</ArrowLink>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
