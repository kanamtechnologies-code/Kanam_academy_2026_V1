"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson9 } from "@/lib/cyberLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson9} hubLabel="Cybersecurity Hub" />;
}
