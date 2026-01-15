# Agent Instructions - Link Shortener Project

This file contains coding standards and guidelines for LLMs working on this Next.js link shortener project.

## Project Overview

This is a **Link Shortener** application built with:
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Drizzle ORM** with Neon PostgreSQL
- **Clerk** for authentication
- **Lucide React** for icons

---

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST ⚠️

**BEFORE GENERATING ANY CODE**, you MUST:

1. **ALWAYS** read the relevant instruction files in the `/docs` directory
2. **NEVER** generate code without first reviewing the applicable documentation
3. **STOP** and check the docs if you're working on authentication, UI components, or any documented feature

### Available Documentation Files

Read these files BEFORE writing code in their respective areas:

- **[docs/authentication.md](docs/authentication.md)** - Authentication patterns, Clerk setup, protected routes, user management
- **[docs/ui-components.md](docs/ui-components.md)** - shadcn/ui component usage, styling guidelines, accessibility

**This is not optional.** The documentation contains critical implementation patterns, security requirements, and type definitions that MUST be followed.

---

## Core Principles

1. **Type Safety First**: Always use TypeScript with strict typing. Avoid `any` types.
2. **Server Components by Default**: Use React Server Components unless client interactivity is required.
3. **Database-Driven**: All data operations use Drizzle ORM with proper type inference.
4. **Responsive Design**: Mobile-first approach using Tailwind CSS.
5. **Performance**: Optimize for Core Web Vitals and Next.js best practices.
6. **Security**: Authentication via Clerk, secure database queries, input validation.

## Project Structure

```
linkshortnerproject/
├── app/                    # Next.js App Router pages and layouts
├── components/             # React components (ui/, features/, shared/)
├── db/                     # Database schema and connection
├── lib/                    # Utility functions and helpers
├── public/                 # Static assets
└── docs/                   # Agent instruction documentation
```

## Quick Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Environment Variables

Required environment variables (store in `.env.local`):

```env
DATABASE_URL=                    # Neon PostgreSQL connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Common Patterns

### Component Creation
```tsx
// Server Component (default)
export default function ComponentName() {
  return <div>Content</div>
}

// Client Component (when needed)
'use client'
import { useState } from 'react'

export default function InteractiveComponent() {
  const [state, setState] = useState<string>('')
  return <div>{state}</div>
}
```

### Database Queries
```typescript
import { db } from '@/db'
import { links } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Query example
const link = await db.select().from(links).where(eq(links.id, linkId))
```

### Styling with Tailwind
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

## Code Quality Standards

- **No `console.log` in production code** - Use proper error handling
- **Always handle async errors** - Use try/catch blocks
- **Validate user inputs** - Never trust client-side data
- **Use semantic HTML** - Proper accessibility attributes
- **Comment complex logic** - Explain "why", not "what"
- **Keep functions small** - Single responsibility principle
- **Use meaningful names** - Descriptive variable and function names

## Testing Guidelines

- Write tests for critical business logic
- Test API routes with edge cases
- Validate database schema constraints
- Test authentication flows

## Version Control

- Write clear, descriptive commit messages
- One logical change per commit
- Test before committing
- Keep commits focused and atomic

---

**Last Updated**: January 2026  
**Version**: 1.0.0
