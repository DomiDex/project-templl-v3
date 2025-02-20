'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '@/types';
import ProjectAccountCard from './ProjectAccountCard';
import EditProjectModal from './EditProjectModal';
import { toast } from 'sonner';

interface ProjectWithRelations extends Project {
  stacks: {
    stack_name: string;
  } | null;
  profiles: {
    username: string;
  } | null;
}

interface EditProjectData {
  id: string;
  project_name: string;
  stack_id?: string;
  project_link?: string;
  meta_title?: string;
  meta_description?: string;
  long_description?: string;
  og_image_url?: string;
}

interface ProjectAccountGridProps {
  userId: string;
}

export default function ProjectAccountGrid({
  userId,
}: ProjectAccountGridProps) {
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] =
    useState<EditProjectData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const supabase = createClient();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(
          `
          *,
          stacks (
            stack_name
          ),
          profiles (
            username
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const handleEdit = (project: ProjectWithRelations) => {
    setSelectedProject({
      id: project.id,
      project_name: project.project_name,
      stack_id: project.stack_id || undefined,
      project_link: project.project_link || undefined,
      meta_title: project.meta_title || undefined,
      meta_description: project.meta_description || undefined,
      long_description: project.long_description || undefined,
      og_image_url: project.og_image_url || undefined,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='bg-gray-200 dark:bg-gray-800 rounded-lg h-72'
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 dark:text-gray-400'>
          You haven&apos;t added any projects yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <ProjectAccountCard
            key={project.id}
            project={{
              id: project.id,
              project_name: project.project_name,
              stack_name: project.stacks?.stack_name || 'Unknown Stack',
              user_username: project.profiles?.username || 'Unknown User',
              og_image_url: project.og_image_url || '',
              project_link: project.project_link || undefined,
            }}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProject(null);
          fetchProjects(); // Refresh the projects after editing
        }}
        project={selectedProject}
      />
    </>
  );
}
