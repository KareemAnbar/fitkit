import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
