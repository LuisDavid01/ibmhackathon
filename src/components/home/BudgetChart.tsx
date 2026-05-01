import type { BudgetCategory } from './types'

export function BudgetChart({ categories }: { categories: BudgetCategory[] }) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Presupuesto asignado vs ejecutado
      </div>
      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{category.name}</span>
            <span className="text-muted-foreground">
              ${(category.executed / 1000000).toFixed(1)}M / ${(category.assigned / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div 
              className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
              style={{ width: `${category.percentage}%` }}
            />
          </div>
          <div className="text-right text-xs text-muted-foreground mt-1">
            {category.percentage}%
          </div>
        </div>
      ))}
    </div>
  )
}

// Made with Bob
