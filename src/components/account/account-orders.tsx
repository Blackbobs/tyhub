'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Order } from '@/interface/order';
import { formatDate } from '@/utils/format-date';

interface AccountOrdersProps {
  orders: Order[];
  isLoading: boolean;
  error?: Error | null;
}

export default function AccountOrders({
  orders,
  isLoading,
  error,
}: AccountOrdersProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading orders: {error.message}</p>
        <Link href="/account" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          Try again
        </Link>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">
          You haven't placed any orders yet
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

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Orders</h2>

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
            key={order._id}
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
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={`${order._id}-${item.product._id}`}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      {item.product.images?.[0]?.url ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            {item.product.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} • ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between border-t p-4">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
              </div>
              {/* <div className="flex gap-2">
                <Link href={`/account/orders/${order._id}`}>
                  <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100 transition">
                    View Details
                  </button>
                </Link>
              </div> */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}