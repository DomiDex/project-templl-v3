# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Templl.dev is a developer portfolio and services marketplace built with Next.js 15, TypeScript, and Supabase. It allows developers to showcase projects, share templates, and offer services while providing clients a platform to find specialized talent.

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Note: TypeScript and ESLint errors are currently ignored during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true` in next.config.ts).

## Architecture & Structure

### Route Groups
- `(auth)` - Authentication pages (sign-in, sign-up, verify-email)
- `(main)` - Public pages (home, services, templates, categories, profiles)
- `(protected)` - Account management pages requiring authentication

### Feature-Based Organization
```
src/features/
├── auth/          # Authentication logic, components, actions
├── projects/      # Project CRUD, forms, display components
├── services/      # Service marketplace functionality
├── templates/     # Template marketplace functionality
├── profile/       # User profile management
└── theme/         # Dark/light theme management with Zustand
```

### Key Architectural Patterns

1. **Form Handling**: Zod schemas with TypeScript types, custom hooks for form logic
2. **State Management**: Zustand stores for global state (auth, skills, theme)
3. **Data Fetching**: Direct Supabase queries in server components and client hooks
4. **Component Structure**: Shared UI components in `/components/ui`, feature-specific in `/features/[feature]/components`

## Database & Supabase Patterns

### Query Best Practices
```typescript
// Always type your queries
const { data, error } = await supabase
  .from('templates')
  .select('*, categories(*), stacks(*)')  // Specify columns and relations
  .order('created_at', { ascending: false })
  .range(from, to);  // Use range for pagination

// Handle errors properly
if (error) {
  console.error('Supabase error:', error);
  throw new Error('Failed to fetch templates');
}
```

### Service Limits
- Free users: Maximum 3 projects/services
- Pro users: Unlimited projects/services

## Styling Guidelines

### Tailwind Configuration
- Custom color system with CSS variables (--background, --foreground, etc.)
- Gray scale (50-900) and Purple scale (50-900)
- Dark mode support using `dark:` modifier
- Mobile-first responsive design (breakpoints: md, lg)

### Component Styling Pattern
```tsx
// Use utility classes directly, avoid custom CSS
<button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

## Key Technologies & Libraries

- **Framework**: Next.js 15.3.1 with App Router and Turbopack
- **UI**: Radix UI primitives, Framer Motion animations
- **Forms**: Zod validation with custom form hooks
- **State**: Zustand for global state management
- **Backend**: Supabase (Auth, Database, Storage)
- **Styling**: Tailwind CSS with custom design tokens
- **Markdown**: react-markdown with GitHub Flavored Markdown

## Current Development Status

### Completed ✅
- Authentication system with email verification
- Forms for projects, services, templates, and profiles
- Pro user features and service limits
- Image upload to Supabase storage
- Dark/light theme system

### In Progress 🚧
- CRUD operations in account pages (display, edit, delete)
- Main page creation and content population

## Important Conventions

1. **File Naming**: Use kebab-case for files, PascalCase for components
2. **Components**: Functional components with TypeScript interfaces
3. **Error Handling**: Always handle Supabase errors with user-friendly messages
4. **Performance**: Use Server Components by default, Client Components only when needed
5. **Type Safety**: Define types for all data structures and API responses

## Environment Configuration

Required environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```