"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson8 } from "@/lib/financeLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson8} hubLabel="Financial Literacy Hub" />;
}
