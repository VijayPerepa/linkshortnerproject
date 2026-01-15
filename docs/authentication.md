# Authentication Instructions

## Overview

All authentication in this application is handled exclusively by **Clerk**. Do not implement or suggest any other authentication method.

## Core Rules

1. **Clerk Only**: Never use NextAuth, custom JWT, sessions, or any other auth solution
2. **Modal Sign-In/Sign-Up**: Always configure Clerk to launch as a modal, not redirect to separate pages
3. **Protected Routes**: The `/dashboard` route requires authentication
4. **Auto-Redirect**: Authenticated users accessing `/` (homepage) should be redirected to `/dashboard`

## Implementation Patterns

### Protecting Routes

Use Clerk's middleware or auth helpers to protect routes:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

### Server Components

```typescript
import { auth } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  // Component logic
}
```

### Client Components

```typescript
'use client'
import { useAuth, useUser } from '@clerk/nextjs'

export default function UserProfile() {
  const { userId, isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  
  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) redirect('/sign-in')
  
  return <div>Welcome {user?.firstName}</div>
}
```

### Homepage Redirect Logic

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }
  
  // Show landing page for unauthenticated users
  return <LandingPage />
}
```

### Modal Configuration

Ensure Clerk sign-in/sign-up appears as modals by setting environment variables:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Then use Clerk components with `mode="modal"`:

```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs'

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

## Database Integration

Link user data to Clerk's user ID:

```typescript
// db/schema.ts
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  shortCode: text('short_code').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

Query with user ID:

```typescript
const { userId } = await auth()
const userLinks = await db.select()
  .from(links)
  .where(eq(links.userId, userId))
```

## Security Checklist

- ✅ Always validate `userId` exists before database operations
- ✅ Filter database queries by `userId` to prevent unauthorized access
- ✅ Use server-side `auth()` for protected API routes
- ✅ Never trust client-side auth state for sensitive operations
- ✅ Use Clerk webhooks to sync user data if needed

## Common Mistakes to Avoid

- ❌ Don't create custom login forms or authentication logic
- ❌ Don't use cookies or localStorage for auth state
- ❌ Don't redirect to external sign-in pages (use modals)
- ❌ Don't allow unauthenticated access to `/dashboard`
- ❌ Don't forget to redirect authenticated users from homepage

---

**Reference**: [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
