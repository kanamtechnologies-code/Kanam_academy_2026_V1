"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  ExternalLink,
  FileText,
  Loader2,
  Receipt,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { isParentRole } from "@/lib/roles";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

type BillingAccountResponse = {
  ok?: boolean;
  error?: string;
  account?: {
    email: string | null;
    stripeEmail: string | null;
    hasStripeCustomer: boolean;
    paymentMethod: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    } | null;
  };
  subscription?: {
    status: string;
    planName: string;
    cancelAtPeriodEnd: boolean;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    active: boolean;
  } | null;
  tracks?: Array<{ slug: string; name: string; unlockedAt: string | null }>;
  tutoring?: {
    sessionsRemaining: number;
    packs: Array<{
      sku: string;
      label: string;
      sessionsTotal: number;
      sessionsRemaining: number;
      purchasedAt: string | null;
    }>;
  };
  invoices?: Array<{
    id: string;
    number: string | null;
    status: string | null;
    createdAt: string;
    amountPaid: string;
    amountDue: string;
    description: string;
    hostedInvoiceUrl: string | null;
    invoicePdf: string | null;
    receiptUrl: string | null;
  }>;
  hasPaidAccess?: boolean;
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function AccountBillingPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<BillingAccountResponse | null>(null);
  const [backHref, setBackHref] = React.useState("/");

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.replace("/welcome?next=/account/billing");
        return;
      }
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        router.replace("/welcome?next=/account/billing");
        return;
      }
      setBackHref(isParentRole(auth.user) ? "/parent" : "/");

      const res = await fetch("/api/billing/account");
      const json = (await res.json()) as BillingAccountResponse;
      if (!res.ok || json.ok === false) {
        throw new Error(json.error || "Could not load billing.");
      }
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not load billing.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const openStripePortal = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ returnPath: "/account/billing" }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; url?: string };
      if (!res.ok || !json.ok || !json.url) {
        throw new Error(json.error || "Could not open payment settings.");
      }
      window.location.href = json.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not open payment settings.");
      setBusy(false);
    }
  };

  const sub = data?.subscription;
  const pm = data?.account?.paymentMethod;

  return (
    <div className="min-h-dvh bg-[radial-gradient(1000px_500px_at_10%_-10%,rgba(16,185,129,0.14),transparent),radial-gradient(800px_400px_at_90%_0%,rgba(245,158,11,0.1),transparent),linear-gradient(180deg,#f8fafc_0%,#ffffff_50%,#ecfdf5_100%)]">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/billing">
              <ShoppingBag className="h-4 w-4" />
              Browse plans
            </Link>
          </Button>
        </div>

        <header className="mb-6 space-y-2">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-800">
            Account
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Billing hub</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Your plan, unlocked tracks, payment method, and receipts — all in one place.
          </p>
        </header>

        {error ? (
          <div className="mb-4">
            <Notice variant="danger" role="alert">
              {error}
            </Notice>
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading billing…
          </div>
        ) : (
          <div className="space-y-4">
            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Account
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {data?.account?.email || "Signed-in user"}
                  </p>
                  {data?.account?.stripeEmail &&
                  data.account.stripeEmail !== data.account.email ? (
                    <p className="mt-1 text-xs text-slate-500">
                      Billing email: {data.account.stripeEmail}
                    </p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
                    data?.hasPaidAccess
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {data?.hasPaidAccess ? "Paid access" : "No purchases yet"}
                </span>
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-black text-slate-900">Current plan</h2>
              </div>
              {sub ? (
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="text-xl font-black text-slate-900">{sub.planName}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Status:{" "}
                        <span className="font-bold capitalize text-slate-900">{sub.status}</span>
                        {sub.cancelAtPeriodEnd ? " · Cancels at period end" : ""}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
                        sub.active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      )}
                    >
                      {sub.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <dl className="grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <dt className="text-xs font-semibold text-slate-500">Period start</dt>
                      <dd className="font-bold text-slate-900">
                        {formatDate(sub.currentPeriodStart)}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <dt className="text-xs font-semibold text-slate-500">Renews / ends</dt>
                      <dd className="font-bold text-slate-900">
                        {formatDate(sub.currentPeriodEnd)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  No family subscription on this account. You can still own individual tracks or
                  tutoring credits below.
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="rounded-xl">
                  <Link href="/billing?plan=subscription">
                    {sub?.active ? "Change / upgrade options" : "Get family subscription"}
                  </Link>
                </Button>
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
                <h2 className="text-base font-black text-slate-900">Unlocked tracks</h2>
                {(data?.tracks?.length ?? 0) === 0 ? (
                  <p className="mt-3 text-sm text-slate-600">No individual track purchases yet.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {data?.tracks?.map((t) => (
                      <li
                        key={t.slug}
                        className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm"
                      >
                        <span className="font-bold text-slate-900">{t.name}</span>
                        <span className="text-xs font-semibold text-slate-500">
                          {formatDate(t.unlockedAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <Link href="/billing?section=tracks">Buy a track</Link>
                </Button>
              </section>

              <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
                <h2 className="text-base font-black text-slate-900">Tutoring credits</h2>
                <p className="mt-2 text-2xl font-black text-emerald-800">
                  {data?.tutoring?.sessionsRemaining ?? 0}{" "}
                  <span className="text-sm font-bold text-slate-500">sessions left</span>
                </p>
                {(data?.tutoring?.packs?.length ?? 0) > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {data?.tutoring?.packs?.map((p, i) => (
                      <li
                        key={`${p.sku}-${i}`}
                        className="rounded-xl bg-slate-50 px-3 py-2 text-sm"
                      >
                        <p className="font-bold text-slate-900">{p.label}</p>
                        <p className="text-xs text-slate-500">
                          {p.sessionsRemaining}/{p.sessionsTotal} remaining ·{" "}
                          {formatDate(p.purchasedAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">No tutoring packs purchased.</p>
                )}
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <Link href="/billing?section=tutoring">Add tutoring</Link>
                </Button>
              </section>
            </div>

            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-700" />
                  <h2 className="text-base font-black text-slate-900">Payment method</h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={busy || !data?.account?.hasStripeCustomer}
                  onClick={() => void openStripePortal()}
                >
                  {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}
                  Update card / cancel
                </Button>
              </div>
              {pm ? (
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  <span className="capitalize">{pm.brand}</span> ending in {pm.last4} · Exp{" "}
                  {String(pm.expMonth).padStart(2, "0")}/{pm.expYear}
                </p>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  {data?.account?.hasStripeCustomer
                    ? "No card on file yet, or update it securely in Stripe."
                    : "Payment details appear after your first checkout."}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Card changes and cancellations stay in Stripe’s secure portal — we never store full
                card numbers in Kanam.
              </p>
            </section>

            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <Receipt className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-black text-slate-900">Receipts & invoices</h2>
              </div>
              {(data?.invoices?.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-600">
                  No invoices yet. After a purchase, receipts show up here automatically.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="pb-2 pr-3">Date</th>
                        <th className="pb-2 pr-3">Description</th>
                        <th className="pb-2 pr-3">Amount</th>
                        <th className="pb-2 pr-3">Status</th>
                        <th className="pb-2">Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.invoices?.map((inv) => (
                        <tr key={inv.id} className="border-t border-slate-100">
                          <td className="py-3 pr-3 text-slate-600">{formatDate(inv.createdAt)}</td>
                          <td className="py-3 pr-3">
                            <p className="font-semibold text-slate-900">{inv.description}</p>
                            {inv.number ? (
                              <p className="text-xs text-slate-500">#{inv.number}</p>
                            ) : null}
                          </td>
                          <td className="py-3 pr-3 font-bold text-slate-900">{inv.amountPaid}</td>
                          <td className="py-3 pr-3 capitalize text-slate-600">
                            {inv.status || "—"}
                          </td>
                          <td className="py-3">
                            <div className="flex flex-wrap gap-2">
                              {inv.hostedInvoiceUrl ? (
                                <a
                                  href={inv.hostedInvoiceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 underline-offset-2 hover:underline"
                                >
                                  <FileText className="h-3 w-3" />
                                  Invoice
                                </a>
                              ) : null}
                              {inv.invoicePdf ? (
                                <a
                                  href={inv.invoicePdf}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 underline-offset-2 hover:underline"
                                >
                                  PDF
                                </a>
                              ) : null}
                              {inv.receiptUrl ? (
                                <a
                                  href={inv.receiptUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 underline-offset-2 hover:underline"
                                >
                                  Receipt
                                </a>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
