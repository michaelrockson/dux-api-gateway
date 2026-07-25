import {
  MiddlewareRepo,
  MiddlewareRepository,
} from "./middleware.repository.js";
import { MiddlewareService } from "./middleware.service.js";
import type { ICache } from "../cache/cache.interface.js";

export function provideGatewayMiddleware(redisClient: ICache) {
  const middlewareRepo: MiddlewareRepo = new MiddlewareRepository();

  return new MiddlewareService(middlewareRepo, redisClient);
}
