export function AuthError({ message }: { message: string }) {
  return (
    <div className='p-3 rounded-md bg-error-light/10 border border-error-light dark:bg-error-dark/10 dark:border-error-dark'>
      <p className='text-sm text-error-light dark:text-error-dark'>{message}</p>
    </div>
  );
}
