import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();
    const userId = authData.user.id;

    const [{ data: subscription }, { data: tracks }, { data: tutoring }] = await Promise.all([
      admin
        .from("billing_subscriptions")
        .select("status, cancel_at_period_end, current_period_end, stripe_price_id")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      admin
        .from("track_entitlements")
        .select("track_slug, active, created_at")
        .eq("user_id", userId)
        .eq("active", true),
      admin
        .from("tutoring_credits")
        .select("sku, sessions_total, sessions_remaining, created_at")
        .eq("user_id", userId)
        .gt("sessions_remaining", 0),
    ]);

    const tutoringSessionsRemaining = (tutoring ?? []).reduce(
      (sum, row) => sum + Number(row.sessions_remaining ?? 0),
      0
    );

    return NextResponse.json({
      ok: true,
      subscription: subscription ?? null,
      tracks: tracks ?? [],
      tutoringCredits: tutoring ?? [],
      tutoringSessionsRemaining,
      hasActiveSubscription: Boolean(
        subscription &&
          ["active", "trialing"].includes(String(subscription.status)) &&
          (!subscription.current_period_end ||
            new Date(String(subscription.current_period_end)).getTime() > Date.now())
      ),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Status failed." },
      { status: 500 }
    );
  }
}
