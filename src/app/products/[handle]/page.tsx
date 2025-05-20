"use client"
import { useState, useEffect, use } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import FadeIn from "@/components/animations/fade-in"
import { Download, Heart, Share2, ShoppingCart } from "lucide-react"

// This would be replaced with a real API call to fetch product by handle
const fetchProductByHandle = async (handle: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const isDigital = handle.includes("digital")

  return {
    id: handle,
    handle,
    name: isDigital ? "Premium UI Kit" : "Premium Wireless Headphones",
    price: isDigital ? 49.99 : 199.99,
    description: isDigital
      ? "A comprehensive UI kit with 500+ components, perfect for designers and developers looking to create beautiful interfaces quickly."
      : "Experience crystal-clear sound with our premium wireless headphones. Featuring noise-cancellation technology, comfortable ear cushions, and a long-lasting battery, these headphones are perfect for music lovers and professionals alike.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    features: isDigital
      ? [
          "500+ UI Components",
          "Figma and Sketch files included",
          "Responsive design system",
          "Dark and light mode",
          "Regular updates",
        ]
      : [
          "Active Noise Cancellation",
          "40-hour Battery Life",
          "Bluetooth 5.0 Connectivity",
          "Premium Sound Quality",
          "Comfortable Design for Extended Wear",
        ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isDigital,
    fileSize: isDigital ? "245 MB" : undefined,
    fileFormat: isDigital ? "ZIP" : undefined,
    variants: [
      {
        id: `${handle}-variant-1`,
        title: "Default",
        price: isDigital ? 49.99 : 199.99,
        availableForSale: true,
      },
    ],
  }
}

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")
  const [addingToCart, setAddingToCart] = useState(false)
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductByHandle(handle)
        setProduct(productData)
        setSelectedImage(productData.images[0])
      } catch (error) {
        console.error("Error loading product:", error)
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [handle, toast])

  const handleAddToCart = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      // Get the first variant or use the product ID
      const variantId = product.variants && product.variants.length > 0 ? product.variants[0].id : product.id

      await addToCart(variantId, 1)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        variant: "success",
      })
    } catch (error) {
      // Error is handled by the cart store
    } finally {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    if (!product) return

    if (product.isDigital && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to purchase digital products.",
        variant: "error",
      })
      router.push("/auth/login")
      return
    }

    setAddingToCart(true)
    try {
      // Get the first variant or use the product ID
      const variantId = product.variants && product.variants.length > 0 ? product.variants[0].id : product.id

      await addToCart(variantId, 1)

      // Redirect to checkout
      window.location.href = "/api/shopify/checkout"
    } catch (error) {
      // Error is handled by the cart store
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.svg
          className="h-12 w-12 text-[#663399]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </motion.svg>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
        <motion.button
          className="mt-6 bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
          onClick={() => router.push("/products")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Products
        </motion.button>
      </div>
    )
  }

  return (
    <>
      {/* Client-side metadata for dynamic product pages */}
      <Head>
        <title>{`${product.name} | ShopDrop`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} | ShopDrop`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="USD" />
        {/* Product structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: product.images,
              description: product.description,
              brand: {
                "@type": "Brand",
                name: "ShopDrop",
              },
              offers: {
                "@type": "Offer",
                url: `https://shopdrop.com/products/${product.handle}`,
                priceCurrency: "USD",
                price: product.price,
                availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews,
              },
            }),
          }}
        />
      </Head>

          
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <FadeIn>
              <motion.div
                className="relative aspect-square overflow-hidden rounded-lg border bg-white"
                layoutId={`product-image-${product.id}`}
              >
                <motion.img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={selectedImage} // This forces a re-render when the image changes
                />
                {product.isDigital && (
                  <motion.span
                    className="absolute top-4 right-4 bg-[#663399] text-white text-xs px-2 py-1 rounded-full flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Digital Product
                  </motion.span>
                )}
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, i: number) => (
                  <motion.div
                    key={i}
                    className={`relative aspect-square overflow-hidden rounded-md border bg-white cursor-pointer ${
                      selectedImage === image ? "ring-2 ring-[#663399]" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${i + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="space-y-6">
            <FadeIn direction="right">
              <div>
                <motion.h1
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {product.name}
                </motion.h1>
                <motion.div
                  className="flex items-center gap-2 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <motion.div
                className="text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ${product.price.toFixed(2)}
              </motion.div>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="border-t border-b py-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </FadeIn>

            {product.isDigital && (
              <FadeIn direction="right" delay={0.4}>
                <div>
                  <h3 className="font-medium mb-2">File Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Format:</span> {product.fileFormat}
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span> {product.fileSize}
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Access:</span> Instant download after purchase
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn direction="right" delay={0.5}>
              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {product.features.map((feature: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3">
                {product.isDigital ? (
                  <motion.button
                    onClick={handleBuyNow}
                    disabled={addingToCart}
                    className="flex-1 bg-[#663399] hover:bg-[#563289] text-white py-3 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {addingToCart ? (
                      <>
                        <motion.svg
                          className="mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="flex-1 bg-[#663399] hover:bg-[#563289] text-white py-3 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {addingToCart ? (
                        <>
                          <motion.svg
                            className="mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={handleBuyNow}
                      disabled={addingToCart}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                    </motion.button>
                  </>
                )}
                <motion.button
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
                <motion.button
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.7}>
              <div className="text-sm text-gray-500">
                <p>
                  <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {!product.isDigital && " · Usually ships within 1-2 business days"}
                  {product.isDigital && " · Available for immediate download after purchase"}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="border-t my-12"></div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Related products would be rendered here */}
            <p className="col-span-full text-center text-gray-500 py-8">Loading related products...</p>
          </div>
        </div>
      </div>
    </>
  )
}
