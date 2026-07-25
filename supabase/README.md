# Supabase setup (Kanam Academy)

## 1) Environment variables

Create a local file in the repo root (recommended): `.env.local`

Copy keys from Supabase → **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; do not expose in the browser)

Template: `config/env.example`

## 2) Apply database schema

Open Supabase → **SQL Editor** and run these files in order:

1. `supabase/schema.sql` (core app tables — if not already applied)
2. `supabase/billing.sql` (Stripe customers, subscriptions, track entitlements, tutoring credits)

If a previous run failed partway through, it is safe to re-run (tables use `if not exists`, policies use `drop policy if exists`).

After it succeeds, confirm tables exist:

```sql
select tablename from pg_tables where schemaname = 'public' order by tablename;
```

You should see core tables plus: `billing_customers`, `billing_subscriptions`, `billing_webhook_events`, `track_entitlements`, `tutoring_credits`.

### Self-paced / async cohort

All solo learners share **one** class code (default `KANAM-ASYNC`) so they batch together in the database.

1. Create an instructor account (or use an existing one).
2. Copy that instructor's Auth user UUID into `.env.local` as `KANAM_ASYNC_OWNER_USER_ID`.
3. Optionally set `KANAM_ASYNC_CLASS_CODE` / `KANAM_ASYNC_CLASS_NAME`.
4. Re-run `supabase/schema.sql` (adds `classes.is_async` if missing).

The first “Get a self-paced code” click creates the class row in Supabase and returns the code to the welcome form (no separate email provider).

Then verify the app (with `npm run dev` running):

```bash
curl http://localhost:3000/api/health
```

Expected: `{"ok":true,"studentsSample":[]}`

## 3) Auth URL configuration (password reset)

In Supabase → **Authentication → URL Configuration**:

1. **Site URL** = your live app origin (e.g. `https://learn.kanamacademy.com`), not `http://localhost:3000`.
2. **Redirect URLs** must allow (wildcards are fine):
   - `https://learn.kanamacademy.com/**`
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

### Confirm signup email template (required for student/parent signup)

Student and parent signup create users with **unconfirmed** email, then send a confirmation message. Enable **Authentication → Providers → Email → Confirm email**.

Supabase → **Authentication → Email Templates → Confirm signup**. Prefer a TokenHash link (same reason as password reset):

```html
<h2>Confirm your email</h2>
<p>Follow this link to confirm your Kanam Academy account:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard">
    Confirm email
  </a>
</p>
```

After confirm, `/auth/confirm` sends parents to `/parent` (from `user_metadata.role`) and other users to `next` (default `/dashboard`). Redirect URLs must still allow `/auth/confirm`.

## 4) Stripe billing

1. Apply `supabase/billing.sql` (see above).
2. Add to `.env.local`:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - optional `NEXT_PUBLIC_APP_URL=https://learn.kanamacademy.com`
3. Price IDs live in `lib/billing/stripe-catalog.ts`.
4. App routes:
   - `POST /api/billing/checkout` — start Checkout (auth required)
   - `POST /api/billing/portal` — Customer portal (auth required)
   - `GET /api/billing/status` — subscription / tracks / tutoring credits
   - `POST /api/stripe/webhook` — Stripe webhooks
5. Stripe Dashboard → Developers → Webhooks → endpoint:
   - `https://learn.kanamacademy.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`,
     `invoice.paid`, `invoice.payment_failed`
6. Buy UI: `/billing` (supports marketing deep-links:
   `?plan=subscription|track|tutoring`, `?track=<slug>`, `?tutoring=trial|session|bundle4|bundle8|bundle16`)
7. Marketing site Buy buttons → `https://learn.kanamacademy.com/billing?...`

## 5) Safety note

If a service role key is ever shared publicly, rotate it in Supabase immediately.

