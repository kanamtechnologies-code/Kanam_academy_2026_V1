"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson11 } from "@/lib/financeLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson11} hubLabel="Financial Literacy Hub" />;
}
