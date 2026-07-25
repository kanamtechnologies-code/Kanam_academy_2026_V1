import type {
  PythonExercise,
  PythonLessonConfig,
  PythonProjectRequirement,
} from "@/components/python/PythonLessonCanvas";

/** Exercise shape safe to send to the browser (no graders / solutions). */
export type PublicPythonExercise = Omit<
  PythonExercise,
  "validate" | "solutionCode" | "acceptedPredictions"
> & {
  /** Present so the client knows a prediction is required; answers stay server-side. */
  hasAcceptedPredictions?: boolean;
};

export type PublicPythonProjectRequirement = Pick<PythonProjectRequirement, "id" | "label">;

export type PublicPythonLessonConfig = Omit<PythonLessonConfig, "exercises" | "project"> & {
  exercises: PublicPythonExercise[];
  project?: {
    missionTitle: string;
    timeLabel: string;
    requirements: PublicPythonProjectRequirement[];
  };
};

export function toPublicPythonLesson(lesson: PythonLessonConfig): PublicPythonLessonConfig {
  const { exercises, project, ...rest } = lesson;
  return {
    ...rest,
    exercises: exercises.map((ex) => {
      const { validate, solutionCode, acceptedPredictions, ...pub } = ex;
      void validate;
      void solutionCode;
      return {
        ...pub,
        hasAcceptedPredictions: Boolean(acceptedPredictions?.length),
      };
    }),
    project: project
      ? {
          missionTitle: project.missionTitle,
          timeLabel: project.timeLabel,
          requirements: project.requirements.map(({ id, label }) => ({ id, label })),
        }
      : undefined,
  };
}
