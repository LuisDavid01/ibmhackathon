import { MoreHorizontal } from 'lucide-react'

export function ChatTypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="border-2 border-foreground rounded-none bg-muted px-4 py-3 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
        <div className="flex items-center gap-2">
          <MoreHorizontal className="animate-pulse" size={16} />
          <span className="font-mono text-xs text-muted-foreground">
            Analizando...
          </span>
        </div>
      </div>
    </div>
  )
}

// Made with Bob