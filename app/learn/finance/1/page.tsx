"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson1 } from "@/lib/financeLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson1} hubLabel="Financial Literacy Hub" />;
}
