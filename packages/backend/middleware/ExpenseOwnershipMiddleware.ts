// middleware/ExpenseOwnershipMiddleware.ts
import type { Request, Response, NextFunction } from "express";
import { PrismaService } from "../services";
import { assertAuthRequest } from "./assertAuth";

export class ExpenseOwnershipMiddleware {
  static async handle(req: Request, res: Response, next: NextFunction) {
    assertAuthRequest(req);

    const expenseId = Number(req.params.id);
    const expense = await PrismaService.getClient().expense.findUnique({
      where: { id: expenseId },
      select: { userId: true },
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    if (expense.userId !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  }
}
