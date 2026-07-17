import { NextResponse } from "next/server";

import { getOrCreateStripeCustomer } from "@/lib/billing/customers";
import { getAppOrigin, getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    const customerId = await getOrCreateStripeCustomer({
      userId: authData.user.id,
      email: authData.user.email,
    });

    const stripe = getStripe();
    const origin = getAppOrigin(request);
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/billing`,
    });

    return NextResponse.json({ ok: true, url: portal.url });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Portal failed." },
      { status: 500 }
    );
  }
}
