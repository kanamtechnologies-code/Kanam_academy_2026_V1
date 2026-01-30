import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    // Simple ping against our schema. If tables aren't applied yet, this will error.
    const { data, error } = await supabase.from("students").select("id").limit(1);
    if (error) {
      return NextResponse.json(
        { ok: false, where: "supabase", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, studentsSample: data ?? [] }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, where: "server", error: e?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}

