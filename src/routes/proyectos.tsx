import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/home/Navbar"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import { 
  getProyectos, 
  getProyectStatistics,
  getProyectoById 
} from "@/functions/project.functions"
import { getProjectChangesByProjectId } from "@/functions/projectChanges.functions"
import { NeoBrutalInput } from "@/components/dashboard/NeoBrutalInput"
import { NeoBrutalSelect } from "@/components/dashboard/NeoBrutalSelect"
import { NeoBrutalButton } from "@/components/dashboard/NeoBrutalButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, FolderOpen, History, X } from "lucide-react"

export const Route = createFileRoute("/proyectos")({
  component: ProyectosPage,
})

function ProyectosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ProyectosHero />
      <ProyectosFilterBar />
      <ProyectosGrid />
    </div>
  )
}

function ProyectosHero() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['project-statistics'],
    queryFn: () => getProyectStatistics({ data: undefined }),
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="relative bg-foreground text-background border-b-2 border-border pt-24 pb-16 px-6 overflow-hidden">
      <Building2 
        size={256} 
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5" 
        strokeWidth={1}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
          Proyectos <span className="bg-primary text-primary-foreground px-3 py-1">Públicos</span>
        </h1>
        <p className="text-xl text-background/80 max-w-2xl font-mono mb-8">
          Transparencia total en cada proyecto de infraestructura pública
        </p>

        {!isLoading && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-background text-foreground border-2 border-border p-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-1">Total Invertido</p>
              <p className="text-2xl font-black font-mono">{formatCurrency(stats.totalBudget)}</p>
            </div>
            <div className="bg-background text-foreground border-2 border-border p-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-1">Proyectos Activos</p>
              <p className="text-2xl font-black font-mono">{stats.activeProjects}</p>
            </div>
            <div className="bg-background text-foreground border-2 border-border p-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-1">Total Proyectos</p>
              <p className="text-2xl font-black font-mono">{stats.totalProjects}</p>
            </div>
            <div className="bg-background text-foreground border-2 border-border p-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-1">Municipalidades</p>
              <p className="text-2xl font-black font-mono">{stats.municipalities}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProyectosFilterBar() {
  const form = useForm({
    defaultValues: {
      name: '',
      municipality: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      budgetMin: '',
      budgetMax: '',
    },
  })

  const handleClear = () => {
    form.reset()
  }

  return (
    <section className="bg-muted border-y-2 border-border py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-black uppercase tracking-tight mb-4">Filtros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <form.Field name="name">
            {(field) => (
              <NeoBrutalInput
                label="Nombre del Proyecto"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Buscar..."
              />
            )}
          </form.Field>

          <form.Field name="municipality">
            {(field) => (
              <NeoBrutalSelect
                label="Municipalidad"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                options={[
                  { value: '', label: 'Todas' },
                  { value: 'San José', label: 'San José' },
                  { value: 'Alajuela', label: 'Alajuela' },
                  { value: 'Cartago', label: 'Cartago' },
                  { value: 'Heredia', label: 'Heredia' },
                  { value: 'Guanacaste', label: 'Guanacaste' },
                  { value: 'Puntarenas', label: 'Puntarenas' },
                  { value: 'Limón', label: 'Limón' },
                ]}
              />
            )}
          </form.Field>

          <form.Field name="location">
            {(field) => (
              <NeoBrutalInput
                label="Ubicación"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ciudad, distrito..."
              />
            )}
          </form.Field>

          <form.Field name="dateFrom">
            {(field) => (
              <NeoBrutalInput
                label="Fecha Desde"
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name="dateTo">
            {(field) => (
              <NeoBrutalInput
                label="Fecha Hasta"
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name="budgetMin">
            {(field) => (
              <NeoBrutalInput
                label="Presupuesto Mínimo"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="0"
              />
            )}
          </form.Field>

          <form.Field name="budgetMax">
            {(field) => (
              <NeoBrutalInput
                label="Presupuesto Máximo"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="999999999"
              />
            )}
          </form.Field>

          <div className="flex items-end gap-2">
            <NeoBrutalButton
              variant="secondary"
              size="md"
              onClick={handleClear}
              className="flex-1"
            >
              Limpiar
            </NeoBrutalButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProyectosGrid() {
  const [page, setPage] = useState(1)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const limit = 12

  const { data, isLoading } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => getProyectos({ 
      data: { 
        limit, 
        offset: (page - 1) * limit 
      } 
    }),
  })

  const projects = data?.data || []
  const totalPages = data?.totalPages || 1

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      'in progress': 'bg-primary text-primary-foreground',
      'done': 'bg-secondary text-secondary-foreground',
      'pending': 'bg-muted text-muted-foreground',
      'canceled': 'bg-destructive text-destructive-foreground',
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  if (isLoading) {
    return (
      <section className="bg-background py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="border-2 border-border bg-muted animate-pulse h-64"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="bg-background py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <FolderOpen size={96} className="mx-auto mb-6 text-muted-foreground" strokeWidth={1} />
          <h3 className="text-2xl font-black mb-2">No hay proyectos</h3>
          <p className="text-muted-foreground font-mono">
            No se encontraron proyectos con los filtros aplicados
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-background py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => setSelectedProjectId(project.id)}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <NeoBrutalButton
                  key={pageNum}
                  variant={page === pageNum ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </NeoBrutalButton>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProjectId && (
        <ProjectModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      )}
    </>
  )
}

interface ProjectCardProps {
  project: any
  onViewDetails: () => void
  formatCurrency: (amount: number) => string
  formatDate: (date: Date | string) => string
  getStatusBadge: (status: string) => string
}

function ProjectCard({ 
  project, 
  onViewDetails, 
  formatCurrency, 
  formatDate,
  getStatusBadge 
}: ProjectCardProps) {
  return (
    <div className="border-2 border-border bg-background shadow-[4px_4px_0px_0px_hsl(var(--border))] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
      {/* Header */}
      <div className="bg-muted border-b-2 border-border px-4 py-2 flex items-center justify-end">
        <span className={`px-2 py-1 text-xs font-bold uppercase ${getStatusBadge(project.status)}`}>
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {project.municipalidad} • {project.location}
        </p>
        <p className="text-lg font-mono font-bold text-primary">
          {formatCurrency(project.budget)}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Inicio: {formatDate(project.startedAt)}
        </p>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-border px-4 py-2">
        <NeoBrutalButton
          variant="ghost"
          size="sm"
          onClick={onViewDetails}
          className="w-full"
        >
          Ver Detalles →
        </NeoBrutalButton>
      </div>
    </div>
  )
}

interface ProjectModalProps {
  projectId: number
  onClose: () => void
  formatCurrency: (amount: number) => string
  formatDate: (date: Date | string) => string
}

function ProjectModal({ projectId, onClose, formatCurrency, formatDate }: ProjectModalProps) {
  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProyectoById({ data: { id: projectId } }),
    enabled: !!projectId,
  })

  const { data: changesData, isLoading: loadingChanges } = useQuery({
    queryKey: ['project-changes', projectId],
    queryFn: () => getProjectChangesByProjectId({ 
      data: { proyectId: projectId, limit: 50, offset: 0 } 
    }),
    enabled: !!projectId,
  })

  const changes = changesData?.data || []

  return (
    <Dialog open={!!projectId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-none border-2 border-border p-0">
        {/* Header */}
        <div className="bg-foreground text-background border-b-2 border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <DialogTitle className="text-2xl font-black">
              {loadingProject ? 'Cargando...' : project?.name}
            </DialogTitle>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-background hover:bg-background hover:text-foreground p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {loadingProject ? (
          <div className="p-12 text-center">
            <p className="font-mono">Cargando detalles...</p>
          </div>
        ) : project ? (
          <div className="p-6 space-y-6">
            {/* Project Details */}
            <div className="bg-background">
              <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                Detalles del Proyecto
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Empresa
                  </p>
                  <p className="font-mono">{project.company}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Municipalidad
                  </p>
                  <p className="font-mono">{project.municipalidad}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Ubicación
                  </p>
                  <p className="font-mono">{project.location}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Presupuesto
                  </p>
                  <p className="font-mono font-bold text-primary">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Fecha de Inicio
                  </p>
                  <p className="font-mono">{formatDate(project.startedAt)}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Estado
                  </p>
                  <p className="font-mono font-bold uppercase">{project.status}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Descripción
                </p>
                <p className="text-sm">{project.description}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative border-t-4 border-border py-4">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
                <History size={24} className="text-muted-foreground" />
              </div>
            </div>

            {/* Change History */}
            <div className="bg-muted p-6">
              <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <History size={20} />
                Historial de Cambios
              </h3>
              
              {loadingChanges ? (
                <p className="font-mono text-sm text-muted-foreground">Cargando historial...</p>
              ) : changes.length === 0 ? (
                <p className="font-mono text-sm text-muted-foreground">No hay cambios registrados</p>
              ) : (
                <div className="space-y-4">
                  {changes.map((change: any) => (
                    <div key={change.id} className="border-l-2 border-border pl-4 relative">
                      <div className="absolute -left-[7px] top-2 w-3 h-3 border-2 border-border bg-background" />
                      <p className="font-mono text-xs text-muted-foreground mb-1">
                        {formatDate(change.createdAt)}
                      </p>
                      <p className="font-bold text-xs uppercase mb-1">
                        {change.changeTitle}
                      </p>
                      <p className="text-sm mb-2">{change.details}</p>
                      <p className="font-mono text-xs text-primary font-bold">
                        Gastado: {formatCurrency(change.budgetSpent)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="border-t-2 border-border bg-muted px-6 py-4">
          <NeoBrutalButton variant="secondary" onClick={onClose}>
            Cerrar
          </NeoBrutalButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Made with Bob