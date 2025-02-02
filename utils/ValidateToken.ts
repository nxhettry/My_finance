import jwt from "jsonwebtoken";

export const ValidateToken = (token: string) => {
  if (!token) return false;

  if (process.env.jWT_SECRET === undefined)
    throw new Error("JWT_SECRET is not defined");

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    const decoded = jwt.verify(token, secret);
    return Boolean(decoded);
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
