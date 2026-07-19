"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson16 } from "@/lib/apCspLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson16} hubLabel="AP CSP Prep Hub" />;
}
