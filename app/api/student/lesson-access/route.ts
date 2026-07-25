import { NextResponse } from "next/server";

import { resolveStudentLessonAccess } from "@/lib/billing/resolveStudentLessonAccess";

export const runtime = "nodejs";

export async function GET() {
  const resolved = await resolveStudentLessonAccess();

  if (resolved.status === 401) {
    return NextResponse.json(
      { ok: false, error: resolved.error ?? "Not signed in." },
      { status: 401 }
    );
  }
  if (resolved.status !== 200) {
    return NextResponse.json(
      { ok: false, error: resolved.error ?? "Could not resolve lesson access." },
      { status: resolved.status }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      access: resolved.access,
      needsParentalConsent: resolved.needsParentalConsent,
      needsChildSelect: resolved.needsChildSelect,
      unlockedForTesting: resolved.unlockedForTesting,
    },
    { status: 200 }
  );
}
