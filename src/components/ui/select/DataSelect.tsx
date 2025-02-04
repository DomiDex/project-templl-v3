import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types';

interface DataSelectProps<T extends keyof Tables> {
  table: T;
  column: keyof Tables[T]['Row'];
  labelColumn: keyof Tables[T]['Row'];
  valueColumn: keyof Tables[T]['Row'];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  filter?: {
    column: keyof Tables[T]['Row'];
    value: string | number;
  };
}

export function DataSelect<T extends keyof Tables>({
  table,
  column,
  labelColumn,
  valueColumn,
  placeholder = 'Select an option',
  value,
  onChange,
  className,
  required = false,
  filter,
}: DataSelectProps<T>) {
  const [options, setOptions] = useState<Array<Tables[T]['Row']>>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select('*');

        if (filter) {
          query = query.eq(String(filter.column), filter.value);
        }

        const { data, error } = await query;

        if (error) throw error;
        if (!data) return;

        setOptions(data as Tables[T]['Row'][]);
      } catch (error) {
        console.error(`Error fetching ${table}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, column, labelColumn, valueColumn, filter, supabase]);

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground 
        border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 
        focus:ring-purple-500 disabled:opacity-50 ${className || ''}`}
      disabled={loading}
      required={required}
    >
      <option value=''>{loading ? 'Loading...' : placeholder}</option>
      {options.map((option) => (
        <option
          key={String(option[valueColumn])}
          value={String(option[valueColumn])}
        >
          {String(option[labelColumn])}
        </option>
      ))}
    </select>
  );
}
