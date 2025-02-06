'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Command } from 'cmdk';

const supabase = createClient();

interface Skill {
  id: string;
  name: string;
  category: string | null;
}

interface UserSkill {
  id: string;
  skill_id: string;
  user_id: string;
  display_order: number;
  endorsement_count: number;
  skills: {
    name: string;
    category: string | null;
  };
}

interface SkillSelectorProps {
  onSelect: (skillId: string) => void;
  existingSkills: UserSkill[];
}

export default function SkillSelector({
  onSelect,
  existingSkills,
}: SkillSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name');

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchSkills();
    }
  }, [open, fetchSkills]);

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()) &&
      !existingSkills.some((existing) => existing.skill_id === skill.id)
  );

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(true)}
        disabled={existingSkills.length >= 10}
        className={`flex items-center gap-2 px-4 py-2 text-sm ${
          existingSkills.length >= 10
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
        } rounded-full transition-colors duration-200`}
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 4v16m8-8H4'
          />
        </svg>
        {existingSkills.length >= 10 ? 'Max Skills Reached' : 'Add Skill'}
      </button>

      {open && (
        <div className='fixed inset-0 z-50 flex items-start justify-center pt-16'>
          <div
            className='fixed inset-0 bg-black/50'
            onClick={() => setOpen(false)}
          />
          <Command
            className='relative w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 shadow-lg overflow-hidden'
            loop
          >
            <input
              className='w-full px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none'
              placeholder='Search skills...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='max-h-[300px] overflow-y-auto p-2'>
              {loading ? (
                <div className='p-4 text-center text-sm text-gray-500'>
                  Loading skills...
                </div>
              ) : filteredSkills.length === 0 ? (
                <div className='p-4 text-center text-sm text-gray-500'>
                  No skills found
                </div>
              ) : (
                filteredSkills.map((skill) => (
                  <button
                    key={skill.id}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                    onClick={() => {
                      onSelect(skill.id);
                      setOpen(false);
                      setSearch('');
                    }}
                  >
                    {skill.name}
                  </button>
                ))
              )}
            </div>
          </Command>
        </div>
      )}
    </div>
  );
}
