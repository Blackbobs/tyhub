"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "@/utils/axios-config";
import { AxiosError } from "axios";
import { useToast } from "@/context/toast-context";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
        variant: "error",
      });
      return;
    }

    try {
      const { password, email, username } = data;
      const userData = { password, email, username };
      const res = await signupMutation.mutateAsync(userData);

      localStorage.setItem("accessToken", res.token);
      setUser(res.user);

      toast({
        title: "Account created successfully",
        description: "You have been signed in.",
        variant: "success",
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
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-12 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold text-gray-900">
              Create an Account
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <User className="text-gray-500" />
                <input
                  id="username"
                  {...register("username", {
                    required: "Full name is required",
                  })}
                  placeholder="John Doe"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <Mail className="text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 relative focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="w-full focus:outline-none bg-transparent pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-300 rounded-full p-3 focus-within:ring-2 focus-within:ring-[#663399] focus-within:border-[#663399] transition">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              {watch("password") &&
                watch("password") !== watch("confirmPassword") && (
                  <p className="text-sm text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

         

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#663399] text-white py-3 rounded-full my-5 font-medium disabled:opacity-50"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#663399] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
