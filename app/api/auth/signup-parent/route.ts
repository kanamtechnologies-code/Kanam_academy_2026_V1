import { NextResponse } from "next/server";

import { enrollStudentInClassByCode, getAsyncClassCode } from "@/lib/asyncClass";
import {
  hashPin,
  isValidPin,
  kidDeviceId,
  setActiveStudentMetadata,
} from "@/lib/households";
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
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
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
  if (!password || password.length < 4) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 4 characters." },
      { status: 400 }
    );
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

  const admin = createSupabaseAdminClient();

  const nameParts = parentName.split(/\s+/);
  const firstName = nameParts[0] || parentName;
  const lastName = nameParts.slice(1).join(" ") || "";

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: "parent",
      first_name: firstName,
      last_name: lastName,
      display_name: parentName,
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

  const { data: household, error: hhErr } = await admin
    .from("households")
    .insert({
      owner_user_id: userId,
      name: householdName,
    })
    .select("id")
    .single();

  if (hhErr || !household?.id) {
    return NextResponse.json(
      {
        ok: false,
        error:
          hhErr?.message ||
          "Could not create household. Apply supabase/households.sql in the SQL Editor.",
      },
      { status: 500 }
    );
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
    },
    { status: 200 }
  );
}
