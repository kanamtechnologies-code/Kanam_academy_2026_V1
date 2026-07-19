"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson3 } from "@/lib/apCspLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson3} hubLabel="AP CSP Prep Hub" />;
}
