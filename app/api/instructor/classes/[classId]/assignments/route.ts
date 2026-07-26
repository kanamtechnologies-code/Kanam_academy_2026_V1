import { NextResponse } from "next/server";

import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { isInstructorRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { allCatalogLessons } from "@/lib/tracks";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

async function assertOwnClass(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, classId: string, userId: string) {
  const { data: klass, error } = await supabase
    .from("classes")
    .select("id")
    .eq("id", classId)
    .eq("teacher_user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!klass?.id) return null;
  return klass.id as string;
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

  try {
    const owned = await assertOwnClass(supabase, classId, user.id);
    if (!owned) {
      return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Could not verify class.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: rows, error: qErr } = await supabase
    .from("class_lesson_assignments")
    .select("lesson_id, enabled")
    .eq("class_id", classId);

  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const enabledSet = new Set(
    (rows ?? [])
      .filter((r) => Boolean(r.enabled))
      .map((r) => String(r.lesson_id))
  );

  const lessons = allCatalogLessons().map((lesson) => ({
    lessonId: lesson.id,
    trackId: lesson.trackId,
    trackTitle: lesson.trackTitle,
    title: lesson.title,
    week: lesson.week,
    session: lesson.session,
    enabled: enabledSet.has(lesson.id),
  }));

  return NextResponse.json(
    {
      ok: true,
      enabledLessonIds: Array.from(enabledSet),
      lessons,
    },
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
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

  let body: { enabledLessonIds?: string[] };
  try {
    body = (await req.json()) as { enabledLessonIds?: string[] };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const catalogIds = new Set(allCatalogLessons().map((l) => l.id));
  const enabledLessonIds = Array.from(
    new Set((body.enabledLessonIds ?? []).map((id) => String(id).trim()).filter((id) => catalogIds.has(id)))
  );

  try {
    const owned = await assertOwnClass(supabase, classId, user.id);
    if (!owned) {
      return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Could not verify class.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { error: delErr } = await supabase
    .from("class_lesson_assignments")
    .delete()
    .eq("class_id", classId);

  if (delErr) return NextResponse.json({ ok: false, error: delErr.message }, { status: 500 });

  if (enabledLessonIds.length > 0) {
    const { error: insErr } = await supabase.from("class_lesson_assignments").insert(
      enabledLessonIds.map((lessonId) => ({
        class_id: classId,
        lesson_id: lessonId,
        enabled: true,
      }))
    );

    if (insErr) return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, enabledLessonIds }, { status: 200 });
}
