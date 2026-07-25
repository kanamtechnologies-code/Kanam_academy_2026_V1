import type { DataLessonConfig, DataSqlExercise } from "@/components/data/DataLessonCanvas";

export type PublicDataSqlExercise = Omit<
  DataSqlExercise,
  "validate" | "acceptedPredictions"
> & {
  hasAcceptedPredictions?: boolean;
};

export type PublicDataLessonConfig = Omit<DataLessonConfig, "exercises"> & {
  exercises: PublicDataSqlExercise[];
};

export function toPublicDataLesson(lesson: DataLessonConfig): PublicDataLessonConfig {
  return {
    ...lesson,
    exercises: lesson.exercises.map((ex) => {
      const { validate, acceptedPredictions, ...pub } = ex;
      void validate;
      return {
        ...pub,
        hasAcceptedPredictions: Boolean(acceptedPredictions?.length),
      };
    }),
  };
}
