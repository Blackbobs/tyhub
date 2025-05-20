import type { Metadata } from "next"

export const defaultMetadata: Metadata = {
  title: {
    default: "ShopDrop | Premium Products for Your Lifestyle",
    template: "%s | ShopDrop",
  },
  description:
    "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
  keywords: ["ecommerce", "online shopping", "dropshipping", "digital products", "electronics", "lifestyle products"],
  authors: [{ name: "ShopDrop" }],
  creator: "ShopDrop",
  publisher: "ShopDrop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shopdrop.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shopdrop.com",
    title: "ShopDrop | Premium Products for Your Lifestyle",
    description:
      "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
    siteName: "ShopDrop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShopDrop - Premium Products for Your Lifestyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopDrop | Premium Products for Your Lifestyle",
    description:
      "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
    images: ["/og-image.jpg"],
    creator: "@shopdrop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
}
