import { NextResponse } from "next/server";

import { eraseParentFamilyAccount } from "@/lib/coppa/parentAccountDsar";
import { getHouseholdForOwner, isParentRole } from "@/lib/households";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  confirmEmail?: string;
  /** Must be the literal string DELETE */
  confirmPhrase?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!isParentRole(data.user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const confirmEmail = s(body.confirmEmail).toLowerCase();
  const confirmPhrase = s(body.confirmPhrase).toUpperCase();
  const accountEmail = String(data.user.email ?? "")
    .trim()
    .toLowerCase();

  if (!accountEmail) {
    return NextResponse.json(
      { ok: false, error: "This account has no email on file." },
      { status: 400 }
    );
  }
  if (!confirmEmail || confirmEmail !== accountEmail) {
    return NextResponse.json(
      {
        ok: false,
        error: "Type your parent account email to confirm deletion.",
        code: "CONFIRM_EMAIL_MISMATCH",
      },
      { status: 400 }
    );
  }
  if (confirmPhrase !== "DELETE") {
    return NextResponse.json(
      {
        ok: false,
        error: 'Type DELETE (all caps) to confirm permanent account deletion.',
        code: "CONFIRM_PHRASE_REQUIRED",
      },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  try {
    const result = await eraseParentFamilyAccount({
      admin,
      ownerUserId: data.user.id,
      householdId: household.id,
      activeStudentId: household.active_student_id
        ? String(household.active_student_id)
        : null,
    });

    return NextResponse.json(
      {
        ok: true,
        deletedKids: result.deletedKids,
        stripeCanceled: result.stripeCanceled,
        stripeWarnings: result.stripeWarnings,
        message:
          "Family account, child profiles, and learning data were deleted. Active subscriptions were canceled when possible.",
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Could not delete family account.",
      },
      { status: 500 }
    );
  }
}
