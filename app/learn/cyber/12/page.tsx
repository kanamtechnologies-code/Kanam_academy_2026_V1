"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson12 } from "@/lib/cyberLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson12} hubLabel="Cybersecurity Hub" />;
}
