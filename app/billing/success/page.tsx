"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isParentRole } from "@/lib/roles";

export default function BillingSuccessPage() {
  const [parent, setParent] = React.useState(false);

  React.useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      setParent(isParentRole(data.user));
    });
  }, []);

  return (
    <main className="relative mx-auto flex min-h-[75vh] w-full max-w-3xl flex-col justify-center px-4 py-14 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] border border-[rgb(var(--accent-rgb)/0.25)] bg-[rgb(var(--brand-deep-rgb)/0.7)] shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="relative h-40 sm:h-52">
          <Image
            src="/images/billing/billing-hero-premium.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f24] via-[#0b2f24]/40 to-transparent" />
        </div>
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Payment received
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-[#f7f3e8] sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), Fraunces, Georgia, serif" }}
          >
            You’re all set.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#c5d2cb] sm:text-base">
            {parent
              ? "Your Family plan unlocks learning for every kid profile under your parent login. Pick a child in the parent hub, then open lessons — access updates within a few seconds after Stripe confirms."
              : "Thanks for investing in learning. Access updates within a few seconds after Stripe confirms. Want siblings on one login? Convert to a family account anytime from the dashboard."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/billing"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#14201c] transition hover:brightness-105"
            >
              View billing
            </Link>
            <Link
              href={parent ? "/parent" : "/dashboard"}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--accent-rgb)/0.4)] bg-white/5 px-6 text-sm font-semibold text-[#f3efe4] transition hover:bg-white/10"
            >
              {parent ? "Open parent hub" : "Go to lessons"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
