"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import CartModal from "./cart-modal";

export default function Header() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const isAuthenticated = user !== null;

  if (pathname.includes("/auth/login") || pathname.includes("/auth/signup")) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.replace("/auth/login");
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-xl font-bold text-[#663399]">
                TyHub
              </Link>
            </motion.div>
          </div>

          
          <div className="flex items-center space-x-4">
              <CartModal />
         

            {/* User menu */}
            <div className="relative">
              <motion.button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none touch-manipulation"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={prefersReducedMotion ? {} : menuVariants}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium">
                            {user?.username || user?.email}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <motion.div
                          variants={prefersReducedMotion ? {} : itemVariants}
                        >
                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          >
                            Account
                          </Link>
                        </motion.div>

                        <motion.button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          variants={prefersReducedMotion ? {} : itemVariants}
                        >
                          Log out
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.div
                          variants={prefersReducedMotion ? {} : itemVariants}
                        >
                          <Link
                            href="/auth/login"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </Link>
                        </motion.div>
                        <motion.div
                          variants={prefersReducedMotion ? {} : itemVariants}
                        >
                          <Link
                            href="/auth/signup"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          >
                            Sign Up
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
