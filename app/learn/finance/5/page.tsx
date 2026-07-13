"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson5 } from "@/lib/financeLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson5} hubLabel="Financial Literacy Hub" />;
}
