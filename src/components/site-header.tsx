"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import CartSheet from "./cart-sheet"
import MobileNav from "./mobile-nav"
import UserNav from "./user-nav"
import SearchInput from "./search-input"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <MobileNav />

        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold text-[#663399]">ShopDrop</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-[#663399]">
              Home
            </Link>
            <Link href="/products" className="transition-colors hover:text-[#663399]">
              Products
            </Link>
            <Link href="/categories" className="transition-colors hover:text-[#663399]">
              Categories
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <SearchInput />
          </div>

          <CartSheet />
          <UserNav />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              const mobileSearchInput = document.querySelector(".mobile-search-input input")
              if (mobileSearchInput) {
                ;(mobileSearchInput as HTMLInputElement).focus()
              }
            }}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
