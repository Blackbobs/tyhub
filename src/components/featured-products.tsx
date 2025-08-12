"use client";

import { useProducts } from "@/hooks/use-product";
import ProductCard from "./product-card";
import { Loader2, PackageX } from "lucide-react";

export default function FeaturedProducts() {
  const { data: products = [], isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-12 text-red-500">
        {error instanceof Error
          ? error.message
          : "Failed to load featured products"}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <PackageX className="w-10 h-10 mb-2" />
        <p>No products available at the moment.</p>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
}
