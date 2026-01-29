// schemas/user-schemas.ts
import { z } from "zod";

export const CreateUserSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match!",
    path: ["confirmPassword"],
  });

export const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.email("Invalid email address").optional(),
});
