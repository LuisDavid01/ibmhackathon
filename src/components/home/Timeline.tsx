import type { Milestone } from './types'

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Vertical line */}
          {index < milestones.length - 1 && (
            <div className="absolute left-[15px] top-[32px] h-full w-0.5 bg-gray-200" />
          )}
          
          {/* Status indicator */}
          <div className="relative z-10 flex-shrink-0">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              milestone.status === 'completed' 
                ? 'border-[#2E7D32] bg-[#2E7D32]' 
                : milestone.status === 'active'
                ? 'border-[#2E7D32] bg-white'
                : 'border-gray-300 bg-white'
            }`}>
              {milestone.status === 'completed' && (
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {milestone.status === 'active' && (
                <div className="h-3 w-3 rounded-full bg-[#2E7D32]" />
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className={`font-medium ${milestone.status === 'active' ? 'text-[#2E7D32]' : ''}`}>
              {milestone.title}
            </div>
            <div className="text-sm text-muted-foreground">{milestone.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Made with Bob
