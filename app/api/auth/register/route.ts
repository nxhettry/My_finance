import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { validateRegister } from "@/utils/validation";
import { createUser, findUserByEmail } from "@/services/userService";
import { generateToken, hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectDB();
    validateRegister(email, password);

    if (await findUserByEmail(email)) {
      return NextResponse.json(
        {
          error: "User already exist",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(email, hashedPassword);
    const token = await generateToken(newUser._id);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 }
    );
  }
}
