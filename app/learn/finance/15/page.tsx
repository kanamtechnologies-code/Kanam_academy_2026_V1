"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { financeLesson15 } from "@/lib/financeLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={financeLesson15} hubLabel="Financial Literacy Hub" />;
}
