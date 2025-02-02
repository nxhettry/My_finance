import jwt from "jsonwebtoken";

export const GenerateToken = ({ id, email }: { id: string; email: string }) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("No secret provided");
  }

  const token = jwt.sign({ id, email }, secret, {
    expiresIn: "1h",
  });

  return token;
};
