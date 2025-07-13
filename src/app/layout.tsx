import type React from "react";
import "./globals.css";
import Header from "@/components/header";
import type { Metadata } from "next";
import ToastContainer from "@/components/toast-container";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/providers/react-query-provider";

export const metadata: Metadata = {
  title: "HubDigital | Premium Products for Your Lifestyle",
  description:
    "Shop our curated collection of high-quality products designed to enhance your everyday life. Fast shipping and secure checkout.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#f4f4f4]">
        <ReactQueryProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
