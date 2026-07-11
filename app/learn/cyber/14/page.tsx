"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson14 } from "@/lib/cyberLessons/lesson14";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson14} hubLabel="Cybersecurity Hub" />;
}
