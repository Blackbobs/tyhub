"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="mb-6">Thank you for your purchase. We've sent a confirmation to your email.</p>
      <div className="flex justify-center gap-4">
        <a
          href="/account/orders"
          className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-6 rounded"
        >
          View Orders
        </a>
        <a
          href="/products"
          className="border border-[#663399] text-[#663399] py-2 px-6 rounded"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}