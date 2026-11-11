import type { AuthMode } from "../types/access-key.types";

export interface StoredAccessKey {
  key: string;
  mode: AuthMode;
  attached: boolean;
}

export interface AccessKeyState extends StoredAccessKey {
  setKey: (key: string) => void;
  setMode: (mode: AuthMode) => void;
  attach: () => void;
  clear: () => void;
}

export interface AuthModeOption {
  id: AuthMode;
  title: string;
  description: string;
}

export interface ApiKeyResponse {
  apiKey: string;
  createdAt?: string;
}
