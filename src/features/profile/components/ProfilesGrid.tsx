'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Profile } from '@/types';
import { toast } from 'sonner';
import ProfileGridItem from './ProfileGridItem';
import { PostgrestError } from '@supabase/supabase-js';

export default function ProfilesGrid() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setProfiles(data || []);
      } catch (error: unknown) {
        if (error instanceof PostgrestError) {
          console.error('Error fetching profiles:', error.message);
          toast.error(`Failed to load profiles: ${error.message}`);
        } else {
          console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred while loading profiles');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [supabase]);

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='bg-gray-50 dark:bg-purple-800 rounded-2xl p-6 animate-pulse'
          >
            <div className='flex flex-col items-center'>
              <div className='w-32 h-32 rounded-full bg-gray-200 dark:bg-purple-700 mb-4' />
              <div className='h-6 w-32 bg-gray-200 dark:bg-purple-700 rounded mb-2' />
              <div className='h-4 w-48 bg-gray-200 dark:bg-purple-700 rounded mb-6' />
              <div className='h-10 w-full bg-gray-200 dark:bg-purple-700 rounded' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 dark:text-gray-400'>
          No profiles found. Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {profiles.map((profile) => (
        <ProfileGridItem key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
