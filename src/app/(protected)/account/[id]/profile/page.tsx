import { Metadata } from 'next';
import ProfileClient from './client';

export const metadata: Metadata = {
  title: 'Profile Settings | Account | Templl',
  description:
    'Manage your developer profile settings, update your personal information, skills, and professional links.',
};

export default function ProfilePage() {
  return <ProfileClient />;
}
