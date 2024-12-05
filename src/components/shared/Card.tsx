'use client'

import { Card as NextUICard, CardBody, CardHeader, CardFooter } from "@nextui-org/react"
import { ReactNode } from "react"

interface CustomCardProps {
  title?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
  radius?: "none" | "sm" | "md" | "lg"
  shadow?: "none" | "sm" | "md" | "lg"
  fullWidth?: boolean
  isHoverable?: boolean
  isPressable?: boolean
  isBlurred?: boolean
  isDisabled?: boolean
}

export const Card = ({ 
  title, 
  footer, 
  children, 
  className = "",
  radius = "lg",
  shadow = "sm",
  ...props 
}: CustomCardProps) => {
  return (
    <NextUICard 
      className={`bg-background border-1 border-default-200 dark:border-default-100/20 ${className}`}
      radius={radius}
      shadow={shadow}
      {...props}
    >
      {title && (
        <CardHeader>
          {title}
        </CardHeader>
      )}
      <CardBody>
        {children}
      </CardBody>
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </NextUICard>
  )
}
