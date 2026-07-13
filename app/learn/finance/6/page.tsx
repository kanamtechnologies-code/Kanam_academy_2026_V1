"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson6 } from "@/lib/financeLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson6} hubLabel="Financial Literacy Hub" />;
}
