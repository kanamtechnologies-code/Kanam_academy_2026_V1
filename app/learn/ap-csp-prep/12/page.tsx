"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson12 } from "@/lib/apCspLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson12} hubLabel="AP CSP Prep Hub" />;
}
