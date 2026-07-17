"use client";

import * as React from "react";
import { Check, Clipboard, Loader2, Plus, Settings2, Trash2, Users } from "lucide-react";

import { ClassAssignmentsDialog } from "@/components/instructor/ClassAssignmentsDialog";

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
import { Notice } from "@/components/ui/notice";
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
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  totalXp: number;
  lastActiveAt: string | null;
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

function formatLastActive(iso: string | null) {
  if (!iso) return "No activity yet";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently active";
  }
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
  const [assignmentsClass, setAssignmentsClass] = React.useState<ClassSummary | null>(null);
  const [deleteClass, setDeleteClass] = React.useState<ClassSummary | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

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
      if (!supabase) {
        setWho(null);
        return;
      }
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

  async function confirmDeleteClass() {
    if (!deleteClass) return;
    setDeleteError(null);
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/instructor/classes/${encodeURIComponent(deleteClass.id)}`, {
        method: "DELETE",
      });
      await j(res);
      setRosterByClass((s) => {
        const next = { ...s };
        delete next[deleteClass.id];
        return next;
      });
      setDeleteClass(null);
      await load();
    } catch (e: unknown) {
      setDeleteError(errorMessage(e, "Could not delete class."));
    } finally {
      setDeleteLoading(false);
    }
  }

  const totalLearners = React.useMemo(
    () => classes.reduce((sum, c) => sum + (c.learnerCount || 0), 0),
    [classes]
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8 md:px-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
            Instructor view
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Your classes
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Create a class, share the code, and see learner rosters with lesson progress.
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
                <Notice compact variant="danger" role="alert">
                  {createError}
                </Notice>
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
        <div className="mt-6">
          <Notice variant="danger" role="alert">
            {error}
          </Notice>
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
                        className="h-11 min-w-11 shrink-0 rounded-xl"
                        onClick={() => copy(c.code)}
                      >
                        {copiedCode === c.code ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                        {copiedCode === c.code ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl sm:w-auto"
                        onClick={() => setAssignmentsClass(c)}
                      >
                        <Settings2 className="h-4 w-4" />
                        Assignments
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl sm:w-auto"
                        onClick={() => loadRoster(c.id)}
                        disabled={isLoadingRoster}
                      >
                        {isLoadingRoster ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        View roster
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-11 w-full rounded-xl sm:w-auto"
                        onClick={load}
                      >
                        Refresh
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 sm:w-auto"
                        onClick={() => {
                          setDeleteError(null);
                          setDeleteClass(c);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
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
                                className="flex flex-col gap-2 rounded-xl border border-white/60 bg-white p-3"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-extrabold text-slate-900">
                                      {s.displayName}
                                    </p>
                                    <p className="truncate text-xs text-slate-600">
                                      {s.schoolName ? s.schoolName : "School: (not set)"}
                                      {s.grade ? ` • Grade ${s.grade}` : ""}
                                    </p>
                                  </div>
                                  <div className="text-right text-xs font-bold text-slate-700">
                                    <p>{s.totalXp} XP</p>
                                    <p className="font-semibold text-slate-500">
                                      {formatLastActive(s.lastActiveAt)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
                                    <span>
                                      {s.completedLessons} of {s.totalLessons} lessons
                                    </span>
                                    <span>{s.progressPercent}%</span>
                                  </div>
                                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                                      style={{ width: `${Math.min(100, s.progressPercent)}%` }}
                                    />
                                  </div>
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
      {assignmentsClass ? (
        <ClassAssignmentsDialog
          classId={assignmentsClass.id}
          className={assignmentsClass.name}
          open={Boolean(assignmentsClass)}
          onOpenChange={(open) => {
            if (!open) setAssignmentsClass(null);
          }}
        />
      ) : null}

      <Dialog
        open={Boolean(deleteClass)}
        onOpenChange={(open) => {
          if (!open && !deleteLoading) {
            setDeleteClass(null);
            setDeleteError(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this class?</DialogTitle>
            <DialogDescription>
              {deleteClass
                ? `“${deleteClass.name}” and its enrollments/assignments will be removed. Learner accounts and their lesson progress stay intact.`
                : "This cannot be undone."}
            </DialogDescription>
          </DialogHeader>

          {deleteError ? (
            <Notice compact variant="danger" role="alert">
              {deleteError}
            </Notice>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              disabled={deleteLoading}
              onClick={() => {
                setDeleteClass(null);
                setDeleteError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-11 bg-red-600 text-white hover:bg-red-700"
              disabled={deleteLoading}
              onClick={confirmDeleteClass}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete class
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

