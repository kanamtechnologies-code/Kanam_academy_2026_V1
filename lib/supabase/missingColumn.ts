export function isMissingColumnError(error: { message?: string } | null | undefined): boolean {
  const msg = String(error?.message ?? "").toLowerCase();
  return (
    msg.includes("column") ||
    msg.includes("schema cache") ||
    msg.includes("does not exist") ||
    msg.includes("could not find")
  );
}
