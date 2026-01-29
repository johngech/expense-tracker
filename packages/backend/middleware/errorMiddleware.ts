import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);
  response.status(500).json({ error: "Internal server error" });
}
