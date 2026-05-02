import type { AIMessage } from '@/types'
import { Bot, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: AIMessage
  index: number
  isError?: boolean
}

export function ChatMessage({ message, index, isError = false }: ChatMessageProps) {
  const messageId = `MSG-${String(index).padStart(4, '0')}`
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      {/* Message ID */}
      <span className="font-mono text-xs opacity-50 px-1">
        {messageId}
      </span>

      {/* Message Bubble */}
      <div
        className={cn(
          'border-2 border-foreground rounded-none px-4 py-3 max-w-[70%] md:max-w-[85%]',
          'shadow-[2px_2px_0px_0px_hsl(var(--foreground))]',
          isUser && 'bg-primary text-primary-foreground',
          isAssistant && !isError && 'bg-muted text-foreground',
          isError && 'bg-destructive text-destructive-foreground border-destructive'
        )}
      >
        {/* Assistant Icon */}
        {isAssistant && !isError && (
          <Bot className="inline mr-2 mb-1" size={16} />
        )}

        {/* Error Icon */}
        {isError && (
          <AlertTriangle className="inline mr-2 mb-1" size={16} />
        )}

        {/* Message Content */}
        <span className="font-mono text-sm whitespace-pre-wrap break-words">
          {message.content as string}
        </span>
      </div>
    </div>
  )
}

// Made with Bob