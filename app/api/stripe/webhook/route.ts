import { NextResponse } from "next/server";

import { processStripeEvent } from "@/lib/billing/webhook";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ ok: false, error: "Missing stripe-signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Invalid signature." },
      { status: 400 }
    );
  }

  try {
    const result = await processStripeEvent(event);
    return NextResponse.json(result);
  } catch (e: unknown) {
    console.error("[stripe webhook]", event.type, e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Webhook handler failed." },
      { status: 500 }
    );
  }
}
