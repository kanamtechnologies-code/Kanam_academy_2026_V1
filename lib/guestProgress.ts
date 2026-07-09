"use client";

/**
 * Guest / demo progress.
 *
 * Lets someone explore the full product (all tracks + real lessons) and keep
 * their XP and completed-lesson progress entirely in the browser, with no
 * Supabase account. This powers the frictionless pitch/demo path.
 */

export const GUEST_FLAG_KEY = "kanam.guest";
export const GUEST_COMPLETED_KEY = "kanam.guest.completed";
export const USER_NAME_KEY = "kanam.userName";

/** Fired (on `window`) whenever guest progress changes, so open views can refresh. */
export const GUEST_PROGRESS_EVENT = "kanam:guest-progress";

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

export function resetGuestProgress(): void {
  writeGuestCompletedIds([]);
}
