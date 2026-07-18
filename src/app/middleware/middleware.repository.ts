export type MiddlewareRepo = {
  checkClientApiKey(apiKey: string): boolean;
};

export class MiddlewareRepository implements MiddlewareRepo {
  checkClientApiKey(apiKey: string): boolean {
    // Basic implementation for checking client API key.
    // In a complete implementation, this would verify the key against a database or AuthRepo.
    return typeof apiKey === "string" && apiKey.startsWith("gw_");
  }
}
