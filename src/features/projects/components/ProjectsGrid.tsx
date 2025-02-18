'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProjectCard from './ProjectCard';
import { toast } from 'sonner';

interface Project {
  id: string;
  project_name: string;
  stack_name: string;
  user_username: string;
  og_image_url: string;
  path: string;
}

interface ProjectResponse {
  id: string;
  project_name: string;
  og_image_url: string | null;
  path: string;
  stack_id: string;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

interface ProjectsGridProps {
  userId: string;
}

export default function ProjectsGrid({ userId }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(
          `
          id,
          project_name,
          og_image_url,
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
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
        return;
      }

      const formattedProjects = (data as ProjectResponse[]).map((project) => ({
        id: project.id,
        project_name: project.project_name,
        stack_name: project.stacks?.stack_name || '',
        user_username: project.profiles?.username || '',
        og_image_url: project.og_image_url || '/placeholder-project.jpg',
        path: project.path,
      }));

      setProjects(formattedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, [userId, supabase]);

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

  if (projects.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          No projects available
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Check back later for new projects
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
