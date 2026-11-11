export const plural = (n: number, one: string, many = `${one}s`): string =>
  `${n} ${n === 1 ? one : many}`;

export const asArray = <T>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export const capitalise = (text = ""): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export function temperature(value: unknown, units?: string): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  if (units === "imperial") return `${Math.round(n)}°F`;
  if (units === "metric") return `${Math.round(n)}°C`;
  return `${n.toFixed(1)} K`;
}

export function windSpeed(value: unknown, units?: string): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return `${n} ${units === "imperial" ? "mph" : "m/s"}`;
}
