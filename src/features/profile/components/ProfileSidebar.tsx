import { Profile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaWhatsapp,
} from 'react-icons/fa';

interface ProfileSidebarProps {
  profile: Profile;
}

export default function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <div className='bg-gray-50 dark:bg-purple-800 rounded-2xl p-6 sticky top-24'>
      <div className='flex flex-col items-center'>
        {/* Profile Image */}
        <div className='relative w-32 h-32 rounded-full overflow-hidden mb-4'>
          <Image
            src={profile.profile_image_url || '/images/default-avatar.png'}
            alt={profile.username || 'Profile'}
            fill
            className='object-cover'
          />
        </div>

        {/* Username */}
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2'>
          {profile.username}
        </h1>

        {/* Description */}
        {profile.description && (
          <p className='text-gray-600 dark:text-gray-300 text-center mb-6'>
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
              <FaGlobe size={24} />
            </Link>
          )}
          {profile.linkedin_url && (
            <Link
              href={profile.linkedin_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaLinkedin size={24} />
            </Link>
          )}
          {profile.x_url && (
            <Link
              href={profile.x_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaTwitter size={24} />
            </Link>
          )}
          {profile.github_url && (
            <Link
              href={profile.github_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300 transition-colors'
            >
              <FaGithub size={24} />
            </Link>
          )}
        </div>

        {/* WhatsApp Button */}
        {profile.phone && (
          <Link
            href={`https://wa.me/${profile.phone}`}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors'
          >
            <FaWhatsapp size={24} />
            <p className='font-medium'>Contact Developer</p>
          </Link>
        )}
      </div>
    </div>
  );
}
