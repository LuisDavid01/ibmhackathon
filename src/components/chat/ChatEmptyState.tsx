import { Building2, MessageCircleQuestion } from 'lucide-react'

interface ChatEmptyStateProps {
  onSuggestedQuestion: (question: string) => void
}

const SUGGESTED_QUESTIONS = [
  '¿Cuáles son los proyectos más recientes?',
  '¿Qué proyectos están en ejecución?',
  'Muéstrame proyectos por municipalidad'
]

export function ChatEmptyState({ onSuggestedQuestion }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
      {/* Decorative Icons */}
      <div className="relative">
        <Building2 
          size={96} 
          className="opacity-10 text-foreground" 
          strokeWidth={1.5}
        />
        <MessageCircleQuestion 
          size={48} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 text-foreground" 
          strokeWidth={2}
        />
      </div>

      {/* Main Text */}
      <div className="text-center max-w-md">
        <p className="font-mono text-sm text-foreground">
          ¿Qué deseas saber sobre los{' '}
          <span className="bg-primary text-primary-foreground px-1">
            proyectos públicos
          </span>{' '}
          de Costa Rica?
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onSuggestedQuestion(question)}
            className="border-2 border-foreground rounded-none bg-background px-4 py-3 text-left font-mono text-sm shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

// Made with Bob