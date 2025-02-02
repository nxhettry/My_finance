"use server";

import { signUpSchema } from "@/zod/sign-up.schema";
import { UserService } from "@/src/domain/service/UserService";
import { UserRepository } from "@/src/infrastructure/repository/UserRepository";
import { redirect } from "next/navigation";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

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

    const userExist = await userService.findByEmail(email as string);

    if (userExist !== null) {
      console.log("Yaha 1");
      throw new Error("User already exists");
    }

    await userService.save({
      email: email as string,
      password: password as string,
    });
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/sign-in");
};
