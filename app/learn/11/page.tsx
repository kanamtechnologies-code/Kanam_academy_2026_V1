"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson11 } from "@/lib/pythonLessons/lesson11";

export default function Lesson11Page() {
  return <PythonLessonCanvas lesson={lesson11} />;
}
