"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson7 } from "@/lib/apCspLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson7} hubLabel="AP CSP Prep Hub" />;
}
