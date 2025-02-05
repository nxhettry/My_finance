import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/sign-up",
  "/sign-in",
  "/",
];

const EXCLUDED_PATHS = [
  /^\/_next\/.*/,
  /^\/static\/.*/,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
];

const getKey = () => new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (EXCLUDED_PATHS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = await jwtVerify(token, getKey());
    console.log(decoded);

    const res = NextResponse.next();
    res.headers.set("X-User-Id", decoded.userId);
    return res;
  } catch (error) {
    console.log("JWT Error", error);
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
