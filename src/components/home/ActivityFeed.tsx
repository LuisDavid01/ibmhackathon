import type { ActivityUpdate } from './types'

export function ActivityFeed({ activities }: { activities: ActivityUpdate[] }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32] font-semibold">
              {activity.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-sm">{activity.user}</span>
                <span className="text-xs text-muted-foreground">• {activity.role}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{activity.message}</p>
              <div className="mt-2 text-xs text-muted-foreground">{activity.timestamp}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Made with Bob
