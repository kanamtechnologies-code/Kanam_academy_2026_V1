import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

import type { UserWithRole } from "@/lib/roles";
import { isParentRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export { isParentRole };

export type HouseholdKid = {
  id: string;
  display_name: string;
  first_name: string | null;
  last_name: string | null;
  grade: string | null;
  has_pin: boolean;
};

function readMeta(user: UserWithRole, key: string): unknown {
  const meta = user?.user_metadata;
  return meta && typeof meta === "object" ? (meta as Record<string, unknown>)[key] : undefined;
}

export function activeStudentIdFromUser(user: UserWithRole): string | null {
  const raw = readMeta(user, "active_student_id");
  return typeof raw === "string" && raw.trim() ? raw.trim() : null;
}

/** Format: scrypt$<salt_b64>$<hash_b64> — same shape as legacy password_hash. */
export function hashPin(pin: string): string {
  const normalized = pin.trim();
  const salt = randomBytes(16);
  const hash = scryptSync(normalized, salt, 32);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export function verifyPin(pin: string, stored: string | null | undefined): boolean {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "base64");
    const expected = Buffer.from(parts[2], "base64");
    const actual = scryptSync(pin.trim(), salt, expected.length);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function isValidPin(pin: string): boolean {
  return /^\d{4,6}$/.test(pin.trim());
}

export async function getHouseholdForOwner(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  ownerUserId: string
) {
  const { data, error } = await admin
    .from("households")
    .select("id, owner_user_id, name, active_student_id")
    .eq("owner_user_id", ownerUserId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function listHouseholdKids(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  householdId: string
): Promise<HouseholdKid[]> {
  const { data, error } = await admin
    .from("students")
    .select("id, display_name, first_name, last_name, grade, pin_hash")
    .eq("household_id", householdId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    display_name: String(row.display_name ?? "Learner"),
    first_name: row.first_name ? String(row.first_name) : null,
    last_name: row.last_name ? String(row.last_name) : null,
    grade: row.grade ? String(row.grade) : null,
    has_pin: Boolean(row.pin_hash),
  }));
}

export async function setActiveStudentMetadata(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  userId: string,
  studentId: string | null
) {
  const { data: userData, error: getErr } = await admin.auth.admin.getUserById(userId);
  if (getErr) throw new Error(getErr.message);
  const prev = (userData.user?.user_metadata ?? {}) as Record<string, unknown>;
  const { error } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...prev,
      active_student_id: studentId,
    },
  });
  if (error) throw new Error(error.message);

  await admin
    .from("households")
    .update({ active_student_id: studentId })
    .eq("owner_user_id", userId);
}

/** Stable device_id for household kid profiles (required NOT NULL on students). */
export function kidDeviceId(householdId: string, seed?: string) {
  const raw = `${householdId}:${seed ?? randomBytes(8).toString("hex")}`;
  return `household:${createHash("sha256").update(raw).digest("hex").slice(0, 24)}`;
}
