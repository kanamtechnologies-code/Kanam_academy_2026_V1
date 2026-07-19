"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson13 } from "@/lib/apCspLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson13} hubLabel="AP CSP Prep Hub" />;
}
