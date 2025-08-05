"use client";

import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { Loader2, PackageX } from "lucide-react";
import { getProducts, Product } from "@/services/product.service";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getProducts();
        setProducts(featuredProducts.slice(0, 4)); 
      } catch (err) {
        setError("Failed to load featured products");
        console.error("Error loading featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12 text-red-500">
        {error}
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
}