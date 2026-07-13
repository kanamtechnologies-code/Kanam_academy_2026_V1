"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson13 } from "@/lib/financeLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson13} hubLabel="Financial Literacy Hub" />;
}
