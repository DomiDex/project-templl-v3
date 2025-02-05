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
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { useServiceCount } from '../../hooks/useServiceCount';
import { cn } from '@/lib/utils';

export default function ServicesForm() {
  const { createService, loading } = useServicesForm();
  const {
    canPublishMore,
    remainingServices,
    loading: countLoading,
    serviceCount,
    totalLimit,
    isPro,
  } = useServiceCount();
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

  const CountDisplay = () => {
    if (isPro) {
      return (
        <div className='p-4 rounded-md mb-6 bg-success-light/10 dark:bg-success-dark/20'>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>You have unlimited services (Pro Plan)</p>
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
              ? `You can publish ${remainingServices} more service${
                  remainingServices === 1 ? '' : 's'
                }`
              : 'You have reached the maximum limit of 3 services'}
          </p>
          <span className='text-sm font-medium'>
            {Math.min(serviceCount, totalLimit)}/{totalLimit} services
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
              width: `${Math.min((serviceCount / totalLimit) * 100, 100)}%`,
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

      <Button
        type='submit'
        disabled={loading || !canPublishMore}
        className='w-full'
      >
        {loading
          ? 'Creating...'
          : !canPublishMore
          ? 'Service Limit Reached'
          : 'Create Service'}
      </Button>
    </form>
  );
}
