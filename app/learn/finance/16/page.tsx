"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson16 } from "@/lib/financeLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson16} hubLabel="Financial Literacy Hub" />;
}
