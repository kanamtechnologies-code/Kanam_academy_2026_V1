"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Code2,
  Flame,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[color:var(--brand-2)]">
              Interactive demo
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Try a real Kanam lesson
              <span className="block text-[color:var(--brand)]">guided, step by step</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
              A short tour walks you through the lesson canvas — coach note, Python blanks, Run &amp;
              check, and XP. No account required. About 3 minutes.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-900">
                Live Python canvas
              </Badge>
              <Badge className="border border-amber-200 bg-amber-50 text-amber-950">
                Guided tour
              </Badge>
              <Badge variant="outline" className="border-slate-300 bg-white/80">
                Progress saves locally
              </Badge>
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                disabled={starting}
                className={[
                  "h-14 w-full rounded-2xl px-7 text-base font-extrabold sm:w-auto",
                  "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                  "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.05]",
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

            <p className="mt-4">
              <Link
                href="/welcome"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
              >
                Back to Welcome
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.08 }}
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
                    <p className="text-lg font-black text-white">Quickstart: Meet Your AI Helper</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "XP", value: "50", icon: Sparkles },
                    { label: "Steps", value: "2", icon: BookOpen },
                    { label: "Time", value: "~3 min", icon: Flame },
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

            <div className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
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
                    title: "Write a little Python",
                    body: "Fill in blanks, press Run, and read the console.",
                  },
                  {
                    icon: Trophy,
                    title: "Earn XP",
                    body: "Finish both exercises and see your progress celebrate.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-600">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 inline-flex min-h-11 items-center text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800"
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
