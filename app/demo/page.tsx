"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Bug,
  Code2,
  ListOrdered,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { DEMO_LESSON_TOUR_FLAG } from "@/components/demo/GuestLessonTour";
import {
  clearDemoProgressOnDevice,
  setGuestMode,
  setGuestName,
} from "@/lib/guestProgress";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function DemoEntryPage() {
  const router = useRouter();
  const [starting, setStarting] = React.useState(false);
  const [clearMsg, setClearMsg] = React.useState<string | null>(null);
  const [clearing, setClearing] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        const { data } = await supabase.auth.getSession();
        if (cancelled || !data.session) return;
        setGuestMode(false);
        router.replace("/dashboard");
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const startGuidedLesson = React.useCallback(() => {
    setStarting(true);
    setGuestMode(true);
    setGuestName("Guest");
    try {
      window.localStorage.setItem(DEMO_LESSON_TOUR_FLAG, "1");
    } catch {
      // ignore
    }
    router.push("/learn/demo?view=lesson");
  }, [router]);

  const clearDemoProgress = React.useCallback(() => {
    if (clearing) return;
    setClearing(true);
    setClearMsg(null);
    // Defer so mobile browsers finish the tap before we mutate storage.
    window.setTimeout(() => {
      const result = clearDemoProgressOnDevice();
      if (!result.ok) {
        setClearMsg(result.error || "Could not clear demo progress on this device.");
      } else if (result.removed === 0) {
        setClearMsg("No saved demo progress on this device.");
      } else {
        setClearMsg("Demo progress cleared. You can start fresh.");
      }
      setClearing(false);
    }, 0);
  }, [clearing]);

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full min-w-0 max-w-[1200px] flex-col justify-center px-1 py-5 sm:px-2 sm:py-8 md:px-6">
        <div className="grid w-full min-w-0 items-center gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="w-full min-w-0 max-w-full text-center"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand-2)] sm:text-xs sm:tracking-[0.24em]">
              Interactive demo
            </p>
            <h1 className="mt-3 break-words text-[1.65rem] font-black leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Try a real Kanam lesson
              <span className="mt-1 block text-[color:var(--brand)]">guided, step by step</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg">
              Take a short walk through the real student canvas — then try a live Python lesson.
              Built so parents and schools can see exactly what learners experience in class.
            </p>

            <div className="mt-7 flex w-full min-w-0 justify-center sm:mt-8">
              <Button
                size="lg"
                disabled={starting}
                className={[
                  "h-12 w-full max-w-full whitespace-normal rounded-2xl px-4 text-sm font-extrabold sm:h-14 sm:max-w-sm sm:whitespace-nowrap sm:px-7 sm:text-base",
                  "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                  "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.05]",
                  "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
                ].join(" ")}
                onClick={startGuidedLesson}
              >
                {starting ? (
                  "Opening…"
                ) : (
                  <>
                    Start guided lesson <Play className="h-5 w-5 shrink-0" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.06 }}
            className="w-full min-w-0 max-w-full space-y-3 sm:space-y-4"
          >
            <div className="kanam-dashboard-hero w-full min-w-0 overflow-hidden rounded-[22px] p-4 shadow-xl sm:rounded-[28px] sm:p-6">
              <div className="kanam-dashboard-hero-overlay" />
              <div className="relative z-10 space-y-3 sm:space-y-4">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="kanam-hero-brand-tile grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-12 sm:w-12">
                    <Image src="/images/Logo.png" alt="Kanam Academy" width={32} height={32} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-white/80 sm:text-xs sm:tracking-[0.2em]">
                      Lesson canvas preview
                    </p>
                    <p className="truncate text-base font-black text-white sm:text-lg">
                      Your First Python Program
                    </p>
                  </div>
                </div>
                <div className="grid min-w-0 grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { label: "XP", value: "50", icon: Sparkles },
                    { label: "Exercises", value: "4", icon: ListOrdered },
                    { label: "Time", value: "~8m", icon: BookOpen },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="kanam-dashboard-stat min-w-0 rounded-xl p-2 sm:rounded-2xl sm:p-3"
                    >
                      <p className="truncate text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.16em]">
                        {stat.label}
                      </p>
                      <p className="mt-1 flex min-w-0 items-center gap-1 text-xs font-black text-white sm:gap-1.5 sm:text-sm">
                        <stat.icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                        <span className="truncate">{stat.value}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full min-w-0 rounded-[22px] border border-white/60 bg-white/75 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:rounded-[28px] sm:p-5 dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500 sm:text-xs sm:tracking-[0.2em] dark:text-slate-300">
                What you&apos;ll do
              </p>
              <ul className="mt-3 space-y-3">
                {[
                  {
                    icon: BookOpen,
                    title: "Work through a short lesson",
                    body: "Concepts, a worked example, and coach notes — same canvas students use in class.",
                  },
                  {
                    icon: Code2,
                    title: "Fill in the blank",
                    body: "Assign a name to a variable, then print a complete greeting.",
                  },
                  {
                    icon: ListOrdered,
                    title: "Reorder, debug, make it yours",
                    body: "Fix line order, fix Print vs print, then customize the program.",
                  },
                  {
                    icon: Trophy,
                    title: "Earn XP & a badge",
                    body: "Finish the exercises and unlock The Awakener.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                    className="flex min-w-0 gap-2.5 sm:gap-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 sm:h-10 sm:w-10 sm:rounded-2xl dark:bg-emerald-950/80 dark:text-emerald-300 dark:ring-emerald-500/30">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-sm font-extrabold leading-snug text-slate-900 dark:text-slate-50">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-slate-600 dark:text-slate-300">
                        {item.body}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 flex min-w-0 items-start gap-2 text-xs font-medium leading-snug text-slate-500 dark:text-slate-300">
                <Bug className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0">Same exercise kinds as Week 1 of the Python track.</span>
              </p>
              <Button
                type="button"
                variant="outline"
                disabled={clearing || starting}
                className="mt-3 h-11 w-full max-w-full whitespace-normal touch-manipulation rounded-xl px-3 text-xs font-bold leading-snug sm:text-sm"
                onClick={clearDemoProgress}
              >
                {clearing ? "Clearing…" : "Clear previous demo progress on this device"}
              </Button>
              {clearMsg ? (
                <p
                  className="mt-2 text-center text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                  role="status"
                  aria-live="polite"
                >
                  {clearMsg}
                </p>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </WelcomeBackground>
  );
}
