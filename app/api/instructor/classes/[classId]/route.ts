import { NextResponse } from "next/server";

import { isInstructorRole } from "@/lib/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ classId: string }>;
};

export async function DELETE(_req: Request, context: RouteContext) {
  const { classId } = await context.params;
  const id = (classId ?? "").trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Class id is required." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  if (!isInstructorRole(user)) {
    return NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 });
  }

  // RLS restricts delete to classes owned by this instructor.
  const { data: deleted, error: delErr } = await supabase
    .from("classes")
    .delete()
    .eq("id", id)
    .eq("teacher_user_id", user.id)
    .select("id")
    .maybeSingle();

  if (delErr) {
    return NextResponse.json({ ok: false, error: delErr.message }, { status: 500 });
  }
  if (!deleted?.id) {
    return NextResponse.json({ ok: false, error: "Class not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
