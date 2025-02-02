import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/connectDb";
import User from "./models/model.user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectDb();

        const userExist = await User.find({
          email: email,
        });

        if (!userExist) {
          throw new Error("User doesnot Exist");
        }

        console.log(userExist);

        return null;
      },
    }),
  ],
});
