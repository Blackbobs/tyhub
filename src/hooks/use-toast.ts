"use client"

import { useState, useCallback } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title: string
  description?: string
  duration?: number
  variant?: ToastType
}

interface Toast extends ToastOptions {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, duration = 5000, variant = "success" }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)

    // Add toast
    setToasts((prev) => [...prev, { id, title, description, duration, variant, visible: true }])

    // Remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }, [])

  return { toast, toasts }
}
