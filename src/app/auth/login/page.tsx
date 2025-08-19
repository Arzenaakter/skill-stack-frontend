"use client";
import { server } from "@/config/server";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type LoginInput = {
  email: string;
  password: string;
  token?: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    // });

    const res = await fetch(`${server}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Response from signIn:", res);
    try {
      if (res.ok) {
        console.log("Login successful:", res);
        router.push("/");
      } else {
        console.error("Login failed:", res);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="input" />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="input"
        />
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
