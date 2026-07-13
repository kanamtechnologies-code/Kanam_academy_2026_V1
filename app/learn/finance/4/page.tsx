"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson4 } from "@/lib/financeLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson4} hubLabel="Financial Literacy Hub" />;
}
