"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson11 } from "@/lib/cyberLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson11} hubLabel="Cybersecurity Hub" />;
}
