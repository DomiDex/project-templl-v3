export function getBaseUrl() {
  // In production, use the environment variable
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.templl.dev';
  }
  
  // In development, detect the port from the request if possible
  // Otherwise fallback to the environment variable or localhost:3000
  if (typeof window !== 'undefined') {
    // Client-side: use the current origin
    return window.location.origin;
  }
  
  // Server-side: use the environment variable
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}