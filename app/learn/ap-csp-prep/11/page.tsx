"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson11 } from "@/lib/apCspLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson11} hubLabel="AP CSP Prep Hub" />;
}
