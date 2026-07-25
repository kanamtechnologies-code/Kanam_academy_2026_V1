"use client";

import * as React from "react";

import { RemotePythonLesson } from "@/components/python/RemotePythonLesson";
import { setGuestMode, setGuestName, isGuestMode } from "@/lib/guestProgress";
import { DEMO_LESSON_ID } from "@/lib/pythonLessons/demoLesson";

export default function DemoLessonPage() {
  React.useEffect(() => {
    if (!isGuestMode()) {
      setGuestMode(true);
      setGuestName("Guest");
    }
  }, []);

  return <RemotePythonLesson lessonId={DEMO_LESSON_ID} />;
}
