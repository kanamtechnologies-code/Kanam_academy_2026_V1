"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson7 } from "@/lib/cyberLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson7} hubLabel="Cybersecurity Hub" />;
}
