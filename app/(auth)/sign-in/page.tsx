import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Login = async () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Enter your credentials</p>
        </div>

        <form action="" className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              type="email"
              placeholder="mail@example.com"
              id="email"
              name="email"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              type="password"
              placeholder="******"
              id="password"
              name="password"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white transition-all duration-200"
          >
            Log in
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Don{"'"}t have an account?{" "}
              <Link href="/sign-up" className="font-extrabold hover:underline">
                Sign-Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
