import { AuthRepo } from "../../app/interfaces/modules/auth.module.interface.js";


export class AuthRepository implements AuthRepo {

  getApiKey(keyId: string): string {
    // Implementation for retrieving API key
    return "";
  }

  storeHashedApiKey(keyId: string, hashedKey: string): void {
    // Implementation for storing hashed API key
  }

  deleteApiKey(keyId: string): void {
    // Implementation for deleting API key
  }
}