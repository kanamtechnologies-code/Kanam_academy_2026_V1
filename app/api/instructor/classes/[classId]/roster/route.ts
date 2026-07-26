import { NextResponse } from "next/server";

import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { isInstructorRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { totalXpAcrossTracks, TRACKS } from "@/lib/tracks";

export const runtime = "nodejs";

const TOTAL_LESSONS = TRACKS.reduce((sum, track) => sum + track.lessons.length, 0);

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

  // RLS ensures instructors can only view rosters for their own classes.
  const { data: rows, error: qErr } = await supabase
    .from("class_enrollments")
    .select("created_at, student:students(id, display_name, grade, school:schools(name))")
    .eq("class_id", classId)
    .order("created_at", { ascending: true });

  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const enrollmentRows = (rows ?? []) as unknown as Array<{
    student?: {
      id?: string;
      display_name?: string;
      grade?: string | null;
      school?: { name?: string | null } | null;
    } | null;
  }>;

  const studentIds = enrollmentRows
    .map((r) => r.student?.id)
    .filter((id): id is string => Boolean(id));

  const progressByStudent = new Map<
    string,
    { completedLessonIds: string[]; lastActiveAt: string | null }
  >();

  if (studentIds.length > 0) {
    const admin = createSupabaseAdminClient();
    const { data: progressRows, error: progressErr } = await admin
      .from("lesson_progress")
      .select("student_id, lesson_id, success, last_event_at, success_at")
      .in("student_id", studentIds);

    if (progressErr) {
      return NextResponse.json({ ok: false, error: progressErr.message }, { status: 500 });
    }

    for (const row of progressRows ?? []) {
      const studentId = String(row.student_id ?? "");
      if (!studentId) continue;

      const existing = progressByStudent.get(studentId) ?? {
        completedLessonIds: [],
        lastActiveAt: null,
      };

      const stamp = (row.success_at as string | null) ?? (row.last_event_at as string | null);
      if (stamp && (!existing.lastActiveAt || stamp > existing.lastActiveAt)) {
        existing.lastActiveAt = stamp;
      }

      if (row.success) {
        existing.completedLessonIds.push(String(row.lesson_id));
      }

      progressByStudent.set(studentId, existing);
    }
  }

  const learners = enrollmentRows.map((r) => {
    const id = r.student?.id as string;
    const progress = progressByStudent.get(id);
    const completedLessonIds = progress?.completedLessonIds ?? [];
    const completedLessons = completedLessonIds.length;
    const progressPercent = TOTAL_LESSONS
      ? Math.round((completedLessons / TOTAL_LESSONS) * 100)
      : 0;

    return {
      id,
      displayName: r.student?.display_name as string,
      grade: r.student?.grade ?? null,
      schoolName: r.student?.school?.name ?? null,
      completedLessons,
      totalLessons: TOTAL_LESSONS,
      progressPercent,
      totalXp: totalXpAcrossTracks(completedLessonIds),
      lastActiveAt: progress?.lastActiveAt ?? null,
    };
  });

  return NextResponse.json({ ok: true, learners }, { status: 200 });
}
