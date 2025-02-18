import { createClient } from '@/utils/supabase/server';
import ServiceCard from '@/features/services/components/ServiceCard';
import TemplatesGrid from '@/features/templates/components/TemplatesGrid';
import ProjectsGrid from '@/features/projects/components/ProjectsGrid';

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

interface ProfileContentProps {
  userId: string;
}

export default async function ProfileContent({ userId }: ProfileContentProps) {
  const supabase = await createClient();

  // Fetch user's content with a limit of 4 items each
  const [templatesResponse, projectsResponse, servicesResponse] =
    await Promise.all([
      supabase
        .from('templates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(4),
      supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(4),
      supabase
        .from('services')
        .select(
          `
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
      `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(4),
    ]);

  const templates = templatesResponse.data || [];
  const projects = projectsResponse.data || [];
  const services =
    (servicesResponse.data as unknown as ServiceResponse[])?.map((service) => ({
      id: service.id,
      service_name: service.service_name,
      stack_name: service.stacks?.stack_name || '',
      user_username: service.profiles?.username || '',
      og_image_url: service.og_image_url || '/placeholder-service.jpg',
      price: service.price || 0,
      path: service.path,
    })) || [];

  return (
    <div className='space-y-12'>
      {/* Templates Section */}
      {templates.length > 0 && (
        <section>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
            Templates
          </h2>
          <TemplatesGrid userId={userId} />
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
            Projects
          </h2>
          <ProjectsGrid userId={userId} />
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6'>
            Services
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* Show message if no content */}
      {templates.length === 0 &&
        projects.length === 0 &&
        services.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600 dark:text-gray-300'>
              This user hasn&apos;t added any content yet.
            </p>
          </div>
        )}
    </div>
  );
}
