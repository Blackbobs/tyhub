"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/auth-store"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function AccountDetails() {
  const { user, updateUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const { toast } = useToast()
  const prefersReducedMotion = useReducedMotion()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would make an API call to update user details
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateUser({
        ...user!,
        name: formData.name,
        email: formData.email,
      })

      toast({
        title: "Account updated",
        description: "Your account details have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your account details.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPasswordLoading(true)

    try {
      // In a real app, this would make an API call to update password
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your password.",
        variant: "destructive",
      })
    } finally {
      setIsPasswordLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <motion.div
        className="border rounded-lg overflow-hidden shadow-sm"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Account Details</h3>
          <p className="text-sm text-gray-500">Update your account information</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium">
                    State/Province
                  </label>
                  <input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium">
                    ZIP/Postal Code
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="block text-sm font-medium">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t p-4">
            <motion.button
              type="submit"
              className="bg-[#663399] hover:bg-[#563289] text-white px-4 py-2 rounded disabled:opacity-50 flex items-center"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <>
                  <motion.svg
                    className="mr-2 h-4 w-4 text-white"
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      <motion.div
        className="border rounded-lg overflow-hidden shadow-sm"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Change Password</h3>
          <p className="text-sm text-gray-500">Update your password</p>
        </div>
        <form onSubmit={handlePasswordSubmit}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="block text-sm font-medium">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
              />
            </div>
          </div>
          <div className="border-t p-4">
            <motion.button
              type="submit"
              className="bg-[#663399] hover:bg-[#563289] text-white px-4 py-2 rounded disabled:opacity-50 flex items-center"
              disabled={isPasswordLoading}
              whileHover={!isPasswordLoading ? { scale: 1.05 } : {}}
              whileTap={!isPasswordLoading ? { scale: 0.95 } : {}}
            >
              {isPasswordLoading ? (
                <>
                  <motion.svg
                    className="mr-2 h-4 w-4 text-white"
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
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
