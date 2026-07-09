# Supabase setup (Kanam Academy)

## 1) Environment variables

Create a local file in the repo root (recommended): `.env.local`

Copy keys from Supabase → **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; do not expose in the browser)

Template: `config/env.example`

## 2) Apply database schema

Open Supabase → **SQL Editor** and run the **entire** file:

- `supabase/schema.sql`

If a previous run failed partway through, it is safe to re-run the full file (tables use `if not exists`, policies use `drop policy if exists`).

After it succeeds, confirm tables exist:

```sql
select tablename from pg_tables where schemaname = 'public' order by tablename;
```

You should see: `class_enrollments`, `classes`, `lesson_progress`, `progress_events`, `schools`, `students`.

Then verify the app (with `npm run dev` running):

```bash
curl http://localhost:3000/api/health
```

Expected: `{"ok":true,"studentsSample":[]}`

## 3) Auth URL configuration (password reset)

In Supabase → **Authentication → URL Configuration**:

1. **Site URL** = your live app origin (e.g. `https://kanam-academy-2026-v1.vercel.app`), not `http://localhost:3000`.
2. **Redirect URLs** must allow (wildcards are fine):
   - `https://kanam-academy-2026-v1.vercel.app/**`
   - `http://localhost:3000/**` (local only)
3. The app sends reset emails with redirect:
   - `/auth/confirm?next=/welcome/reset-password`
4. Open each reset link **once** in a real browser tab. Some email apps prefetch links and burn the one-time token (`otp_expired`).

## 4) Safety note

If a service role key is ever shared publicly, rotate it in Supabase immediately.

