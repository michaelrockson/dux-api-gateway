import type { Endpoint, Param, ParamValues } from "@/features/endpoints";
import type { ResultState } from "../types/lookup.types";

export interface LookupRequest {
  endpoint: Endpoint;
  values: ParamValues;
  activeParamIds: string[];
  headers: Record<string, string>;
  signal?: AbortSignal;
}

export interface LookupResponse {
  data: unknown;
  raw: unknown;
  status: number;
}

export interface LookupState {
  endpoint: Endpoint;
  values: ParamValues;
  active: Param[];
  available: Param[];
  missing: string[];
  ready: boolean;
  result: ResultState;
  selectEndpoint: (endpoint: Endpoint) => void;
  setValue: (id: string, value: string) => void;
  addParam: (param: Param) => void;
  removeParam: (id: string) => void;
  run: (headers: Record<string, string>) => Promise<void>;
}
