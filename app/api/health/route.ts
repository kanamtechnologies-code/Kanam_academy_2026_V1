import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Liveness / dependency probe for uptime monitors.
 * Does not return row samples or PII.
 */
export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("students").select("id", { head: true, count: "exact" }).limit(1);
    if (error) {
      return NextResponse.json(
        { ok: false, where: "supabase", error: "database_unavailable" },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, where: "server", error: "misconfigured" },
      { status: 500 }
    );
  }
}
