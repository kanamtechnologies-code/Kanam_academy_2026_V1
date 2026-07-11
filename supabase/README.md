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

You should see: `class_enrollments`, `class_lesson_assignments`, `classes`, `lesson_progress`, `progress_events`, `schools`, `students`.

### Self-paced / async cohort

All solo learners share **one** class code (default `KANAM-ASYNC`) so they batch together in the database.

1. Create an instructor account (or use an existing one).
2. Copy that instructor's Auth user UUID into `.env.local` as `KANAM_ASYNC_OWNER_USER_ID`.
3. Optionally set `KANAM_ASYNC_CLASS_CODE` / `KANAM_ASYNC_CLASS_NAME`.
4. Set `RESEND_API_KEY` + `KANAM_EMAIL_FROM` so “Email me a self-paced code” actually sends mail.
5. Re-run `supabase/schema.sql` (adds `classes.is_async` if missing).

The first successful request creates the shared class row automatically.

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
   - `/welcome/reset-password`
4. Open each reset link **once** in a real browser tab. Some email apps prefetch links and burn the one-time token (`otp_expired`).

### Reset password email template (recommended — works across devices)

Default Supabase reset links use **PKCE** (`?code=…`). That only works in the **same browser** that clicked “Forgot password.” Opening Gmail on a phone, or an in-app browser, causes:

> PKCE code verifier not found in storage

Fix: Supabase → **Authentication → Email Templates → Reset password**. Replace the link with a **TokenHash** URL (no PKCE verifier needed):

```html
<h2>Reset password</h2>
<p>Follow this link to reset the password for your Kanam Academy account:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/welcome/reset-password">
    Reset password
  </a>
</p>
```

Save the template, then request a **new** reset email (old links still use the previous format).

## 4) Safety note

If a service role key is ever shared publicly, rotate it in Supabase immediately.

