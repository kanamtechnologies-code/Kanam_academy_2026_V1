"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson7 } from "@/lib/financeLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson7} hubLabel="Financial Literacy Hub" />;
}
