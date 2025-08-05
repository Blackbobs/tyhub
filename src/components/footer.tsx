import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-[#663399]">TyFits</span>
            </Link>
            <p className="text-gray-500 mb-4 max-w-xs">
              Your one-stop shop for premium gym products delivered directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#663399]" aria-label="Facebook">
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-[#663399]" aria-label="Instagram">
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
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-[#663399]" aria-label="Twitter">
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-[#663399]">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-500 hover:text-[#663399]">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account?tab=orders" className="text-gray-500 hover:text-[#663399]">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/account?tab=downloads" className="text-gray-500 hover:text-[#663399]">
                  My Downloads
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-500 hover:text-[#663399]">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-gray-500 hover:text-[#663399]">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#!" className="text-gray-500 hover:text-[#663399]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} HubDigital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
