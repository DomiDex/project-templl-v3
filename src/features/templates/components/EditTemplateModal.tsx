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

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    template_name: string;
    stack_id?: string;
    category_id?: string;
    price: number;
    template_link?: string;
    meta_title?: string;
    meta_description?: string;
    long_description?: string;
    og_image_url?: string;
    thumbnail_image_url?: string;
  } | null;
}

export default function EditTemplateModal({
  isOpen,
  onClose,
  template,
}: EditTemplateModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    template_name: '',
    category_id: '',
    stack_id: '',
    price: '',
    template_link: '',
    meta_title: '',
    meta_description: '',
    long_description: '',
    og_image_url: '',
    thumbnail_image_url: '',
  });

  const supabase = createClient();

  useEffect(() => {
    if (template) {
      setFormData({
        template_name: template.template_name || '',
        category_id: template.category_id || '',
        stack_id: template.stack_id || '',
        price: template.price.toString() || '',
        template_link: template.template_link || '',
        meta_title: template.meta_title || '',
        meta_description: template.meta_description || '',
        long_description: template.long_description || '',
        og_image_url: template.og_image_url || '',
        thumbnail_image_url: template.thumbnail_image_url || '',
      });
    }
  }, [template]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category_id: value }));
  };

  const handleStackChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stack_id: value }));
  };

  const handleCoverImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, og_image_url: url }));
  };

  const handleThumbnailImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail_image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!template) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('templates')
        .update({
          ...formData,
          price: parseFloat(formData.price),
        })
        .eq('id', template.id);

      if (error) throw error;

      toast.success('Template updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <ImageUpload
                imageUrl={formData.og_image_url}
                onImageChange={handleCoverImageChange}
                label='Cover Image'
                helperText='Upload a cover image for your template'
                bucket='template-images'
                id='cover-image-upload'
              />
            </div>
            <div>
              <ImageUpload
                imageUrl={formData.thumbnail_image_url}
                onImageChange={handleThumbnailImageChange}
                label='Thumbnail'
                helperText='Upload a thumbnail image'
                bucket='template-thumbnails'
                id='thumbnail-image-upload'
              />
            </div>
          </div>

          <div>
            <FormLabel required className='mb-2'>
              Template Name
            </FormLabel>
            <Input
              name='template_name'
              value={formData.template_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <FormLabel required className='mb-2'>
                Category
              </FormLabel>
              <DataSelect
                table='categories'
                column='category_name'
                labelColumn='category_name'
                valueColumn='id'
                value={formData.category_id}
                onChange={handleCategoryChange}
                placeholder='Select a category'
                required
              />
            </div>

            <div>
              <FormLabel className='mb-2'>Stack</FormLabel>
              <DataSelect
                table='stacks'
                column='stack_name'
                labelColumn='stack_name'
                valueColumn='id'
                value={formData.stack_id}
                onChange={handleStackChange}
                placeholder='Select a stack'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <FormLabel required className='mb-2'>
                Price
              </FormLabel>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
                  $
                </span>
                <Input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  min='0'
                  step='0.01'
                  className='pl-7'
                  required
                />
              </div>
            </div>

            <div>
              <FormLabel className='mb-2'>Template Link</FormLabel>
              <Input
                type='url'
                name='template_link'
                value={formData.template_link}
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
              placeholder='Describe your template in detail...'
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
