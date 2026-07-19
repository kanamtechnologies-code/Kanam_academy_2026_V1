"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson2 } from "@/lib/apCspLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson2} hubLabel="AP CSP Prep Hub" />;
}
