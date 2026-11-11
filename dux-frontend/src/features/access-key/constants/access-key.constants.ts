import type {
  AuthModeOption,
  StoredAccessKey,
} from "../interfaces/access-key.interface";

export const ACCESS_KEY_STORAGE_KEY = "dux.accessKey";

export const EMPTY_ACCESS_KEY: StoredAccessKey = {
  key: "",
  mode: "bearer",
  attached: false,
};

export const AUTH_MODES: AuthModeOption[] = [
  {
    id: "bearer",
    title: "Bearer token",
    description: "The usual choice. Works with most apps and tools.",
  },
  {
    id: "header",
    title: "API key header",
    description: "Pick this if your app asks for an “x-api-key” header.",
  },
];
