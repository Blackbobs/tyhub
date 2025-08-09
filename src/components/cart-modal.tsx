"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Loader2, ShoppingCart, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>(
    {}
  );
  const {
    cart,
    isLoading,
    // error,
    updateCartItem,
    removeFromCart,
    clearCart,
    isMutating,
    checkout,
    isCheckingOut,
  } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleCartClick = () => {
    if (!user) {
      router.push("/auth/login");
    } else {
      setIsOpen(true);
    }
  };



  useEffect(() => {
  if (cart?.items) {
    const initialQuantities = cart.items.reduce((acc, item) => {
      acc[item.product._id] = item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const hasChanged = Object.keys(initialQuantities).some(
      (key) => quantityInputs[key] !== initialQuantities[key]
    );

    if (hasChanged) {
      setQuantityInputs(initialQuantities);
    }
  }
}, [cart?.items, quantityInputs]);


  // Close modal when clicking outside
  useOnClickOutside(modalRef, () => setIsOpen(false));

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cartVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const cartItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const subtotal =
    cart?.items?.reduce((total, item) => {
      const quantity = quantityInputs[item.product._id] || item.quantity;
      return total + item.product.price * quantity;
    }, 0) || 0;

  const totalItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantityInputs((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartItem({ productId, quantity });
    } catch {
      // Error handling is done in the mutation
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
    } catch {
      // Error handling is done in the mutation
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch {
      // Error handling is done in the mutation
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
    } catch {
      // Error handling is done in the mutation
    }
  };

  return (
    <div>
      {/* Cart Button with Badge */}
      <motion.button
        onClick={handleCartClick}
        className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Open cart"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart className="h-6 w-6" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-[#663399] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 bg-opacity-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              ref={modalRef}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-lg flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cartVariants}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 30 }
              }
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Your Cart ({totalItems})
                </h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 text-[#663399] animate-spin" />
                  </div>
                ) : Array.isArray(cart?.items) && cart.items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="bg-gray-100 rounded-full p-6 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.3,
                      }}
                    >
                      <ShoppingCart className="h-10 w-10 text-gray-500" />
                    </motion.div>
                    <h3 className="font-medium text-lg mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {Array.isArray(cart?.items) &&
                      cart?.items.map((item) => (
                        <motion.div
                          key={item.product._id}
                          className="flex gap-4 border-b pb-4"
                          variants={cartItemVariants}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          layout
                        >
                          <div className="h-20 w-20 rounded-md overflow-hidden bg-white flex-shrink-0">
                            <motion.img
                              src={
                                item.product.images?.[0]?.url ||
                                "/placeholder.svg"
                              }
                              alt={item.product.title}
                              className="h-full w-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <Link
                                href={`/products/${item.product._id}`}
                                className="font-medium hover:underline"
                              >
                                {item.product.title}
                              </Link>
                              <motion.button
                                onClick={() =>
                                  handleRemoveItem(item.product._id)
                                }
                                className="text-gray-500 hover:text-red-500"
                                aria-label="Remove item"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <motion.button
                                  onClick={() => {
                                    const newQuantity = Math.max(
                                      1,
                                      quantityInputs[item.product._id] - 1
                                    );
                                    handleQuantityChange(
                                      item.product._id,
                                      newQuantity
                                    );
                                    handleUpdateQuantity(
                                      item.product._id,
                                      newQuantity
                                    );
                                  }}
                                  disabled={
                                    quantityInputs[item.product._id] <= 1 ||
                                    isMutating
                                  }
                                  className="px-2 py-1 border-r disabled:opacity-50"
                                  aria-label="Decrease quantity"
                                  whileHover={
                                    quantityInputs[item.product._id] > 1 &&
                                    !isMutating
                                      ? { backgroundColor: "#f3f4f6" }
                                      : {}
                                  }
                                  whileTap={
                                    quantityInputs[item.product._id] > 1 &&
                                    !isMutating
                                      ? { scale: 0.95 }
                                      : {}
                                  }
                                >
                                  -
                                </motion.button>
                                <input
                                  type="number"
                                  min="1"
                                  value={
                                    quantityInputs[item.product._id] ||
                                    item.quantity
                                  }
                                  onChange={(e) => {
                                    const newQuantity =
                                      parseInt(e.target.value) || 1;
                                    handleQuantityChange(
                                      item.product._id,
                                      newQuantity
                                    );
                                  }}
                                  onBlur={() =>
                                    handleUpdateQuantity(
                                      item.product._id,
                                      quantityInputs[item.product._id]
                                    )
                                  }
                                  className="w-12 text-center border-t border-b border-gray-300 py-1 px-2"
                                  disabled={isMutating}
                                />
                                <motion.button
                                  onClick={() => {
                                    const newQuantity =
                                      (quantityInputs[item.product._id] ||
                                        item.quantity) + 1;
                                    handleQuantityChange(
                                      item.product._id,
                                      newQuantity
                                    );
                                    handleUpdateQuantity(
                                      item.product._id,
                                      newQuantity
                                    );
                                  }}
                                  disabled={isMutating}
                                  className="px-2 py-1 border-l disabled:opacity-50"
                                  aria-label="Increase quantity"
                                  whileHover={
                                    !isMutating
                                      ? { backgroundColor: "#f3f4f6" }
                                      : {}
                                  }
                                  whileTap={!isMutating ? { scale: 0.95 } : {}}
                                >
                                  +
                                </motion.button>
                              </div>
                              <div className="font-medium">
                                $
                                {(
                                  item.product.price *
                                  (quantityInputs[item.product._id] ||
                                    item.quantity)
                                ).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {cart?.items && cart.items.length > 0 && (
                <motion.div
                  className="border-t p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <motion.span
                        className="font-medium"
                        key={subtotal}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-2 mt-2"></div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <motion.span
                        key={subtotal}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* <Link href="/checkout" passHref> */}
                    <motion.button
                      disabled={isMutating || isCheckingOut}
                      onClick={handleCheckout}
                      className="w-full bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Checkout"
                      )}
                    </motion.button>
                    {/* </Link> */}
                    <motion.button
                      onClick={handleClearCart}
                      disabled={isMutating}
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded transition-colors disabled:opacity-50"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
