-- Harden tutoring credit idempotency: one credit grant per Checkout session.
create unique index if not exists idx_tutoring_credits_checkout_session
  on public.tutoring_credits (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

-- Speed up refund / dispute revocation by payment intent.
create index if not exists idx_track_entitlements_payment_intent
  on public.track_entitlements (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

create index if not exists idx_tutoring_credits_payment_intent
  on public.tutoring_credits (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;
