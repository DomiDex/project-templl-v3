import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { Profile, ProfileFormData } from '@/types';
import { toast } from 'sonner';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      if (!user?.id) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (mounted) {
          setProfile(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [user?.id, supabase]);

  const updateProfile = async (formData: Partial<ProfileFormData>) => {
    if (!user?.id) return;

    try {
      // Delete old profile image if it exists and a new one is being set
      if (
        profile?.profile_image_url &&
        formData.profile_image_url &&
        profile.profile_image_url !== formData.profile_image_url
      ) {
        const oldPath = profile.profile_image_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('profile-images')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      const normalizedData = {
        ...formData,
        path: formData.username
          ? `/${formData.username.toLowerCase()}`
          : formData.path,
        username: formData.username?.toLowerCase(),
        profile_image_url: formData.profile_image_url || null,
      };

      const { error } = await supabase
        .from('profiles')
        .update(normalizedData)
        .eq('id', user.id);

      if (error) throw error;

      setProfile((prev) => (prev ? { ...prev, ...normalizedData } : null));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  return { profile, loading, updateProfile };
}
