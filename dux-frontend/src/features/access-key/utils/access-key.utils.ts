export function maskKey(key: string): string {
  if (key.length <= 10) return "•".repeat(key.length);
  return `${key.slice(0, 7)}${"•".repeat(12)}${key.slice(-3)}`;
}

export function shortenKey(key: string): string {
  return key.length > 12 ? `${key.slice(0, 7)}…${key.slice(-3)}` : key;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
