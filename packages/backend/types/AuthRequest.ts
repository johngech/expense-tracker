import type { Request } from "express";

export interface AuthRequest extends Request {
  user: {
    userId: number;
    email?: string;
    iat?: number;
    exp?: number;
    type: "access" | "refresh";
  };
}
