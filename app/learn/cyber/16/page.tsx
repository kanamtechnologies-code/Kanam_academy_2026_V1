"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson16 } from "@/lib/cyberLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson16} hubLabel="Cybersecurity Hub" />;
}
