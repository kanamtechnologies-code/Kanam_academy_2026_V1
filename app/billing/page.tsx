"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type BillingStatus = {
  ok?: boolean;
  error?: string;
  hasActiveSubscription?: boolean;
  subscription?: {
    status?: string;
    current_period_end?: string | null;
    cancel_at_period_end?: boolean;
  } | null;
  tracks?: Array<{ track_slug: string }>;
  tutoringSessionsRemaining?: number;
};

async function postJson(url: string, body?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    url?: string;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

export default function BillingPage() {
  const [status, setStatus] = React.useState<BillingStatus | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/billing/status");
        const data = (await res.json()) as BillingStatus;
        if (!cancelled) {
          if (!res.ok || !data.ok) setError(data.error || "Could not load billing.");
          else setStatus(data);
        }
      } catch {
        if (!cancelled) setError("Could not load billing.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startCheckout(body: Record<string, string>) {
    setBusy(JSON.stringify(body));
    setError(null);
    try {
      const data = await postJson("/api/billing/checkout", body);
      if (data.url) window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(null);
    }
  }

  async function openPortal() {
    setBusy("portal");
    setError(null);
    try {
      const data = await postJson("/api/billing/portal");
      if (data.url) window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Portal failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
        Billing
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        Kanam Academy plans
      </h1>
      <p className="mt-2 text-zinc-600">
        Subscribe for all tracks, buy one track, or add live tutoring. Sign in required.
      </p>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-950">Your access</h2>
        {!status ? (
          <p className="mt-2 text-sm text-zinc-500">Loading…</p>
        ) : (
          <ul className="mt-3 space-y-1 text-sm text-zinc-700">
            <li>
              Subscription:{" "}
              <strong>
                {status.hasActiveSubscription
                  ? `active (${status.subscription?.status})`
                  : "none"}
              </strong>
            </li>
            <li>
              Track unlocks:{" "}
              <strong>
                {(status.tracks ?? []).map((t) => t.track_slug).join(", ") || "none"}
              </strong>
            </li>
            <li>
              Tutoring sessions remaining:{" "}
              <strong>{status.tutoringSessionsRemaining ?? 0}</strong>
            </li>
          </ul>
        )}
        <div className="mt-4">
          <Button onClick={openPortal} disabled={busy === "portal"} variant="secondary">
            {busy === "portal" ? "Opening…" : "Manage billing"}
          </Button>
        </div>
      </section>

      <section className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Family subscription — $30/mo</h2>
          <p className="mt-1 text-sm text-zinc-600">All tracks while active.</p>
          <Button
            className="mt-3"
            disabled={Boolean(busy) || status?.hasActiveSubscription}
            onClick={() => startCheckout({ kind: "subscription" })}
          >
            {busy?.includes("subscription") ? "Redirecting…" : "Subscribe"}
          </Button>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Buy a track</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["financial-literacy", "Financial Literacy"],
              ["digital-literacy", "Digital Literacy"],
              ["ai-literacy", "AI Literacy"],
              ["ai-python", "Python & AI"],
              ["cybersecurity", "Cybersecurity"],
              ["data-analyst", "Data Analyst"],
            ].map(([slug, label]) => (
              <Button
                key={slug}
                variant="secondary"
                disabled={Boolean(busy)}
                onClick={() => startCheckout({ kind: "track", trackSlug: slug })}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Live tutoring</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["trial", "Trial $49"],
              ["session", "1 session $90"],
              ["bundle4", "4-pack $325"],
              ["bundle8", "8-pack $650"],
              ["bundle16", "16-pack $1,250"],
            ].map(([sku, label]) => (
              <Button
                key={sku}
                variant="secondary"
                disabled={Boolean(busy)}
                onClick={() => startCheckout({ kind: "tutoring", tutoringSku: sku })}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <p className="mt-8 text-sm text-zinc-500">
        <Link href="/welcome" className="font-semibold text-emerald-800 underline-offset-4 hover:underline">
          Back to welcome
        </Link>
      </p>
    </main>
  );
}
