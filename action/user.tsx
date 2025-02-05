"use server";
import { signUpSchema, signInSchema } from "@/zod/authSchema";
import { redirect } from "next/navigation";

export const registerUser = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    signUpSchema.parse({ email, password });

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    return;
  }

  redirect("/sign-in");
};

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    signInSchema.parse({ email, password });

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/private");
};
