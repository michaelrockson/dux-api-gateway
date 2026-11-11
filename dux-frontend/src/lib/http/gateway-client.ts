import { API_BASE_URL } from "@/config/env";
import { GatewayError } from "./gateway-error";
import type {
  GatewayEnvelope,
  GatewayRequestOptions,
  GatewayResult,
} from "./http.interface";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function errorMessage(body: unknown, fallback: string): string {
  if (isRecord(body)) {
    const { message, error } = body as GatewayEnvelope;
    if (typeof message === "string") return message;
    if (typeof error === "string") return error;
  }
  return fallback;
}

export function buildGatewayUrl(
  path: string,
  query: Record<string, string> = {},
): string {
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    const trimmed = value.trim();
    if (trimmed) search.set(name, trimmed);
  }
  const queryString = search.toString();
  return `${API_BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;
}

export async function gatewayGet(
  path: string,
  { query, headers, signal }: GatewayRequestOptions = {},
): Promise<GatewayResult> {
  const response = await fetch(buildGatewayUrl(path, query), {
    headers: { Accept: "application/json", ...headers },
    signal,
  });
  const body = await readBody(response);

  if (!response.ok) {
    throw new GatewayError(
      response.status,
      errorMessage(body, response.statusText),
    );
  }

  const details = isRecord(body) && "details" in body ? body.details : body;
  return { body, details, status: response.status };
}
