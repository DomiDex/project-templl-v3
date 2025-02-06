'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SkillCardProps {
  skill: {
    id: string;
    skill_id: string;
    user_id: string;
    display_order: number;
    endorsement_count: number;
    skills: {
      name: string;
      category: string | null;
    };
  };
  onRemove: () => void;
}

export default function SkillCard({ skill, onRemove }: SkillCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Removing skill:', skill.id);
    onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='group relative flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200'
    >
      <span className='text-sm text-gray-700 dark:text-gray-300'>
        {skill.skills.name}
      </span>
      {skill.endorsement_count > 0 && (
        <span className='text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full'>
          {skill.endorsement_count}
        </span>
      )}
      <button
        onClick={handleRemove}
        type='button'
        className='absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full'
      >
        <svg
          className='w-4 h-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}
