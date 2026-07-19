-- Kanam Academy — Verifiable parental consent (COPPA) on households
-- Apply in Supabase SQL Editor AFTER households.sql.
-- Safe to re-run.

alter table public.households
  add column if not exists parental_consent_status text not null default 'pending';

alter table public.households
  add column if not exists parental_consent_method text;

alter table public.households
  add column if not exists parental_consent_at timestamptz;

alter table public.households
  add column if not exists parental_consent_signer_name text;

alter table public.households
  add column if not exists parental_consent_notice_version text;

alter table public.households
  add column if not exists parental_consent_parent_email text;

alter table public.households
  add column if not exists parental_consent_stripe_customer_id text;

alter table public.households
  add column if not exists parental_consent_checkout_session_id text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'households_parental_consent_status_check'
  ) then
    alter table public.households
      add constraint households_parental_consent_status_check
      check (parental_consent_status in ('pending', 'verified', 'revoked'));
  end if;
end $$;

comment on column public.households.parental_consent_status is
  'COPPA VPC status: pending | verified | revoked';
comment on column public.households.parental_consent_method is
  'signed_form | stripe_payment_instrument | legacy_pre_vpc';

-- Grandfather households that already had kid profiles before VPC shipped,
-- so existing families are not locked out mid-session. New households stay pending
-- until signed consent (or Stripe Family Checkout) is recorded.
update public.households h
set
  parental_consent_status = 'verified',
  parental_consent_method = 'legacy_pre_vpc',
  parental_consent_at = coalesce(h.parental_consent_at, h.created_at)
where h.parental_consent_method is null
  and exists (
    select 1 from public.students s where s.household_id = h.id
  );
