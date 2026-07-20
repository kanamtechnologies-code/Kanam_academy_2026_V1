"use client";

import * as React from "react";

import { writeProgressEvent } from "@/lib/progress/writeProgress";

const HEARTBEAT_MS = 30_000;

/**
 * While the tab is visible, emit session_heartbeat every 30s so parents/instructors
 * can see time-on-task in learner insights.
 */
export function useLessonHeartbeat(opts: {
  studentDbId: string | null | undefined;
  deviceId: string | null | undefined;
  lessonId: string;
  enabled?: boolean;
}) {
  const { studentDbId, deviceId, lessonId, enabled = true } = opts;

  React.useEffect(() => {
    if (!enabled || !studentDbId || !deviceId || !lessonId) return;

    let lastTick = Date.now();

    const tick = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        lastTick = Date.now();
        return;
      }
      const now = Date.now();
      const delta = Math.round((now - lastTick) / 1000);
      lastTick = now;
      if (delta < 5) return;
      void writeProgressEvent({
        studentDbId,
        deviceId,
        lessonId,
        eventType: "session_heartbeat",
        payload: { activeSecondsDelta: Math.min(delta, 60) },
      });
    };

    const id = window.setInterval(tick, HEARTBEAT_MS);
    const onVis = () => {
      if (document.visibilityState === "visible") lastTick = Date.now();
      else tick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      tick();
    };
  }, [studentDbId, deviceId, lessonId, enabled]);
}
