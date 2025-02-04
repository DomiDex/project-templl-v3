'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/button';
import ProfileImageUpload from '@/components/ui/ProfileImageUpload';
import FormLabel from '@/components/ui/FormLabel';
import { useProfile } from '../hooks/useProfile';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { toast } from 'sonner';

export default function ProfileForm() {
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile_image_url: '',
    phone: '',
    website_url: '',
    linkedin_url: '',
    x_url: '',
    github_url: '',
    description: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        profile_image_url: profile.profile_image_url || '',
        phone: profile.phone || '',
        website_url: profile.website_url || '',
        linkedin_url: profile.linkedin_url || '',
        x_url: profile.x_url || '',
        github_url: profile.github_url || '',
        description: profile.description || '',
      });
    }
  }, [profile]);

  if (profileLoading) {
    return (
      <div className='space-y-6 animate-pulse'>
        <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded-lg' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2' />
              <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded' />
            </div>
          ))}
        </div>
        <div>
          <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2' />
          <div className='h-24 bg-gray-200 dark:bg-gray-700 rounded' />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        ...formData,
        profile_image_url: formData.profile_image_url || null,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, profile_image_url: url }));
    // Immediately update profile after image change
    updateProfile({
      ...formData,
      profile_image_url: url,
    }).catch((error) => {
      console.error('Failed to update profile image:', error);
      toast.error('Failed to update profile image');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <ProfileImageUpload
        imageUrl={formData.profile_image_url}
        onImageChange={handleImageChange}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <FormLabel className='mb-2'>Email</FormLabel>
          <Input
            type='email'
            value={user?.email || ''}
            disabled
            className='bg-gray-50'
          />
        </div>

        <div>
          <FormLabel className='mb-2'>Phone</FormLabel>
          <Input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='+1 (555) 000-0000'
          />
        </div>

        <div>
          <FormLabel className='mb-2'>Website</FormLabel>
          <Input
            type='url'
            name='website_url'
            value={formData.website_url}
            onChange={handleChange}
            placeholder='https://example.com'
          />
        </div>

        <div>
          <FormLabel className='mb-2'>LinkedIn</FormLabel>
          <Input
            type='url'
            name='linkedin_url'
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder='https://linkedin.com/in/username'
          />
        </div>

        <div>
          <FormLabel className='mb-2'>X (Twitter)</FormLabel>
          <Input
            type='url'
            name='x_url'
            value={formData.x_url}
            onChange={handleChange}
            placeholder='https://x.com/username'
          />
        </div>

        <div>
          <FormLabel className='mb-2'>GitHub</FormLabel>
          <Input
            type='url'
            name='github_url'
            value={formData.github_url}
            onChange={handleChange}
            placeholder='https://github.com/username'
          />
        </div>
      </div>

      <div>
        <FormLabel className='mb-2'>Description</FormLabel>
        <TextArea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Tell us about yourself...'
          rows={4}
          maxCharacters={500}
          showCharacterCount
          helperText="Describe your experience, skills, and what you're working on"
        />
      </div>

      <Button type='submit' disabled={loading} className='w-full'>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
