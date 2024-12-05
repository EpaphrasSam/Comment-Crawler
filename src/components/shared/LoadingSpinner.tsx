'use client'

import { Spinner } from "@nextui-org/react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Spinner size={size} color="primary" />
    </div>
  )
}
