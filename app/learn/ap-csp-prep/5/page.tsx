"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson5 } from "@/lib/apCspLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson5} hubLabel="AP CSP Prep Hub" />;
}
