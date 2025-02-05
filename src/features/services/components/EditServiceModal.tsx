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

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    service_name: string;
    stack_id?: string;
    price: number;
    meta_title?: string;
    meta_description?: string;
    long_description?: string;
    og_image_url?: string;
    featured?: boolean;
  } | null;
}

export default function EditServiceModal({
  isOpen,
  onClose,
  service,
}: EditServiceModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    stack_id: '',
    price: '',
    meta_title: '',
    meta_description: '',
    long_description: '',
    og_image_url: '',
    featured: false,
  });

  const supabase = createClient();

  useEffect(() => {
    if (service) {
      setFormData({
        service_name: service.service_name || '',
        stack_id: service.stack_id || '',
        price: service.price.toString() || '',
        meta_title: service.meta_title || '',
        meta_description: service.meta_description || '',
        long_description: service.long_description || '',
        og_image_url: service.og_image_url || '',
        featured: service.featured || false,
      });
    }
  }, [service]);

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
    if (!service) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('services')
        .update({
          ...formData,
          price: parseFloat(formData.price),
        })
        .eq('id', service.id);

      if (error) throw error;

      toast.success('Service updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <ImageUpload
            imageUrl={formData.og_image_url}
            onImageChange={handleImageChange}
            label='Service Image'
            helperText='Upload a cover image for your service'
            bucket='service-images'
          />

          <div>
            <FormLabel required className='mb-2'>
              Service Name
            </FormLabel>
            <Input
              name='service_name'
              value={formData.service_name}
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

            <div className='w-1/2'>
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
          </div>

          <div>
            <FormLabel className='mb-2'>Long Description</FormLabel>
            <MarkdownEditor
              name='long_description'
              value={formData.long_description}
              onChange={handleChange}
              placeholder='Describe your service in detail...'
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
