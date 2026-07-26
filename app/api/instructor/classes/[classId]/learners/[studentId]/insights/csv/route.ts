import { NextResponse } from "next/server";

import { learnerInsightsToCsv } from "@/lib/insights/csv";
import { loadLearnerInsights } from "@/lib/insights/loadLearnerInsights";
import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { isInstructorRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ classId: string; studentId: string }> }
) {
  const { classId, studentId } = await ctx.params;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  let effectiveUser = user;
  if (!isInstructorRole(user)) {
    try {
      const migrated = await migrateLegacyPrivilegedRole(createSupabaseAdminClient(), user);
      if (migrated) effectiveUser = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }
  if (!isInstructorRole(effectiveUser)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  const { data: klass, error: classErr } = await supabase
    .from("classes")
    .select("id")
    .eq("id", classId)
    .eq("teacher_user_id", user.id)
    .maybeSingle();

  if (classErr) return NextResponse.json({ ok: false, error: classErr.message }, { status: 500 });
  if (!klass?.id) {
    return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
  }

  const { data: enrollment, error: enrErr } = await supabase
    .from("class_enrollments")
    .select("student_id, student:students(id, display_name, grade)")
    .eq("class_id", classId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (enrErr) return NextResponse.json({ ok: false, error: enrErr.message }, { status: 500 });
  if (!enrollment?.student_id) {
    return NextResponse.json({ ok: false, error: "Learner not in this class." }, { status: 404 });
  }

  const student = (
    enrollment as {
      student?: { id?: string; display_name?: string | null; grade?: string | null } | null;
    }
  ).student;

  if (!student?.id) {
    return NextResponse.json({ ok: false, error: "Learner not found." }, { status: 404 });
  }

  try {
    const admin = createSupabaseAdminClient();
    const insights = await loadLearnerInsights(admin, {
      id: student.id,
      display_name: student.display_name,
      grade: student.grade,
    });
    const csv = learnerInsightsToCsv(insights);
    const safeName = String(student.display_name || "learner")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    const filename = `kanam-learner-insights-${safeName || "learner"}-${studentId.slice(0, 8)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": "no-store",
      },
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not export CSV." },
      { status: 500 }
    );
  }
}
