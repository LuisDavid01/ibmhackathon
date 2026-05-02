import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { getProyectos } from "@/functions/project.functions"
import { StatusBadge } from "./StatusBadge"
import { Building2, MapPin, Loader2 } from "lucide-react"

export function RecentProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recent-projects'],
    queryFn: () => getProyectos({
      data: {
        limit: 4,
        offset: 0
      }
    })
  })

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget)
  }

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('es-CR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  return (
    <section className="bg-background py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
              PROYECTOS RECIENTES
            </p>
            <h2 className="text-4xl md:text-5xl font-black">
              Últimos 4 proyectos
            </h2>
          </div>
          <Link 
            to="/proyectos"
            className="text-sm font-bold text-primary hover:underline hidden md:block"
          >
            Ver todos →
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="border-2 border-red-500 bg-red-50 p-8 text-center">
            <p className="text-red-700 font-bold mb-2">Error al cargar proyectos</p>
            <p className="text-red-600 text-sm">
              {error instanceof Error ? error.message : 'Ocurrió un error inesperado'}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && data?.data && (
          <>
            {data.data.length === 0 ? (
              <div className="border-2 border-black bg-card p-8 text-center">
                <p className="text-muted-foreground font-bold">
                  No hay proyectos disponibles
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.data.map((project) => (
                  <Link
                    key={project.id}
                    to="/proyecto/$id"
                    params={{ id: project.id.toString() }}
                    className="block border-2 border-black bg-card shadow-[6px_6px_0_black] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                  >
                    {/* Header with ID and Status */}
                    <div className="flex items-center justify-between bg-foreground text-background px-4 py-2">
                      <span className="font-mono text-xs font-bold">
                        #{project.id}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="font-black text-xl mb-4 leading-tight">
                        {project.name}
                      </h3>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Building2 size={16} />
                          <span>{project.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                        <span className="font-mono font-bold">
                          {formatBudget(project.budget)}
                        </span>
                        <span className="text-muted-foreground font-mono text-xs">
                          {formatDate(project.startedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Mobile "Ver todos" link */}
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/proyectos"
            className="text-sm font-bold text-primary hover:underline"
          >
            Ver todos los proyectos →
          </Link>
        </div>
      </div>
    </section>
  )
}

// Made with Bob