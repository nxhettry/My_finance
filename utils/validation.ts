import { signInSchema, signUpSchema } from "@/zod/authSchema";

// For Registration
export const validateRegister = (email: string, password: string) => {
  const result = signUpSchema.safeParse({ email, password });
  if (!result.success) {
    const error = result.error.errors[0];
    throw new Error(error.message);
  }
  return result.data;
};

// For Login
export const validateLogin = (email: string, password: string) => {
  const result = signInSchema.safeParse({ email, password });

  if (!result.success) {
    const error = result.error.errors[0];
    throw new Error(error.message);
  }
  return result.data;
};
