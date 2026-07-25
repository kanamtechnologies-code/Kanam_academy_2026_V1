"use client";

import * as React from "react";

import {
  DataLessonCanvas,
  type DataLessonConfig,
} from "@/components/data/DataLessonCanvas";
import type { PublicDataLessonConfig } from "@/lib/lessons/publicDataLesson";

export function RemoteDataLesson({ lessonId }: { lessonId: string }) {
  const [lesson, setLesson] = React.useState<PublicDataLessonConfig | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/student/lessons/${encodeURIComponent(lessonId)}`);
        const json = (await res.json()) as {
          ok?: boolean;
          error?: string;
          lesson?: PublicDataLessonConfig;
        };
        if (!mounted) return;
        if (!res.ok || !json.ok || !json.lesson) {
          setError(json.error || "Could not load lesson.");
          return;
        }
        setLesson(json.lesson);
      } catch {
        if (mounted) setError("Could not load lesson.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lessonId]);

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-rose-700">{error}</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm font-semibold text-slate-600">Loading lesson…</p>
      </div>
    );
  }

  return <DataLessonCanvas lesson={lesson as unknown as DataLessonConfig} />;
}
