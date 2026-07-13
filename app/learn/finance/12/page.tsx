"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson12 } from "@/lib/financeLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson12} hubLabel="Financial Literacy Hub" />;
}
