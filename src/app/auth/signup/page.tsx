"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "@/utils/axios-config";
import { AxiosError } from "axios";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const signupMutation = useMutation({
    mutationFn: async (userData: Omit<FormData, "confirmPassword">) => {
      const response = await axiosConfig.post("/users/signup", userData);
      return response.data;
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    try {
      const { password, email, username, address } = data;
      const userData = { password, email, username, address };
      const res = await signupMutation.mutateAsync(userData);

      localStorage.setItem("accessToken", res.token);
      setUser(res.user);

      toast({
        title: "Account created successfully",
        description: "You have been signed in.",
      });

      router.push("/");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;

      let errorMessage = "An error occurred while creating your account.";

      if (axiosError?.response?.status === 409) {
        errorMessage = "Email already in use. Please use a different email.";
      } else if (axiosError?.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }

      toast({
        title: "Signup failed",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-5">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#663399]">
            Create an account
          </h1>
          <p className="text-muted-foreground text-gray-500">
            Enter your information to create an account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Full Name</label>
            <input
              id="username"
              {...register("username", { required: true })}
              className="border-2 rounded-md p-2 border-[#663399] bg-transparent focus:outline-none"
              placeholder="John Doe"
            />
            {errors.username && (
              <span className="text-sm text-red-500">
                Full name is required
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="border-2 rounded-md p-2 border-[#663399] bg-transparent focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="relative border-2 rounded-md border-[#663399]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="bg-transparent p-2 w-full focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              className="border-2 rounded-md p-2 border-[#663399] bg-transparent focus:outline-none"
              placeholder="••••••••"
            />
            {watch("password") &&
              watch("password") !== watch("confirmPassword") && (
                <span className="text-sm text-red-500">
                  Passwords do not match
                </span>
              )}
          </div>

          {/* Address (optional) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address (optional)</label>
            <input
              id="address"
              {...register("address")}
              className="border-2 rounded-md p-2 border-[#663399] bg-transparent focus:outline-none"
              placeholder="123 Main Street"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-[#663399] hover:bg-[#563289] font-semibold disabled:opacity-50"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#663399] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
