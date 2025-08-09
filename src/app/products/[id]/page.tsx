"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import FadeIn from "@/components/animations/fade-in";
import { Download, Heart, Share2, ShoppingCart } from "lucide-react";
import RelatedProducts from "@/components/related-products";
import { Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useProduct, useRelatedProducts } from "@/hooks/use-product";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);
  const { data: relatedProducts } = useRelatedProducts(id);
  const [selectedImage, setSelectedImage] = useState("");
  const router = useRouter();
  const { addToCart, isMutating } = useCart();
  const { user } = useAuthStore(); 

  useEffect(() => {
    if (product?.images?.[0]?.url) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      await addToCart({ productId: product._id, quantity: 1 });
    } catch (error) {
      console.log(error);
    }
  };
 
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#663399]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <button
          className="mt-6 bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
          onClick={() => router.push("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${product.title} | HubDigital`}</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <FadeIn>
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
                <Image
                  src={
                    selectedImage ||
                    product.images[0]?.url
                  }
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
                {product.type === "digital" && (
                  <span className="absolute top-4 right-4 bg-[#663399] text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    Digital Product
                  </span>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    className={`relative aspect-square overflow-hidden rounded-md border bg-white ${
                      selectedImage === image.url ? "ring-2 ring-[#663399]" : ""
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.title} - Image ${i + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <FadeIn>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  {product.description}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="text-2xl font-semibold text-[#663399]">
                ${product.price.toLocaleString()}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="text-sm text-gray-500">
                {product?.stock && product.stock > 0 ? (
                  <span className="text-green-600">
                    In stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                disabled={isMutating || !product || (product.stock ?? 0) < 1}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-[#663399] hover:bg-[#563289] text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isMutating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="flex items-center gap-4 pt-4">
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                {product.type === "digital" && product.file?.url && (
                  <a
                    href={product.file.url}
                    download
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Preview
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="border-t my-12"></div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {relatedProducts && relatedProducts.length > 0 ? (
            <RelatedProducts products={relatedProducts} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No related products found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
