export function ProgressBar({ percentage, className = "", showLabel = false }: { 
  percentage: number
  className?: string
  showLabel?: boolean 
}) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progreso</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Made with Bob
