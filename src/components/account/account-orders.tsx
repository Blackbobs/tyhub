"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: "ORD-123456",
    date: "April 12, 2023",
    status: "Delivered",
    total: 249.99,
    items: [
      { id: "1", name: "Wireless Headphones", quantity: 1, price: 199.99 },
      { id: "8", name: "Portable Charger", quantity: 1, price: 49.99 },
    ],
  },
  {
    id: "ORD-123457",
    date: "March 28, 2023",
    status: "Processing",
    total: 129.99,
    items: [{ id: "3", name: "Bluetooth Speaker", quantity: 1, price: 129.99 }],
  },
  {
    id: "ORD-123458",
    date: "February 15, 2023",
    status: "Delivered",
    total: 349.98,
    items: [
      { id: "2", name: "Smart Watch", quantity: 1, price: 249.99 },
      { id: "5", name: "Wireless Earbuds", quantity: 1, price: 99.99 },
    ],
  },
];

export default function AccountOrders() {
  const { user } = useAuthStore();
  const prefersReducedMotion = useReducedMotion();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Orders</h2>
      </div>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">
            You haven&apos;t placed any orders yet
          </h3>
          <p className="text-gray-500 mb-4">
            Once you place an order, it will appear here.
          </p>
          <Link href="/products">
            <motion.button
              className="bg-[#663399] hover:bg-[#563289] text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.button>
          </Link>
        </div>
      ) : (
        <motion.div
          className="grid gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {mockOrders.map((order) => (
            <motion.div
              key={order.id}
              className="border rounded-lg overflow-hidden shadow-sm"
              variants={
                prefersReducedMotion
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }
              }
            >
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {order.date}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            {item.id}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-t p-4">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Track Order
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 text-sm bg-[#663399] hover:bg-[#563289] text-white rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
