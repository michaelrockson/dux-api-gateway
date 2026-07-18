import { Request, Response, NextFunction } from "express";
import { MiddlewareRepo } from "./middleware.repository.js";

export type GatewayMiddleware = {
  authenticateRequest(req: Request, res: Response, next: NextFunction): void;
};

export class MiddlewareService implements GatewayMiddleware {
  private readonly middlewareRepo: MiddlewareRepo;

  constructor(middlewareRepo: MiddlewareRepo) {
    this.middlewareRepo = middlewareRepo;
  }

  authenticateRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const apiKey =
        (req.headers["x-api-key"] as string) ||
        req.headers.authorization?.split(" ")[1];

      if (!apiKey) {
        res.status(401).json({ error: "Unauthorized: API key is missing" });
        return;
      }

      const isValid = this.middlewareRepo.checkClientApiKey(apiKey);
      if (!isValid) {
        res.status(403).json({ error: "Forbidden: Invalid API key" });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
