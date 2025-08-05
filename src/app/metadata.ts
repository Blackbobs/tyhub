import type { Metadata } from "next"

export const defaultMetadata: Metadata = {
  title: {
    default: "TyHub | Premium Products for Your Lifestyle",
    template: "%s | TyHub",
  },
  description:
    "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
  keywords: ["ecommerce", "online shopping", "dropshipping", "digital products", "electronics", "lifestyle products"],
  authors: [{ name: "TyHub" }],
  creator: "TyHub",
  publisher: "TyHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://TyHub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://TyHub.com",
    title: "TyHub | Premium Products for Your Lifestyle",
    description:
      "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
    siteName: "TyHub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TyHub - Premium Products for Your Lifestyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TyHub | Premium Products for Your Lifestyle",
    description:
      "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
    images: ["/og-image.jpg"],
    creator: "@TyHub",
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
