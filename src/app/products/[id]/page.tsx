"use client"
import { ShoppingCart, Heart, Share2, Download } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { useEffect, useState } from "react"
import RelatedProducts from "@/components/related-products"

// This would normally be fetched from Shopify
const getProductById = (id: string) => {
  const isDigital = id.startsWith("digital-")

  return {
    id,
    name: isDigital ? "Premium UI Kit" : "Premium Wireless Headphones",
    price: isDigital ? 49.99 : 199.99,
    description: isDigital
      ? "A comprehensive UI kit with 500+ components, perfect for designers and developers looking to create beautiful interfaces quickly."
      : "Experience crystal-clear sound with our premium wireless headphones. Featuring noise-cancellation technology, comfortable ear cushions, and a long-lasting battery, these headphones are perfect for music lovers and professionals alike.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    image: "/placeholder.svg?height=600&width=600", 
    category: isDigital ? "Digital Products" : "Electronics",
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
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    if (product.isDigital && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to purchase digital products.",
      })
      router.push("/auth/login")
      return
    }

    addToCart(product)
    router.push("/checkout")
  }

  if (!mounted) return null

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
                url: `https://shopdrop.com/products/${product.id}`,
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

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* {product.isDigital && (
                <Badge className="absolute top-4 right-4 bg-[#663399]">
                  <Download className="h-3 w-3 mr-1" />
                  Digital Product
                </Badge>
              )} */}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md border bg-white">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

            

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.isDigital && (
              <div>
                <h3 className="font-medium mb-2">File Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Format:</span> {product.fileFormat}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span> {product.fileSize}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Access:</span> Instant download after purchase
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {product.isDigital ? (
                <button className="flex-1 bg-[#663399] hover:bg-[#563289]" onClick={handleBuyNow}>
                  <Download className="mr-2 h-4 w-4" />
                  Buy Now
                </button>
              ) : (
                <>
                  <button className="flex-1 bg-[#663399] hover:bg-[#563289]" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                  <button className="flex-1" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </>
              )}
              <button>
                <Heart className="h-4 w-4" />
              </button>
              <button>
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                {!product.isDigital && " · Usually ships within 1-2 business days"}
                {product.isDigital && " · Available for immediate download after purchase"}
              </p>
            </div>
          </div>
        </div>

        

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <RelatedProducts />
        </div>
      </div>
    </>
  )
}
