import { NextResponse } from "next/server";

import { getOrCreateStripeCustomer } from "@/lib/billing/customers";
import {
  resolveCheckoutPrice,
  type CheckoutKind,
  type TutoringSku,
} from "@/lib/billing/resolve-price";
import { TUTORING_SESSIONS_BY_PRICE } from "@/lib/billing/stripe-catalog";
import { getAppOrigin, getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  kind?: CheckoutKind;
  trackSlug?: string;
  tutoringSku?: TutoringSku;
};

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }
    const user = authData.user;

    const body = (await request.json().catch(() => ({}))) as Body;
    if (!body.kind) {
      return NextResponse.json({ ok: false, error: "Missing kind." }, { status: 400 });
    }

    let resolved: { priceId: string; mode: "subscription" | "payment" };
    try {
      resolved = resolveCheckoutPrice({
        kind: body.kind,
        trackSlug: body.trackSlug,
        tutoringSku: body.tutoringSku,
      });
    } catch (e: unknown) {
      return NextResponse.json(
        { ok: false, error: e instanceof Error ? e.message : "Invalid product." },
        { status: 400 }
      );
    }

    if (resolved.mode === "subscription") {
      const admin = createSupabaseAdminClient();
      const { data: existingSub } = await admin
        .from("billing_subscriptions")
        .select("id, status")
        .eq("user_id", user.id)
        .in("status", ["active", "trialing", "past_due"])
        .limit(1)
        .maybeSingle();
      if (existingSub) {
        return NextResponse.json(
          { ok: false, error: "You already have an active subscription. Manage it in billing." },
          { status: 409 }
        );
      }
    }

    const customerId = await getOrCreateStripeCustomer({
      userId: user.id,
      email: user.email,
    });

    const origin = getAppOrigin(request);
    const sessions = TUTORING_SESSIONS_BY_PRICE[resolved.priceId] ?? null;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: resolved.mode,
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: resolved.priceId, quantity: 1 }],
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing?canceled=1`,
      allow_promotion_codes: true,
      metadata: {
        supabase_user_id: user.id,
        kind: body.kind,
        price_id: resolved.priceId,
        track_slug: body.trackSlug ?? "",
        tutoring_sku: body.tutoringSku ?? "",
        sessions: sessions != null ? String(sessions) : "",
        purpose: resolved.mode === "subscription" ? "parental_consent_payment_instrument" : "",
      },
      subscription_data:
        resolved.mode === "subscription"
          ? {
              metadata: {
                supabase_user_id: user.id,
                kind: "subscription",
                purpose: "parental_consent_payment_instrument",
              },
            }
          : undefined,
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Checkout failed." },
      { status: 500 }
    );
  }
}
