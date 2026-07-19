import { NextResponse } from "next/server";

import { enrollStudentInClassByCode, getAsyncClassCode } from "@/lib/asyncClass";
import {
  MIN_SELF_SIGNUP_AGE,
  ageFromBirthdate,
  isYoungerSelfSignupGrade,
  validateYoungerGradeParentEmail,
} from "@/lib/coppa/ageGate";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  classCode?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  /** ISO date YYYY-MM-DD — required for COPPA age gate */
  birthdate?: string;
  grade?: string;
  schoolName?: string;
  parentName?: string;
  parentEmail?: string;
  parentEmailConfirm?: string;
  parentPhone?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

async function getOrCreateSchoolId(supabase: ReturnType<typeof createSupabaseAdminClient>, name: string) {
  const schoolName = name.trim();
  if (!schoolName) return null;

  const { data: existing, error: findErr } = await supabase
    .from("schools")
    .select("id")
    .eq("name", schoolName)
    .maybeSingle();

  if (findErr) throw new Error(findErr.message);
  if (existing?.id) return existing.id as string;

  const { data: inserted, error: insertErr } = await supabase
    .from("schools")
    .insert({ name: schoolName })
    .select("id")
    .single();

  if (insertErr) {
    const { data: retry, error: retryErr } = await supabase
      .from("schools")
      .select("id")
      .eq("name", schoolName)
      .maybeSingle();
    if (retryErr) throw new Error(retryErr.message);
    if (!retry?.id) throw new Error(insertErr.message);
    return retry.id as string;
  }

  return (inserted?.id as string) ?? null;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = s(body.email).toLowerCase();
  const password = s(body.password);
  const firstName = s(body.firstName);
  const lastName = s(body.lastName);
  const classCode = s(body.classCode).toUpperCase();

  const birthdate = s(body.birthdate);
  const grade = s(body.grade) || null;
  const schoolName = s(body.schoolName);
  const parentName = s(body.parentName) || null;
  const parentEmail = s(body.parentEmail).toLowerCase() || null;
  const parentEmailConfirm = s(body.parentEmailConfirm).toLowerCase() || null;
  const parentPhone = s(body.parentPhone) || null;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }
  if (!password || password.length < 4) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 4 characters." },
      { status: 400 }
    );
  }
  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "First name and last name are required." },
      { status: 400 }
    );
  }
  if (!classCode) {
    return NextResponse.json(
      {
        ok: false,
        error: `A class code is required. Request the self-paced code (${getAsyncClassCode()}) by email if you do not have a teacher code.`,
      },
      { status: 400 }
    );
  }
  if (!grade) {
    return NextResponse.json(
      { ok: false, error: "Grade is required for student signup." },
      { status: 400 }
    );
  }

  const attestedAge = ageFromBirthdate(birthdate);
  if (attestedAge === null) {
    return NextResponse.json(
      { ok: false, error: "A valid date of birth is required to create a student account." },
      { status: 400 }
    );
  }
  if (attestedAge < MIN_SELF_SIGNUP_AGE) {
    return NextResponse.json(
      {
        ok: false,
        error: `Students under ${MIN_SELF_SIGNUP_AGE} cannot create their own email login. Ask a parent or guardian to create a family account at /welcome/parent.`,
        code: "UNDER_13_PARENT_REQUIRED",
      },
      { status: 403 }
    );
  }

  const parentEmailCheck = validateYoungerGradeParentEmail({
    grade,
    studentEmail: email,
    parentEmail,
    parentEmailConfirm: isYoungerSelfSignupGrade(grade)
      ? parentEmailConfirm ?? ""
      : undefined,
  });
  if (!parentEmailCheck.ok) {
    return NextResponse.json(
      { ok: false, error: parentEmailCheck.error, code: parentEmailCheck.code },
      { status: 400 }
    );
  }

  const ageAttestedAt = new Date().toISOString();

  const supabase = createSupabaseAdminClient();

  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      class_code: classCode,
      grade,
      // Audit trail without storing full DOB
      age_attested_years: attestedAge,
      age_attested_at: ageAttestedAt,
      self_signup_eligible: true,
      younger_grade_parent_contact: isYoungerSelfSignupGrade(grade),
    },
  });

  if (createErr) {
    const msg = createErr.message || "Could not create user.";
    const status = msg.toLowerCase().includes("already") ? 409 : 400;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }

  const userId = created.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, error: "User created but missing id." }, { status: 500 });
  }

  let schoolId: string | null = null;
  try {
    schoolId = schoolName ? await getOrCreateSchoolId(supabase, schoolName) : null;
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: errorMessage(error, "School upsert failed.") },
      { status: 500 }
    );
  }

  const { error: studentErr } = await supabase.from("students").insert({
    user_id: userId,
    display_name: firstName,
    first_name: firstName,
    last_name: lastName,
    grade,
    school_id: schoolId,
    parent_name: parentName,
    parent_email: parentEmail,
    parent_phone: parentPhone,
    device_id: `auth:${userId}`,
  });

  if (studentErr) {
    const msg = studentErr.message ?? "";
    const looksLikeSchemaCache =
      msg.includes("schema cache") || msg.includes("Could not find the 'first_name' column");
    if (!looksLikeSchemaCache) {
      return NextResponse.json({ ok: false, error: msg }, { status: 500 });
    }

    const { error: retryErr } = await supabase.from("students").insert({
      user_id: userId,
      display_name: firstName,
      grade,
      school_id: schoolId,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      device_id: `auth:${userId}`,
    });

    if (retryErr) {
      return NextResponse.json({ ok: false, error: retryErr.message }, { status: 500 });
    }
  }

  const { data: studentRow } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!studentRow?.id) {
    return NextResponse.json(
      { ok: false, error: "Account created, but student profile was not found for enrollment." },
      { status: 500 }
    );
  }

  const enrolled = await enrollStudentInClassByCode({
    studentId: studentRow.id,
    classCode,
    admin: supabase,
  });

  if (!enrolled.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          enrolled.error ||
          "Account created, but that class code was not found. Request a self-paced code and try again.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, userId, classId: enrolled.classId }, { status: 200 });
}
