"use client";

import * as React from "react";
import { Check, Clipboard, Loader2, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { readUserRole } from "@/lib/roles";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type ClassSummary = {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  schoolName: string | null;
  learnerCount: number;
};

type LearnerRow = {
  id: string;
  displayName: string;
  grade: string | null;
  schoolName: string | null;
};

async function j<T>(res: Response): Promise<T> {
  const json = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || json?.ok === false) {
    throw new Error(json?.error || "Request failed.");
  }
  return json as unknown as T;
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function InstructorDashboardClient() {
  const [loading, setLoading] = React.useState(true);
  const [classes, setClasses] = React.useState<ClassSummary[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [who, setWho] = React.useState<{ email: string | null; role: string | null } | null>(null);

  const [createOpen, setCreateOpen] = React.useState(false);
  const [createName, setCreateName] = React.useState("");
  const [createSchool, setCreateSchool] = React.useState("");
  const [createLoading, setCreateLoading] = React.useState(false);
  const [createError, setCreateError] = React.useState<string | null>(null);

  const [rosterByClass, setRosterByClass] = React.useState<Record<string, LearnerRow[] | undefined>>({});
  const [rosterLoading, setRosterLoading] = React.useState<Record<string, boolean | undefined>>({});
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/instructor/classes", { method: "GET" });
      const json = await j<{ ok: true; classes: ClassSummary[] }>(res);
      setClasses(json.classes ?? []);
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not load classes."));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    try {
      const supabase = createSupabaseBrowserClient();
      supabase.auth
        .getUser()
        .then(({ data }) => {
          const user = data.user;
          setWho({ email: user?.email ?? null, role: readUserRole(user) });
        })
        .catch(() => {
          setWho(null);
        });
    } catch {
      setWho(null);
    }
  }, []);

  async function createClass() {
    setCreateError(null);
    const name = createName.trim();
    const schoolName = createSchool.trim();
    if (!name) {
      setCreateError("Enter a class name.");
      return;
    }

    setCreateLoading(true);
    try {
      const res = await fetch("/api/instructor/classes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, schoolName }),
      });
      await j(res);
      setCreateOpen(false);
      setCreateName("");
      setCreateSchool("");
      await load();
    } catch (e: unknown) {
      setCreateError(errorMessage(e, "Could not create class."));
    } finally {
      setCreateLoading(false);
    }
  }

  async function loadRoster(classId: string) {
    setRosterLoading((s) => ({ ...s, [classId]: true }));
    try {
      const res = await fetch(`/api/instructor/classes/${encodeURIComponent(classId)}/roster`, {
        method: "GET",
      });
      const json = await j<{ ok: true; learners: LearnerRow[] }>(res);
      setRosterByClass((s) => ({ ...s, [classId]: json.learners ?? [] }));
    } catch {
      setRosterByClass((s) => ({ ...s, [classId]: [] }));
    } finally {
      setRosterLoading((s) => ({ ...s, [classId]: false }));
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      window.setTimeout(() => setCopiedCode((c) => (c === text ? null : c)), 1100);
    } catch {
      // ignore
    }
  }

  const totalLearners = React.useMemo(
    () => classes.reduce((sum, c) => sum + (c.learnerCount || 0), 0),
    [classes]
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
            Instructor view
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Your classes
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Create a class, share the code, and track who’s enrolled.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {who?.email ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              Signed in as <span className="font-extrabold text-slate-900">{who.email}</span>
              {who.role ? (
                <>
                  {" "}
                  • role{" "}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono font-bold">
                    {who.role}
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-700" />
              {classes.length} classes • {totalLearners} learners
            </span>
          </div>

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 rounded-2xl px-5 font-extrabold">
                <Plus className="h-4 w-4" />
                Create class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create a class</DialogTitle>
                <DialogDescription>
                  You’ll get a class code to share with learners.
                </DialogDescription>
              </DialogHeader>

              {createError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {createError}
                </div>
              ) : null}

              <div className="grid gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-slate-700">Class name</p>
                  <Input
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="e.g. Week 1 — Period 3"
                    className="h-12"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-slate-700">School (optional)</p>
                  <Input
                    value={createSchool}
                    onChange={(e) => setCreateSchool(e.target.value)}
                    placeholder="e.g. Lincoln Middle School"
                    className="h-12"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" className="h-11" onClick={() => setCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" className="h-11" disabled={createLoading} onClick={createClass}>
                  {createLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 w-40 rounded bg-slate-200" />
                <div className="h-3 w-56 rounded bg-slate-100" />
              </CardHeader>
              <CardContent>
                <div className="h-10 w-full rounded bg-slate-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : classes.length === 0 ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>No classes yet</CardTitle>
            <CardDescription>
              Create your first class to generate a code for learners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setCreateOpen(true)} className="h-11 rounded-2xl px-5 font-extrabold">
              <Plus className="h-4 w-4" />
              Create class
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {classes.map((c) => {
            const roster = rosterByClass[c.id];
            const isLoadingRoster = !!rosterLoading[c.id];
            return (
              <Card key={c.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 via-white to-amber-50">
                  <CardTitle className="text-xl">{c.name}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{c.schoolName ? c.schoolName : "School: (not set)"}</span>
                    <span className="text-slate-400">•</span>
                    <span>{c.learnerCount} learners</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">
                          Class code
                        </p>
                        <p className="mt-1 truncate font-mono text-base font-black text-slate-900">
                          {c.code}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 rounded-xl"
                        onClick={() => copy(c.code)}
                      >
                        {copiedCode === c.code ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                        {copiedCode === c.code ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 rounded-xl"
                        onClick={() => loadRoster(c.id)}
                        disabled={isLoadingRoster}
                      >
                        {isLoadingRoster ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        View roster
                      </Button>
                      <Button type="button" variant="ghost" className="h-10 rounded-xl" onClick={load}>
                        Refresh
                      </Button>
                    </div>

                    {roster ? (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        {roster.length === 0 ? (
                          <p className="text-sm text-slate-700">
                            No learners yet. Share the code <span className="font-semibold">{c.code}</span>.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {roster.map((s) => (
                              <div
                                key={s.id}
                                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/60 bg-white p-3"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-extrabold text-slate-900">
                                    {s.displayName}
                                  </p>
                                  <p className="truncate text-xs text-slate-600">
                                    {s.schoolName ? s.schoolName : "School: (not set)"}
                                  </p>
                                </div>
                                <div className="text-xs font-bold text-slate-700">
                                  {s.grade ? `Grade ${s.grade}` : "Grade: —"}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

