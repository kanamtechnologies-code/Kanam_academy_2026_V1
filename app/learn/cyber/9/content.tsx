"use client";

import { AILessonCanvas, type AILessonConfig } from "@/components/ai/AILessonCanvas";

export default function Content({
  lesson,
  hubLabel = "Cybersecurity Hub",
}: {
  lesson: AILessonConfig; hubLabel?: string;
}) {
  return <AILessonCanvas lesson={lesson} hubLabel={hubLabel} />;
}
