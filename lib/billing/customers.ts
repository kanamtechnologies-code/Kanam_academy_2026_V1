import type Stripe from "stripe";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export async function getOrCreateStripeCustomer(params: {
  userId: string;
  email?: string | null;
}): Promise<string> {
  const admin = createSupabaseAdminClient();
  const stripe = getStripe();

  const { data: existing, error } = await admin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", params.userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (existing?.stripe_customer_id) return existing.stripe_customer_id;

  const customer = await stripe.customers.create({
    email: params.email ?? undefined,
    metadata: {
      supabase_user_id: params.userId,
    },
  });

  const { error: insertErr } = await admin.from("billing_customers").insert({
    user_id: params.userId,
    stripe_customer_id: customer.id,
    email: params.email ?? null,
  });

  if (insertErr) {
    // Race: another request created the row — reuse it.
    const { data: raced } = await admin
      .from("billing_customers")
      .select("stripe_customer_id")
      .eq("user_id", params.userId)
      .maybeSingle();
    if (raced?.stripe_customer_id) return raced.stripe_customer_id;
    throw new Error(insertErr.message);
  }

  return customer.id;
}

export async function syncSubscriptionFromStripe(
  subscription: Stripe.Subscription,
  userId: string
) {
  const admin = createSupabaseAdminClient();
  const item = subscription.items.data[0];
  const priceId =
    typeof item?.price?.id === "string" ? item.price.id : "";
  const periodStart = item?.current_period_start;
  const periodEnd = item?.current_period_end;

  const row = {
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    status: subscription.status,
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
    current_period_start: periodStart
      ? new Date(periodStart * 1000).toISOString()
      : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await admin.from("billing_subscriptions").upsert(row, {
    onConflict: "stripe_subscription_id",
  });

  if (error) throw new Error(error.message);
}
