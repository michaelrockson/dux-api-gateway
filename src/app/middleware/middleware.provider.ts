import {
  MiddlewareRepo,
  MiddlewareRepository,
} from "./middleware.repository.js";
import { MiddlewareService } from "./middleware.service.js";

export function provideGatewayMiddleware() {
  const middlewareRepo: MiddlewareRepo = new MiddlewareRepository();

  return new MiddlewareService(middlewareRepo);
}
