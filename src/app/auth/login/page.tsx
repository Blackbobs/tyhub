"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "@/utils/axios-config";
import { useState } from "react";
import Head from "next/head";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (credentials: FormData) => {
      const response = await axiosConfig.post('/users/signin', credentials);
      return response.data;
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginMutation.mutateAsync(data);
        

      // Store the access token
      localStorage.setItem('accessToken', res.accessToken);
      
      // Update auth store
      setUser(res.user);
      
      // Show success message
      toast({
        title: "Login successful",
        description: "You have been signed in.",
      });
      
      // Redirect to home page or intended page
      router.push('/');
    } catch (error: any) {
      let errorMessage = "An error occurred while logging in.";
      
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        errorMessage = "Invalid email or password.";
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login | HubDigital</title>
        <meta
          name="description"
          content="Login to your ShopDrop account to access your orders, downloads, and account settings."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container max-w-md mx-auto py-12">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#663399]">Welcome back</h1>
            <p className="text-muted-foreground text-gray-500">
              Enter your credentials to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password">Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#663399]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative border-2 rounded-md border-[#663399]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
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
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full p-2 rounded-md text-white bg-[#663399] hover:bg-[#563289] font-semibold disabled:opacity-50"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#663399] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}