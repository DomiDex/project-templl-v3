import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/button';
import FormLabel from '@/components/ui/FormLabel';
import { DataSelect } from '@/components/ui/select/DataSelect';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    project_name: string;
    stack_id?: string;
    project_link?: string;
    meta_title?: string;
    meta_description?: string;
    long_description?: string;
    og_image_url?: string;
  } | null;
}

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
}: EditProjectModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    stack_id: '',
    project_link: '',
    meta_title: '',
    meta_description: '',
    long_description: '',
    og_image_url: '',
  });

  const supabase = createClient();

  useEffect(() => {
    if (project) {
      setFormData({
        project_name: project.project_name || '',
        stack_id: project.stack_id || '',
        project_link: project.project_link || '',
        meta_title: project.meta_title || '',
        meta_description: project.meta_description || '',
        long_description: project.long_description || '',
        og_image_url: project.og_image_url || '',
      });
    }
  }, [project]);

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
    if (!project) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          ...formData,
        })
        .eq('id', project.id);

      if (error) throw error;

      toast.success('Project updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6'>
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

          <div className='flex w-full gap-4'>
            <div className='flex-1'>
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

            <div className='flex-1'>
              <FormLabel className='mb-2'>Project Link</FormLabel>
              <Input
                type='url'
                name='project_link'
                value={formData.project_link}
                onChange={handleChange}
                placeholder='https://example.com'
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
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
