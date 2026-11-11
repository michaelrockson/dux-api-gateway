import type { HeroView, ListView } from "../interfaces/endpoint.interface";

export type GroupName =
  | "Weather"
  | "News"
  | "Money"
  | "Holidays"
  | "Sports"
  | "Flights"
  | "Farm";

export type ParamValues = Record<string, string>;

export type UpstreamPayload = any;

export type ResultView = HeroView | ListView;

export type ResultViewAdapter = (
  data: UpstreamPayload,
  values: ParamValues,
) => ResultView;
