'use client';

import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
  helperText?: string;
  bucket?: string;
  className?: string;
}

const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

export function ImageUpload({
  imageUrl,
  onImageChange,
  label = 'Image Upload',
  helperText = 'PNG, JPG or WebP (MAX. 300KB)',
  bucket = 'service-images',
  className,
}: ImageUploadProps) {
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    if (!user?.id) {
      toast.error('Authentication required', {
        description: 'Please sign in to upload images',
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large', {
        description: 'File size must be less than 300KB',
      });
      return;
    }

    const promise = new Promise(async (resolve, reject) => {
      try {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!fileExt || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
          throw new Error(
            'Invalid file type. Please upload JPG, PNG, or WebP images only.'
          );
        }

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(filePath);

        onImageChange(publicUrl);
        resolve('Image uploaded successfully');
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully',
      error: (error) => {
        return error instanceof Error
          ? error.message
          : 'Error uploading image. Please try again.';
      },
    });
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
        {label}
      </label>

      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor='image-upload'
          className={cn(
            imageUrl
              ? 'hidden'
              : 'flex flex-col items-center justify-center w-full h-64',
            'border-2 border-dashed rounded-lg cursor-pointer',
            'border-purple-200 dark:border-purple-700',
            'hover:border-purple-300 dark:hover:border-purple-600',
            'bg-gray-50 dark:bg-purple-900/20',
            'hover:bg-gray-100 dark:hover:bg-purple-800/30',
            'transition-colors duration-200'
          )}
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <UploadCloud className='w-8 h-8 mb-4 text-purple-500 dark:text-purple-400' />
            <p className='mb-2 text-sm text-gray-600 dark:text-gray-300'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {helperText}
            </p>
          </div>
          <input
            id='image-upload'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </label>

        {imageUrl && (
          <div className='relative w-full h-64'>
            <Image
              src={imageUrl}
              alt='Upload preview'
              fill
              className='rounded-lg object-cover'
            />
            <button
              type='button'
              onClick={() => onImageChange('')}
              className={cn(
                'absolute top-2 right-2 p-2 rounded-full',
                'bg-error-light hover:bg-error-light/90',
                'dark:bg-error-dark dark:hover:bg-error-dark/90',
                'text-white transition-colors'
              )}
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
