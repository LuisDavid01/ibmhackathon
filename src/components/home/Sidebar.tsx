import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project, Document, RelatedProject } from './types'
import { StatusBadge } from './Hero'

export function SidebarCard({ title, children, action }: { 
  title: string
  children: React.ReactNode
  action?: React.ReactNode 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  )
}

export function MapPlaceholder() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-muted-foreground">Ruta 32, San José</p>
          <p className="text-xs text-muted-foreground mt-1">Costa Rica</p>
        </div>
      </div>
      {/* Decorative map grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: RelatedProject }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all cursor-pointer">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>
    </div>
  )
}

export function ParticipationCard({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <SidebarCard 
      title="Participación Ciudadana"
      action={
        <Button 
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
          onClick={onOpenForm}
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Enviar Opinión Anónima
        </Button>
      }
    >
      <p className="text-sm text-muted-foreground">
        Tu opinión es importante para mejorar la transparencia y ejecución de los proyectos públicos.
      </p>
    </SidebarCard>
  )
}

export function LocationCard({ project }: { project: Project }) {
  return (
    <SidebarCard title="Ubicación del Proyecto">
      <MapPlaceholder />
      <div className="mt-3 text-sm">
        <p className="font-medium">{project.location.address}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Coordenadas: {project.location.lat}, {project.location.lng}
        </p>
      </div>
    </SidebarCard>
  )
}

export function DocumentsCard({ documents }: { documents: Document[] }) {
  return (
    <SidebarCard title="Documentos Relacionados">
      <div className="space-y-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted transition-colors"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32]/10">
              <svg className="h-5 w-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{doc.name}</div>
              <div className="text-xs text-muted-foreground">{doc.type} • {doc.size}</div>
            </div>
          </button>
        ))}
      </div>
    </SidebarCard>
  )
}

export function ResponsibleEntityCard({ project }: { project: Project }) {
  return (
    <SidebarCard title="Entidad Responsable">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
          M
        </div>
        <div>
          <div className="font-semibold">{project.responsibleEntity}</div>
          <div className="text-xs text-muted-foreground">Ministerio de Obras Públicas y Transportes</div>
        </div>
      </div>
    </SidebarCard>
  )
}

// Made with Bob
