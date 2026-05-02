import { MessageSquare, Building2 } from 'lucide-react'

export function ChatHeader() {
  return (
    <div className="relative bg-foreground text-background px-6 py-4 border-b-2 border-background">
      {/* Decorative background icon */}
      <Building2 
        size={120} 
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5" 
        strokeWidth={1}
      />
      
      {/* Header content */}
      <div className="relative flex items-center gap-3">
        <MessageSquare size={28} strokeWidth={2.5} />
        <h1 className="font-mono text-xl font-bold uppercase tracking-wider">
          Agente IA
        </h1>
      </div>
    </div>
  )
}

// Made with Bob