"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson3 } from "@/lib/pythonLessons/lesson3";

export default function Page() {
  return <PythonLessonCanvas lesson={lesson3} />;
}
