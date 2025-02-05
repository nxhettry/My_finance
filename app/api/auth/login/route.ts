import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/services/userService";
import { comparePassword, generateToken } from "@/lib/auth";
import { validateLogin } from "@/utils/validation";

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const { identifier, password } = await req.json();

    // ✅ Validate Input
    validateLogin(identifier, password);

    // 🔍 Find User by Email or Username
    const user = await findUserByEmail(identifier);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔑 Compare Passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🎟️ Generate JWT
    const token = generateToken(user._id);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
};
