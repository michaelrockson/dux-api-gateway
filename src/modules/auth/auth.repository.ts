import { AuthRepo } from "../../app/interfaces/modules/auth.module.interface.js";
import { prisma } from "../../app/db/prisma.js";

export class AuthRepository implements AuthRepo {
  async getApiKey(keyId: string): Promise<string | null> {
    const key = await prisma.apiKey.findUnique({
      where: { keyId }
    });
    return key ? key.hashedKey : null;
  }

  async storeHashedApiKey(keyId: string, hashedKey: string, createdAt: string): Promise<void> {
    await prisma.apiKey.create({
      data: {
        keyId,
        hashedKey,
        createdAt: new Date(createdAt)
      }
    });
  }

  async deleteApiKey(keyId: string): Promise<void> {
    await prisma.apiKey.delete({
      where: { keyId }
    });
  }
}
