import { useState } from 'react'
import type { AIMessage } from '@/types'
import { clientAgent } from '@/functions/agent.function'
import { ChatContainer } from './ChatContainer'
import { ChatHeader } from './ChatHeader'
import { ChatMessageList } from './ChatMessageList'
import { ChatInput } from './ChatInput'
import { AlertTriangle } from 'lucide-react'
import { Navbar } from '../home'
import { toast } from 'sonner'

const MESSAGE_LIMIT = 50

export function ChatPage() {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSendMessage = messages.length < MESSAGE_LIMIT

  const handleSendMessage = async (userMessage: string) => {
    if (!canSendMessage || isLoading) return

    // Add user message
    const userMsg: AIMessage = { role: 'user', content: userMessage }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setIsLoading(true)
    setError(null)

    try {
      // Call clientAgent with conversation history
      const response = await clientAgent({
        data: {
          message: userMessage,
          conversationHistory: messages
        }
      })

      if (response.success && response.data) {
        // Append new AI messages to the conversation
        setMessages([...updatedMessages, ...response.data])
      } else {
        // Handle error response
        const errorMsg: AIMessage = {
          role: 'assistant',
          content: response.message || 'Error al procesar la consulta. Intenta de nuevo.'
        }
        setMessages([...updatedMessages, errorMsg])
        console.log(error)
        setError(response.message || 'Error desconocido')
        toast.error(response.message)
      }
    } catch (err) {
      // Handle network or unexpected errors
      const errorMsg: AIMessage = {
        role: 'assistant',
        content: 'Error de conexión. Por favor, intenta de nuevo.'
      }
      setMessages([...updatedMessages, errorMsg])
      setError('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div>
        <Navbar/>
    <ChatContainer>
      <ChatHeader />
      
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        onSuggestedQuestion={handleSuggestedQuestion}
      />

      {/* Message limit warning */}
      {messages.length >= MESSAGE_LIMIT && (
        <div className="border-t-2 border-destructive bg-destructive/10 p-4 text-center">
          <AlertTriangle className="inline mr-2 mb-1" size={20} />
          <span className="font-mono text-sm text-destructive">
            Límite de {MESSAGE_LIMIT} mensajes alcanzado. Refresca la página para continuar.
          </span>
        </div>
      )}

      <ChatInput
        onSubmit={handleSendMessage}
        disabled={!canSendMessage}
        isLoading={isLoading}
      />
    </ChatContainer>
    </div>
  )
}

// Made with Bob