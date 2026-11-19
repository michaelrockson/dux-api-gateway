import {
  toFallbackView,
  type Endpoint,
  type ParamValues,
  type ResultView,
} from "@/features/endpoints";
import { gatewayGet } from "@/lib/http";
import type {
  LookupRequest,
  LookupResponse,
} from "../interfaces/lookup.interface";

function pickActive(
  values: ParamValues,
  activeParamIds: string[],
): ParamValues {
  const query: ParamValues = {};
  for (const id of activeParamIds) {
    if (values[id] !== undefined) query[id] = values[id];
  }
  return query;
}

/** Display-only params change how a result is shown, never what is fetched. */
function sentParamIds(endpoint: Endpoint, activeParamIds: string[]): string[] {
  const displayOnly = new Set(
    endpoint.params.filter((p) => p.displayOnly).map((p) => p.id),
  );
  return activeParamIds.filter((id) => !displayOnly.has(id));
}

export async function runLookup({
  endpoint,
  values,
  activeParamIds,
  headers,
  signal,
}: LookupRequest): Promise<LookupResponse> {
  const { body, details, status } = await gatewayGet(endpoint.path, {
    query: pickActive(values, sentParamIds(endpoint, activeParamIds)),
    headers,
    signal,
  });

  const key = endpoint.responseKey;
  const data =
    key && typeof details === "object" && details !== null && key in details
      ? (details as Record<string, unknown>)[key]
      : details;

  return { data, raw: body, status };
}

/**
 * Values used to render a result: what was fetched with, plus the current
 * display-only choices, so switching those re-renders without a request.
 */
export function viewValues(
  endpoint: Endpoint,
  fetched: ParamValues,
  current: ParamValues,
): ParamValues {
  const merged = { ...fetched };
  for (const param of endpoint.params) {
    if (!param.displayOnly) continue;
    if (current[param.id] === undefined) delete merged[param.id];
    else merged[param.id] = current[param.id];
  }
  return merged;
}

export function toResultView(
  endpoint: Endpoint,
  data: unknown,
  values: ParamValues,
): ResultView {
  // Results are never shown raw: anything without a working view of its own
  // falls back to a generic readable one.
  if (!endpoint.toView) return toFallbackView(data);
  try {
    return endpoint.toView(data, values);
  } catch {
    return toFallbackView(data);
  }
}
