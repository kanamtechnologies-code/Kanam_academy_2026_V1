import { NextResponse } from "next/server";

import { unionEnabledLessonIds, type StudentLessonAccess } from "@/lib/classAssignments";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { data: student, error: studentErr } = await supabase
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
    };
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: enrollments, error: enrollErr } = await supabase
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
    };
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: assignmentRows, error: assignErr } = await supabase
    .from("class_lesson_assignments")
    .select("lesson_id, enabled")
    .in("class_id", classIds);

  if (assignErr) {
    return NextResponse.json({ ok: false, error: assignErr.message }, { status: 500 });
  }

  const access: StudentLessonAccess = {
    classRestricted: true,
    enabledLessonIds: unionEnabledLessonIds(
      (assignmentRows ?? []) as Array<{ lesson_id: string; enabled: boolean }>
    ),
    classIds,
  };

  return NextResponse.json({ ok: true, access }, { status: 200 });
}
