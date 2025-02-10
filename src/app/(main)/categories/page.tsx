'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Category } from '@/types';
import CategoryCard from '@/features/categories/components/CategoryCard';
import { toast } from 'sonner';

const breadcrumbItems = [{ label: 'Categories', href: '/categories' }];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('category_name');

        if (error) {
          console.error('Error fetching categories:', error);
          toast.error('Failed to load categories');
          return;
        }

        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [supabase]);

  if (loading) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-8' />
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
          Categories
        </h1>

        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Browse templates and services by category.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
