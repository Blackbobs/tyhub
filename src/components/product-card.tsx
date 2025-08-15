"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Loader2, ShoppingBag } from "lucide-react";
import { Product } from "@/services/product.service";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/context/toast-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isMutating } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You must be logged in to add products to your cart.",
        variant: "warning",
      });
      router.push("/auth/login");
      return;
    }

    try {
      await addToCart({ productId: product._id, quantity: 1 });
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
        variant: "success",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "error",
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : cardVariants}
      custom={index}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product._id}`}>
        <div className="aspect-square relative overflow-hidden">
          <motion.img
            src={product.images?.[0]?.url || "/placeholder.svg"}
            alt={product.title}
            className="object-cover w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          {product.type === "digital" && (
            <span className="absolute top-2 right-2 bg-[#663399] text-white text-xs px-2 py-1 rounded-full">
              Digital
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">
          {product.type === "digital" ? "Digital Product" : "Physical Product"}
        </div>
        <Link href={`/products/${product._id}`} className="hover:underline">
          <h3 className="font-medium text-lg mb-2 line-clamp-1 text-[#171717]">
            {product.title}
          </h3>
        </Link>
        <div className="font-bold mb-4 text-[#171717]">
          ${product.price.toFixed(2)}
        </div>
        <motion.button
          onClick={handleAddToCart}
          disabled={
            isMutating || (product.type === "physical" && product.stock === 0)
          }
          className="w-full bg-[#663399] hover:bg-[#563289] text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.6 }}
        >
          {isMutating ? (
            <>
              <motion.span
                className="inline-block mr-2"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Loader2 className="h-4 w-4" />
              </motion.span>
              Adding...
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
