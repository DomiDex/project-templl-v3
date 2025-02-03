'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { cn } from '@/lib/utils';
import FormLabel from './FormLabel';
import { toast } from 'sonner';

interface ProfileImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  className?: string;
}

const MAX_FILE_SIZE = 300 * 1024; // 300KB

export default function ProfileImageUpload({
  imageUrl,
  onImageChange,
  className,
}: ProfileImageUploadProps) {
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    if (!user?.id) {
      toast.error('Please sign in to upload images');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 300KB');
      return;
    }

    try {
      // Delete old image if exists
      if (imageUrl) {
        const oldPath = imageUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('profile-images')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

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
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error('Failed to upload image: ' + uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('profile-images').getPublicUrl(filePath);

      onImageChange(publicUrl);
      toast.success('Profile image updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Error uploading image. Please try again.'
      );
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <FormLabel>Profile Picture</FormLabel>
      <div className='flex items-left justify-left'>
        <div className='relative group'>
          <div
            className={cn(
              'relative w-32 h-32 rounded-full overflow-hidden border-4',
              'border-purple-200 dark:border-purple-700',
              'bg-gray-50 dark:bg-purple-900/20'
            )}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt='Profile picture'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            ) : (
              <div className='w-full h-full bg-gray-200 dark:bg-gray-800' />
            )}
          </div>

          <label
            htmlFor='profile-image-upload'
            className={cn(
              'absolute bottom-0 right-0',
              'w-10 h-10 rounded-full',
              'flex items-center justify-center',
              'bg-purple-500 text-white',
              'cursor-pointer transform transition-transform',
              'hover:bg-purple-600 group-hover:scale-110',
              'dark:bg-purple-600 dark:hover:bg-purple-500'
            )}
          >
            <Camera className='w-5 h-5' />
            <input
              id='profile-image-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </div>
      </div>
      <p className='text-xs  text-gray-500 dark:text-gray-400'>
        PNG, JPG or WebP (MAX. 300KB)
      </p>
    </div>
  );
}
