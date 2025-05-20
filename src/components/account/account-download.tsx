"use client"

import Link from "next/link"
import { useAuthStore } from "@/lib/auth-store"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Mock digital product data - in a real app, this would come from an API
const mockDownloads = [
  {
    id: "DL-123456",
    name: "Premium UI Kit",
    description: "A comprehensive UI kit with 500+ components",
    purchaseDate: "April 12, 2023",
    expiryDate: "Lifetime access",
    fileSize: "245 MB",
    fileType: "ZIP",
    downloadUrl: "#",
  },
  {
    id: "DL-123457",
    name: "Digital Marketing eBook",
    description: "Learn the latest digital marketing strategies",
    purchaseDate: "March 28, 2023",
    expiryDate: "Lifetime access",
    fileSize: "15 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "DL-123458",
    name: "Stock Photo Collection",
    description: "100 high-resolution stock photos",
    purchaseDate: "February 15, 2023",
    expiryDate: "Lifetime access",
    fileSize: "1.2 GB",
    fileType: "ZIP",
    downloadUrl: "#",
  },
]

export default function AccountDownloads() {
  const { user } = useAuthStore()
  const prefersReducedMotion = useReducedMotion()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Downloads</h2>
      </div>

      {mockDownloads.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">You haven&apos;t purchased any digital products yet</h3>
          <p className="text-gray-500 mb-4">Once you purchase a digital product, it will appear here.</p>
          <Link href="/products">
            <motion.button
              className="bg-[#663399] hover:bg-[#563289] text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Digital Products
            </motion.button>
          </Link>
        </div>
      ) : (
        <motion.div
          className="grid gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {mockDownloads.map((download) => (
            <motion.div
              key={download.id}
              className="border rounded-lg overflow-hidden shadow-sm"
              variants={
                prefersReducedMotion
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }
              }
            >
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-[#663399]/10 text-[#663399] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{download.name}</h3>
                      <p className="text-sm text-gray-500">{download.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Purchase Date</p>
                    <p className="font-medium">{download.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Access</p>
                    <p className="font-medium">{download.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">File Details</p>
                    <p className="font-medium">
                      {download.fileType} • {download.fileSize}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t p-4">
                <motion.button
                  className="px-4 py-2 bg-[#663399] hover:bg-[#563289] text-white rounded flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
