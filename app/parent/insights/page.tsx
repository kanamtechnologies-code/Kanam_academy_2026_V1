"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { ParentInsightsReport } from "@/components/insights/ParentInsightsReport";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import type { LearnerInsights } from "@/lib/insights/types";
import { isParentRole } from "@/lib/roles";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

export default function ParentInsightsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-700">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ParentInsightsClient />
    </React.Suspense>
  );
}

type Kid = {
  id: string;
  display_name: string;
};

function ParentInsightsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("student");

  const [kids, setKids] = React.useState<Kid[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(studentId);
  const [insights, setInsights] = React.useState<LearnerInsights | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.replace("/welcome");
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (!data.user || !isParentRole(data.user)) {
        router.replace("/parent");
        return;
      }
      try {
        const res = await fetch("/api/parent/kids");
        const json = (await res.json()) as {
          ok?: boolean;
          error?: string;
          kids?: Kid[];
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error || "Could not load kids.");
        }
        if (cancelled) return;
        const list = json.kids ?? [];
        setKids(list);
        const initial =
          (studentId && list.find((k) => k.id === studentId)?.id) || list[0]?.id || null;
        setSelectedId(initial);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load kids.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, studentId]);

  React.useEffect(() => {
    if (!selectedId) {
      setLoading(false);
      setInsights(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/parent/kids/${selectedId}/insights`);
        const json = (await res.json()) as {
          ok?: boolean;
          error?: string;
          insights?: LearnerInsights;
        };
        if (!res.ok || json.ok === false || !json.insights) {
          throw new Error(json.error || "Could not load insights.");
        }
        if (!cancelled) setInsights(json.insights);
      } catch (e: unknown) {
        if (!cancelled) {
          setInsights(null);
          setError(e instanceof Error ? e.message : "Could not load insights.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const selectKid = (id: string) => {
    setSelectedId(id);
    router.replace(`/parent/insights?student=${id}`);
  };

  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(16,185,129,0.16),transparent),radial-gradient(900px_500px_at_90%_0%,rgba(245,158,11,0.12),transparent),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#ecfdf5_100%)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" className="w-fit rounded-xl">
            <Link href="/parent">
              <ArrowLeft className="h-4 w-4" />
              Back to parent hub
            </Link>
          </Button>

          {kids.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {kids.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => selectKid(k.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-bold transition",
                    selectedId === k.id
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "border border-slate-200 bg-white/90 text-slate-700 hover:border-emerald-300 hover:text-emerald-900"
                  )}
                >
                  {k.display_name}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {error ? (
          <Notice variant="danger" role="alert">
            {error}
          </Notice>
        ) : null}

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-600">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-700" />
            <p className="text-sm font-semibold">Building your child’s learning report…</p>
          </div>
        ) : insights ? (
          <ParentInsightsReport
            insights={insights}
            csvHref={`/api/parent/kids/${encodeURIComponent(insights.studentId)}/insights/csv`}
          />
        ) : !error ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
            Add a child in the parent hub to view learning metrics.
          </p>
        ) : null}
      </div>
    </div>
  );
}
