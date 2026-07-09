"use client";

import * as React from "react";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { setGuestMode, setGuestName, isGuestMode } from "@/lib/guestProgress";
import { demoLesson } from "@/lib/pythonLessons/demoLesson";

export default function DemoLessonPage() {
  React.useEffect(() => {
    // Interactive demo always runs in guest mode so XP/progress save on-device.
    if (!isGuestMode()) {
      setGuestMode(true);
      setGuestName("Guest");
    }
  }, []);

  return <PythonLessonCanvas lesson={demoLesson} />;
}
