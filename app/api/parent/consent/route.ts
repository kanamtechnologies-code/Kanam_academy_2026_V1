import { NextResponse } from "next/server";

import {
  PARENTAL_CONSENT_NOTICE_VERSION,
  looksLikeMissingConsentColumn,
  signedConsentUpdate,
  validateConsentAttestation,
} from "@/lib/coppa/parentalConsent";
import {
  getHouseholdForOwner,
  householdConsentGate,
  isParentRole,
} from "@/lib/households";
import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  consentAccepted?: boolean;
  consentIsParent?: boolean;
  consentSignature?: string;
  consentNoticeVersion?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  let user = data.user;
  if (!isParentRole(user)) {
    try {
      const migrated = await migrateLegacyPrivilegedRole(createSupabaseAdminClient(), user);
      if (migrated) user = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }
  if (!isParentRole(user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    noticeVersion: PARENTAL_CONSENT_NOTICE_VERSION,
    consent: householdConsentGate(household),
  });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  let user = data.user;
  if (!isParentRole(user)) {
    try {
      const migrated = await migrateLegacyPrivilegedRole(createSupabaseAdminClient(), user);
      if (migrated) user = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }
  if (!isParentRole(user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
  const parentName =
    [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim() ||
    String(meta.display_name ?? "").trim() ||
    s(body.consentSignature);

  const validation = validateConsentAttestation({
    consentAccepted: Boolean(body.consentAccepted),
    consentIsParent: Boolean(body.consentIsParent),
    consentSignature: s(body.consentSignature),
    consentNoticeVersion: s(body.consentNoticeVersion) || PARENTAL_CONSENT_NOTICE_VERSION,
    parentName,
    parentEmail: data.user.email ?? undefined,
  });
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  if (householdConsentGate(household).verified) {
    return NextResponse.json({
      ok: true,
      alreadyVerified: true,
      consent: householdConsentGate(household),
    });
  }

  const update = signedConsentUpdate({
    signerName: s(body.consentSignature),
    parentEmail: data.user.email ?? "",
  });

  const { error: updErr } = await admin
    .from("households")
    .update(update)
    .eq("id", household.id)
    .eq("owner_user_id", data.user.id);

  if (updErr) {
    const hint = looksLikeMissingConsentColumn(updErr.message)
      ? " Apply supabase/parental_consent.sql in the Supabase SQL Editor."
      : "";
    return NextResponse.json(
      { ok: false, error: `${updErr.message}${hint}` },
      { status: 500 }
    );
  }

  const refreshed = await getHouseholdForOwner(admin, data.user.id);
  return NextResponse.json({
    ok: true,
    consent: householdConsentGate(refreshed),
  });
}
