import bcrypt from "bcryptjs";

export const ValidatePassword = async (input: string, password: string) => {
  const isValidPassword = await bcrypt.compare(input, password);

  return isValidPassword;
};
