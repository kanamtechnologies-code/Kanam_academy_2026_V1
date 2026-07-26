"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { RemotePythonLesson } from "@/components/python/RemotePythonLesson";
import { setGuestMode, setGuestName, isGuestMode } from "@/lib/guestProgress";
import { DEMO_LESSON_ID } from "@/lib/pythonLessons/demoLesson";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function DemoLessonPage() {
  const router = useRouter();

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          if (cancelled) return;
          if (data.session) {
            // Signed-in learners should not enter guest mode (traps dashboard).
            setGuestMode(false);
            router.replace("/dashboard");
            return;
          }
        }
      } catch {
        // fall through to guest demo
      }
      if (!isGuestMode()) {
        setGuestMode(true);
        setGuestName("Guest");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return <RemotePythonLesson lessonId={DEMO_LESSON_ID} />;
}
