import { useEffect, useRef } from 'react'
import type { AIMessage } from '@/types'
import { ChatMessage } from './ChatMessage'
import { ChatTypingIndicator } from './ChatTypingIndicator'
import { ChatEmptyState } from './ChatEmptyState'

interface ChatMessageListProps {
  messages: AIMessage[]
  isLoading: boolean
  onSuggestedQuestion: (question: string) => void
}

export function ChatMessageList({ messages, isLoading, onSuggestedQuestion }: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Filter out tool messages and empty messages
  const visibleMessages = messages.filter(msg => {
    if (msg.role === 'tool') return false
    if (!msg.content) return false
    if (typeof msg.content === 'string') {
      return msg.content.trim().length > 0
    }
    return true // Keep array content types
  })

  return (
    <div
      className="flex-1 overflow-y-auto p-6"
      role="log"
      aria-live="polite"
      aria-label="Historial de mensajes"
    >
      {visibleMessages.length === 0 ? (
        <ChatEmptyState onSuggestedQuestion={onSuggestedQuestion} />
      ) : (
        <div className="flex flex-col gap-4">
          {visibleMessages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              index={index}
            />
          ))}
          
          {isLoading && <ChatTypingIndicator />}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}

// Made with Bob