'use client'

import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export const SectionHeader = ({ 
  title, 
  description, 
  action,
  className = "" 
}: SectionHeaderProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="mt-2 text-secondary-600 dark:text-secondary-400">
          {description}
        </p>
      )}
    </div>
  )
}
