"use server";

import User from "@/models/model.user";
import { signUpSchema } from "@/zod/sign-up.schema";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/connectDb";

export const registerUser = async (formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const isValid = signUpSchema.parse({ email, password });

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    await connectDb();

    const userExist = await User.find({ email: email });

    if (userExist.length > 0) {
      throw new Error("User already exist");
    }

    await User.create({
      email: email,
      password: await bcrypt.hash(password as string, 10),
      username: (email as string).split("@")[0],
    });
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/sign-in");
};
