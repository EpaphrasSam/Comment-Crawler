'use client'

import { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@nextui-org/react"
import { RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-4 space-y-4">
          <div className="text-error text-lg font-medium">Something went wrong</div>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm text-center max-w-md">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button
            color="primary"
            variant="flat"
            startContent={<RefreshCw className="h-4 w-4" />}
            onClick={this.handleReset}
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
