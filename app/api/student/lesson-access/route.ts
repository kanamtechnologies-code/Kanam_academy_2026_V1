import { NextResponse } from "next/server";

import { loadCompletedLessonIdsForUser } from "@/lib/billing/loadCompletedLessonIds";
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

  const completedIds = resolved.user
    ? await loadCompletedLessonIdsForUser(resolved.user)
    : [];

  return NextResponse.json(
    {
      ok: true,
      access: resolved.access,
      completedIds,
      needsParentalConsent: resolved.needsParentalConsent,
      needsChildSelect: resolved.needsChildSelect,
      unlockedForTesting: resolved.unlockedForTesting,
    },
    { status: 200 }
  );
}
