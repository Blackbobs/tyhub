"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosConfig from "@/utils/axios-config";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
   const { setUser } = useAuthStore();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await axiosConfig.post('/users/signin', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      setUser(response.data.user);
      router.push('/');
    } catch (error) {
      setIsLoading(false)
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="border-2 rounded-md p-2 border-[#663399]"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            className="border-2 rounded-md p-2 border-[#663399]"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 rounded-md text-white bg-[#663399] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}