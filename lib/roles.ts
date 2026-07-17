type RoleMetadata = Record<string, unknown> | null | undefined;

export type UserWithRole =
  | {
      email?: string | null;
      user_metadata?: RoleMetadata;
      app_metadata?: RoleMetadata;
    }
  | null
  | undefined;

function readMetaValue(meta: RoleMetadata, key: string): unknown {
  return meta && typeof meta === "object" ? (meta as Record<string, unknown>)[key] : undefined;
}

/** Resolve a user's role from either user_metadata or app_metadata. */
export function readUserRole(user: UserWithRole): string | null {
  const role =
    readMetaValue(user?.user_metadata, "role") ||
    readMetaValue(user?.app_metadata, "role") ||
    readMetaValue(user?.user_metadata, "user_role") ||
    readMetaValue(user?.app_metadata, "user_role");
  return typeof role === "string" ? role : null;
}

/** True when the user's role grants instructor-level access. */
export function isInstructorRole(user: UserWithRole): boolean {
  const role = readUserRole(user);
  return role === "instructor" || role === "teacher";
}

/** True when the user owns a household (parent login for kid profiles). */
export function isParentRole(user: UserWithRole): boolean {
  return readUserRole(user) === "parent";
}

/** Where to send a user immediately after sign-in. */
export function postSignInPath(
  user: UserWithRole
): "/instructor" | "/parent" | "/dashboard" {
  if (isInstructorRole(user)) return "/instructor";
  if (isParentRole(user)) return "/parent";
  return "/dashboard";
}

/**
 * Safe in-app redirect from `?next=` (marketing → billing checkout flow).
 * Only allows same-origin relative paths.
 */
export function safeNextPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/")) return null;
  if (decoded.startsWith("//")) return null;
  if (decoded.includes("://")) return null;
  return decoded;
}
