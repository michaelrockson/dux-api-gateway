import { ACCESS_KEY_STORAGE_KEY } from "../constants/access-key.constants";
import type { StoredAccessKey } from "../interfaces/access-key.interface";

function isStoredAccessKey(value: unknown): value is StoredAccessKey {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<StoredAccessKey>;
  return (
    typeof candidate.key === "string" &&
    (candidate.mode === "bearer" || candidate.mode === "header") &&
    typeof candidate.attached === "boolean"
  );
}

export function loadAccessKey(): StoredAccessKey | null {
  try {
    const raw = sessionStorage.getItem(ACCESS_KEY_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isStoredAccessKey(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAccessKey(value: StoredAccessKey): boolean {
  try {
    sessionStorage.setItem(ACCESS_KEY_STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeAccessKey(): boolean {
  try {
    sessionStorage.removeItem(ACCESS_KEY_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
