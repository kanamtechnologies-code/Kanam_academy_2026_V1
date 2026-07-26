import { NextResponse } from "next/server";

import { enrollStudentInClassByCode, getAsyncClassCode } from "@/lib/asyncClass";
import { passwordLengthError } from "@/lib/auth/password";
import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { createUnconfirmedAuthUser } from "@/lib/auth/createUnconfirmedUser";
import {
  PARENTAL_CONSENT_NOTICE_VERSION,
  looksLikeMissingConsentColumn,
  signedConsentUpdate,
  validateConsentAttestation,
} from "@/lib/coppa/parentalConsent";
import {
  hashPin,
  isValidPin,
  kidDeviceId,
  setActiveStudentMetadata,
} from "@/lib/households";
import { getAppOrigin } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  email: string;
  password: string;
  parentName: string;
  householdName?: string;
  childFirstName?: string;
  childLastName?: string;
  childGrade?: string;
  childPin?: string;
  classCode?: string;
  /** COPPA VPC — required for family accounts that enroll children */
  consentAccepted?: boolean;
  consentIsParent?: boolean;
  consentSignature?: string;
  consentNoticeVersion?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const ipLimited = enforceRateLimits(
    [{ key: `signup-parent:ip:${ip}`, ...AUTH_RATE_LIMITS.signupIp }],
    "Too many signup attempts from this network. Please wait and try again."
  );
  if (ipLimited) return ipLimited;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = s(body.email).toLowerCase();
  const password = s(body.password);
  const parentName = s(body.parentName);
  const householdName = s(body.householdName) || "My family";
  const childFirstName = s(body.childFirstName);
  const childLastName = s(body.childLastName);
  const childGrade = s(body.childGrade) || null;
  const childPin = s(body.childPin);
  const classCode = (s(body.classCode) || getAsyncClassCode()).toUpperCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }

  const emailLimited = enforceRateLimits(
    [{ key: `signup-parent:email:${email}`, ...AUTH_RATE_LIMITS.signupEmail }],
    "Too many signup attempts for this email. Please wait and try again."
  );
  if (emailLimited) return emailLimited;
  const pwErr = passwordLengthError(password);
  if (pwErr) {
    return NextResponse.json({ ok: false, error: pwErr }, { status: 400 });
  }
  if (!parentName) {
    return NextResponse.json({ ok: false, error: "Your name is required." }, { status: 400 });
  }
  if (childPin && !isValidPin(childPin)) {
    return NextResponse.json(
      { ok: false, error: "Child PIN must be 4–6 digits." },
      { status: 400 }
    );
  }

  const consentCheck = validateConsentAttestation({
    consentAccepted: Boolean(body.consentAccepted),
    consentIsParent: Boolean(body.consentIsParent),
    consentSignature: s(body.consentSignature),
    consentNoticeVersion: s(body.consentNoticeVersion) || PARENTAL_CONSENT_NOTICE_VERSION,
    parentName,
    parentEmail: email,
  });
  if (!consentCheck.ok) {
    return NextResponse.json({ ok: false, error: consentCheck.error }, { status: 400 });
  }

  const consentRow = signedConsentUpdate({
    signerName: s(body.consentSignature),
    parentEmail: email,
  });

  const admin = createSupabaseAdminClient();

  const nameParts = parentName.split(/\s+/);
  const firstName = nameParts[0] || parentName;
  const lastName = nameParts.slice(1).join(" ") || "";

  const origin = getAppOrigin(req);
  const emailRedirectTo = `${origin}/auth/confirm?next=${encodeURIComponent("/parent")}`;

  const created = await createUnconfirmedAuthUser({
    email,
    password,
    emailRedirectTo,
    appMetadata: {
      role: "parent",
    },
    userMetadata: {
      first_name: firstName,
      last_name: lastName,
      display_name: parentName,
      parental_consent_notice_version: PARENTAL_CONSENT_NOTICE_VERSION,
      parental_consent_at: consentRow.parental_consent_at,
    },
  });

  if (!created.ok) {
    return NextResponse.json({ ok: false, error: created.error }, { status: created.status });
  }

  const userId = created.userId;

  let household: { id: string } | null = null;
  {
    const withConsent = await admin
      .from("households")
      .insert({
        owner_user_id: userId,
        name: householdName,
        ...consentRow,
      })
      .select("id")
      .single();

    if (!withConsent.error && withConsent.data?.id) {
      household = { id: String(withConsent.data.id) };
    } else if (withConsent.error && looksLikeMissingConsentColumn(withConsent.error.message)) {
      const basic = await admin
        .from("households")
        .insert({
          owner_user_id: userId,
          name: householdName,
        })
        .select("id")
        .single();
      if (basic.error || !basic.data?.id) {
        return NextResponse.json(
          {
            ok: false,
            error:
              basic.error?.message ||
              "Could not create household. Apply supabase/households.sql and supabase/parental_consent.sql.",
          },
          { status: 500 }
        );
      }
      household = { id: String(basic.data.id) };
    } else {
      return NextResponse.json(
        {
          ok: false,
          error:
            withConsent.error?.message ||
            "Could not create household. Apply supabase/households.sql in the SQL Editor.",
        },
        { status: 500 }
      );
    }
  }

  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "Could not create household." }, { status: 500 });
  }

  const { error: memberErr } = await admin.from("household_members").insert({
    household_id: household.id,
    user_id: userId,
    role: "parent",
  });

  if (memberErr) {
    return NextResponse.json({ ok: false, error: memberErr.message }, { status: 500 });
  }

  let childId: string | null = null;

  if (childFirstName) {
    const displayName = childFirstName;
    const pinHash = childPin ? hashPin(childPin) : null;

    const { data: child, error: childErr } = await admin
      .from("students")
      .insert({
        user_id: null,
        household_id: household.id,
        display_name: displayName,
        first_name: childFirstName,
        last_name: childLastName || null,
        grade: childGrade,
        parent_name: parentName,
        parent_email: email,
        pin_hash: pinHash,
        device_id: kidDeviceId(household.id, childFirstName),
      })
      .select("id")
      .single();

    if (childErr || !child?.id) {
      return NextResponse.json(
        {
          ok: false,
          error: childErr?.message || "Household created, but could not add the first child.",
        },
        { status: 500 }
      );
    }

    const newChildId = String(child.id);
    childId = newChildId;

    const enrolled = await enrollStudentInClassByCode({
      studentId: newChildId,
      classCode,
      admin,
    });

    if (!enrolled.ok) {
      // Fall back to async code if custom code failed.
      if (classCode !== getAsyncClassCode()) {
        await enrollStudentInClassByCode({
          studentId: newChildId,
          classCode: getAsyncClassCode(),
          admin,
        });
      }
    }

    try {
      await setActiveStudentMetadata(admin, userId, newChildId);
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json(
    {
      ok: true,
      userId,
      householdId: household.id,
      childId,
      needsEmailConfirmation: created.needsEmailConfirmation,
      confirmationEmailSent: created.confirmationEmailSent,
      ...(created.confirmationEmailError
        ? { confirmationEmailError: created.confirmationEmailError }
        : {}),
    },
    { status: 200 }
  );
}
