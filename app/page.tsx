import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex gap-12">
        <Link href="/sign-in" className="px-3 py-2 rounded-lg bg-blue-400 hover:bg-blue-500">
          Login
        </Link>
        <Link href="/sign-up" className="px-3 py-2 rounded-lg bg-blue-400 hover:bg-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
