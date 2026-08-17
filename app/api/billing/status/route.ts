import { NextResponse } from "next/server";

import {
  BUNDLED_FREE_WITH_PURCHASE_TRACK,
  loadBillingEntitlements,
} from "@/lib/billing/access";
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

    const [{ data: subscription }, { data: tracks }, { data: tutoring }, entitlements] =
      await Promise.all([
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
        loadBillingEntitlements(admin, userId),
      ]);

    const tutoringSessionsRemaining = (tutoring ?? []).reduce(
      (sum, row) => sum + Number(row.sessions_remaining ?? 0),
      0
    );

    const purchasedSlugs = new Set(
      (tracks ?? []).map((t) => String(t.track_slug ?? "")).filter(Boolean)
    );

    const statusTracks = entitlements.unlockedTrackSlugs.map((track_slug) => ({
      track_slug,
      active: true,
      bundled:
        track_slug === BUNDLED_FREE_WITH_PURCHASE_TRACK &&
        !purchasedSlugs.has(track_slug),
    }));

    return NextResponse.json({
      ok: true,
      subscription: subscription ?? null,
      tracks: statusTracks,
      tutoringCredits: tutoring ?? [],
      tutoringSessionsRemaining,
      unlockedTrackSlugs: entitlements.unlockedTrackSlugs,
      hasActiveSubscription: entitlements.hasActiveSubscription,
      financialLiteracyBundled:
        entitlements.unlockedTrackSlugs.includes(BUNDLED_FREE_WITH_PURCHASE_TRACK) &&
        !purchasedSlugs.has(BUNDLED_FREE_WITH_PURCHASE_TRACK),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Status failed." },
      { status: 500 }
    );
  }
}
