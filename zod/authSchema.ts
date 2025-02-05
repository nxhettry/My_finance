import z from "zod";

export const signInSchema = z
  .object({
    email: z.string().min(3),
    password: z.string().min(6),
  })
  .refine((data) => data.email.includes("@") || data.email.length >= 3, {
    message: "Must be a valid email or a username with at least 3 characters.",
    path: ["email"],
  });

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
