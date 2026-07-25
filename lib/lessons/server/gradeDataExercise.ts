import "server-only";

import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";
import { predictionSoftMatches } from "@/lib/exercises/normalizePrediction";
import type { DataCheckRequest, DataCheckResponse } from "@/lib/lessons/dataCheckTypes";
import type { QueryResult } from "@/lib/sqlRunner";

export function gradeDataExercise(
  lesson: DataLessonConfig,
  input: DataCheckRequest
): DataCheckResponse {
  const exercise = lesson.exercises.find((ex) => ex.id === input.exerciseId);
  if (!exercise) {
    return { ok: false, codeOk: false, feedback: "Unknown exercise." };
  }

  if (input.tempPass && process.env.NODE_ENV === "development") {
    const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
    return {
      ok: true,
      codeOk: true,
      predictionOk: true,
      feedback: `[TEMP] Passed: ${exercise.successMessage}`,
      lessonComplete: exerciseIndex === lesson.exercises.length - 1,
    };
  }

  const result: QueryResult | null = input.resultError
    ? null
    : input.result
      ? {
          columns: input.result.columns ?? [],
          values: input.result.values ?? [],
          rowCount: Number(input.result.rowCount ?? 0),
        }
      : null;

  let codeOk = false;
  try {
    codeOk = Boolean(exercise.validate?.(String(input.sql ?? ""), result));
  } catch {
    codeOk = false;
  }

  const kind = exercise.kind ?? "fill";
  if (kind === "predict") {
    const prediction = String(input.prediction ?? "");
    const preview = result
      ? `${result.rowCount} row${result.rowCount === 1 ? "" : "s"}`
      : "";
    const resultSummary = result
      ? `${preview}; columns: ${result.columns.join(", ")}`
      : "";
    const accepted =
      exercise.acceptedPredictions && exercise.acceptedPredictions.length > 0
        ? exercise.acceptedPredictions
        : result
          ? [String(result.rowCount), resultSummary]
          : [];
    const predictionOk = predictionSoftMatches(prediction, accepted);
    if (!codeOk) {
      return { ok: false, codeOk: false, predictionOk: false, feedback: exercise.failureMessage };
    }
    if (!predictionOk) {
      return {
        ok: false,
        codeOk: true,
        predictionOk: false,
        feedback:
          "Not quite — your prediction doesn't match the result. Revise it (the real answer stays hidden until you get it).",
      };
    }
    const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
    return {
      ok: true,
      codeOk: true,
      predictionOk: true,
      feedback: exercise.successMessage,
      lessonComplete: exerciseIndex === lesson.exercises.length - 1,
    };
  }

  if (!codeOk) {
    return { ok: false, codeOk: false, feedback: exercise.failureMessage };
  }

  const exerciseIndex = lesson.exercises.findIndex((ex) => ex.id === exercise.id);
  return {
    ok: true,
    codeOk: true,
    feedback: exercise.successMessage,
    lessonComplete: exerciseIndex === lesson.exercises.length - 1,
  };
}
