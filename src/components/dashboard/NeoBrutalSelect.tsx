import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'

interface NeoBrutalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const NeoBrutalSelect = forwardRef<HTMLSelectElement, NeoBrutalSelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full border-2 border-border rounded-none bg-background px-3 py-2 font-mono text-sm',
            'focus:outline-none focus:border-primary transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-destructive',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="font-mono text-xs text-destructive mt-1">{error}</p>
        )}
      </div>
    )
  }
)

NeoBrutalSelect.displayName = 'NeoBrutalSelect'

// Made with Bob
