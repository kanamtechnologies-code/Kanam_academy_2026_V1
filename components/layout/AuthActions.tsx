"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound, Users } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole } from "@/lib/roles";
import { USER_NAME_KEY, isGuestMode, setGuestMode } from "@/lib/guestProgress";

export function AuthActions() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [signedIn, setSignedIn] = React.useState(false);
  const [guest, setGuest] = React.useState(false);
  const [instructor, setInstructor] = React.useState(false);

  React.useEffect(() => {
    if (isGuestMode()) {
      setGuest(true);
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setSignedIn(false);
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSignedIn(Boolean(data.session));
      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        if (!mounted) return;
        setInstructor(isInstructorRole(userData.user));
      } else {
        setInstructor(false);
      }
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
      if (session) {
        supabase.auth.getUser().then(({ data: userData }) => {
          setInstructor(isInstructorRole(userData.user));
        });
      } else {
        setInstructor(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  if (guest) {
    return (
      <button
        type="button"
        onClick={() => {
          setGuestMode(false);
          try {
            window.localStorage.removeItem(USER_NAME_KEY);
          } catch {
            // ignore
          }
          router.push("/welcome");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold tracking-tight text-white hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        aria-label="Exit demo"
      >
        <LogOut className="h-4 w-4" />
        Exit demo
      </button>
    );
  }

  if (!signedIn) {
    return (
      <Link
        href="/welcome/returning"
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold tracking-tight text-white hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
      >
        <UserRound className="h-4 w-4" />
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {instructor ? (
        <Link
          href="/instructor"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold tracking-tight text-white hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          <Users className="h-4 w-4" />
          Instructor
        </Link>
      ) : null}
      <button
        type="button"
        onClick={async () => {
          const supabase = createSupabaseBrowserClient();
          if (supabase) await supabase.auth.signOut();
          try {
            window.localStorage.removeItem(USER_NAME_KEY);
          } catch {
            // ignore
          }
          router.push("/welcome");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent-rgb)/0.85)] bg-[rgb(var(--accent-rgb)/0.92)] px-3 py-1.5 text-xs font-extrabold tracking-tight text-slate-950 shadow-sm hover:brightness-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]"
        aria-label="Log out"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  );
}
