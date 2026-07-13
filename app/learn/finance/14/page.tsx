"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson14 } from "@/lib/financeLessons/lesson14";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson14} hubLabel="Financial Literacy Hub" />;
}
