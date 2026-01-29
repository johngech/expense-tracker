// schemas/ExpenseSchema.ts
import { z } from "zod";

export const CreateExpenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  note: z.string().optional().nullable(),
  expenseDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date({ error: "Invalid date format" }),
  ),
  userId: z.number().int(),
});

export const UpdateExpenseSchema = z.object({
  title: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  note: z.string().optional().nullable(),
  expenseDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date().optional(),
  ),
});
