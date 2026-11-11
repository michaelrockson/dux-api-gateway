import type { Endpoint, Param } from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import {
  asArray,
  capitalise,
  temperature,
  windSpeed,
} from "../../utils/format.utils";

const lat: Param = { id: "lat", label: "Latitude", required: true, example: "51.5074", placeholder: "51.5074" };
const lon: Param = { id: "lon", label: "Longitude", required: true, example: "-0.1278", placeholder: "-0.1278" };
const units: Param = {
  id: "units",
  label: "Show in",
  description: "Temperature scale",
  defaultValue: "metric",
  choices: [
    { value: "metric", label: "°C" },
    { value: "imperial", label: "°F" },
    { value: "standard", label: "K" },
  ],
};
const lang: Param = { id: "lang", label: "Language", placeholder: "e.g. fr", description: "Language for the description" };
const cnt: Param = { id: "cnt", label: "Results", placeholder: "e.g. 10", description: "How many results to return" };

export const WEATHER_ENDPOINTS: Endpoint[] = [
  {
    id: "weather-current",
    group: "Weather",
    name: "Current weather",
    description: "Temperature, sky and wind right now.",
    path: "/weather/current",
    responseKey: "currentWeather",
    params: [lat, lon, units, lang],
    toView: (d, v) => ({
      kind: "hero",
      kicker: d?.name ? `${d.name}, right now` : "Right now",
      big: temperature(d?.main?.temp, v.units),
      sub: capitalise(d?.weather?.[0]?.description),
      stats: [
        { label: "Feels like", value: temperature(d?.main?.feels_like, v.units) },
        { label: "Humidity", value: d?.main?.humidity != null ? `${d.main.humidity}%` : "-" },
        { label: "Wind", value: windSpeed(d?.wind?.speed, v.units) },
      ],
    }),
  },
  {
    id: "weather-forecast",
    group: "Weather",
    name: "5-day forecast",
    description: "The next five days, every three hours.",
    path: "/weather/forecast",
    responseKey: "forecastWeather",
    params: [lat, lon, units, lang, cnt],
    toView: (d, v) => ({
      kind: "list",
      caption: d?.city?.name ? `${d.city.name} · every 3 hours` : "Every 3 hours",
      rows: asArray<UpstreamPayload>(d?.list).map((x) => ({
        main: String(x?.dt_txt ?? "").slice(0, 16),
        sub: `${capitalise(x?.weather?.[0]?.description)} · humidity ${x?.main?.humidity ?? "-"}%`,
        right: temperature(x?.main?.temp, v.units),
      })),
    }),
  },
];
