import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hasExternalOtelApiPackage } from "next/dist/build/webpack-config";

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
export const generateToken = async (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET!, { expiresIn: "7d" });
};

// Hash Password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare Password
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
