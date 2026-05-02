import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ChatContainerProps {
  children: ReactNode
  className?: string
}

export function ChatContainer({ children, className }: ChatContainerProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] pt-20 p-4 bg-background">
      <div
        className={cn(
          'w-[80%] max-w-5xl h-[calc(90vh-80px)]',
          'md:h-[calc(90vh-80px)]',
          'sm:w-[95%] sm:h-[calc(95vh-80px)]',
          'flex flex-col',
          'border-2 border-foreground rounded-none',
          'shadow-[4px_4px_0px_0px_hsl(var(--foreground))]',
          'bg-background',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

// Made with Bob