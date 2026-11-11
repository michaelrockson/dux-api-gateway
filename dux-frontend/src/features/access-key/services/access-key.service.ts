import { GatewayError, gatewayGet } from "@/lib/http";
import type { ApiKeyResponse } from "../interfaces/access-key.interface";
import type { AuthMode } from "../types/access-key.types";

export function authHeaders(
  key: string,
  mode: AuthMode,
): Record<string, string> {
  return mode === "bearer"
    ? { Authorization: `Bearer ${key}` }
    : { "x-api-key": key };
}

export function headerPreview(key: string, mode: AuthMode): string {
  const [name, value] = Object.entries(authHeaders(key, mode))[0];
  return `${name}: ${value}`;
}

function isApiKeyResponse(value: unknown): value is ApiKeyResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ApiKeyResponse).apiKey === "string"
  );
}

export async function requestGatewayKey(signal?: AbortSignal): Promise<string> {
  const { details } = await gatewayGet("/auth/gateway-key", { signal });
  const response = (details as { ApiKeyResponse?: unknown } | null)
    ?.ApiKeyResponse;
  if (!isApiKeyResponse(response)) {
    throw new GatewayError(500, "No key in response");
  }
  return response.apiKey;
}
