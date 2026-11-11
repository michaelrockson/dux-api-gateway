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
  },
  {
    id: "header",
    title: "API key header",
  },
];
