-- Kanam Academy — Stripe billing / entitlements
-- Apply in Supabase SQL Editor AFTER schema.sql.
-- Writes are service-role only (Checkout webhook). Users can read their own rows.

-- ---------------------------------------------------------------------------
-- Stripe customer ↔ Supabase Auth user
-- ---------------------------------------------------------------------------
create table if not exists public.billing_customers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_billing_customers_updated_at on public.billing_customers;
create trigger trg_billing_customers_updated_at
before update on public.billing_customers
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Family subscription ($30/mo) — platform access to all tracks while active
-- ---------------------------------------------------------------------------
create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_subscription_id text not null unique,
  stripe_price_id text not null,
  status text not null,
  -- Common Stripe statuses: active, trialing, past_due, canceled, unpaid, incomplete, paused
  cancel_at_period_end boolean not null default false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_billing_subscriptions_user
  on public.billing_subscriptions (user_id);

create index if not exists idx_billing_subscriptions_status
  on public.billing_subscriptions (status);

drop trigger if exists trg_billing_subscriptions_updated_at on public.billing_subscriptions;
create trigger trg_billing_subscriptions_updated_at
before update on public.billing_subscriptions
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- One-time track unlocks (per track_slug)
-- ---------------------------------------------------------------------------
create table if not exists public.track_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Optional: which learner profile this unlock applies to (family/sibling later)
  student_id uuid references public.students(id) on delete set null,
  track_slug text not null,
  -- purchase | grant | migration
  source text not null default 'purchase',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_price_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint track_entitlements_slug_check check (
    track_slug in (
      'financial-literacy',
      'digital-literacy',
      'ai-literacy',
      'ai-python',
      'cybersecurity',
      'data-analyst'
    )
  )
);

-- One active entitlement per user + track (subscription covers all tracks separately)
create unique index if not exists idx_track_entitlements_user_slug_active
  on public.track_entitlements (user_id, track_slug)
  where active = true;

create index if not exists idx_track_entitlements_user
  on public.track_entitlements (user_id);

drop trigger if exists trg_track_entitlements_updated_at on public.track_entitlements;
create trigger trg_track_entitlements_updated_at
before update on public.track_entitlements
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Tutoring session credits (trial / single / bundles)
-- ---------------------------------------------------------------------------
create table if not exists public.tutoring_credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null,
  sku text not null,
  sessions_total int not null check (sessions_total > 0),
  sessions_remaining int not null check (sessions_remaining >= 0),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tutoring_credits_remaining_lte_total
    check (sessions_remaining <= sessions_total)
);

create index if not exists idx_tutoring_credits_user
  on public.tutoring_credits (user_id);

create index if not exists idx_tutoring_credits_user_remaining
  on public.tutoring_credits (user_id, sessions_remaining)
  where sessions_remaining > 0;

drop trigger if exists trg_tutoring_credits_updated_at on public.tutoring_credits;
create trigger trg_tutoring_credits_updated_at
before update on public.tutoring_credits
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Webhook idempotency (never process the same Stripe event twice)
-- ---------------------------------------------------------------------------
create table if not exists public.billing_webhook_events (
  stripe_event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb
);

-- ---------------------------------------------------------------------------
-- Access helper: active family sub OR track purchase
-- ---------------------------------------------------------------------------
create or replace function public.user_has_track_access(p_user_id uuid, p_track_slug text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1
      from public.billing_subscriptions s
      where s.user_id = p_user_id
        and s.status in ('active', 'trialing')
        and (s.current_period_end is null or s.current_period_end > now())
    )
    or exists (
      select 1
      from public.track_entitlements e
      where e.user_id = p_user_id
        and e.track_slug = p_track_slug
        and e.active = true
    );
$$;

revoke all on function public.user_has_track_access(uuid, text) from public;
grant execute on function public.user_has_track_access(uuid, text) to authenticated, service_role;

create or replace function public.user_tutoring_sessions_remaining(p_user_id uuid)
returns int
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(sessions_remaining), 0)::int
  from public.tutoring_credits
  where user_id = p_user_id
    and sessions_remaining > 0;
$$;

revoke all on function public.user_tutoring_sessions_remaining(uuid) from public;
grant execute on function public.user_tutoring_sessions_remaining(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.billing_customers enable row level security;
alter table public.billing_subscriptions enable row level security;
alter table public.track_entitlements enable row level security;
alter table public.tutoring_credits enable row level security;
alter table public.billing_webhook_events enable row level security;

-- Customers: read own
drop policy if exists billing_customers_select_own on public.billing_customers;
create policy billing_customers_select_own
  on public.billing_customers for select
  to authenticated
  using (auth.uid() = user_id);

-- Subscriptions: read own
drop policy if exists billing_subscriptions_select_own on public.billing_subscriptions;
create policy billing_subscriptions_select_own
  on public.billing_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- Track entitlements: read own
drop policy if exists track_entitlements_select_own on public.track_entitlements;
create policy track_entitlements_select_own
  on public.track_entitlements for select
  to authenticated
  using (auth.uid() = user_id);

-- Tutoring credits: read own
drop policy if exists tutoring_credits_select_own on public.tutoring_credits;
create policy tutoring_credits_select_own
  on public.tutoring_credits for select
  to authenticated
  using (auth.uid() = user_id);

-- No insert/update/delete policies for authenticated users.
-- Webhook + Checkout APIs use the service role key (bypasses RLS).

-- Webhook events: no client access (service role only)
drop policy if exists billing_webhook_events_deny_all on public.billing_webhook_events;
create policy billing_webhook_events_deny_all
  on public.billing_webhook_events for all
  to authenticated
  using (false)
  with check (false);
