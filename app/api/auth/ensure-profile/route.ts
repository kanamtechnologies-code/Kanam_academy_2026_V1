import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function firstNameFromEmail(email: string) {
  const local = (email.split("@")[0] ?? "").trim();
  if (!local) return "Student";
  // Keep it kid-friendly: stop at separators and capitalize first letter.
  const base = local.split(/[._-]/)[0] ?? local;
  const clean = base.replace(/[^a-zA-Z0-9]/g, "");
  const name = clean || "Student";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  // If profile exists, return it.
  const { data: existing, error: findErr } = await supabase
    .from("students")
    .select("id, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (findErr) {
    return NextResponse.json({ ok: false, error: findErr.message }, { status: 500 });
  }

  if (existing?.id) {
    return NextResponse.json({ ok: true, student: existing }, { status: 200 });
  }

  // Create minimal profile row. Note: some DBs require device_id; keep it non-empty.
  const first =
    (user.user_metadata as any)?.first_name ||
    (user.user_metadata as any)?.display_name ||
    firstNameFromEmail(user.email ?? "");

  const { data: inserted, error: insertErr } = await supabase
    .from("students")
    .insert({
      user_id: user.id,
      display_name: String(first),
      device_id: `auth:${user.id}`,
    })
    .select("id, display_name")
    .single();

  if (insertErr) {
    return NextResponse.json(
      {
        ok: false,
        error:
          insertErr.message +
          " (If this mentions 'user_id' missing, run the SQL migration to add students.user_id and reload schema.)",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, student: inserted }, { status: 200 });
}

