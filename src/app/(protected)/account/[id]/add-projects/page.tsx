import { Metadata } from 'next';
import AddProjectClient from './client';

export const metadata: Metadata = {
  title: 'Add Projects | Account | Templl',
  description:
    'Create and manage your development projects. Showcase your work to potential clients and build your professional portfolio.',
};

export default function AddProjectPage() {
  return <AddProjectClient />;
}
