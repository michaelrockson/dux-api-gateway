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

const KELVIN_OFFSET = 273.15;
const MPH_PER_MS = 2.236936;

/** Formats a Kelvin reading in the chosen scale (metric °C, imperial °F, else K). */
export function temperatureFromKelvin(kelvin: unknown, units?: string): string {
  if (kelvin == null) return "-";
  const k = Number(kelvin);
  if (!Number.isFinite(k)) return "-";
  const c = k - KELVIN_OFFSET;
  if (units === "metric") return temperature(c, units);
  if (units === "imperial") return temperature((c * 9) / 5 + 32, units);
  return temperature(k, units);
}

/** Formats a m/s reading, in mph for imperial. */
export function windSpeedFromMs(ms: unknown, units?: string): string {
  if (ms == null) return "-";
  const n = Number(ms);
  if (!Number.isFinite(n)) return "-";
  if (units === "imperial") {
    return windSpeed(Math.round(n * MPH_PER_MS * 10) / 10, units);
  }
  return windSpeed(n, units);
}
