import { NextResponse } from "next/server";

import type { DataCheckRequest } from "@/lib/lessons/dataCheckTypes";
import type { PythonCheckRequest } from "@/lib/lessons/pythonCheckTypes";
import { assertLessonReadable } from "@/lib/lessons/server/assertLessonReadable";
import { gradeDataExercise } from "@/lib/lessons/server/gradeDataExercise";
import { gradePythonExercise } from "@/lib/lessons/server/gradePythonExercise";
import { isDataLessonId, loadDataLesson } from "@/lib/lessons/server/dataRegistry";
import { isPythonLessonId, loadPythonLesson } from "@/lib/lessons/server/pythonRegistry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ lessonId: string }> };

/**
 * Server-side exercise grading. Validators never ship to the browser.
 */
export async function POST(req: Request, ctx: Ctx) {
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

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body?.exerciseId) {
    return NextResponse.json({ ok: false, error: "exerciseId is required." }, { status: 400 });
  }

  if (isPythonLessonId(lessonId)) {
    const lesson = await loadPythonLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ ok: false, error: "Lesson not found." }, { status: 404 });
    }
    const run = (body.run ?? {}) as PythonCheckRequest["run"];
    const result = gradePythonExercise(lesson, {
      exerciseId: String(body.exerciseId),
      code: String(body.code ?? ""),
      run: {
        stdout: Array.isArray(run.stdout) ? run.stdout.map(String) : [],
        error: run.error ? String(run.error) : null,
      },
      prediction: body.prediction != null ? String(body.prediction) : undefined,
      playTurns: body.playTurns != null ? Number(body.playTurns) : undefined,
      tempPass: Boolean(body.tempPass),
    });
    return NextResponse.json(result, { status: 200 });
  }

  if (isDataLessonId(lessonId)) {
    const lesson = await loadDataLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ ok: false, error: "Lesson not found." }, { status: 404 });
    }
    const payload = body as unknown as DataCheckRequest;
    const result = gradeDataExercise(lesson, {
      exerciseId: String(payload.exerciseId),
      sql: String(payload.sql ?? ""),
      result: payload.result ?? null,
      resultError: payload.resultError ?? null,
      prediction: payload.prediction != null ? String(payload.prediction) : undefined,
      tempPass: Boolean(payload.tempPass),
    });
    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json({ ok: false, error: "Unsupported lesson." }, { status: 404 });
}
