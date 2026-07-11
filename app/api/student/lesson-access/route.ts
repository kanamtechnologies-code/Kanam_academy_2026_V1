import { NextResponse } from "next/server";

import type { StudentLessonAccess } from "@/lib/classAssignments";
import { unionEnabledLessonIds } from "@/lib/classAssignments";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  // Use admin for enrollment/assignment reads so RLS on instructor-owned tables
  // does not hide the student's own class membership.
  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Server misconfigured." },
      { status: 500 }
    );
  }

  const { data: student, error: studentErr } = await admin
    .from("students")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (studentErr) {
    return NextResponse.json({ ok: false, error: studentErr.message }, { status: 500 });
  }

  if (!student?.id) {
    const access: StudentLessonAccess = {
      classRestricted: false,
      enabledLessonIds: null,
      classIds: [],
      isAsyncCohort: false,
    };
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: enrollments, error: enrollErr } = await admin
    .from("class_enrollments")
    .select("class_id")
    .eq("student_id", student.id);

  if (enrollErr) {
    return NextResponse.json({ ok: false, error: enrollErr.message }, { status: 500 });
  }

  const classIds = (enrollments ?? [])
    .map((row) => String(row.class_id ?? ""))
    .filter(Boolean);

  if (classIds.length === 0) {
    const access: StudentLessonAccess = {
      classRestricted: false,
      enabledLessonIds: null,
      classIds: [],
      isAsyncCohort: false,
    };
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: classRows, error: classErr } = await admin
    .from("classes")
    .select("id, is_async")
    .in("id", classIds);

  // Before schema migration, is_async may be missing — fall back to id-only.
  let rows = classRows;
  if (classErr) {
    const msg = classErr.message.toLowerCase();
    if (msg.includes("is_async") || msg.includes("column")) {
      const fallback = await admin.from("classes").select("id").in("id", classIds);
      if (fallback.error) {
        return NextResponse.json({ ok: false, error: fallback.error.message }, { status: 500 });
      }
      rows = (fallback.data ?? []).map((c) => ({ id: c.id, is_async: false }));
    } else {
      return NextResponse.json({ ok: false, error: classErr.message }, { status: 500 });
    }
  }

  const teacherClassIds = (rows ?? [])
    .filter((c) => !c.is_async)
    .map((c) => String(c.id));
  const asyncClassIds = (rows ?? [])
    .filter((c) => Boolean(c.is_async))
    .map((c) => String(c.id));

  // Teacher-led classes control access. Pure async cohort = full catalog, still batched.
  if (teacherClassIds.length === 0) {
    const access: StudentLessonAccess = {
      classRestricted: false,
      enabledLessonIds: null,
      classIds,
      isAsyncCohort: asyncClassIds.length > 0,
    };
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: assignmentRows, error: assignErr } = await admin
    .from("class_lesson_assignments")
    .select("lesson_id, enabled")
    .in("class_id", teacherClassIds);

  if (assignErr) {
    return NextResponse.json({ ok: false, error: assignErr.message }, { status: 500 });
  }

  const access: StudentLessonAccess = {
    classRestricted: true,
    enabledLessonIds: unionEnabledLessonIds(
      (assignmentRows ?? []) as Array<{ lesson_id: string; enabled: boolean }>
    ),
    classIds,
    isAsyncCohort: false,
  };

  return NextResponse.json({ ok: true, access }, { status: 200 });
}
