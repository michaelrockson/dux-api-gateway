import type { Endpoint, ParamValues, ResultView } from "@/features/endpoints";
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

export async function runLookup({
  endpoint,
  values,
  activeParamIds,
  headers,
  signal,
}: LookupRequest): Promise<LookupResponse> {
  const { body, details, status } = await gatewayGet(endpoint.path, {
    query: pickActive(values, activeParamIds),
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

export function toResultView(
  endpoint: Endpoint,
  data: unknown,
  values: ParamValues,
): ResultView | null {
  if (!endpoint.toView) return null;
  try {
    return endpoint.toView(data, values);
  } catch {
    return null;
  }
}
