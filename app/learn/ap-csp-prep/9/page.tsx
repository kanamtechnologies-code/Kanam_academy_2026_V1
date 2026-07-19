"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson9 } from "@/lib/apCspLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson9} hubLabel="AP CSP Prep Hub" />;
}
