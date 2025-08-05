"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import axiosConfig from "@/utils/axios-config";
import { AxiosError } from "axios";

// Move the main logic to a separate component that will be wrapped in Suspense
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus("error");
        setMessage("Missing session ID.");
        return;
      }

      try {
        const res = await axiosConfig.get(`/checkout/verify?session_id=${sessionId}`);
        const data = res.data;
        console.log(data);

        setStatus("success");
        setMessage("Order confirmed! Thank you for your purchase.");
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message?: string }>;

        setStatus("error");
        setMessage(
          axiosError.response?.data?.message ||
            axiosError.message ||
            "An error occurred."
        );
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {status === "loading" && (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-[#663399]">
            🎉 Order Successful!
          </h1>
          <p className="mt-2 text-gray-700">{message}</p>
          <button
            onClick={() => router.push("/account/orders")}
            className="mt-6 bg-[#663399] text-white px-4 py-2 rounded hover:bg-[#563289]"
          >
            View My Orders
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-500">
            ❌ Something went wrong
          </h1>
          <p className="mt-2 text-gray-700">{message}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}

// The main page component that wraps the content in Suspense
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}