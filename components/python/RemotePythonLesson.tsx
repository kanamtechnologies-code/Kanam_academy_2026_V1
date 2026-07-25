"use client";

import * as React from "react";

import {
  PythonLessonCanvas,
  type PythonLessonConfig,
} from "@/components/python/PythonLessonCanvas";
import type { PublicPythonLessonConfig } from "@/lib/lessons/publicPythonLesson";

/**
 * Loads a browser-safe Python lesson from the server (validators never bundled).
 */
export function RemotePythonLesson({ lessonId }: { lessonId: string }) {
  const [lesson, setLesson] = React.useState<PublicPythonLessonConfig | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/student/lessons/${encodeURIComponent(lessonId)}`);
        const json = (await res.json()) as {
          ok?: boolean;
          error?: string;
          lesson?: PublicPythonLessonConfig;
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

  // Public payload is structurally compatible for rendering; graders are server-only.
  return <PythonLessonCanvas lesson={lesson as unknown as PythonLessonConfig} />;
}
