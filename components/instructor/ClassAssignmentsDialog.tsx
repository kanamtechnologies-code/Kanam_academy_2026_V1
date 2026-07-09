"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TRACKS } from "@/lib/tracks";

type AssignmentLesson = {
  lessonId: string;
  trackId: string;
  trackTitle: string;
  title: string;
  week: number;
  session: number;
  enabled: boolean;
};

async function j<T>(res: Response): Promise<T> {
  const json = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || json?.ok === false) {
    throw new Error(json?.error || "Request failed.");
  }
  return json as unknown as T;
}

export function ClassAssignmentsDialog({
  classId,
  className,
  open,
  onOpenChange,
}: {
  classId: string;
  className: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({});

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/instructor/classes/${encodeURIComponent(classId)}/assignments`);
      const json = await j<{ ok: true; lessons: AssignmentLesson[] }>(res);
      const next: Record<string, boolean> = {};
      for (const lesson of json.lessons ?? []) {
        next[lesson.lessonId] = lesson.enabled;
      }
      setEnabled(next);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not load assignments.");
    } finally {
      setLoading(false);
    }
  }, [classId]);

  React.useEffect(() => {
    if (!open) return;
    load();
  }, [open, load]);

  const enabledCount = Object.values(enabled).filter(Boolean).length;

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const enabledLessonIds = Object.entries(enabled)
        .filter(([, on]) => on)
        .map(([id]) => id);
      const res = await fetch(`/api/instructor/classes/${encodeURIComponent(classId)}/assignments`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabledLessonIds }),
      });
      await j(res);
      onOpenChange(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not save assignments.");
    } finally {
      setSaving(false);
    }
  }

  function setTrack(trackId: string, on: boolean) {
    const track = TRACKS.find((t) => t.id === trackId);
    if (!track) return;
    setEnabled((prev) => {
      const next = { ...prev };
      for (const lesson of track.lessons) next[lesson.id] = on;
      return next;
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lesson assignments</DialogTitle>
          <DialogDescription>
            Turn lessons on for <span className="font-semibold text-slate-900">{className}</span>.
            Enrolled students only see lessons you enable (plus any they already finished).
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading lessons…
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-xs font-semibold text-slate-600">
              {enabledCount} lesson{enabledCount === 1 ? "" : "s"} enabled for this class
            </p>
            {TRACKS.map((track) => {
              const trackEnabledCount = track.lessons.filter((l) => enabled[l.id]).length;
              return (
                <div key={track.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {track.icon} {track.title}
                      </p>
                      <p className="text-xs text-slate-600">
                        {trackEnabledCount} of {track.lessons.length} on
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => setTrack(track.id, true)}
                      >
                        Enable all
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => setTrack(track.id, false)}
                      >
                        Disable all
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {track.lessons.map((lesson) => (
                      <label
                        key={lesson.id}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-white bg-white p-3"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-slate-300"
                          checked={Boolean(enabled[lesson.id])}
                          onChange={(e) =>
                            setEnabled((prev) => ({ ...prev, [lesson.id]: e.target.checked }))
                          }
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-slate-900">
                            {lesson.title}
                          </span>
                          <span className="text-xs text-slate-500">
                            Week {lesson.week} · Session {lesson.session}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" className="h-11" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="h-11" disabled={saving || loading} onClick={save}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save assignments"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
