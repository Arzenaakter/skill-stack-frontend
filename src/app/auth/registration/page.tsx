"use client";
import { server } from "@/config/server";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterInput>();
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    const res = await fetch(`${server}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    try {
      if (res.ok) {
        const user = await res.json();
        console.log("Registration successful:", user);
        router.push("/auth/login");
      } else {
        const error = await res.json();
        console.error("Registration failed:", error);
        alert("Registration failed: " + error.message);
      }
    } catch (error) {
      console.error("Error parsing registration response:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="input" />
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="input"
        />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="input"
        />
        <button className="btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

// Pa$$w0rd!;
