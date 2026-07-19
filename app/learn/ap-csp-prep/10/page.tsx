"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson10 } from "@/lib/apCspLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson10} hubLabel="AP CSP Prep Hub" />;
}
