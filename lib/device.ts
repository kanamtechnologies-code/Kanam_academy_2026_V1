export function getOrCreateDeviceId(): string {
  const key = "kanam.deviceId";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
  window.localStorage.setItem(key, id);
  return id;
}

