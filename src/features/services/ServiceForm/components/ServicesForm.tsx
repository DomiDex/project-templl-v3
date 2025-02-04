'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/button';
import FormLabel from '@/components/ui/FormLabel';
import { DataSelect } from '@/components/ui/select/DataSelect';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useServicesForm } from '../hooks/useServicesForm';
import { toast } from 'sonner';

export default function ServicesForm() {
  const { createService, loading } = useServicesForm();
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
      if (!formData.service_name || !formData.stack_id || !formData.price) {
        toast.error('Please fill in all required fields');
        return;
      }

      const numericPrice = parseFloat(formData.price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        toast.error('Please enter a valid price');
        return;
      }

      await createService({
        ...formData,
        price: numericPrice,
        featured: false,
      });

      toast.success('Service created successfully!');
      // Reset form
      setFormData({
        service_name: '',
        stack_id: '',
        price: '',
        meta_title: '',
        meta_description: '',
        long_description: '',
        og_image_url: '',
        featured: false,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create service'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <ImageUpload
        imageUrl={formData.og_image_url}
        onImageChange={handleImageChange}
        label='Service Image'
        helperText='Upload a cover image for your service'
        bucket='service-images'
      />

      <div>
        <FormLabel required>Service Name</FormLabel>
        <Input
          name='service_name'
          value={formData.service_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <FormLabel required>Stack</FormLabel>
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
        <FormLabel required>Price</FormLabel>
        <Input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          min='0'
          step='0.01'
          required
        />
      </div>

      <div>
        <FormLabel>Meta Title</FormLabel>
        <Input
          name='meta_title'
          value={formData.meta_title}
          onChange={handleChange}
        />
      </div>

      <div>
        <FormLabel>Meta Description</FormLabel>
        <TextArea
          name='meta_description'
          value={formData.meta_description}
          onChange={handleChange}
          maxCharacters={250}
          showCharacterCount
        />
      </div>

      <div>
        <FormLabel>Long Description</FormLabel>
        <TextArea
          name='long_description'
          value={formData.long_description}
          onChange={handleChange}
          maxCharacters={2000}
          showCharacterCount
        />
      </div>

      <Button type='submit' disabled={loading} className='w-full'>
        {loading ? 'Creating...' : 'Create Service'}
      </Button>
    </form>
  );
}
