import { cn } from '@/lib/utils'

interface NeoBrutalBadgeProps {
  status: 'pending' | 'in progress' | 'done' | 'canceled'
  className?: string
}

export function NeoBrutalBadge({ status, className }: NeoBrutalBadgeProps) {
  const statusStyles = {
    'pending': 'bg-muted text-muted-foreground border-muted-foreground',
    'in progress': 'bg-primary text-primary-foreground border-primary',
    'done': 'bg-foreground text-background border-foreground',
    'canceled': 'bg-destructive/10 text-destructive border-destructive',
  }

  const statusLabels = {
    'pending': 'PENDING',
    'in progress': 'IN PROGRESS',
    'done': 'DONE',
    'canceled': 'CANCELED',
  }

  return (
    <span
      className={cn(
        'inline-block border-2 rounded-none font-mono text-xs px-2 py-0.5 uppercase tracking-wide',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  )
}

// Made with Bob
