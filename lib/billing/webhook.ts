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

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

function paymentIntentIdFrom(
  value: string | Stripe.PaymentIntent | null | undefined
): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id ?? null;
}

function customerIdFrom(
  value: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : "deleted" in value && value.deleted ? null : value.id;
}

async function markHouseholdStripeConsent(
  admin: AdminClient,
  userId: string,
  session: Stripe.Checkout.Session
) {
  const customerId = customerIdFrom(session.customer);
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

/** Claim the event for processing. Duplicate Stripe deliveries return false. */
async function claimEvent(event: Stripe.Event): Promise<boolean> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("billing_webhook_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });
  if (!error) return true;
  if (error.message.toLowerCase().includes("duplicate")) return false;
  throw new Error(error.message);
}

/** Release a claimed event so Stripe retries can re-process after a handler failure. */
async function releaseEvent(eventId: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("billing_webhook_events")
    .delete()
    .eq("stripe_event_id", eventId);
  if (error) {
    console.error("[stripe webhook] failed to release event for retry", eventId, error.message);
  }
}

function isCheckoutPaidEnough(session: Stripe.Checkout.Session): boolean {
  // Card / immediate methods land as paid. Free/trial-ish sessions can be no_payment_required.
  // Async methods (e.g. bank debit) stay unpaid until checkout.session.async_payment_succeeded.
  return session.payment_status === "paid" || session.payment_status === "no_payment_required";
}

async function upsertTrackEntitlement(params: {
  admin: AdminClient;
  userId: string;
  trackSlug: string;
  sessionId: string;
  paymentIntentId: string | null;
  priceId: string | null;
}) {
  const { admin, userId, trackSlug, sessionId, paymentIntentId, priceId } = params;
  const { error } = await admin.from("track_entitlements").upsert(
    {
      user_id: userId,
      track_slug: trackSlug,
      source: "purchase",
      stripe_checkout_session_id: sessionId,
      stripe_payment_intent_id: paymentIntentId,
      stripe_price_id: priceId,
      active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,track_slug" }
  );

  if (!error) return;

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
        stripe_checkout_session_id: sessionId,
        stripe_payment_intent_id: paymentIntentId,
        stripe_price_id: priceId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
    if (updErr) throw new Error(updErr.message);
    return;
  }

  const { error: insErr } = await admin.from("track_entitlements").insert({
    user_id: userId,
    track_slug: trackSlug,
    source: "purchase",
    stripe_checkout_session_id: sessionId,
    stripe_payment_intent_id: paymentIntentId,
    stripe_price_id: priceId,
    active: true,
  });
  if (insErr) throw new Error(insErr.message);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!isCheckoutPaidEnough(session)) {
    // Wait for checkout.session.async_payment_succeeded (or a later paid completion).
    return { skipped: "unpaid_checkout" as const };
  }

  const userId = await resolveUserId({
    metadataUserId: session.metadata?.supabase_user_id ?? session.client_reference_id,
    customerId: customerIdFrom(session.customer),
  });
  if (!userId) throw new Error("checkout.session.completed: missing user id");

  const admin = createSupabaseAdminClient();
  const stripe = getStripe();
  const kind = session.metadata?.kind ?? "";
  const priceId = session.metadata?.price_id ?? "";
  const paymentIntentId = paymentIntentIdFrom(session.payment_intent);

  if (session.mode === "subscription" || kind === "subscription" || isFamilySubPrice(priceId)) {
    const subId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;
    if (!subId) throw new Error("subscription checkout missing subscription id");
    const subscription = await stripe.subscriptions.retrieve(subId);
    await syncSubscriptionFromStripe(subscription, userId);
    await markHouseholdStripeConsent(admin, userId, session);
    return { granted: "subscription" as const };
  }

  if (kind === "track" || TRACK_SLUG_BY_PRICE[priceId]) {
    const trackSlug = session.metadata?.track_slug || TRACK_SLUG_BY_PRICE[priceId];
    if (!trackSlug) throw new Error("track checkout missing track_slug");

    await upsertTrackEntitlement({
      admin,
      userId,
      trackSlug,
      sessionId: session.id,
      paymentIntentId,
      priceId: priceId || null,
    });
    return { granted: "track" as const };
  }

  if (kind === "tutoring" || TUTORING_SESSIONS_BY_PRICE[priceId]) {
    const sessions =
      Number(session.metadata?.sessions || 0) || TUTORING_SESSIONS_BY_PRICE[priceId] || 0;
    if (sessions < 1) throw new Error("tutoring checkout missing sessions");

    const sku = session.metadata?.tutoring_sku || session.metadata?.sku || "tutoring";
    const { error } = await admin.from("tutoring_credits").insert({
      user_id: userId,
      sku,
      sessions_total: sessions,
      sessions_remaining: sessions,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      stripe_price_id: priceId || null,
    });
    if (error) {
      // Idempotent retries (unique checkout session) are success.
      if (error.message.toLowerCase().includes("duplicate")) {
        return { granted: "tutoring" as const, duplicateCredit: true };
      }
      throw new Error(error.message);
    }
    return { granted: "tutoring" as const };
  }

  return { granted: "none" as const };
}

async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  const userId = await resolveUserId({
    metadataUserId: subscription.metadata?.supabase_user_id,
    customerId: customerIdFrom(subscription.customer),
  });
  if (!userId) throw new Error("subscription event missing user id");
  await syncSubscriptionFromStripe(subscription, userId);
}

async function revokeOneTimePurchasesByPaymentIntent(paymentIntentId: string) {
  const admin = createSupabaseAdminClient();
  const now = new Date().toISOString();

  const [{ error: trackErr }, { error: tutoringErr }] = await Promise.all([
    admin
      .from("track_entitlements")
      .update({ active: false, updated_at: now })
      .eq("stripe_payment_intent_id", paymentIntentId)
      .eq("active", true),
    admin
      .from("tutoring_credits")
      .update({ sessions_remaining: 0, updated_at: now })
      .eq("stripe_payment_intent_id", paymentIntentId)
      .gt("sessions_remaining", 0),
  ]);

  if (trackErr) throw new Error(trackErr.message);
  if (tutoringErr) throw new Error(tutoringErr.message);
}

async function handleChargeReversal(charge: Stripe.Charge, reason: "refund" | "dispute") {
  const paymentIntentId = paymentIntentIdFrom(charge.payment_intent);
  if (paymentIntentId) {
    await revokeOneTimePurchasesByPaymentIntent(paymentIntentId);
  }

  // Family subscription access follows Stripe subscription status
  // (customer.subscription.* / invoice.payment_failed), not one-off charge refunds.
  return { revoked: Boolean(paymentIntentId), reason };
}

async function dispatchStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      return handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }
    case "checkout.session.async_payment_failed": {
      // No entitlements were granted on unpaid completion; nothing to revoke.
      return { skipped: "async_payment_failed" as const };
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
      return { synced: "subscription" as const };
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const parentSub = invoice.parent?.subscription_details?.subscription;
      const legacySub = (invoice as { subscription?: string | { id?: string } | null }).subscription;
      const subId =
        (typeof parentSub === "string"
          ? parentSub
          : parentSub && "id" in parentSub
            ? String((parentSub as { id: string }).id)
            : null) ||
        (typeof legacySub === "string" ? legacySub : legacySub?.id) ||
        null;
      if (subId) {
        const subscription = await getStripe().subscriptions.retrieve(subId);
        await handleSubscriptionEvent(subscription);
        return { synced: "subscription" as const };
      }
      return { skipped: "invoice_without_subscription" as const };
    }
    case "charge.refunded": {
      return handleChargeReversal(event.data.object as Stripe.Charge, "refund");
    }
    case "charge.dispute.created": {
      const dispute = event.data.object as Stripe.Dispute;
      const chargeRef = dispute.charge;
      const chargeId =
        typeof chargeRef === "string" ? chargeRef : chargeRef && "id" in chargeRef ? chargeRef.id : null;
      if (!chargeId) return { skipped: "dispute_without_charge" as const };
      const charge = await getStripe().charges.retrieve(chargeId);
      return handleChargeReversal(charge, "dispute");
    }
    default:
      return { skipped: "unhandled_event" as const };
  }
}

export async function processStripeEvent(event: Stripe.Event) {
  const claimed = await claimEvent(event);
  if (!claimed) return { ok: true, duplicate: true };

  try {
    const result = await dispatchStripeEvent(event);
    return { ok: true, duplicate: false, result };
  } catch (error) {
    await releaseEvent(event.id);
    throw error;
  }
}
