"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson9 } from "@/lib/financeLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson9} hubLabel="Financial Literacy Hub" />;
}
