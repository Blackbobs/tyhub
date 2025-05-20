"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SearchInput from "./search-input"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <span className="text-xl font-bold text-[#663399]">ShopDrop</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium py-2 hover:text-[#663399]">
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-[#663399]"
          >
            Products
          </Link>
          <Link
            href="/categories"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-[#663399]"
          >
            Categories
          </Link>
          <div className="border-t my-2 pt-2">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="text-lg font-medium py-2 hover:text-[#663399]"
            >
              My Account
            </Link>
            <Link
              href="/account?tab=downloads"
              onClick={() => setOpen(false)}
              className="text-lg font-medium py-2 hover:text-[#663399]"
            >
              My Downloads
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t mobile-search-input">
            <SearchInput />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
