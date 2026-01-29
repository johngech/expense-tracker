import type { Request, Response, NextFunction } from "express";
import { JwtService } from "../services";
import type { AuthRequest } from "../types";

export class AuthMiddleware {
  public static handle = (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return response
          .status(401)
          .json({ error: "Missing or invalid authorization header" });
      }

      const token = authHeader.replace("Bearer ", "");

      // Verification using your JwtService pattern
      const decoded = JwtService.verifyToken(token, "access");

      // Attach claims to request
      (request as AuthRequest).user = decoded;

      next();
    } catch (error: any) {
      response.status(401).json({ error: error.message });
    }
  };
}
