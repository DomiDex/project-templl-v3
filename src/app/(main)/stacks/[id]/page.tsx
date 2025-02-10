'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Stack } from '@/types';
import PublicTemplateCard from '@/features/templates/components/PublicTemplateCard';
import ServiceCard from '@/features/services/components/ServiceCard';
import { toast } from 'sonner';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'next/navigation';

interface DatabaseTemplate {
  id: string;
  template_name: string;
  thumbnail_image_url: string | null;
  price: number;
  path: string;
  stacks: Array<{ stack_name: string }>;
  profiles: Array<{ username: string }>;
}

interface DatabaseService {
  id: string;
  service_name: string;
  og_image_url: string | null;
  price: number;
  path: string;
  stacks: Array<{ stack_name: string }>;
  profiles: Array<{ username: string }>;
}

interface PublicTemplate {
  id: string;
  template_name: string;
  stack_name: string;
  user_username: string;
  thumbnail_image_url: string;
  price: number;
  path: string;
}

interface PublicService {
  id: string;
  path: string;
  og_image_url: string;
  service_name: string;
  price: number;
  user_username: string;
  stack_name: string;
}

export default function StackDetailPage() {
  const params = useParams();
  const stackId = params?.id as string;
  const [stack, setStack] = useState<Stack | null>(null);
  const [templates, setTemplates] = useState<PublicTemplate[]>([]);
  const [services, setServices] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStackData = async () => {
      try {
        const { data: stackData, error: stackError } = await supabase
          .from('stacks')
          .select('*')
          .eq('path', stackId)
          .single();

        if (stackError) throw stackError;
        setStack(stackData);

        // Fetch templates for this stack
        const { data: templatesData, error: templatesError } = await supabase
          .from('templates')
          .select(
            `
            id,
            template_name,
            thumbnail_image_url,
            price,
            path,
            stacks (
              stack_name
            ),
            profiles (
              username
            )
          `
          )
          .eq('stack_id', stackData.id);

        if (templatesError) throw templatesError;
        const transformedTemplates: PublicTemplate[] = templatesData.map(
          (template: DatabaseTemplate) => ({
            id: template.id,
            template_name: template.template_name,
            stack_name: template.stacks[0]?.stack_name || '',
            user_username: template.profiles[0]?.username || '',
            thumbnail_image_url: template.thumbnail_image_url || '',
            price: template.price,
            path: template.path,
          })
        );
        setTemplates(transformedTemplates);

        // Fetch services for this stack
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select(
            `
            id,
            service_name,
            og_image_url,
            price,
            path,
            stacks (
              stack_name
            ),
            profiles (
              username
            )
          `
          )
          .eq('stack_id', stackData.id);

        if (servicesError) throw servicesError;
        const transformedServices: PublicService[] = servicesData.map(
          (service: DatabaseService) => ({
            id: service.id,
            service_name: service.service_name,
            stack_name: service.stacks[0]?.stack_name || '',
            user_username: service.profiles[0]?.username || '',
            og_image_url: service.og_image_url || '',
            price: service.price,
            path: service.path,
          })
        );
        setServices(transformedServices);
      } catch (error) {
        console.error('Error fetching stack data:', error);
        toast.error('Failed to load stack data');
      } finally {
        setLoading(false);
      }
    };

    if (stackId) {
      fetchStackData();
    }
  }, [supabase, stackId]);

  const breadcrumbItems = [
    { label: 'Stacks', href: '/stacks' },
    { label: stack?.stack_name || 'Loading...', href: `/stacks/${params.id}` },
  ];

  if (loading) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8' />
          </div>
        </Container>
      </Section>
    );
  }

  if (!stack) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
            Stack not found
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            The stack you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-8' />

        <div className='flex items-center gap-6 mb-8'>
          {stack.icon && (
            <div className='w-24 h-24 relative'>
              <Image
                src={stack.icon}
                alt={stack.stack_name}
                width={96}
                height={96}
                className='object-contain'
              />
            </div>
          )}
          <div>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
              {stack.stack_name}
            </h1>
            {stack.meta_description && (
              <p className='text-gray-600 dark:text-gray-400 text-lg'>
                {stack.meta_description}
              </p>
            )}
          </div>
        </div>

        {templates.length > 0 && (
          <>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
              Templates
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
              {templates.map((template) => (
                <PublicTemplateCard key={template.id} template={template} />
              ))}
            </div>
          </>
        )}

        {services.length > 0 && (
          <>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
              Services
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}

        {templates.length === 0 && services.length === 0 && (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2'>
              No templates or services yet
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              There are currently no templates or services available for this
              stack.
            </p>
          </div>
        )}

        {stack.long_description && (
          <div className='prose dark:prose-invert max-w-none mb-12'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {stack.long_description}
            </ReactMarkdown>
          </div>
        )}
      </Container>
    </Section>
  );
}
