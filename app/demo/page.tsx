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
import { setGuestMode, setGuestName, resetGuestProgress } from "@/lib/guestProgress";

export default function DemoEntryPage() {
  const router = useRouter();
  const [starting, setStarting] = React.useState(false);

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

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-[1200px] flex-col justify-center px-4 py-6 sm:py-8 md:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="text-center"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[color:var(--brand-2)]">
              Interactive demo
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Try a real Kanam lesson
              <span className="block text-[color:var(--brand)]">guided, step by step</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
              Start with a short product tour that teaches the canvas — tabs, coach note, editor,
              Run &amp; check, and console — then practice a real Python lesson. Built for students,
              parents, and educators.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                disabled={starting}
                className={[
                  "h-14 w-full max-w-sm rounded-2xl px-7 text-base font-extrabold sm:w-auto",
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
                    Start guided lesson <Play className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.06 }}
            className="space-y-4"
          >
            <div className="kanam-dashboard-hero overflow-hidden rounded-[28px] p-6 shadow-xl">
              <div className="kanam-dashboard-hero-overlay" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="kanam-hero-brand-tile grid h-12 w-12 place-items-center rounded-2xl">
                    <Image src="/images/Logo.png" alt="Kanam Academy" width={32} height={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                      Lesson canvas preview
                    </p>
                    <p className="text-lg font-black text-white">Meet Your AI Helper</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "XP", value: "50", icon: Sparkles },
                    { label: "Exercises", value: "3", icon: ListOrdered },
                    { label: "Time", value: "~6 min", icon: BookOpen },
                  ].map((stat) => (
                    <div key={stat.label} className="kanam-dashboard-stat rounded-2xl p-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                        {stat.label}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-black text-white">
                        <stat.icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
                What you&apos;ll do
              </p>
              <ul className="mt-3 space-y-3">
                {[
                  {
                    icon: BookOpen,
                    title: "Read a short lesson",
                    body: "Pictures + coach tips — same layout students use in class.",
                  },
                  {
                    icon: Code2,
                    title: "Fill in a blank",
                    body: "Store a name in a variable and print Hello! I am …",
                  },
                  {
                    icon: ListOrdered,
                    title: "Reorder + debug",
                    body: "Drag lines into order, then fix a Print vs print bug.",
                  },
                  {
                    icon: Trophy,
                    title: "Earn XP & a badge",
                    body: "Finish all three exercises and unlock The Awakener.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                    className="flex gap-3"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300 dark:ring-emerald-500/30">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-slate-900 dark:text-slate-50">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{item.body}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-300">
                <Bug className="h-3.5 w-3.5" />
                Same exercise kinds as Week 1 of the Python track.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex min-h-11 items-center text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
                onClick={() => {
                  resetGuestProgress();
                }}
              >
                Clear previous demo progress on this device
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </WelcomeBackground>
  );
}
