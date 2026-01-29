import type { Request, Response, NextFunction } from "express";
import { assertAuthRequest } from "./assertAuth";

export class UserOwnershipMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    assertAuthRequest(req);

    const targetUserId = Number(req.params.id);
    if (req.user.userId !== targetUserId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  }
}
