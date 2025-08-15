"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosConfig from "@/utils/axios-config";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/context/toast-context";
import { AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { setUser } = useAuthStore();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await axiosConfig.post('/users/signin', data);

      localStorage.setItem('accessToken', response.data.accessToken);
      setUser(response.data.user);

      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "success",
      });

      router.push('/');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;

      let errorMessage = "An error occurred while logging in.";

      if (axiosError?.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (axiosError?.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "error",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-12 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to continue
            </p>
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto my-3">
              <Lock className="w-10 h-10 text-[#663399]" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <Mail className="text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <Lock className="text-gray-500" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#663399] text-white py-3 rounded-full my-5 font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Create account link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="text-[#663399] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
