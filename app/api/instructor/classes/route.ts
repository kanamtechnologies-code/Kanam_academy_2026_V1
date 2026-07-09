import { NextResponse } from "next/server";

import { isInstructorRole } from "@/lib/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function randomClassCode() {
  // Avoid confusing characters (O/0, I/1).
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += alphabet[bytes[i] % alphabet.length];
  return `KANAM-${s}`;
}

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  if (!isInstructorRole(user)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  const { data: rows, error: qErr } = await supabase
    .from("classes")
    .select("id, name, code, created_at, school:schools(name), class_enrollments(count)")
    .order("created_at", { ascending: false });

  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const classRows = (rows ?? []) as unknown as Array<{
    id: string;
    name: string;
    code: string;
    created_at: string;
    school?: { name?: string | null } | null;
    class_enrollments?: Array<{ count?: number }> | null;
  }>;

  const classes =
    classRows.map((r) => {
      const count = Array.isArray(r.class_enrollments) ? r.class_enrollments[0]?.count : undefined;
      return {
        id: r.id as string,
        name: r.name as string,
        code: r.code as string,
        createdAt: r.created_at as string,
        schoolName: r.school?.name ?? null,
        learnerCount: typeof count === "number" ? count : 0,
      };
    }) ?? [];

  return NextResponse.json({ ok: true, classes }, { status: 200 });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  if (!isInstructorRole(user)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  let body: { name?: string; schoolName?: string };
  try {
    body = (await req.json()) as { name?: string; schoolName?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const schoolName = (body.schoolName ?? "").trim();
  if (!name) return NextResponse.json({ ok: false, error: "Class name is required." }, { status: 400 });

  let schoolId: string | null = null;
  if (schoolName) {
    const { data: existing, error: findErr } = await supabase
      .from("schools")
      .select("id")
      .eq("name", schoolName)
      .maybeSingle();
    if (findErr) return NextResponse.json({ ok: false, error: findErr.message }, { status: 500 });

    if (existing?.id) {
      schoolId = existing.id as string;
    } else {
      const { data: inserted, error: insertErr } = await supabase
        .from("schools")
        .insert({ name: schoolName })
        .select("id")
        .single();
      if (insertErr) {
        return NextResponse.json({ ok: false, error: insertErr.message }, { status: 500 });
      }
      schoolId = (inserted as { id?: string } | null)?.id ?? null;
    }
  }

  // Create a class with a unique code. Retry if we collide.
  let lastErr: string | null = null;
  for (let i = 0; i < 10; i++) {
    const code = randomClassCode().toUpperCase();
    const { data: inserted, error: insErr } = await supabase
      .from("classes")
      .insert({
        teacher_user_id: user.id,
        school_id: schoolId,
        name,
        code,
      })
      .select("id, name, code, created_at, school:schools(name)")
      .single();

    if (!insErr && inserted?.id) {
      return NextResponse.json(
        {
          ok: true,
          klass: {
            id: inserted.id as string,
            name: inserted.name as string,
            code: inserted.code as string,
            createdAt: inserted.created_at as string,
            schoolName:
              (inserted as { school?: { name?: string | null } | null } | null)?.school?.name ?? null,
          },
        },
        { status: 200 }
      );
    }

    lastErr = insErr?.message ?? "Could not create class.";
    // If it's not a unique collision, bail early.
    if (!String(lastErr).toLowerCase().includes("duplicate")) break;
  }

  return NextResponse.json({ ok: false, error: lastErr ?? "Could not create class." }, { status: 500 });
}

