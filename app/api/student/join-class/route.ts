import { NextResponse } from "next/server";

import { enrollStudentInClassByCode } from "@/lib/asyncClass";
import { ensureLibraryPartnerClass } from "@/lib/ensureLibraryClass";
import { getLibraryPartner } from "@/lib/libraryPartners";
import { resolveLearnerForUser } from "@/lib/resolveLearner";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  classCode?: string;
  partnerSlug?: string;
};

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  let classCode = String(body.classCode ?? "").trim().toUpperCase();
  const partnerSlug = String(body.partnerSlug ?? "").trim().toLowerCase();

  try {
    const admin = createSupabaseAdminClient();
    if (!classCode && partnerSlug) {
      const catalog = getLibraryPartner(partnerSlug);
      if (catalog) {
        const klass = await ensureLibraryPartnerClass(catalog.slug, admin);
        classCode = klass.code;
      }
    }
    if (!classCode) {
      return NextResponse.json({ ok: false, error: "Class code is required." }, { status: 400 });
    }

    const learner = await resolveLearnerForUser(user, admin);
    if (learner.needsParentalConsent) {
      return NextResponse.json(
        { ok: false, error: "A parent needs to finish consent before this learner can join a class." },
        { status: 403 }
      );
    }
    if (!learner.studentId) {
      return NextResponse.json(
        {
          ok: false,
          error: learner.isParent
            ? "Select a child profile first, then claim library access."
            : "No learner profile is linked to this account yet.",
        },
        { status: 400 }
      );
    }

    const enrolled = await enrollStudentInClassByCode({
      studentId: learner.studentId,
      classCode,
      admin,
    });
    if (!enrolled.ok) {
      return NextResponse.json({ ok: false, error: enrolled.error }, { status: 400 });
    }

    return NextResponse.json(
      { ok: true, classId: enrolled.classId, classCode },
      { status: 200 }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Could not join that class.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
