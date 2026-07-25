import { NextResponse } from "next/server";

import { toPublicDataLesson } from "@/lib/lessons/publicDataLesson";
import { toPublicPythonLesson } from "@/lib/lessons/publicPythonLesson";
import { assertLessonReadable } from "@/lib/lessons/server/assertLessonReadable";
import { isDataLessonId, loadDataLesson } from "@/lib/lessons/server/dataRegistry";
import { isPythonLessonId, loadPythonLesson } from "@/lib/lessons/server/pythonRegistry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ lessonId: string }> };

/**
 * Returns a browser-safe lesson payload (no validators / solutions).
 */
export async function GET(_req: Request, ctx: Ctx) {
  const { lessonId: raw } = await ctx.params;
  const lessonId = decodeURIComponent(raw || "").trim();
  if (!lessonId) {
    return NextResponse.json({ ok: false, error: "Missing lesson id." }, { status: 400 });
  }

  const gate = await assertLessonReadable(lessonId);
  if (!gate.ok) {
    return NextResponse.json(
      { ok: false, error: gate.error, redirect: gate.redirect },
      { status: gate.status }
    );
  }

  if (isPythonLessonId(lessonId)) {
    const lesson = await loadPythonLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ ok: false, error: "Lesson not found." }, { status: 404 });
    }
    return NextResponse.json(
      { ok: true, kind: "python", lesson: toPublicPythonLesson(lesson) },
      { status: 200 }
    );
  }

  if (isDataLessonId(lessonId)) {
    const lesson = await loadDataLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ ok: false, error: "Lesson not found." }, { status: 404 });
    }
    return NextResponse.json(
      { ok: true, kind: "data", lesson: toPublicDataLesson(lesson) },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: false, error: "Unsupported lesson." }, { status: 404 });
}
