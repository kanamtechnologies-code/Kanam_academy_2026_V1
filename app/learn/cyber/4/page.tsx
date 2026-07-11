"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson4 } from "@/lib/cyberLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson4} hubLabel="Cybersecurity Hub" />;
}
