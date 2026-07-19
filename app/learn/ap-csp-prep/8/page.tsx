"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson8 } from "@/lib/apCspLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson8} hubLabel="AP CSP Prep Hub" />;
}
