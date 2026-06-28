"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson5 } from "@/lib/pythonLessons/lesson5";

export default function Lesson5Page() {
  return <PythonLessonCanvas lesson={lesson5} />;
}
