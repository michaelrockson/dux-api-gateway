import type {
  GroupName,
  ParamValues,
  ResultViewAdapter,
} from "../types/endpoint.types";

export interface Choice {
  value: string;
  label: string;
}

export interface Param {
  id: string;
  label: string;
  required?: boolean;
  example?: string;
  placeholder?: string;
  description?: string;
  choices?: Choice[];
  defaultValue?: string;
  /**
   * Never sent upstream: it only changes how the result is shown, so
   * switching it re-renders the data already fetched instead of refetching.
   */
  displayOnly?: boolean;
}

export interface Endpoint {
  id: string;
  group: GroupName;
  name: string;
  description: string;
  path: string;
  responseKey?: string;
  params: Param[];
  toView?: ResultViewAdapter;
}

export interface EndpointGroup {
  name: GroupName;
  description: string;
}

export interface ParamState {
  values: ParamValues;
  added: string[];
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroView {
  kind: "hero";
  kicker: string;
  big: string;
  sub: string;
  stats: HeroStat[];
}

export interface ListRow {
  main: string;
  sub?: string;
  right?: string;
}

export interface ListView {
  kind: "list";
  caption?: string;
  rows: ListRow[];
}
