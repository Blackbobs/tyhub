import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-[#663399]">TyHub</span>
            </Link>
            <p className="text-gray-500 mb-4 max-w-xs">
              Your one-stop shop for premium gym products delivered directly to your doorstep.
            </p>
          </div>

          {/* Essential Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-[#663399]">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-500 hover:text-[#663399]">
                  My Account
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

          {/* Legal Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:text-[#663399]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-500 hover:text-[#663399]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-[#663399]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center text-sm">&copy; {new Date().getFullYear()} TyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}