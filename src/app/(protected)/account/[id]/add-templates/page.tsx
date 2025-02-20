import { Metadata } from 'next';
import AddTemplateClient from './client';

export const metadata: Metadata = {
  title: 'Add Templates | Account | Templl',
  description:
    'Create and manage your development templates. Share your reusable code solutions and earn from your expertise.',
};

export default function AddTemplatePage() {
  return <AddTemplateClient />;
}
