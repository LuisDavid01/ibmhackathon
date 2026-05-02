import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'

interface NeoBrutalTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const NeoBrutalTextarea = forwardRef<HTMLTextAreaElement, NeoBrutalTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full border-2 border-border rounded-none bg-background px-3 py-2 font-mono text-sm',
            'focus:outline-none focus:border-primary transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'min-h-[100px] resize-y',
            error && 'border-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <p className="font-mono text-xs text-destructive mt-1">{error}</p>
        )}
      </div>
    )
  }
)

NeoBrutalTextarea.displayName = 'NeoBrutalTextarea'

// Made with Bob
