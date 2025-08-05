"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function OrderSuccessContent() {
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
      <p className="mb-6">
        Thank you for your purchase. We&apos;ve sent a confirmation to your
        email.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/account"
          className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-6 rounded"
        >
          View Orders
        </Link>
        <Link
          href="/products"
          className="border border-[#663399] text-[#663399] py-2 px-6 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin h-12 w-12 text-[#663399]" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
