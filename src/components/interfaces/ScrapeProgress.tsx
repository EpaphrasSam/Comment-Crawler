'use client'

import { Progress, Button } from "@nextui-org/react"
import { Card } from "../shared/Card"
import { StatusIndicator } from "../shared/StatusIndicator"
import { Pause, Play, StopCircle } from "lucide-react"

interface ScrapeProgressProps {
  title: string
  progress: number
  status: 'pending' | 'success' | 'error'
  commentsFound: number
  timeRemaining?: string
  isPaused?: boolean
  onPauseResume?: () => void
  onStop?: () => void
  className?: string
}

export const ScrapeProgress = ({
  title,
  progress,
  status,
  commentsFound,
  timeRemaining,
  isPaused,
  onPauseResume,
  onStop,
  className = ""
}: ScrapeProgressProps) => {
  return (
    <Card className={`${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {commentsFound} comments found
            </p>
          </div>
          <StatusIndicator status={status} />
        </div>

        <Progress
          value={progress}
          color={status === 'error' ? 'danger' : status === 'success' ? 'success' : 'primary'}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {timeRemaining && `${timeRemaining} remaining`}
          </div>

          <div className="flex items-center space-x-2">
            {onPauseResume && (
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                onClick={onPauseResume}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>
            )}
            {onStop && (
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                color="danger"
                onClick={onStop}
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
