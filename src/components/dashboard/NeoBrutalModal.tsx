import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface NeoBrutalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function NeoBrutalModal({ isOpen, onClose, title, children }: NeoBrutalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/80"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative border-2 border-foreground bg-background shadow-[8px_8px_0px_0px_hsl(var(--primary))] max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-none">
        {/* Header */}
        <div className="border-b-2 border-border p-6 flex items-center justify-between sticky top-0 bg-background z-10">
          <h2 className="font-mono font-bold uppercase text-lg">
            — {title}
          </h2>
          <button
            onClick={onClose}
            className="border-2 border-border rounded-none p-1 hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Made with Bob
