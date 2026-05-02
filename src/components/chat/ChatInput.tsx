import { useForm } from '@tanstack/react-form'
import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ChatInputProps {
  onSubmit: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
}

export function ChatInput({ onSubmit, disabled = false, isLoading = false }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm({
    defaultValues: {
      message: ''
    },
    onSubmit: async ({ value }) => {
      if (value.message.trim() && !disabled && !isLoading) {
        onSubmit(value.message.trim())
        form.reset()
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = '56px'
        }
      }
    }
  })

  // Auto-focus on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Auto-resize textarea
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    target.style.height = '56px'
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      form.handleSubmit()
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="flex border-t-2 border-foreground bg-background">
        {/* Textarea */}
        <form.Field name="message">
          {(field) => (
            <textarea
              ref={textareaRef}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              disabled={disabled || isLoading}
              placeholder="Escribe tu consulta sobre proyectos públicos..."
              className="flex-1 resize-none border-none outline-none bg-transparent px-4 py-3 font-mono text-sm placeholder:text-muted-foreground min-h-[56px] max-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
              maxLength={500}
              aria-label="Campo de mensaje"
            />
          )}
        </form.Field>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled || isLoading}
          className="border-l-2 border-foreground px-6 bg-foreground text-background hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all shadow-[-2px_-2px_0px_0px_hsl(var(--primary))] disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Enviar mensaje"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  )
}

// Made with Bob