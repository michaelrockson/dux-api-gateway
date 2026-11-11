const DEFAULT_API_BASE_URL = "/v1";

export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");
