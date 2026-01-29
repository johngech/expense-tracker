import type { Request } from "express";
import type { AuthRequest } from "../types";

export function assertAuthRequest(
  request: Request,
): asserts request is AuthRequest {
  if (!(request as any).user) {
    throw new Error("Auth context missing");
  }
}
