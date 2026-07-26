import { createHash, timingSafeEqual } from "crypto";

import type { UserWithRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const PRIVILEGED_ROLES = new Set(["instructor", "teacher", "parent"]);

function metaRecord(meta: unknown): Record<string, unknown> {
  return meta && typeof meta === "object" ? { ...(meta as Record<string, unknown>) } : {};
}

function readRole(meta: unknown): string | null {
  const r = metaRecord(meta);
  const role = r.role ?? r.user_role;
  return typeof role === "string" && role.trim() ? role.trim() : null;
}

export function isPrivilegedRoleName(role: string | null | undefined): boolean {
  return Boolean(role && PRIVILEGED_ROLES.has(role));
}

/**
 * Set auth role in app_metadata only (not client-writable user_metadata).
 * Clears a legacy user_metadata.role when present.
 */
export async function setPrivilegedAppRole(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  userId: string,
  role: "instructor" | "teacher" | "parent",
  existing?: { user_metadata?: unknown; app_metadata?: unknown }
) {
  const userMeta = metaRecord(existing?.user_metadata);
  const appMeta = metaRecord(existing?.app_metadata);
  delete userMeta.role;
  delete userMeta.user_role;

  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { ...appMeta, role },
    user_metadata: userMeta,
  });
  if (error) throw new Error(error.message);
}

/**
 * One-time migration: copy privileged role from user_metadata → app_metadata.
 * Returns the role after sync (or existing app_metadata role).
 */
export async function migrateLegacyPrivilegedRole(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  user: { id: string; user_metadata?: unknown; app_metadata?: unknown }
): Promise<string | null> {
  const appRole = readRole(user.app_metadata);
  if (appRole) return appRole;

  const legacy = readRole(user.user_metadata);
  if (!isPrivilegedRoleName(legacy) || !legacy) return null;

  await setPrivilegedAppRole(
    admin,
    user.id,
    legacy as "instructor" | "teacher" | "parent",
    user
  );
  return legacy;
}

/** Constant-time compare for invite / admin secrets. */
export function secretsEqual(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function userWithAppRole(user: UserWithRole, role: string): UserWithRole {
  if (!user) return user;
  return {
    ...user,
    app_metadata: {
      ...(typeof user.app_metadata === "object" && user.app_metadata
        ? (user.app_metadata as Record<string, unknown>)
        : {}),
      role,
    },
  };
}
