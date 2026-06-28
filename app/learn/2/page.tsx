"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson2 } from "@/lib/pythonLessons/lesson2";

export default function Page() {
  return <PythonLessonCanvas lesson={lesson2} />;
}
