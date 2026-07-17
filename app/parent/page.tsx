"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Loader2, Plus, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isParentRole } from "@/lib/roles";

export default function ParentHubPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-700">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ParentHubClient />
    </React.Suspense>
  );
}

type Kid = {
  id: string;
  display_name: string;
  first_name: string | null;
  last_name: string | null;
  grade: string | null;
  has_pin: boolean;
};

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function ParentHubClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pickChild = searchParams.get("pick") === "1";
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<"hub" | "convert">("hub");
  const [householdName, setHouseholdName] = React.useState("My family");
  const [kids, setKids] = React.useState<Kid[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [converting, setConverting] = React.useState(false);

  const [addOpen, setAddOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const [pinKidId, setPinKidId] = React.useState<string | null>(null);
  const [pinValue, setPinValue] = React.useState("");
  const [switchKidId, setSwitchKidId] = React.useState<string | null>(null);
  const [switchPin, setSwitchPin] = React.useState("");

  const load = React.useCallback(async () => {
    setError(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.replace("/welcome");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.replace("/welcome");
      return;
    }
    if (!isParentRole(data.user)) {
      setMode("convert");
      setLoading(false);
      return;
    }

    setMode("hub");
    const res = await fetch("/api/parent/kids");
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      household?: { name?: string; active_student_id?: string | null };
      kids?: Kid[];
    };
    if (!res.ok || !json.ok) {
      setError(json.error || "Could not load household.");
      setLoading(false);
      return;
    }
    setHouseholdName(String(json.household?.name ?? "My family"));
    setActiveId(json.household?.active_student_id ? String(json.household.active_student_id) : null);
    setKids(json.kids ?? []);
    setLoading(false);
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const addChild = async () => {
    setError(null);
    setMsg(null);
    if (!firstName.trim()) {
      setError("Enter the child’s first name.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/parent/kids", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim() || undefined,
          grade: grade.trim() || undefined,
          pin: pin.trim() || undefined,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; kids?: Kid[] };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not add child.");
      setKids(json.kids ?? []);
      setFirstName("");
      setLastName("");
      setGrade("");
      setPin("");
      setAddOpen(false);
      setMsg("Child added.");
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not add child."));
    } finally {
      setSaving(false);
    }
  };

  const savePin = async (studentId: string) => {
    setError(null);
    setMsg(null);
    if (!/^\d{4,6}$/.test(pinValue.trim())) {
      setError("PIN must be 4–6 digits.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/parent/kids/${studentId}/pin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pin: pinValue.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not save PIN.");
      setPinKidId(null);
      setPinValue("");
      setMsg("PIN updated.");
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not save PIN."));
    } finally {
      setSaving(false);
    }
  };

  const openLearning = async (kid: Kid) => {
    setError(null);
    setMsg(null);
    const needsPin = kid.has_pin && kid.id !== activeId;
    if (needsPin && switchKidId !== kid.id) {
      setSwitchKidId(kid.id);
      setSwitchPin("");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/parent/switch-child", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          studentId: kid.id,
          pin: needsPin || switchKidId === kid.id ? switchPin : undefined,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not switch child.");

      const supabase = createSupabaseBrowserClient();
      if (supabase) await supabase.auth.refreshSession();

      setSwitchKidId(null);
      setSwitchPin("");
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not open learning."));
    } finally {
      setSaving(false);
    }
  };

  const convertToFamily = async () => {
    setError(null);
    setConverting(true);
    try {
      const res = await fetch("/api/auth/convert-to-parent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ householdName: householdName.trim() || undefined }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not convert account.");
      const supabase = createSupabaseBrowserClient();
      if (supabase) await supabase.auth.refreshSession();
      setMsg("Family account ready. You can add more kids below.");
      setMode("hub");
      setLoading(true);
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not convert account."));
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-slate-700">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (mode === "convert") {
    return (
      <div className="kanam-dashboard-shell min-h-dvh px-3 py-6 text-slate-900 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-lg rounded-[22px] border border-white/40 bg-white/85 p-6 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Upgrade
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight">Convert to family account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Keep your progress and billing. We&apos;ll turn your current learner profile into the
            first kid under a parent login so you can add siblings.
          </p>
          {error ? (
            <div className="mt-4">
              <Notice variant="danger" role="alert" title="Something went wrong">
                {error}
              </Notice>
            </div>
          ) : null}
          <div className="mt-4 space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Family name (optional)</label>
            <Input
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              placeholder="My family"
              className="h-11"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button disabled={converting} onClick={convertToFamily}>
              {converting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Convert to family account
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanam-dashboard-shell min-h-dvh px-3 py-6 text-slate-900 sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <section className="rounded-[22px] border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-md sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Parent hub
          </p>
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
            <Users className="h-7 w-7 text-emerald-700" />
            {householdName}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage kid profiles, set PINs, and open learning. Your subscription unlocks
            every child in this household.
          </p>

          {pickChild ? (
            <div className="mt-4">
              <Notice variant="lock" title="Choose a child to continue">
                Pick who is learning below (enter a PIN if that child has one), then tap{" "}
                <span className="font-semibold text-slate-800">Open learning</span>. Progress only
                saves after a child is selected.
              </Notice>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/billing">
                <CreditCard className="h-4 w-4" />
                Billing
              </Link>
            </Button>
            <Button variant="outline" onClick={() => setAddOpen((v) => !v)}>
              <Plus className="h-4 w-4" />
              Add child
            </Button>
          </div>

          {error ? (
            <div className="mt-4">
              <Notice variant="danger" role="alert" title="Something went wrong">
                {error}
              </Notice>
            </div>
          ) : null}
          {msg ? (
            <div className="mt-4">
              <Notice variant="success" title="Updated">
                {msg}
              </Notice>
            </div>
          ) : null}

          {addOpen ? (
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-extrabold">New child</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-11 bg-white"
                />
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-11 bg-white"
                />
                <Input
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Grade (optional)"
                  className="h-11 bg-white"
                />
                <Input
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="PIN 4–6 digits (optional)"
                  inputMode="numeric"
                  className="h-11 bg-white"
                />
              </div>
              <Button disabled={saving} onClick={addChild}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save child
              </Button>
            </div>
          ) : null}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black tracking-tight">Kids</h2>
          {kids.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
              No kids yet. Tap <strong>Add child</strong> to create the first learner profile.
            </div>
          ) : (
            kids.map((kid) => (
              <div
                key={kid.id}
                className="rounded-2xl border border-white/50 bg-white/85 p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-extrabold text-slate-900">
                      {kid.display_name}
                      {activeId === kid.id ? (
                        <span className="ml-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                          Active
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {[kid.grade ? `Grade ${kid.grade}` : null, kid.has_pin ? "PIN set" : "No PIN"]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setPinKidId(kid.id);
                        setPinValue("");
                      }}
                    >
                      <Shield className="h-3.5 w-3.5" />
                      {kid.has_pin ? "Reset PIN" : "Set PIN"}
                    </Button>
                    <Button size="sm" disabled={saving} onClick={() => openLearning(kid)}>
                      Open learning
                    </Button>
                  </div>
                </div>

                {pinKidId === kid.id ? (
                  <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-3">
                    <div className="min-w-[140px] flex-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-600">New PIN</label>
                      <Input
                        value={pinValue}
                        onChange={(e) =>
                          setPinValue(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        inputMode="numeric"
                        placeholder="4–6 digits"
                        className="h-10"
                      />
                    </div>
                    <Button size="sm" disabled={saving} onClick={() => savePin(kid.id)}>
                      Save PIN
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setPinKidId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : null}

                {switchKidId === kid.id ? (
                  <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-3">
                    <div className="min-w-[140px] flex-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-600">
                        Enter PIN for {kid.display_name}
                      </label>
                      <Input
                        value={switchPin}
                        onChange={(e) =>
                          setSwitchPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        inputMode="numeric"
                        type="password"
                        placeholder="PIN"
                        className="h-10"
                      />
                    </div>
                    <Button size="sm" disabled={saving} onClick={() => openLearning(kid)}>
                      Continue
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSwitchKidId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
