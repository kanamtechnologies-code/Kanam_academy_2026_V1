"use client";

import { AILessonCanvas, type AILessonConfig } from "@/components/ai/AILessonCanvas";

export default function Content({
  lesson,
}: {
  lesson: AILessonConfig;
}) {
  return <AILessonCanvas lesson={lesson} />;
}
