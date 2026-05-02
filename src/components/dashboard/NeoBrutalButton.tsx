import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface NeoBrutalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const NeoBrutalButton = forwardRef<HTMLButtonElement, NeoBrutalButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'relative rounded-none font-mono font-bold uppercase tracking-wide transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles = {
      primary: 'border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]',
      secondary: 'border-2 border-border bg-muted shadow-[4px_4px_0px_0px_hsl(var(--border))] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]',
      ghost: 'border-2 border-border bg-background hover:bg-muted',
      danger: 'border-2 border-destructive bg-background text-destructive shadow-[4px_4px_0px_0px_hsl(var(--destructive))] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]',
    }
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

NeoBrutalButton.displayName = 'NeoBrutalButton'

// Made with Bob
