import z from "zod";

export const signInSchema = z
  .object({
    identifier: z.string().min(3),
    password: z.string().min(6),
  })
  .refine(
    (data) => data.identifier.includes("@") || data.identifier.length >= 3,
    {
      message:
        "Must be a valid email or a username with at least 3 characters.",
      path: ["identifier"],
    }
  );
