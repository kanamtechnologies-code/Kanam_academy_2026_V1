import { NextResponse } from "next/server";

import { getHouseholdKidForOwner } from "@/lib/coppa/childDsar";
import { getHouseholdForOwner } from "@/lib/households";
import { loadLearnerInsights } from "@/lib/insights/loadLearnerInsights";
import { isParentRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await ctx.params;
  if (!studentId) {
    return NextResponse.json({ ok: false, error: "Missing student id." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!isParentRole(data.user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  let kid;
  try {
    kid = await getHouseholdKidForOwner(admin, data.user.id, household.id, studentId);
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not load child." },
      { status: 500 }
    );
  }
  if (!kid) {
    return NextResponse.json(
      { ok: false, error: "Child not found in your household." },
      { status: 404 }
    );
  }

  try {
    const insights = await loadLearnerInsights(admin, kid);
    return NextResponse.json({ ok: true, insights }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not load insights." },
      { status: 500 }
    );
  }
}
