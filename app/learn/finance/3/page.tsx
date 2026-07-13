"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson3 } from "@/lib/financeLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson3} hubLabel="Financial Literacy Hub" />;
}
