"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson8 } from "@/lib/cyberLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson8} hubLabel="Cybersecurity Hub" />;
}
