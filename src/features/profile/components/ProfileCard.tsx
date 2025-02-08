'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string | null;
  profile_image_url: string | null;
  description: string | null;
  phone: string | null;
}

interface ProfileCardProps {
  userId: string;
}

export default function ProfileCard({ userId }: ProfileCardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching profile for userId:', userId);

      if (!userId) {
        console.error('No userId provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(
            `
            id,
            username,
            profile_image_url,
            description,
            phone
          `
          )
          .eq('id', userId)
          .single();

        if (error) {
          console.error(
            'Supabase error:',
            error.message,
            error.details,
            error.hint
          );
          toast.error(`Failed to load profile: ${error.message}`);
          return;
        }

        if (!data) {
          console.log('No profile data found');
          return;
        }

        console.log('Profile data:', data);
        setProfile(data);
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred while loading the profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, supabase]);

  console.log('Render state:', { loading, profile, userId });

  if (loading) {
    return (
      <div className='sticky top-24 right-0 ml-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full' />
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24' />
            <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-20' />
          </div>
        </div>
        <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded w-full' />
      </div>
    );
  }

  if (!profile) {
    console.log('No profile data found for userId:', userId);
    return (
      <div className='sticky top-24 right-0 ml-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm'>
        <p className='text-gray-500'>Profile not found</p>
      </div>
    );
  }

  return (
    <div className='sticky top-24 right-0 ml-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm'>
      <Link
        href={`/profile/${profile.username}`}
        className='flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity'
      >
        <div className='relative w-12 h-12 rounded-full overflow-hidden'>
          <Image
            src={profile.profile_image_url || '/placeholder-avatar.jpg'}
            alt={profile.username || 'Profile'}
            fill
            className='object-cover'
          />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
            {profile.username}
          </h3>
        </div>
      </Link>

      {profile.description && (
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
          {profile.description}
        </p>
      )}

      {profile.phone ? (
        <a
          href={`https://wa.me/${profile.phone}`}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
          </svg>
          Contact on WhatsApp
        </a>
      ) : (
        <p className='text-center text-sm text-gray-500'>
          WhatsApp contact not available
        </p>
      )}
    </div>
  );
}
