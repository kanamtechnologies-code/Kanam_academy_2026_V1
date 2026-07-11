"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

import { PremiumBadge } from "@/components/badges/PremiumBadge";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { DEMO_LESSON_TOUR_FLAG } from "@/components/demo/GuestLessonTour";
import {
  getGuestCompletedIds,
  isGuestMode,
  setGuestMode,
  setGuestName,
} from "@/lib/guestProgress";
import { totalXpAcrossTracks } from "@/lib/tracks";

export default function DemoCompletePage() {
  const [xp, setXp] = React.useState(0);
  const [completed, setCompleted] = React.useState(0);
  const earned = completed > 0;

  React.useEffect(() => {
    if (!isGuestMode()) {
      setGuestMode(true);
      setGuestName("Guest");
    }
    const ids = getGuestCompletedIds();
    setCompleted(ids.length);
    setXp(totalXpAcrossTracks(ids));
  }, []);

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-[1100px] flex-col justify-center px-4 py-6 sm:py-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.06)] backdrop-blur-2xl sm:rounded-[30px]"
        >
          <div className="kanam-dashboard-hero px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
            <div className="kanam-dashboard-hero-overlay" />
            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/85">
                  Demo complete
                </p>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
                  You just used the real Kanam canvas
                </h1>
                <p className="mt-2 max-w-xl text-sm font-medium text-white/85 md:text-base">
                  Same flow students get in class — lesson, fill / reorder / debug, Run &amp; check,
                  XP, and a badge.
                </p>
              </div>
              <div className="kanam-hero-brand-tile grid h-14 w-14 place-items-center rounded-2xl">
                <Image src="/images/Logo.png" alt="Kanam Academy" width={36} height={36} />
              </div>
            </div>
            <div className="relative z-10 mt-6 flex flex-wrap items-end gap-3">
              <div className="kanam-dashboard-stat rounded-2xl px-4 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                  XP earned
                </p>
                <p className="mt-1 flex items-center gap-2 text-xl font-black text-white">
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  {xp}
                </p>
              </div>
              <div className="kanam-dashboard-stat rounded-2xl px-4 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                  Lessons done
                </p>
                <p className="mt-1 flex items-center gap-2 text-xl font-black text-white">
                  <Trophy className="h-4 w-4 text-[var(--accent)]" />
                  {completed}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
                className="ml-auto"
              >
                <PremiumBadge
                  lessonId="lesson-1"
                  name="The Awakener"
                  variant="seal"
                  unlocked={earned}
                />
              </motion.div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div className="space-y-4">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                What you proved
              </p>
              <ul className="space-y-3">
                {[
                  "You followed a coach note and started the activity.",
                  "You filled a blank, reordered lines, and fixed a bug.",
                  "You ran Python, read the console, and earned XP.",
                ].map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">{line}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-2xl px-6 font-extrabold sm:w-auto"
                >
                  <Link href="/welcome">
                    Create an account <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-2xl font-extrabold sm:w-auto"
                >
                  <Link
                    href="/learn/demo?view=lesson"
                    onClick={() => {
                      try {
                        window.localStorage.setItem(DEMO_LESSON_TOUR_FLAG, "1");
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    Replay guided lesson
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-sm font-extrabold text-slate-900">Next for schools & parents</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Students join with a class code. Instructors create classes, assign lessons, and
                track progress from the instructor dashboard.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 w-full rounded-xl font-extrabold sm:w-auto"
                >
                  <a href="https://kanamacademy.com" target="_blank" rel="noreferrer">
                    kanamacademy.com <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-full rounded-xl font-extrabold sm:w-auto"
                >
                  <Link href="/welcome">Back to Welcome</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </WelcomeBackground>
  );
}
