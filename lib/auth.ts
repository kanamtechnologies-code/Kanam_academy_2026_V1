export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
}

// Supabase Auth needs an email (or phone). For a kid-friendly "username + password" login,
// we map the username to a synthetic email. This requires disabling email confirmations in Supabase.
export function usernameToEmail(username: string): string {
  const u = normalizeUsername(username);
  return `${u}@kanam.local`;
}

