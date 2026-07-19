"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson1 } from "@/lib/apCspLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson1} hubLabel="AP CSP Prep Hub" />;
}
