# Templl.dev - Developer Portfolio & Service Platform

## Overview

A modern web platform for developers to showcase their work, share templates, and offer services. Built with Next.js 15, TypeScript, and Supabase.

## Features

### For Developers

- Create and manage project portfolios
- Offer professional services
- Share development templates
- Customizable profile pages
- Pro plan with unlimited projects/services

### For Clients

- Browse developer portfolios
- Access high-quality templates
- Find specialized services
- Advanced search capabilities

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Form Handling**: Zod
- **Markdown**: React Markdown with GFM

## Project Structure

```
src/
├── app/             # Next.js app router
├── components/      # Shared UI components
├── features/        # Feature-based modules
├── lib/            # Utility functions
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## Development Progress

### Completed ✅

- [x] Add a new project form
- [x] Add a new service form
- [x] Add a new template form
- [x] Add a new profile form
- [x] User authentication
- [x] Pro user features
- [x] Image upload system

### In Progress 🚧

- [ ] Display new project, service, template in the account page
- [ ] Edit project, service, template in the account page
- [ ] Delete project, service, template in the account page
- [ ] Create all the main pages

## Database Schema

### Profile

```typescript
type Profile = {
  id: string;
  username: string | null;
  path: string | null;
  description: string | null;
  profile_image_url: string | null;
  email: string | null;
  phone: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  github_url: string | null;
  updated_at: string;
  created_at: string;
};
```

## Service Limits

- Free Plan: Maximum 3 projects/services
- Pro Plan: Unlimited projects/services

## Getting Started

1. Install dependencies:

```bash:README.md
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Contributing

1. Follow the existing coding style and conventions
2. Use meaningful variable and function names
3. Write clear and concise code
4. Break down complex functions
5. Avoid code duplication

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
