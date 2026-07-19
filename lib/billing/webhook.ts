import type Stripe from "stripe";

import { syncSubscriptionFromStripe } from "@/lib/billing/customers";
import {
  TRACK_SLUG_BY_PRICE,
  TUTORING_SESSIONS_BY_PRICE,
  isFamilySubPrice,
} from "@/lib/billing/stripe-catalog";
import { looksLikeMissingConsentColumn, stripeConsentUpdate } from "@/lib/coppa/parentalConsent";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

async function markHouseholdStripeConsent(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  userId: string,
  session: Stripe.Checkout.Session
) {
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
  const update = stripeConsentUpdate({
    stripeCustomerId: customerId,
    checkoutSessionId: session.id,
  });
  const { error } = await admin
    .from("households")
    .update(update)
    .eq("owner_user_id", userId);
  if (error && !looksLikeMissingConsentColumn(error.message)) {
    throw new Error(error.message);
  }
}

async function resolveUserId(params: {
  metadataUserId?: string | null;
  customerId?: string | null;
}): Promise<string | null> {
  if (params.metadataUserId) return params.metadataUserId;

  if (!params.customerId) return null;
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("billing_customers")
    .select("user_id")
    .eq("stripe_customer_id", params.customerId)
    .maybeSingle();
  return data?.user_id ?? null;
}

async function markEventProcessed(event: Stripe.Event) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("billing_webhook_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });
  // Unique violation = already processed
  if (error && !error.message.toLowerCase().includes("duplicate")) {
    throw new Error(error.message);
  }
  return !error;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = await resolveUserId({
    metadataUserId: session.metadata?.supabase_user_id ?? session.client_reference_id,
    customerId:
      typeof session.customer === "string" ? session.customer : session.customer?.id,
  });
  if (!userId) throw new Error("checkout.session.completed: missing user id");

  const admin = createSupabaseAdminClient();
  const stripe = getStripe();
  const kind = session.metadata?.kind ?? "";
  const priceId = session.metadata?.price_id ?? "";

  if (session.mode === "subscription" || kind === "subscription" || isFamilySubPrice(priceId)) {
    const subId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;
    if (!subId) throw new Error("subscription checkout missing subscription id");
    const subscription = await stripe.subscriptions.retrieve(subId);
    await syncSubscriptionFromStripe(subscription, userId);
    // Payment-instrument VPC (FTC method) for the parent household.
    await markHouseholdStripeConsent(admin, userId, session);
    return;
  }

  if (kind === "track" || TRACK_SLUG_BY_PRICE[priceId]) {
    const trackSlug =
      session.metadata?.track_slug || TRACK_SLUG_BY_PRICE[priceId];
    if (!trackSlug) throw new Error("track checkout missing track_slug");

    const { error } = await admin.from("track_entitlements").upsert(
      {
        user_id: userId,
        track_slug: trackSlug,
        source: "purchase",
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,
        stripe_price_id: priceId || null,
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,track_slug" }
    );

    // Partial unique index may not map to onConflict — fall back to insert/update
    if (error) {
      const { data: existing } = await admin
        .from("track_entitlements")
        .select("id")
        .eq("user_id", userId)
        .eq("track_slug", trackSlug)
        .eq("active", true)
        .maybeSingle();

      if (existing?.id) {
        const { error: updErr } = await admin
          .from("track_entitlements")
          .update({
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id ?? null,
            stripe_price_id: priceId || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (updErr) throw new Error(updErr.message);
      } else {
        const { error: insErr } = await admin.from("track_entitlements").insert({
          user_id: userId,
          track_slug: trackSlug,
          source: "purchase",
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          stripe_price_id: priceId || null,
          active: true,
        });
        if (insErr) throw new Error(insErr.message);
      }
    }
    return;
  }

  if (kind === "tutoring" || TUTORING_SESSIONS_BY_PRICE[priceId]) {
    const sessions =
      Number(session.metadata?.sessions || 0) ||
      TUTORING_SESSIONS_BY_PRICE[priceId] ||
      0;
    if (sessions < 1) throw new Error("tutoring checkout missing sessions");

    const sku = session.metadata?.tutoring_sku || session.metadata?.sku || "tutoring";
    const { error } = await admin.from("tutoring_credits").insert({
      user_id: userId,
      sku,
      sessions_total: sessions,
      sessions_remaining: sessions,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      stripe_price_id: priceId || null,
    });
    if (error) throw new Error(error.message);
  }
}

async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  const userId = await resolveUserId({
    metadataUserId: subscription.metadata?.supabase_user_id,
    customerId:
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer?.id,
  });
  if (!userId) throw new Error("subscription event missing user id");
  await syncSubscriptionFromStripe(subscription, userId);
}

export async function processStripeEvent(event: Stripe.Event) {
  const shouldProcess = await markEventProcessed(event);
  if (!shouldProcess) return { ok: true, duplicate: true };

  switch (event.type) {
    case "checkout.session.completed": {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
      break;
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const parentSub = invoice.parent?.subscription_details?.subscription;
      const legacySub = (invoice as { subscription?: string | { id?: string } | null })
        .subscription;
      const subId =
        (typeof parentSub === "string" ? parentSub : parentSub && "id" in parentSub
          ? String((parentSub as { id: string }).id)
          : null) ||
        (typeof legacySub === "string" ? legacySub : legacySub?.id) ||
        null;
      if (subId) {
        const subscription = await getStripe().subscriptions.retrieve(subId);
        await handleSubscriptionEvent(subscription);
      }
      break;
    }
    default:
      break;
  }

  return { ok: true, duplicate: false };
}
