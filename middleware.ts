import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/sign-up",
  "/login",
  "/",
];

const EXCLUDED_PATHS = [
  /^\/_next\/.*/,
  /^\/static\/.*/,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (EXCLUDED_PATHS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { userId: string };
    const res = NextResponse.next();
    res.headers.set("X-User-Id", decoded.userId);
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
