"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Hash,
  KeyRound,
  LifeBuoy,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";

const SUPPORT_EMAIL = "info@kanamacademy.com";

const cardEnter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 280, damping: 24, delay },
});

const glass =
  "rounded-[28px] border border-white/60 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

type Topic = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string[];
  tip?: ReactNode;
};

const topics: Topic[] = [
  {
    icon: KeyRound,
    title: "I can’t sign in",
    body: [
      "Use the same email you signed up with (student or parent).",
      "Try Forgot password on the Welcome screen and set a new one.",
      "On a shared device, sign out of other Kanam accounts first.",
      "New accounts need an email confirmation link before the first sign-in.",
    ],
    tip: (
      <>
        Start here:{" "}
        <Link
          className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
          href="/welcome"
        >
          Welcome / Sign in
        </Link>
      </>
    ),
  },
  {
    icon: Mail,
    title: "I didn’t get an email",
    body: [
      "Double-check the address for typos.",
      "Look in Spam, Junk, and Promotions.",
      "Wait a couple of minutes, then resend or try again.",
      "School emails sometimes block outside messages — a personal or parent email often works better.",
    ],
  },
  {
    icon: Hash,
    title: "My teacher class code isn’t working",
    body: [
      "Type the code exactly as your teacher shared it (watch for spaces).",
      "Ask your teacher for the newest code if your class just started.",
      "Learning on your own? You don’t need a teacher code — choose “I’m learning on my own” on Welcome.",
    ],
    tip: (
      <>
        Solo path:{" "}
        <Link
          className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
          href="/welcome"
        >
          Create a student account
        </Link>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "I’m not sure where to start",
    body: [
      "Students: Welcome → I’m a new student (or Sign in if you already have an account).",
      "Parents: create a family account, then add a kid profile.",
      "Under 13: a parent or guardian must set up the family account for you.",
      "Just browsing? Try the guided lesson from Welcome — no account needed.",
    ],
  },
];

export default function HelpPage() {
  return (
    <WelcomeBackground>
      <main className="mx-auto w-full max-w-5xl px-1 py-4 sm:px-2 sm:py-6">
        <motion.div {...cardEnter(0)} className={`${glass} p-6 sm:p-8 md:p-10`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
                Help center
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
                You’re not alone — we’ll get you unstuck.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Whether you’re a student, a parent, or an educator, this page is here to walk you
                through the common snags. Take a breath, pick what matches, and we’ll point you to
                the next step.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
              <Button
                asChild
                className={[
                  "h-12 rounded-xl px-5 font-semibold",
                  "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
                  "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.06]",
                ].join(" ")}
              >
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Kanam Academy help")}`}
                >
                  <LifeBuoy className="h-4 w-4" />
                  Email us
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-xl px-5 font-semibold">
                <Link href="/welcome">
                  Back to Welcome
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { href: "/welcome", label: "Sign in" },
              { href: "/welcome", label: "New student" },
              { href: "/welcome/parent", label: "Family account" },
              { href: "/welcome/ask-parent", label: "Under 13?" },
              { href: "/demo", label: "Try a demo lesson" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "inline-flex h-10 items-center rounded-full px-4 text-xs font-extrabold tracking-tight",
                  "border border-[rgb(var(--brand-2-rgb)/0.35)] bg-[rgb(var(--brand-rgb)/0.08)]",
                  "text-[color:var(--brand-2)] transition-all hover:border-[color:var(--brand)]",
                  "hover:bg-[rgb(var(--brand-rgb)/0.14)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {topics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <motion.section
                key={topic.title}
                {...cardEnter(0.05 + i * 0.04)}
                className={`${glass} p-5 sm:p-6`}
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)] text-[var(--accent)] shadow-md shadow-emerald-900/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-50">
                      {topic.title}
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {topic.body.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]"
                            aria-hidden
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {topic.tip ? (
                      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {topic.tip}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        <motion.section {...cardEnter(0.22)} className={`${glass} mt-4 p-5 sm:p-6 md:p-8`}>
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)] text-[var(--accent)] shadow-md shadow-emerald-900/20">
              <Users className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                Parents & family accounts
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                You’re the home base. Kids learn under your login — no separate child emails —
                and you stay in control of progress, PINs, and billing.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "One parent login",
                text: (
                  <>
                    Create a family account at{" "}
                    <Link
                      className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
                      href="/welcome/parent"
                    >
                      Family signup
                    </Link>
                    , then add kid profiles.
                  </>
                ),
              },
              {
                title: "Switch who is learning",
                text: (
                  <>
                    Open the{" "}
                    <Link
                      className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
                      href="/parent"
                    >
                      Parent hub
                    </Link>
                    , pick a child (enter their PIN if set), then go to lessons.
                  </>
                ),
              },
              {
                title: "Forgot a kid PIN?",
                text: "Sign in as the parent → Parent hub → Reset PIN. PINs are not your login password.",
              },
              {
                title: "Progress is per child",
                text: "Resetting progress on the dashboard only affects the active kid profile.",
              },
              {
                title: "Already have a student account?",
                text: "Parent hub → Convert to family account keeps billing and turns your profile into the first kid.",
              },
              {
                title: "Under 13 & consent",
                text: "Under-13 learners need a parent/guardian account with signed consent. Without consent, kid learning stays locked.",
              },
              {
                title: "Export or delete",
                text: (
                  <>
                    In Parent hub, use Export or Delete on a kid card. To erase the whole family
                    login, use Delete family account — or email{" "}
                    <a
                      className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
                      href={`mailto:${SUPPORT_EMAIL}`}
                    >
                      {SUPPORT_EMAIL}
                    </a>
                    .
                  </>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[rgb(var(--brand-2-rgb)/0.2)] bg-[rgb(var(--brand-rgb)/0.06)] p-4"
              >
                <p className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div {...cardEnter(0.28)} className="mt-4">
          <Notice variant="lock" title="A quick safety note">
            Never share your password in chat or email. If you reach out for help, send only your
            email (and class code if you have one). We’ll take it from there.
          </Notice>
        </motion.div>

        <motion.div
          {...cardEnter(0.32)}
          className={`${glass} mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7`}
        >
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[rgb(var(--accent-rgb)/0.95)] text-slate-950 shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-black tracking-tight text-slate-900 dark:text-slate-50">
                Still stuck? We’ve got your back.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Email{" "}
                <a
                  className="font-semibold text-[color:var(--brand-2)] underline underline-offset-2"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                and tell us what you were trying to do. We’ll reply as soon as we can.
              </p>
            </div>
          </div>
          <Button
            asChild
            className={[
              "h-12 shrink-0 rounded-xl px-6 font-semibold",
              "bg-gradient-to-r from-[var(--brand-2)] via-[var(--brand)] to-[var(--brand-2)]",
              "text-[var(--accent)] shadow-lg shadow-emerald-900/20 hover:brightness-[1.06]",
            ].join(" ")}
          >
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Kanam Academy help")}`}
            >
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </Button>
        </motion.div>
      </main>
    </WelcomeBackground>
  );
}
