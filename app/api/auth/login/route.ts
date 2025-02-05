import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/services/userService";
import { comparePassword, generateToken } from "@/lib/auth";
import { validateLogin } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectDB();
    validateLogin(email, password);
    console.log("fixed");


    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          error: "User doesnot exist",
        },
        { status: 400 }
      );
    }

    if (!(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const token = await generateToken(user._id);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 }
    );
  }
}
