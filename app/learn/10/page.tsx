"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson10 } from "@/lib/pythonLessons/lesson10";

export default function Lesson10Page() {
  return <PythonLessonCanvas lesson={lesson10} />;
}
