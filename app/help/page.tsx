"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";

export default function HelpPage() {
  const supportEmail = "support@kanamacademy.com";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-10">
      <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">Help</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Stuck? We’ve got you.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
          Use this page if you can’t log in, didn’t get an email, your class code isn’t working,
          or you need help with a family (parent) account.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Notice variant="info" title="Parents & family accounts">
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>
                  <strong>One parent login</strong> — kids are profiles under your account, not
                  separate emails. Create one at{" "}
                  <Link
                    className="font-semibold text-[var(--brand-2)] underline underline-offset-2"
                    href="/welcome/parent"
                  >
                    /welcome/parent
                  </Link>
                  .
                </li>
                <li>
                  <strong>Switch who is learning</strong> — open{" "}
                  <Link
                    className="font-semibold text-[var(--brand-2)] underline underline-offset-2"
                    href="/parent"
                  >
                    Parent hub
                  </Link>
                  , pick a child (enter their PIN if set), then go to lessons. The header shows
                  “Learning as …” when a child is active.
                </li>
                <li>
                  <strong>Forgot a kid PIN?</strong> Sign in as the parent → Parent hub → Reset PIN
                  for that child. PINs are not the same as your login password.
                </li>
                <li>
                  <strong>Progress is per child.</strong> Resetting progress on the dashboard only
                  affects the active kid profile.
                </li>
                <li>
                  <strong>Already have a student account?</strong> Open Parent hub → Convert to
                  family account to keep billing and turn your current profile into the first kid.
                </li>
              </ul>
            </Notice>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">
              I didn’t get the password reset email
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Double-check the email address for typos.</li>
              <li>Check Spam / Junk / Promotions.</li>
              <li>Wait 2–3 minutes and try again.</li>
              <li>If you’re on a school email, it may block external mail. Try a parent email.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-600">
              You can start from the Welcome screen:{" "}
              <Link className="font-semibold text-emerald-800 underline underline-offset-2" href="/welcome">
                /welcome
              </Link>
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">My class code is wrong</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Class codes are case-sensitive. Type it exactly as shown.</li>
              <li>Remove extra spaces at the start or end.</li>
              <li>Check your email for the newest class code message.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-600">
              Still stuck? Contact support below and include your class code + email.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">I can’t sign in</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Make sure you’re using the same email you signed up with.</li>
              <li>Try “Forgot password?” and set a new password.</li>
              <li>If you’re on a shared device, sign out of any other accounts first.</li>
            </ul>
          </section>

          <Notice variant="lock" title="Quick safety note">
            Never share your password in chat. If you need help, share only your email and class
            code.
          </Notice>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" className="h-11">
            <Link href="/welcome">
              Back to Welcome <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            className="h-11 bg-[rgb(var(--accent-rgb)/0.92)] text-slate-950 hover:bg-[rgb(var(--accent-rgb)/0.98)]"
          >
            <a href={`mailto:${supportEmail}?subject=${encodeURIComponent("Kanam Academy help")}`}>
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}

