import type { Param } from "../../interfaces/endpoint.interface";

/**
 * Temperature scale toggle for any upstream that reports Kelvin and m/s.
 * Display-only: the data is fetched once and every scale is converted from
 * it, so switching never makes another request.
 */
export const temperatureUnits: Param = {
  id: "units",
  label: "Show in",
  description: "Temperature scale",
  defaultValue: "metric",
  displayOnly: true,
  choices: [
    { value: "metric", label: "°C" },
    { value: "imperial", label: "°F" },
    { value: "standard", label: "K" },
  ],
};
