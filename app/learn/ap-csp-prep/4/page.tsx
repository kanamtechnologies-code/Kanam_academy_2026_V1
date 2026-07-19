"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson4 } from "@/lib/apCspLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson4} hubLabel="AP CSP Prep Hub" />;
}
