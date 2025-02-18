import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/types';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

interface ProfileGridItemProps {
  profile: Profile;
}

export default function ProfileGridItem({ profile }: ProfileGridItemProps) {
  return (
    <div className='bg-gray-50 dark:bg-purple-800 rounded-2xl p-6'>
      <div className='flex flex-col items-center'>
        {/* Profile Image */}
        <Link
          href={`/profile/${profile.path}`}
          className='relative w-32 h-32 rounded-full overflow-hidden mb-4 hover:opacity-90 transition-opacity'
        >
          <Image
            src={profile.profile_image_url || '/images/default-avatar.png'}
            alt={profile.username || 'Profile'}
            fill
            className='object-cover'
          />
        </Link>

        {/* Username */}
        <Link
          href={`/profile/${profile.path}`}
          className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
        >
          {profile.username}
        </Link>

        {/* Description */}
        {profile.description && (
          <p className='text-gray-600 dark:text-gray-300 text-center mb-6 line-clamp-2'>
            {profile.description}
          </p>
        )}

        {/* Social Links */}
        <div className='flex gap-4 mb-6'>
          {profile.website_url && (
            <Link
              href={profile.website_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaGlobe size={20} />
            </Link>
          )}
          {profile.linkedin_url && (
            <Link
              href={profile.linkedin_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaLinkedin size={20} />
            </Link>
          )}
          {profile.x_url && (
            <Link
              href={profile.x_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaTwitter size={20} />
            </Link>
          )}
          {profile.github_url && (
            <Link
              href={profile.github_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaGithub size={20} />
            </Link>
          )}
        </div>

        {/* See Profile Link */}
        <Link
          href={`/profile/${profile.path}`}
          className='w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors'
        >
          <span className='font-medium'>See Profile</span>
        </Link>
      </div>
    </div>
  );
}
