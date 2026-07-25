export type AuthService = {
  createApiKey(): ApiKeyResponse;
};

export type AuthRepo = {
  storeHashedApiKey(keyId: string, hashedKey: string, createdAt: string): void;
  getApiKey(keyId: string): string;
  deleteApiKey(keyId: string): void;
};

export interface ApiKeyResponse {
  apiKey: string;
  createdAt: string;
}
