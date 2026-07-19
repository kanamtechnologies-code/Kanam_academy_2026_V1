"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson14 } from "@/lib/apCspLessons/lesson14";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson14} hubLabel="AP CSP Prep Hub" />;
}
