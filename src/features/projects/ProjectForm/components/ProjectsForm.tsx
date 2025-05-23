'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/button';
import FormLabel from '@/components/ui/FormLabel';
import { DataSelect } from '@/components/ui/select/DataSelect';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useProjectsForm } from '../hooks/useProjectsForm';
import { toast } from 'sonner';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { useProjectCount } from '../../hooks/useProjectCount';
import { cn } from '@/lib/utils';

export default function ProjectsForm() {
  const { createProject, loading } = useProjectsForm();
  const {
    canPublishMore,
    remainingProjects,
    loading: countLoading,
    projectCount,
    totalLimit,
    isPro,
  } = useProjectCount();
  const [formData, setFormData] = useState({
    project_name: '',
    stack_id: '',
    project_link: '',
    meta_title: '',
    meta_description: '',
    long_description: '',
    og_image_url: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stack_id: value }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, og_image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.project_name || !formData.stack_id) {
        toast.error('Please fill in all required fields');
        return;
      }

      await createProject(formData);

      toast.success('Project created successfully!');
      // Reset form
      setFormData({
        project_name: '',
        stack_id: '',
        project_link: '',
        meta_title: '',
        meta_description: '',
        long_description: '',
        og_image_url: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create project'
      );
    }
  };

  const CountDisplay = () => {
    if (isPro) {
      return (
        <div className='p-4 rounded-md mb-6 bg-success-light/10 dark:bg-success-dark/20'>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>You have unlimited projects (Pro Plan)</p>
            <span className='text-sm font-medium'>∞</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          'p-4 rounded-md mb-6',
          canPublishMore
            ? 'bg-purple-50 dark:bg-purple-900/20'
            : 'bg-error-light/10 dark:bg-error-dark/20'
        )}
      >
        <div className='flex justify-between items-center mb-2'>
          <p className='text-sm'>
            {canPublishMore
              ? `You can publish ${remainingProjects} more project${
                  remainingProjects === 1 ? '' : 's'
                }`
              : 'You have reached the maximum limit of 3 projects'}
          </p>
          <span className='text-sm font-medium'>
            {Math.min(projectCount, totalLimit)}/{totalLimit} projects
          </span>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              canPublishMore
                ? 'bg-purple-600 dark:bg-purple-400'
                : 'bg-error-light dark:bg-error-dark'
            )}
            style={{
              width: `${Math.min((projectCount / totalLimit) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {!countLoading && <CountDisplay />}
      <ImageUpload
        imageUrl={formData.og_image_url}
        onImageChange={handleImageChange}
        label='Project Image'
        helperText='Upload a cover image for your project'
        bucket='project-images'
      />

      <div>
        <FormLabel required className='mb-2'>
          Project Name
        </FormLabel>
        <Input
          name='project_name'
          value={formData.project_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <FormLabel required className='mb-2'>
            Stack
          </FormLabel>
          <DataSelect
            table='stacks'
            column='stack_name'
            labelColumn='stack_name'
            valueColumn='id'
            value={formData.stack_id}
            onChange={handleSelectChange}
            placeholder='Select a stack'
            required
          />
        </div>

        <div>
          <FormLabel className='mb-2'>Project Link</FormLabel>
          <Input
            name='project_link'
            value={formData.project_link}
            onChange={handleChange}
            placeholder='https://example.com'
            type='url'
          />
        </div>
      </div>
      <div>
        <FormLabel className='mb-2'>Long Description</FormLabel>
        <MarkdownEditor
          name='long_description'
          value={formData.long_description}
          onChange={handleChange}
          placeholder='Describe your project in detail...'
          helperText='Use markdown to format your description. Maximum 2000 characters.'
          maxLength={2000}
          rows={10}
        />
      </div>

      <h2 className='text-lg font-bold'>SEO</h2>
      <div>
        <FormLabel className='mb-2'>Meta Title</FormLabel>
        <Input
          name='meta_title'
          value={formData.meta_title}
          onChange={handleChange}
        />
      </div>

      <div>
        <FormLabel className='mb-2'>Meta Description</FormLabel>
        <TextArea
          name='meta_description'
          value={formData.meta_description}
          onChange={handleChange}
          maxCharacters={250}
          showCharacterCount
        />
      </div>

      <Button type='submit' disabled={loading} className='w-full'>
        {loading ? 'Creating...' : 'Create Project'}
      </Button>
    </form>
  );
}
