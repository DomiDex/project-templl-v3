import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProjectAccountCardProps {
  project: {
    id: string;
    project_name: string;
    stack_name: string;
    user_username: string;
    og_image_url: string;
    project_link?: string;
  };
  onEdit: (project: ProjectAccountCardProps['project']) => void;
  onDelete: () => void;
}

export default function ProjectAccountCard({
  project,
  onEdit,
  onDelete,
}: ProjectAccountCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className='relative overflow-hidden bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group rounded-lg p-2 h-full border-shadow-sm border-gray-300 dark:border-gray-700'>
      <div className='relative w-full h-48'>
        <Image
          className='object-cover rounded-md'
          src={project.og_image_url || '/placeholder-project.jpg'}
          alt={project.project_name || 'Project'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold'>
          {project.project_name}
        </h3>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p className='text-gray-600 dark:text-gray-400'>
          by {project.user_username}
        </p>
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
          {project.stack_name}
        </p>
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 w-full h-full flex flex-col justify-center items-center',
          'translate-y-full group-hover:translate-y-0 transition-all duration-200',
          'rounded-md gap-2 backdrop-blur-sm bg-gray-50/30 dark:bg-gray-900/30'
        )}
      >
        <button
          className='relative z-10 bg-white/80 hover:bg-gray-100/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 text-gray-900 dark:text-gray-100 py-2 px-4 rounded transition-colors duration-200 w-32 backdrop-blur-sm'
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
        >
          Edit
        </button>
        <button
          className='bg-purple-500/80 hover:bg-purple-600/80 dark:bg-purple-400/80 dark:hover:bg-purple-300/80 text-white dark:text-gray-900 py-2 px-4 rounded transition-colors duration-200 w-32 backdrop-blur-sm'
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className='absolute -z-10 bottom-0 left-0 w-full h-full bg-gray-900/30 dark:bg-gray-800/30 backdrop-blur-sm'></div>
      </div>
    </div>
  );
}
