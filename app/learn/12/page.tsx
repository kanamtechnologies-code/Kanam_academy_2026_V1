"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson12 } from "@/lib/pythonLessons/lesson12";

export default function Lesson12Page() {
  return <PythonLessonCanvas lesson={lesson12} />;
}
