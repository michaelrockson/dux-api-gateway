import { prisma } from "../db/prisma.js";

export type MiddlewareRepo = {
  checkClientApiKey(apiKey: string): Promise<boolean>;
};

export class MiddlewareRepository implements MiddlewareRepo {
  async checkClientApiKey(apiKey: string): Promise<boolean> {
    if (typeof apiKey !== "string" || !apiKey.startsWith("gw_")) return false;
    
    const key = await prisma.apiKey.findFirst({
      where: { keyId: apiKey }
    });
    return !!key;
  }
}
