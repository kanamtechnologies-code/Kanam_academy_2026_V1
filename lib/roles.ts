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

/** Where to send a user immediately after sign-in. */
export function postSignInPath(user: UserWithRole): "/instructor" | "/dashboard" {
  return isInstructorRole(user) ? "/instructor" : "/dashboard";
}
