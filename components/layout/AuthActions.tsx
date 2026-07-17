"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound, Users } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole } from "@/lib/roles";
import { USER_NAME_KEY, isGuestMode, setGuestMode } from "@/lib/guestProgress";

const chipBase =
  "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold tracking-tight focus:outline-none focus-visible:ring-4 sm:gap-2 sm:px-3.5";

function isWelcomePath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/welcome" || pathname.startsWith("/welcome/");
}

export function AuthActions() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(true);
  const [signedIn, setSignedIn] = React.useState(false);
  const [guest, setGuest] = React.useState(false);
  const [instructor, setInstructor] = React.useState(false);
  const [parent, setParent] = React.useState(false);

  React.useEffect(() => {
    // Welcome is the exit destination — clear leftover guest mode so "Exit demo" never shows here.
    if (isWelcomePath(pathname) && isGuestMode()) {
      setGuestMode(false);
      try {
        window.localStorage.removeItem(USER_NAME_KEY);
      } catch {
        // ignore
      }
      setGuest(false);
    }

    if (isGuestMode() && !isWelcomePath(pathname)) {
      setGuest(true);
      setLoading(false);
      return;
    }

    setGuest(false);

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
        setParent(isParentRole(userData.user));
      } else {
        setInstructor(false);
        setParent(false);
      }
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
      if (session) {
        supabase.auth.getUser().then(({ data: userData }) => {
          setInstructor(isInstructorRole(userData.user));
          setParent(isParentRole(userData.user));
        });
      } else {
        setInstructor(false);
        setParent(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [pathname]);

  if (loading) return null;

  if (guest && !isWelcomePath(pathname)) {
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
        className={`${chipBase} border border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/20`}
        aria-label="Exit demo"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Exit demo</span>
        <span className="sm:hidden">Exit</span>
      </button>
    );
  }

  if (!signedIn) {
    // Welcome already has sign-in forms — don't duplicate in the header.
    if (isWelcomePath(pathname)) return null;
    return (
      <Link
        href="/welcome/returning"
        className={`${chipBase} border border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/20`}
      >
        <UserRound className="h-4 w-4" />
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {parent ? (
        <Link
          href="/parent"
          className={`${chipBase} border border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/20`}
          aria-label="Switch child / parent hub"
        >
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Switch child</span>
          <span className="md:hidden">Kids</span>
        </Link>
      ) : null}
      {instructor ? (
        <Link
          href="/instructor"
          className={`${chipBase} border border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/20`}
          aria-label="Instructor dashboard"
        >
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Instructor</span>
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
        className={`${chipBase} border border-[rgb(var(--accent-rgb)/0.85)] bg-[rgb(var(--accent-rgb)/0.92)] text-slate-950 shadow-sm hover:brightness-[1.03] focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]`}
        aria-label="Log out"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Log out</span>
      </button>
    </div>
  );
}
