"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setGuestMode, setGuestName, resetGuestProgress } from "@/lib/guestProgress";
import { TRACKS, totalXpAcrossTracks } from "@/lib/tracks";

const DEMO_TOUR_FLAG = "kanam.demo.tourPending";

export default function DemoEntryPage() {
  const router = useRouter();
  const [starting, setStarting] = React.useState<"tour" | "lesson" | "explore" | null>(null);

  const startGuest = React.useCallback(
    (destination: "/dashboard" | "/learn/demo", withTour: boolean) => {
      setStarting(destination === "/learn/demo" ? "lesson" : withTour ? "tour" : "explore");
      setGuestMode(true);
      setGuestName("Guest");
      if (withTour) {
        try {
          window.localStorage.setItem(DEMO_TOUR_FLAG, "1");
        } catch {
          // ignore
        }
      }
      router.push(destination);
    },
    [router]
  );

  const trackCount = TRACKS.length;
  const lessonCount = TRACKS.reduce((n, t) => n + t.lessons.length, 0);

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
              Try Kanam Academy
              <span className="block text-[color:var(--brand)]">the way students do</span>
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
              Explore the real learning hub, open a live lesson canvas, run Python, and earn XP —
              all on this device. No account required.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-900">
                {trackCount} tracks
              </Badge>
              <Badge className="border border-amber-200 bg-amber-50 text-amber-950">
                {lessonCount}+ lessons
              </Badge>
              <Badge variant="outline" className="border-slate-300 bg-white/80">
                Progress saves locally
              </Badge>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                disabled={starting !== null}
                className={[
                  "h-14 w-full rounded-2xl px-7 text-base font-extrabold sm:w-auto",
                  "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                  "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.05]",
                ].join(" ")}
                onClick={() => startGuest("/dashboard", true)}
              >
                {starting === "tour" ? (
                  "Opening…"
                ) : (
                  <>
                    Guided tour <Play className="h-5 w-5" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={starting !== null}
                className="h-14 w-full rounded-2xl border-2 border-[var(--brand)]/40 bg-white/90 px-7 text-base font-extrabold text-[var(--brand-2)] hover:bg-emerald-50 sm:w-auto"
                onClick={() => startGuest("/learn/demo", false)}
              >
                {starting === "lesson" ? (
                  "Opening…"
                ) : (
                  <>
                    Jump into a lesson <Zap className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>

            <p className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:block">
              <span className="sm:inline">Prefer to browse freely? </span>
              <button
                type="button"
                className="inline-flex min-h-11 items-center font-extrabold text-emerald-800 underline underline-offset-2 hover:text-emerald-950 sm:min-h-0 sm:inline"
                disabled={starting !== null}
                onClick={() => startGuest("/dashboard", false)}
              >
                Explore the full app
              </button>
              <span className="hidden sm:inline">{" · "}</span>
              <Link
                href="/welcome"
                className="inline-flex min-h-11 items-center font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900 sm:min-h-0 sm:inline"
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
                      Learning hub preview
                    </p>
                    <p className="text-lg font-black text-white">Welcome back, Guest!</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "XP", value: String(totalXpAcrossTracks([])), icon: Sparkles },
                    { label: "Tracks", value: String(trackCount), icon: BookOpen },
                    { label: "Next", value: "Lesson 1", icon: Flame },
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
                What you&apos;ll see
              </p>
              <ul className="mt-3 space-y-3">
                {[
                  {
                    icon: Trophy,
                    title: "Real dashboard",
                    body: "Four tracks, XP, badges, and an 8-week roadmap.",
                  },
                  {
                    icon: BookOpen,
                    title: "Lesson → Activity",
                    body: "Read the coach note, then run code with live feedback.",
                  },
                  {
                    icon: ArrowRight,
                    title: "Keep exploring",
                    body: "Finish the quickstart, then open any track you want.",
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
