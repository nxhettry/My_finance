import { NextRequest, NextResponse } from "next/server";
import { GenerateToken } from "@/utils/GenerateToken";
import User, { IUser } from "@/models/model.user";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/connectDb";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();

  const userData = {
    email: identifier,
    password: password,
  };

  try {
    await connectDb();

    const newUser: IUser = new User({
      email: userData.email,
      password: await bcrypt.hash(userData.password, 10),
      username: userData.email.slice(0, userData.email.indexOf("@")),
      created_at: new Date(),
    });

    await newUser.save();

    const token = GenerateToken(newUser);

    const response = NextResponse.json(
      { success: true, message: "Created new user successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to create a new User" },
      { status: 500 }
    );
  }
}
