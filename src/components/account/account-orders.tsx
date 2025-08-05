'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Order } from '@/interface/order';
import { formatDate } from '@/utils/format-date';

export default function AccountOrders({
  orders,
  // isLoading,
}: {
  orders: Order[];
  isLoading: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">
          You haven&apos;t placed any orders yet
        </h3>
        <p className="text-gray-500 mb-4">
          Once you place an order, it will appear here.
        </p>
        <Link href="/products">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  const getBadgeColor = (status: string) => {
    if (status === 'delivered') return 'bg-green-100 text-green-700';
    if (status === 'cancelled') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Orders</h2>
      </div>

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
        {orders.map((order) => (
          <motion.div
            key={order._id.toString()}
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
                  <h3 className="text-lg font-medium">
                    Order #{order._id.toString().slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getBadgeColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product._id.toString()}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          {item.product.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{item.product.title}</p>
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
                <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/account/orders/${order._id}`}>
                  <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
