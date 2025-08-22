"use client";
import { server } from "@/config/server";
import { loginSuccess } from "@/lib/store/features/user/userSlice";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type LoginInput = {
  email: string;
  password: string;
  token?: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginInput) => {
    const res = await fetch(`${server}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    try {
      if (res && res.ok) {
        const result = await res.json();
        dispatch(loginSuccess({ user: result.user, token: result.token }));
        toast.success("Login successful");
        router.push("/");
      } else {
        const result = await res.json();
        toast.error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Pa$$w0rd!;

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
