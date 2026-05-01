import type { Project } from './types'
import { ProgressBar } from './ProgressBar'

export function HeroSection({ project }: { project: Project }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      <div className="container relative mx-auto h-full px-4">
        <div className="flex h-full flex-col justify-center max-w-4xl">
          <div className="mb-4">
            <StatusBadge status={project.status} />
          </div>
          
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
          
          <p className="mb-8 text-lg text-gray-200 max-w-2xl">
            {project.subtitle}
          </p>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              label="Progreso físico"
              value={`${project.physicalProgress}%`}
              showProgress
              progress={project.physicalProgress}
            />
            <InfoCard
              label="Inversión total"
              value={`$${(project.totalInvestment / 1000000).toFixed(1)}M`}
            />
            <InfoCard
              label="Beneficiarios"
              value={`${(project.beneficiaries / 1000).toFixed(0)}K+`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const colors = {
    'En Ejecución': 'bg-[#2E7D32] text-white',
    'Planificación': 'bg-blue-600 text-white',
    'Completado': 'bg-gray-600 text-white',
    'Suspendido': 'bg-red-600 text-white'
  }
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${colors[status as keyof typeof colors]}`}>
      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
      {status}
    </span>
  )
}

export function InfoCard({ label, value, showProgress, progress }: { 
  label: string
  value: string
  showProgress?: boolean
  progress?: number 
}) {
  return (
    <div className="rounded-xl bg-white/95 backdrop-blur p-4 shadow-lg">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {showProgress && progress !== undefined && (
        <ProgressBar percentage={progress} className="mt-3" />
      )}
    </div>
  )
}

// Made with Bob
