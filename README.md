# Alchemystery

**alchemystery.in** — A Space for Your Inner Truth

Spiritual guidance and wellness practice operated by Isha Singasane. This repository contains the full-stack web application: a CMS-driven public website and a Super Admin dashboard, built on Next.js and Supabase.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Validation | Zod |

---

## Prerequisites

- Node.js 20+
- npm 10+
- A [Supabase](https://supabase.com) project (free tier works for development)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Security**: `SUPABASE_SERVICE_ROLE_KEY` must NOT have the `NEXT_PUBLIC_` prefix. It is server-only.

Find these values in your Supabase project: **Settings → API**.

### 3. Run database migrations

Open the Supabase SQL Editor (Dashboard → SQL Editor → New query) and run the migration files in order:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
supabase/migrations/003_storage_buckets.sql
supabase/migrations/004_seed_data.sql
```

Copy and paste each file's contents into the SQL Editor and click **Run**.

> **Alternative**: If you have the Supabase CLI installed and linked, you can run migrations via `supabase db push`.

### 4. Create the initial Super Admin

After running the migrations, create the Super Admin user:

**Step 1** — Create the user in Supabase Auth:

Go to **Authentication → Users → Invite user** (or use the Supabase dashboard "Add user" button).

Enter the email address and password for the Super Admin (e.g., `isha@alchemystery.in`).

**Step 2** — Elevate their role to `super_admin`:

After the user is created, run this SQL in the SQL Editor (replace the email):

```sql
UPDATE profiles
SET role = 'super_admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'isha@alchemystery.in'
);
```

**Step 3** — Verify:

```sql
SELECT p.id, u.email, p.role
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.role = 'super_admin';
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public website.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## Project Structure

```
src/
  app/
    (public)/             ← Public website route group
    admin/                ← Admin CMS (protected, super_admin only)
    api/auth/callback/    ← Supabase auth callback
  components/
    ui/                   ← Primitive UI components
    admin/                ← Admin-specific components
    public/               ← Public-facing components
    layout/               ← Header, Footer, Sidebar
  lib/
    supabase/
      client.ts           ← Browser client (anon key)
      server.ts           ← Server client (cookie session)
      admin.ts            ← Service-role client (server only)
    repositories/         ← Data access layer (one file per table)
    services/             ← Application logic (auth, content)
    validations/          ← Zod schemas (shared server/client)
    utils/                ← Helpers (slugify, dates, image URLs)
  types/                  ← TypeScript type definitions
  constants/              ← Roles, statuses, bucket names
  config/
    site.ts               ← Fallback site config

middleware.ts             ← Admin route protection + session refresh

supabase/
  migrations/
    001_initial_schema.sql
    002_rls_policies.sql
    003_storage_buckets.sql
    004_seed_data.sql
```

---

## Architecture Principles

1. **CMS-first**: All content that Isha may want to change lives in Supabase. Nothing is hardcoded in React components.
2. **Data access layer**: Components never query Supabase directly. All queries go through `lib/repositories/`.
3. **Three Supabase clients**: browser (anon), server (cookie-session), admin (service-role). The service-role key never reaches the browser.
4. **Defense-in-depth auth**: Middleware checks session existence → Admin layout checks role via DB → Server Actions re-verify before mutations.
5. **RLS always on**: Row Level Security is enabled on every table. Public users see only `published` content.

---

## Database Tables

| Table | Purpose |
|---|---|
| `profiles` | Extends `auth.users` with role and display name |
| `service_categories` | Groups for services |
| `services` | Individual session offerings |
| `pages` | CMS-managed pages |
| `page_sections` | Content blocks within pages |
| `testimonials` | Client reflections |
| `faqs` | Frequently asked questions |
| `blog_posts` | Insights / articles |
| `site_settings` | Key-value CMS settings |
| `navigation_items` | Header/footer nav links |
| `media_assets` | Supabase Storage file registry |

---

## Development Phases

| Phase | Description | Status |
|---|---|---|
| **01** | Foundation (this phase) | ✅ Complete |
| **02** | Admin CMS UI | ⏳ Next |
| **03** | Design system | ⏳ Pending |
| **04** | Public homepage | ⏳ Pending |
| **05** | Dynamic sessions | ⏳ Pending |
| **06** | About / Practice / FAQ / Connect | ⏳ Pending |
| **07** | Insights / Blog | ⏳ Pending |
| **08** | Booking / Contact | ⏳ Pending |
| **09** | SEO + Performance + Security | ⏳ Pending |
| **10** | Production Polish | ⏳ Pending |

---

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` is never in any `NEXT_PUBLIC_` variable
- RLS is enabled on all tables — never disabled for convenience
- Admin authorization is always verified server-side (never trusting client values)
- Draft/archived content is never exposed to public users
- The `handle_new_user` DB trigger creates profiles with `editor` role by default — `super_admin` must be explicitly assigned
