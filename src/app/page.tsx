import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import Newsletter from "@/components/newsletter"
import type { Metadata } from "next"
import FeaturedProducts from "@/components/featured-products"
import AuthGuard from "@/lib/auth-guard"


export const metadata: Metadata = {
  title: "HubDigital | Premium Products for Your Lifestyle",
  description:
    "Discover our handpicked selection of premium products, curated just for you. Fast shipping and secure checkout.",
  openGraph: {
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "HubDigital - Premium Products for Your Lifestyle",
      },
    ],
  },
}

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col bg-[#ffffff]">
        <HeroSection />

        <section className="container px-4 py-12 md:py-16 lg:py-24" id="featured">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4 text-[#171717]">Featured Products</h2>
            <p className="text-[#171717] max-w-[700px]">
              Discover our handpicked selection of premium products, curated just for you.
            </p>
          </div>
          <FeaturedProducts />
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <button className="bg-[#663399] hover:bg-[#563289] text-white flex items-center gap-1 font-semibold py-3 px-5 rounded">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Products
              </button>
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-16 lg:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#663399]"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Quality Products</h3>
                <p className="text-muted-foreground">We source only the highest quality products for our customers.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#663399]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">Your transactions are protected with industry-leading security.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#663399]"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M6 8h.01"></path>
                    <path d="M10 8h.01"></path>
                    <path d="M14 8h.01"></path>
                    <path d="M18 8h.01"></path>
                    <path d="M8 12h.01"></path>
                    <path d="M12 12h.01"></path>
                    <path d="M16 12h.01"></path>
                    <path d="M7 16h10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">We deliver your orders quickly and efficiently worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </AuthGuard>
  )
}