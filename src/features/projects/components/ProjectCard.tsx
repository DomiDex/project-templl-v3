import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: string;
    path: string;
    og_image_url: string;
    project_name: string;
    user_username: string;
    stack_name: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project) return null;

  const { path, og_image_url, project_name, user_username, stack_name } =
    project;

  return (
    <Link href={`/projects/${path}`} className='block group'>
      <div className='bg-gray-50 dark:bg-purple-900 transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md relative'>
          <Image
            className='object-cover group-hover:scale-105 transition-transform duration-200'
            src={og_image_url || '/placeholder-project.jpg'}
            alt={project_name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority={false}
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-2 p-2'>
          <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold truncate'>
            {project_name}
          </h3>
        </div>
        <div className='flex flex-row justify-between items-center gap-2 p-2'>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            by {user_username}
          </p>
          <p className='text-gray-500 dark:text-gray-500 text-xs sm:text-sm'>
            {stack_name}
          </p>
        </div>
      </div>
    </Link>
  );
}
