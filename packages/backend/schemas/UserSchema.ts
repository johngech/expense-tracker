import { z } from "zod";

// Incoming create user DTO
export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Incoming update user DTO
export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
});
