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
3. `supabase/households.sql` (parent/kid households)
4. `supabase/parental_consent.sql` (COPPA consent columns)
5. `supabase/migrations/20260725_rls_hardening.sql` (**required on existing projects** — instructor role gates, consent forgery guard, billing helper IDOR fix)
6. `supabase/migrations/20260726_rls_recursion_fix.sql` (**required** — fixes `infinite recursion detected in policy for relation "class_enrollments"` on sign-in)

If a previous run failed partway through, it is safe to re-run (tables use `if not exists`, policies use `drop policy if exists`).

After it succeeds, confirm tables exist:

```sql
select tablename from pg_tables where schemaname = 'public' order by tablename;
```

You should see core tables plus: `billing_customers`, `billing_subscriptions`, `billing_webhook_events`, `track_entitlements`, `tutoring_credits`, `households`, `household_members`.

### RLS validation (quick)

As a normal authenticated student JWT (not service role), these should **fail**:

```sql
-- Must fail for non-instructors
insert into public.classes (teacher_user_id, name, code)
values (auth.uid(), 'Hijack', 'HACK-1');

-- Must fail (consent columns are service-role only) when parental_consent.sql is applied
update public.households
set parental_consent_status = 'verified'
where owner_user_id = auth.uid();
```

As an instructor JWT (`app_metadata.role = 'instructor'`), class insert for `teacher_user_id = auth.uid()` should succeed. Students must not read peers’ `lesson_progress`.

### Self-paced / async cohort

All solo learners share **one** class code (default `KANAM-ASYNC`) so they batch together in the database.

1. Create an instructor account (or use an existing one).
2. Copy that instructor's Auth user UUID into `.env.local` **and production** as `KANAM_ASYNC_OWNER_USER_ID` (must be a user that still exists).
3. Optionally set `KANAM_ASYNC_CLASS_CODE` / `KANAM_ASYNC_CLASS_NAME`.
4. Re-run `supabase/schema.sql` (adds `classes.is_async` if missing).

The first self-paced signup (or “Get a self-paced code”) creates the class row if missing. If `KANAM_ASYNC_OWNER_USER_ID` is unset or points at a deleted user, the app falls back to an existing class teacher or any instructor account.

Then verify the app (with `npm run dev` running):

```bash
curl http://localhost:3000/api/health
```

Expected: `{"ok":true}`

Ops: see [`docs/ops/backup-restore.md`](../docs/ops/backup-restore.md) and [`docs/ops/error-monitoring.md`](../docs/ops/error-monitoring.md).

## 3) Auth URL configuration (password reset)

In Supabase → **Authentication → URL Configuration**:

1. **Site URL** = your live app origin (e.g. `https://learn.kanamacademy.com`), not `http://localhost:3000`.
2. **Redirect URLs** must allow (wildcards are fine):
   - `https://learn.kanamacademy.com/**`
   - `http://localhost:3000/**` (local only)
3. The app sends reset emails with redirect:
   - `/welcome/reset-password`
4. Open each reset link **once** in a real browser tab. Some email apps prefetch links and burn the one-time token (`otp_expired`).

### Password reset (cross-device)

**Preferred (app):** Forgot password calls `/api/auth/request-password-reset`, which generates a **TokenHash** recovery link and emails it with Resend (`RESEND_API_KEY` + `RESEND_FROM_EMAIL`). Those links work in any browser/device.

**Fallback:** If Resend is not configured, the app uses Supabase’s built-in reset mailer. Default Supabase links use **PKCE** (`?code=…`), which only works in the **same browser** that clicked “Forgot password.” Opening Gmail on a phone often shows “PKCE code verifier not found in storage.”

Optional Supabase template fix (when not using Resend): **Authentication → Email Templates → Reset password**:

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

Student/parent signup uses the public **signUp** API so Supabase sends the Confirm signup email. Enable **Authentication → Providers → Email → Confirm email**.

**Production mail (required before inviting real users):** Supabase’s built-in mailer:

- Only sends to **emails that are members of your Supabase org/team**
- Caps at ~2 messages/hour
- Returns `Error sending confirmation email` for everyone else (what you see on signup)

Until custom SMTP is on, signup for `gmail.com` / school emails will fail even though the app is fine.

**Quick fix with Resend (recommended):**

1. Create a free [Resend](https://resend.com) account and verify your sending domain (or use their onboarding domain for tests).
2. Resend → **API Keys** / SMTP: copy host `smtp.resend.com`, port `587`, user `resend`, password = API key.
3. Supabase → **Authentication → SMTP** → Enable custom SMTP:
   - Host `smtp.resend.com`, Port `587`, User `resend`, Pass = Resend API key
   - Sender email = a verified address (e.g. `noreply@kanamacademy.com`)
4. Save, then try signup again with a non-team email.
5. Raise Auth rate limits if needed: **Authentication → Rate Limits**.
6. **Branded welcome email (app):** set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the Next.js env (see `config/env.example`). On successful student / parent / instructor signup the app sends a separate welcome message via the Resend API (in addition to Supabase’s confirm-signup mail).

**Testing without SMTP:** Supabase → **Authentication → Users** → open the user → confirm email manually (or add that address to the org Team so the default mailer is allowed).

Supabase → **Authentication → Email Templates → Confirm signup**. Prefer `ConfirmationURL` or a TokenHash link:

```html
<h2>Confirm your email</h2>
<p>Follow this link to confirm your Kanam Academy account:</p>
<p>
  <a href="{{ .ConfirmationURL }}">Confirm email</a>
</p>
```

TokenHash alternative (set `next` to `/dashboard` or `/parent` as needed):

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard">
  Confirm email
</a>
```

After confirm, `/auth/confirm` sends parents to `/parent` (from `app_metadata.role`) and other users to `next` (default `/dashboard`). Redirect URLs must still allow `/auth/confirm`.

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

