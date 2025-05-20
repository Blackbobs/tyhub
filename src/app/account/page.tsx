"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"

export default function AccountPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <button
          onClick={() => {
            useAuthStore.getState().logout()
            router.push("/")
          }}
        >
          Sign Out
        </button>
      </div>

      {/* <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="account">Account Details</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <AccountOrders />
        </TabsContent>

        <TabsContent value="downloads" className="space-y-4">
          <AccountDownloads />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <AccountDetails />
        </TabsContent>
      </Tabs> */}
    </div>
  )
}
