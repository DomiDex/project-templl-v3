'use client';

import { useState, useEffect } from 'react';
import { Profile } from '@/types';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import FormLabel from '@/components/ui/FormLabel';
import { Input } from '@/components/ui/input';
import ProfileImageUpload from '@/components/ui/ProfileImageUpload';
import { useProfile } from '../hooks/useProfile';
import { toast } from 'sonner';

type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;

export default function ProfileForm() {
  const { user } = useAuthStore();
  const { profile } = useProfile();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileFormData>>({
    description: '',
    profile_image_url: '',
    email: '',
    phone: '',
    website_url: '',
    linkedin_url: '',
    x_url: '',
    github_url: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        description: profile.description || '',
        profile_image_url: profile.profile_image_url || '',
        email: profile.email || '',
        phone: profile.phone || '',
        website_url: profile.website_url || '',
        linkedin_url: profile.linkedin_url || '',
        x_url: profile.x_url || '',
        github_url: profile.github_url || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    const promise = new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(formData)
          .eq('id', user.id);

        if (error) throw error;
        resolve('Profile updated successfully');
      } catch (error) {
        reject(error);
      } finally {
        setLoading(false);
      }
    });

    toast.promise(promise, {
      loading: 'Updating profile...',
      success: 'Profile updated successfully!',
      error: (error) => {
        console.error('Error updating profile:', error);
        return 'Error updating profile. Please try again.';
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <ProfileImageUpload
        imageUrl={formData.profile_image_url || ''}
        onImageChange={(url) =>
          setFormData((prev) => ({ ...prev, profile_image_url: url }))
        }
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <FormLabel htmlFor='email' className='mb-2'>
            Email
          </FormLabel>
          <Input
            id='email'
            name='email'
            type='email'
            value={formData.email || ''}
            onChange={handleChange}
            placeholder='your@email.com'
          />
        </div>

        <div>
          <FormLabel htmlFor='phone' className='mb-2'>
            Phone
          </FormLabel>
          <Input
            id='phone'
            name='phone'
            type='tel'
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder='+1234567890'
          />
        </div>

        <div>
          <FormLabel htmlFor='website_url' className='mb-2'>
            Website
          </FormLabel>
          <Input
            id='website_url'
            name='website_url'
            type='url'
            value={formData.website_url || ''}
            onChange={handleChange}
            placeholder='https://yourwebsite.com'
          />
        </div>

        <div>
          <FormLabel htmlFor='linkedin_url' className='mb-2'>
            LinkedIn
          </FormLabel>
          <Input
            id='linkedin_url'
            name='linkedin_url'
            type='url'
            value={formData.linkedin_url || ''}
            onChange={handleChange}
            placeholder='https://linkedin.com/in/yourusername'
          />
        </div>

        <div>
          <FormLabel htmlFor='x_url' className='mb-2'>
            X (Twitter)
          </FormLabel>
          <Input
            id='x_url'
            name='x_url'
            type='url'
            value={formData.x_url || ''}
            onChange={handleChange}
            placeholder='https://x.com/yourusername'
          />
        </div>

        <div>
          <FormLabel htmlFor='github_url' className='mb-2'>
            GitHub
          </FormLabel>
          <Input
            id='github_url'
            name='github_url'
            type='url'
            value={formData.github_url || ''}
            onChange={handleChange}
            placeholder='https://github.com/yourusername'
          />
        </div>

        <div className='md:col-span-2'>
          <FormLabel htmlFor='description' className='mb-2'>
            Description
          </FormLabel>
          <Input
            id='description'
            name='description'
            value={formData.description || ''}
            onChange={handleChange}
            placeholder='Tell us about yourself'
          />
        </div>
      </div>

      <Button
        type='submit'
        disabled={loading}
        className=' bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400 dark:text-gray-50 transition-colors'
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}
