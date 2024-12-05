'use client'

import { Chip } from "@nextui-org/react"
import { CheckCircle2, AlertCircle, Clock, XCircle } from "lucide-react"

type StatusType = 'success' | 'error' | 'warning' | 'pending'

interface StatusIndicatorProps {
  status: StatusType
  text?: string
  className?: string
}

const statusConfig = {
  success: {
    color: 'success' as const,
    icon: CheckCircle2,
    defaultText: 'Success'
  },
  error: {
    color: 'danger' as const,
    icon: XCircle,
    defaultText: 'Error'
  },
  warning: {
    color: 'warning' as const,
    icon: AlertCircle,
    defaultText: 'Warning'
  },
  pending: {
    color: 'primary' as const,
    icon: Clock,
    defaultText: 'Pending'
  }
}

export const StatusIndicator = ({ status, text, className = "" }: StatusIndicatorProps) => {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Chip
      startContent={<Icon className="h-4 w-4" />}
      color={config.color}
      variant="flat"
      className={className}
    >
      {text || config.defaultText}
    </Chip>
  )
}
