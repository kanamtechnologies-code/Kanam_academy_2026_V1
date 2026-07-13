"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson2 } from "@/lib/financeLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson2} hubLabel="Financial Literacy Hub" />;
}
