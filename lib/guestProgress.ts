"use client";

/**
 * Guest / demo progress.
 *
 * Powers the frictionless pitch path for `/learn/demo` only. XP and completion
 * stay in the browser with no Supabase account. Paid `/learn/*` routes require
 * a signed-in entitled account (server gate + middleware).
 */

export const GUEST_FLAG_KEY = "kanam.guest";
export const GUEST_COMPLETED_KEY = "kanam.guest.completed";
export const USER_NAME_KEY = "kanam.userName";

/** Fired (on `window`) whenever guest progress changes, so open views can refresh. */
export const GUEST_PROGRESS_EVENT = "kanam:guest-progress";

/**
 * localStorage / sessionStorage key prefixes wiped by
 * {@link clearDemoProgressOnDevice}. Keep auth/onboarding keys out of this list.
 */
const DEMO_CLEAR_PREFIXES = [
  "kanam.guest.completed",
  "kanam.demo.",
  "kanam.lessonModuleDone:",
  "kanam.coachRead:",
  "kanam.aiReflection:",
  "kanam.designDraft:",
  "kanam.npcDraft:",
  "kanam_guest_tool_tour",
] as const;

/** Exact keys that should also be removed (non-prefix matches). */
const DEMO_CLEAR_EXACT = [
  GUEST_COMPLETED_KEY,
  "kanam.demo.lessonTourPending",
] as const;

function shouldClearDemoKey(key: string): boolean {
  if (DEMO_CLEAR_EXACT.includes(key as (typeof DEMO_CLEAR_EXACT)[number])) return true;
  return DEMO_CLEAR_PREFIXES.some((prefix) => key === prefix || key.startsWith(prefix));
}

function clearMatchingKeys(storage: Storage): number {
  const toRemove: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && shouldClearDemoKey(key)) toRemove.push(key);
  }
  for (const key of toRemove) {
    try {
      storage.removeItem(key);
    } catch {
      // ignore
    }
  }
  return toRemove.length;
}

export function isGuestMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(GUEST_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function setGuestMode(on: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (on) window.localStorage.setItem(GUEST_FLAG_KEY, "1");
    else window.localStorage.removeItem(GUEST_FLAG_KEY);
  } catch {
    // ignore
  }
}

export function getGuestName(): string {
  if (typeof window === "undefined") return "Guest";
  try {
    return window.localStorage.getItem(USER_NAME_KEY) || "Guest";
  } catch {
    return "Guest";
  }
}

export function setGuestName(name: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(USER_NAME_KEY, name);
  } catch {
    // ignore
  }
}

export function getGuestCompletedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GUEST_COMPLETED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function writeGuestCompletedIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const unique = Array.from(new Set(ids.filter(Boolean)));
    window.localStorage.setItem(GUEST_COMPLETED_KEY, JSON.stringify(unique));
    window.dispatchEvent(new CustomEvent(GUEST_PROGRESS_EVENT));
  } catch {
    // ignore
  }
}

export function markGuestLessonComplete(lessonId: string): void {
  if (!lessonId) return;
  const current = getGuestCompletedIds();
  if (current.includes(lessonId)) return;
  writeGuestCompletedIds([...current, lessonId]);
}

/**
 * Clears guest completed lessons only (legacy helper).
 * Prefer {@link clearDemoProgressOnDevice} from the demo entry screen.
 */
export function resetGuestProgress(): void {
  writeGuestCompletedIds([]);
}

export type ClearDemoProgressResult = {
  ok: boolean;
  removed: number;
  error?: string;
};

/**
 * Wipe on-device demo state: completed lessons, coach gates, lesson-module unlocks,
 * tour flags, and related drafts — without touching auth/onboarding keys.
 */
export function clearDemoProgressOnDevice(): ClearDemoProgressResult {
  if (typeof window === "undefined") {
    return { ok: false, removed: 0, error: "Not in a browser." };
  }

  try {
    let removed = 0;
    removed += clearMatchingKeys(window.localStorage);
    try {
      removed += clearMatchingKeys(window.sessionStorage);
    } catch {
      // sessionStorage may be blocked on some mobile browsers
    }

    // Ensure completed list is empty even if remove failed oddly.
    try {
      window.localStorage.setItem(GUEST_COMPLETED_KEY, "[]");
    } catch {
      // ignore
    }

    window.dispatchEvent(new CustomEvent(GUEST_PROGRESS_EVENT));
    return { ok: true, removed };
  } catch (e: unknown) {
    return {
      ok: false,
      removed: 0,
      error:
        e instanceof Error
          ? e.message
          : "Could not clear demo progress. Storage may be blocked on this browser.",
    };
  }
}
