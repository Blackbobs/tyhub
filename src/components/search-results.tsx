"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/search-store";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Mock product data - in a real app, this would come from your API or Shopify
const allProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Fitness Tracker",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Fitness",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Smart Home Hub",
    price: 179.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smart Home",
  },
  {
    id: "digital-1",
    name: "Premium UI Kit",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Digital Products",
    isDigital: true,
  },
  {
    id: "digital-2",
    name: "Digital Marketing eBook",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Digital Products",
    isDigital: true,
  },
];

export default function SearchResults() {
  const { searchQuery, isSearching, setIsSearching } = useSearchStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [results, setResults] = useState<typeof allProducts>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (debouncedSearchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
      );
      setResults(filteredProducts);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery]);

  if (!isSearching || debouncedSearchQuery.length < 2) return null;

  const handleResultClick = (productId: string) => {
    setIsSearching(false);
    router.push(`/products/${productId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -10 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full left-0 right-0 mt-1 z-50 max-h-[400px] overflow-auto bg-white rounded-lg shadow-lg border"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={prefersReducedMotion ? {} : containerVariants}
      >
        <div className="p-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <motion.svg
                className="h-6 w-6 text-[#663399]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </motion.svg>
            </div>
          ) : results.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              No products found for "{debouncedSearchQuery}"
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleResultClick(product.id)}
                  variants={prefersReducedMotion ? {} : itemVariants}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="font-medium">${product.price.toFixed(2)}</div>
                </motion.div>
              ))}
              <div className="pt-2 pb-1 text-center border-t">
                <Link
                  href={`/products?search=${encodeURIComponent(
                    debouncedSearchQuery
                  )}`}
                  className="text-sm text-[#663399] hover:underline"
                  onClick={() => setIsSearching(false)}
                >
                  View all results
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
