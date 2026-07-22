"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type CheckoutKind = "subscription" | "track" | "tutoring";

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const started = React.useRef(false);

  const kind = (searchParams.get("kind") || searchParams.get("plan") || "").trim() as
    | CheckoutKind
    | "";
  const trackSlug = (
    searchParams.get("trackSlug") ||
    searchParams.get("track") ||
    ""
  ).trim();
  const tutoringSku = (
    searchParams.get("tutoringSku") ||
    searchParams.get("tutoring") ||
    ""
  ).trim();

  const checkoutPath = React.useMemo(() => {
    const params = new URLSearchParams();
    if (kind) params.set("kind", kind);
    if (trackSlug) params.set("trackSlug", trackSlug);
    if (tutoringSku) params.set("tutoringSku", tutoringSku);
    const qs = params.toString();
    return qs ? `/checkout?${qs}` : "/checkout";
  }, [kind, trackSlug, tutoringSku]);

  React.useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      if (!kind || !["subscription", "track", "tutoring"].includes(kind)) {
        setError("Missing or invalid plan. Pick a plan on the pricing page.");
        return;
      }
      if (kind === "track" && !trackSlug) {
        setError("Missing track. Pick a track on the pricing page.");
        return;
      }
      if (kind === "tutoring" && !tutoringSku) {
        setError("Missing tutoring option. Pick one on the pricing page.");
        return;
      }

      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setError("Checkout is unavailable right now. Please try again later.");
        return;
      }

      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace(`/welcome?next=${encodeURIComponent(checkoutPath)}`);
        return;
      }

      try {
        const body: Record<string, string> = { kind };
        if (kind === "track") body.trackSlug = trackSlug;
        if (kind === "tutoring") body.tutoringSku = tutoringSku;

        const res = await fetch("/api/billing/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          url?: string;
        };

        if (!res.ok || !json.ok || !json.url) {
          if (res.status === 401) {
            router.replace(`/welcome?next=${encodeURIComponent(checkoutPath)}`);
            return;
          }
          setError(json.error || "Could not start checkout.");
          return;
        }

        window.location.href = json.url;
      } catch {
        setError("Could not start checkout. Please try again.");
      }
    })();
  }, [checkoutPath, kind, router, trackSlug, tutoringSku]);

  if (error) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-4 py-16 text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
          Checkout
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-[#14201c]">
          Almost there
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5b6b64]">{error}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.kanamacademy.com/pricing"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-2)] px-6 text-sm font-semibold text-white"
          >
            Back to pricing
          </a>
          <Link
            href={`/welcome?next=${encodeURIComponent(checkoutPath)}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--brand-2-rgb)/0.35)] px-6 text-sm font-semibold text-[var(--brand-2)]"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-2)]">
        Secure checkout
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-[#14201c]">
        Taking you to Stripe…
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#5b6b64]">
        If you need an account first, we’ll ask you to sign in — then continue to payment.
      </p>
      <div
        className="mt-8 h-10 w-10 animate-spin rounded-full border-2 border-[rgb(var(--brand-2-rgb)/0.25)] border-t-[var(--brand-2)]"
        aria-hidden
      />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center justify-center px-4 text-sm text-[#5b6b64]">
          Preparing checkout…
        </main>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
