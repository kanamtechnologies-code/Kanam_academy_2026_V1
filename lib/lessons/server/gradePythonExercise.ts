import "server-only";

import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import { predictionSoftMatches } from "@/lib/exercises/normalizePrediction";
import type {
  PythonCheckRequest,
  PythonCheckResponse,
} from "@/lib/lessons/pythonCheckTypes";
import type { MiniRunResult } from "@/lib/pythonRunner";

export type { PythonCheckRequest, PythonCheckResponse };

export function gradePythonExercise(
  lesson: PythonLessonConfig,
  input: PythonCheckRequest
): PythonCheckResponse {
  const exercise = lesson.exercises.find((ex) => ex.id === input.exerciseId);
  if (!exercise) {
    return { ok: false, codeOk: false, feedback: "Unknown exercise." };
  }

  if (input.tempPass && process.env.NODE_ENV === "development") {
    const projectChecks: Record<string, boolean> = {};
    for (const req of lesson.project?.requirements ?? []) projectChecks[req.id] = true;
    const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
    return {
      ok: true,
      codeOk: true,
      predictionOk: true,
      feedback: `[TEMP] Passed: ${exercise.successMessage}`,
      projectChecks: lesson.project ? projectChecks : undefined,
      lessonComplete:
        Boolean(lesson.project) || exerciseIndex === lesson.exercises.length - 1,
    };
  }

  const run: MiniRunResult = {
    stdout: Array.isArray(input.run.stdout) ? input.run.stdout.map(String) : [],
    env: {},
    error: input.run.error ? String(input.run.error) : undefined,
  };

  let codeOk = false;
  try {
    codeOk = Boolean(exercise.validate?.(String(input.code ?? ""), run, {}));
  } catch {
    codeOk = false;
  }

  const kind = exercise.kind ?? "fill";
  const playTurns = Number(input.playTurns ?? 0);

  let projectChecks: Record<string, boolean> | undefined;
  if (lesson.project?.requirements?.length) {
    projectChecks = {};
    for (const req of lesson.project.requirements) {
      try {
        projectChecks[req.id] =
          req.id === "req-play"
            ? playTurns >= 3
            : Boolean(req.check?.(String(input.code ?? ""), run));
      } catch {
        projectChecks[req.id] = req.id === "req-play" ? playTurns >= 3 : false;
      }
    }
  }

  if (kind === "predict") {
    const prediction = String(input.prediction ?? "");
    const accepted =
      exercise.acceptedPredictions && exercise.acceptedPredictions.length > 0
        ? exercise.acceptedPredictions
        : run.stdout.length > 0
          ? [run.stdout.join("\n")]
          : [];
    const predictionOk = predictionSoftMatches(prediction, accepted);
    if (!codeOk) {
      return {
        ok: false,
        codeOk: false,
        predictionOk: false,
        feedback: exercise.failureMessage,
        projectChecks,
      };
    }
    if (!predictionOk) {
      return {
        ok: false,
        codeOk: true,
        predictionOk: false,
        feedback:
          "Not quite — your prediction doesn't match what the program does. Revise your prediction (the real output stays hidden until you get it).",
        projectChecks,
      };
    }
    const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
    return {
      ok: true,
      codeOk: true,
      predictionOk: true,
      feedback: exercise.successMessage,
      projectChecks,
      lessonComplete: exerciseIndex === lesson.exercises.length - 1,
    };
  }

  if (!codeOk) {
    return {
      ok: false,
      codeOk: false,
      feedback: exercise.failureMessage,
      projectChecks,
    };
  }

  if (lesson.project && projectChecks) {
    const playOk = playTurns >= 3 || Boolean(projectChecks["req-play"]);
    const buildOk = lesson.project.requirements
      .filter((r) => r.id !== "req-play")
      .every((r) => projectChecks![r.id]);
    if (!(buildOk && playOk)) {
      return {
        ok: false,
        codeOk: true,
        feedback: playOk
          ? exercise.failureMessage
          : "Build looks good — now open Adventure and play at least 3 live turns to finish the capstone.",
        projectChecks,
      };
    }
  }

  const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
  return {
    ok: true,
    codeOk: true,
    feedback: exercise.successMessage,
    projectChecks,
    lessonComplete:
      Boolean(lesson.project) || exerciseIndex === lesson.exercises.length - 1,
  };
}
