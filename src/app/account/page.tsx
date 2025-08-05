"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import AccountOrders from "@/components/account/account-orders";
import { getUserOrders } from "@/services/user.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container py-8 md:py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Please log in to view your account
        </h1>
        <Link href="/auth/login" passHref>
          <small className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Login
          </small>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 p-4">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-500">
            Welcome back, {user?.username || user?.email}
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
        >
          Sign Out
        </button>
      </div>

      <AccountOrders orders={orders || []} isLoading={isOrdersLoading} />
    </div>
  );
}
