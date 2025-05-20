"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Shopify checkout
    window.location.href = "/api/shopify/checkout"
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
      <svg
        className="animate-spin h-12 w-12 text-[#663399] mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <h1 className="text-2xl font-bold mb-4">Redirecting to Checkout</h1>
      <p className="text-gray-500 mb-6 text-center">
        You are being redirected to our secure checkout page. Please wait...
      </p>
      <button
        className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
        onClick={() => (window.location.href = "/api/shopify/checkout")}
      >
        Click here if you are not redirected automatically
      </button>
    </div>
  )
}
