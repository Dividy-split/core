# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:seed  # Seed the database (npx tsx prisma/seed.ts)
```

After any change to `prisma/schema.prisma`, run `npm run prisma:generate` before running the app.

## Architecture

**Dividy** is a Next.js 16 (App Router) app for sharing subscription costs in groups. Stack: React 19, TypeScript, Tailwind CSS v4, Prisma (PostgreSQL), better-auth, Resend (emails), shadcn/ui.

### Route groups

- `app/(auth)/` — public auth pages (sign-in, sign-up, verify-email)
- `app/(protected)/` — pages requiring authentication; layout enforces session + email verification server-side
- `app/platforms/` — public platform browsing pages
- `app/api/` — REST API routes

### Middleware

The routing middleware lives in [proxy.ts](proxy.ts), **not** `middleware.ts`. It handles redirects for:
- Unauthenticated users → `/sign-in`
- Verified but not onboarded users → `/onboarding`
- Authenticated users on auth pages → `/dashboard`

### Authentication

Configured in [lib/auth.ts](lib/auth.ts) using `better-auth` with Prisma adapter. Client-side helpers are in [lib/auth-client.ts](lib/auth-client.ts). Auth requires:
- Email verification before access to protected routes
- An onboarding step (tracked via `user.onboardingCompleted`) before dashboard access
- Google OAuth and email/password both supported

Password rules (uppercase + digit) are enforced via a `before` hook in the auth config, not at the UI layer.

### Database

Prisma singleton at [lib/db.ts](lib/db.ts). Key models:
- `Platform` — seeded, static (streaming services, etc.)
- `Group` — user-created sharing groups linked to a platform; has `maxMembers`, `pricePerMonth`, `invoiceVerified`, `instantAcceptance`
- `GroupMember` — join table with `status: PENDING | ACTIVE | REJECTED`
- `User` has `onboardingCompleted` as a custom field (also surfaced on the better-auth session via a `callbacks.session` hook)

### CSRF protection

All mutating API routes (`POST`, etc.) call `verifyCsrf(request)` from [lib/csrf.ts](lib/csrf.ts), which validates the `Origin` header against `NEXT_PUBLIC_APP_URL`. Always add this check to new mutating routes.

### Component structure

- `components/ui/` — shadcn/ui primitives (do not edit these manually; use the shadcn CLI)
- `components/features/` — feature-specific reusable components
- `features/` — self-contained feature modules (each has its own `components/`, `api.ts`, `types.ts`, `index.ts`)

### Path alias

`@/*` resolves to the project root, e.g. `@/lib/db`, `@/components/ui/button`.

### Deployment

Deployed on Scalingo. `Procfile` runs `npx next start -p $PORT`. The proxy middleware fetches session internally via `http:` (not `https:`) to avoid TLS issues on Scalingo — do not change this.

### Environment variables

Copy `.env.example` to `.env`. Key variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, `EMAIL_FROM`.

In development, if Resend fails to send a verification email, the verification URL is logged to the console as a fallback.
