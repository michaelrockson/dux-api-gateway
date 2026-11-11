export interface GatewayEnvelope {
  message?: string;
  error?: string;
  details?: unknown;
}

export interface GatewayRequestOptions {
  query?: Record<string, string>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface GatewayResult {
  body: unknown;
  details: unknown;
  status: number;
}
