import { z } from "zod";

// User registration validation schema
export const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 chars long")
    .max(20, "Username must not exceed 20 chars")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username may contain only letters, numbers, and underscores"
    ),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(25, "Password too long"),
});
