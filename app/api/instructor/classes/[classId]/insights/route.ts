import { NextResponse } from "next/server";

import { computeClassInsights } from "@/lib/insights/computeClassInsights";
import { loadProgressBundle } from "@/lib/insights/loadLearnerInsights";
import { isInstructorRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ classId: string }> }
) {
  const { classId } = await ctx.params;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  if (!isInstructorRole(user)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  const { data: klass, error: classErr } = await supabase
    .from("classes")
    .select("id, name")
    .eq("id", classId)
    .eq("teacher_user_id", user.id)
    .maybeSingle();

  if (classErr) return NextResponse.json({ ok: false, error: classErr.message }, { status: 500 });
  if (!klass?.id) {
    return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
  }

  const { data: rows, error: qErr } = await supabase
    .from("class_enrollments")
    .select("student:students(id, display_name, grade)")
    .eq("class_id", classId);

  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const learners = (rows ?? [])
    .map((r) => {
      const student = (r as { student?: { id?: string; display_name?: string | null; grade?: string | null } | null })
        .student;
      if (!student?.id) return null;
      return {
        id: student.id,
        display_name: student.display_name ?? null,
        grade: student.grade ?? null,
      };
    })
    .filter((x): x is { id: string; display_name: string | null; grade: string | null } => Boolean(x));

  try {
    const admin = createSupabaseAdminClient();
    const { progress, events } = await loadProgressBundle(
      admin,
      learners.map((l) => l.id)
    );
    const insights = computeClassInsights({
      classId: klass.id,
      className: klass.name,
      learners,
      progress,
      events,
    });
    return NextResponse.json({ ok: true, insights }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not load class insights." },
      { status: 500 }
    );
  }
}
