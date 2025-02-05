'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProjectAccountCard from './ProjectAccountCard';
import { toast } from 'sonner';
import Link from 'next/link';
import EditProjectModal from './EditProjectModal';

interface Project {
  id: string;
  project_name: string;
  stack_name: string;
  user_username: string;
  og_image_url: string;
}

interface ProjectsGridProps {
  userId: string;
}

interface ProjectResponse {
  id: string;
  project_name: string;
  og_image_url: string | null;
  project_link: string | null;
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

export default function ProjectsGrid({ userId }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(
          `
          id,
          project_name,
          og_image_url,
          project_link,
          stacks!inner (
            stack_name
          ),
          profiles!inner (
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

      const formattedProjects = (data as unknown as ProjectResponse[]).map(
        (project) => ({
          id: project.id,
          project_name: project.project_name,
          stack_name: project.stacks?.stack_name || '',
          user_username: project.profiles?.username || '',
          og_image_url: project.og_image_url || '/placeholder-project.jpg',
        })
      );

      setProjects(formattedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, [userId, supabase]);

  const handleEdit = async (project: Project) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project.id)
        .single();

      if (error) throw error;

      setSelectedProject(data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('Failed to load project details');
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter((p) => p.id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
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

  if (projects.length === 0) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link
          href={`/account/${userId}/add-projects`}
          className='group relative overflow-hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg p-6 h-48 border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-4'
        >
          <div className='h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200'>
            <svg
              className='w-6 h-6 text-purple-600 dark:text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
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
              Add Your First Project
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Click here to showcase your work
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <ProjectAccountCard
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
      {selectedProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
        />
      )}
    </>
  );
}
