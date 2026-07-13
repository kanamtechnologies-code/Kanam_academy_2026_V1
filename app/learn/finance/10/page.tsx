"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson10 } from "@/lib/financeLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson10} hubLabel="Financial Literacy Hub" />;
}
