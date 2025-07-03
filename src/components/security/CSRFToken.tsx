import { getOrCreateCSRFToken } from '@/lib/csrf';

export async function CSRFToken() {
  const token = await getOrCreateCSRFToken();
  
  return (
    <input 
      type="hidden" 
      name="_csrf" 
      value={token}
    />
  );
}