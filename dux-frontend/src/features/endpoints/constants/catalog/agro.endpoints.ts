import type { Endpoint, ListRow } from "../../interfaces/endpoint.interface";
import type {
  ParamValues,
  ResultView,
  UpstreamPayload,
} from "../../types/endpoint.types";
import {
  asArray,
  capitalise,
  plural,
  temperatureFromKelvin,
  windSpeedFromMs,
} from "../../utils/format.utils";
import { temperatureUnits } from "./shared.params";

const joined = (...parts: unknown[]): string =>
  parts.filter(Boolean).join(" · ");

/** Upstream timestamps are in seconds. */
function unixDate(value: unknown, withTime = false): string {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  return new Date(seconds * 1000).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: withTime ? undefined : "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
  });
}

function hectares(value: unknown): string | undefined {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return undefined;
  return `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })} ha`;
}

function coordinates(center: unknown): string {
  const [lon, lat] = asArray<unknown>(center).map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "";
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

function fields(d: UpstreamPayload): ResultView {
  const rows = asArray<UpstreamPayload>(d).map(
    (field): ListRow => ({
      main: field?.name || "Unnamed field",
      sub: joined(
        coordinates(field?.center),
        unixDate(field?.created_at) && `Added ${unixDate(field.created_at)}`,
      ),
      right: hectares(field?.area),
    }),
  );
  return {
    kind: "list",
    caption: rows.length ? plural(rows.length, "field") : undefined,
    rows,
  };
}

/** Upstream always reports Kelvin and m/s; `units` picks the display scale. */
function fieldWeather(d: UpstreamPayload, v: ParamValues): ResultView {
  const temp = (kelvin: unknown) => temperatureFromKelvin(kelvin, v.units);

  // A forecast comes back as a list of time steps.
  if (Array.isArray(d)) {
    return {
      kind: "list",
      caption: "Forecast for your field",
      rows: d.map(
        (step: UpstreamPayload): ListRow => ({
          main: unixDate(step?.dt, true) || "Unknown time",
          sub: joined(
            capitalise(step?.weather?.[0]?.description),
            step?.main?.humidity != null && `humidity ${step.main.humidity}%`,
          ),
          right: temp(step?.main?.temp),
        }),
      ),
    };
  }

  return {
    kind: "hero",
    kicker: unixDate(d?.dt, true)
      ? `Your field · ${unixDate(d.dt, true)}`
      : "Your field, right now",
    big: temp(d?.main?.temp),
    sub: capitalise(d?.weather?.[0]?.description),
    stats: [
      { label: "Feels like", value: temp(d?.main?.feels_like) },
      { label: "Humidity", value: d?.main?.humidity != null ? `${d.main.humidity}%` : "-" },
      { label: "Wind", value: windSpeedFromMs(d?.wind?.speed, v.units) },
      { label: "Cloud cover", value: d?.clouds?.all != null ? `${d.clouds.all}%` : "-" },
    ],
  };
}

export const AGRO_ENDPOINTS: Endpoint[] = [
  { id: "agro-polygons", group: "Farm", name: "My fields", description: "The fields you’ve mapped.", path: "/argo/polygons", responseKey: "Polygons", params: [], toView: fields },
  { id: "agro-weather", group: "Farm", name: "Weather on a field", description: "Current weather over one of your fields.", path: "/argo/polygons/weather", responseKey: "getPolygonWeather", params: [temperatureUnits], toView: fieldWeather },
];
