import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function isInstructor(user: any) {
  const role =
    (user?.user_metadata as any)?.role ||
    (user?.app_metadata as any)?.role ||
    (user?.user_metadata as any)?.user_role ||
    (user?.app_metadata as any)?.user_role;
  return role === "instructor" || role === "teacher";
}

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
  if (!isInstructor(user)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  // RLS ensures instructors can only view rosters for their own classes.
  const { data: rows, error: qErr } = await supabase
    .from("class_enrollments")
    .select("created_at, student:students(id, display_name, grade, school:schools(name))")
    .eq("class_id", classId)
    .order("created_at", { ascending: true });

  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const learners =
    (rows ?? []).map((r: any) => ({
      id: r.student?.id as string,
      displayName: r.student?.display_name as string,
      grade: (r.student?.grade as string) ?? null,
      schoolName: r.student?.school?.name ?? null,
    })) ?? [];

  return NextResponse.json({ ok: true, learners }, { status: 200 });
}

