"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson6 } from "@/lib/apCspLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson6} hubLabel="AP CSP Prep Hub" />;
}
