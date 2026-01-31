import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  grade?: string;
  schoolName?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

async function getOrCreateSchoolId(supabase: ReturnType<typeof createSupabaseAdminClient>, name: string) {
  const schoolName = name.trim();
  if (!schoolName) return null;

  const { data: existing, error: findErr } = await supabase
    .from("schools")
    .select("id")
    .eq("name", schoolName)
    .maybeSingle();

  if (findErr) throw new Error(findErr.message);
  if (existing?.id) return existing.id as string;

  const { data: inserted, error: insertErr } = await supabase
    .from("schools")
    .insert({ name: schoolName })
    .select("id")
    .single();

  if (insertErr) {
    // If a UNIQUE constraint exists, we may race; re-select.
    const { data: retry, error: retryErr } = await supabase
      .from("schools")
      .select("id")
      .eq("name", schoolName)
      .maybeSingle();
    if (retryErr) throw new Error(retryErr.message);
    if (!retry?.id) throw new Error(insertErr.message);
    return retry.id as string;
  }

  return (inserted?.id as string) ?? null;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = s(body.email).toLowerCase();
  const password = s(body.password);
  const firstName = s(body.firstName);
  const lastName = s(body.lastName);

  const grade = s(body.grade) || null;
  const schoolName = s(body.schoolName);
  const parentName = s(body.parentName) || null;
  const parentEmail = s(body.parentEmail) || null;
  const parentPhone = s(body.parentPhone) || null;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }
  if (!password || password.length < 4) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 4 characters." },
      { status: 400 }
    );
  }
  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "First name and last name are required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  // Create Auth user WITHOUT sending confirmation email (avoids email rate limits during onboarding).
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { first_name: firstName, last_name: lastName },
  });

  if (createErr) {
    const msg = createErr.message || "Could not create user.";
    const status = msg.toLowerCase().includes("already") ? 409 : 400;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }

  const userId = created.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, error: "User created but missing id." }, { status: 500 });
  }

  let schoolId: string | null = null;
  try {
    schoolId = schoolName ? await getOrCreateSchoolId(supabase, schoolName) : null;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "School upsert failed." }, { status: 500 });
  }

  const { error: studentErr } = await supabase.from("students").insert({
    user_id: userId,
    // App uses first name only for greetings.
    display_name: firstName,
    first_name: firstName,
    last_name: lastName,
    grade,
    school_id: schoolId,
    parent_name: parentName,
    parent_email: parentEmail,
    parent_phone: parentPhone,
    // Some existing DBs still require device_id (legacy). Keep it non-empty.
    device_id: `auth:${userId}`,
  });

  // If PostgREST schema cache hasn't picked up new columns yet, retry without them.
  if (studentErr) {
    const msg = studentErr.message ?? "";
    const looksLikeSchemaCache =
      msg.includes("schema cache") || msg.includes("Could not find the 'first_name' column");
    if (!looksLikeSchemaCache) {
      return NextResponse.json({ ok: false, error: msg }, { status: 500 });
    }

    const { error: retryErr } = await supabase.from("students").insert({
      user_id: userId,
      display_name: firstName,
      grade,
      school_id: schoolId,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      device_id: `auth:${userId}`,
    });

    if (retryErr) {
      return NextResponse.json({ ok: false, error: retryErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, userId }, { status: 200 });
}

