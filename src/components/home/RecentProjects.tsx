import { Link } from "@tanstack/react-router"
import { mockProjects } from "@/data/mockData"
import { StatusBadge } from "./StatusBadge"
import { Building2, MapPin } from "lucide-react"

export function RecentProjects() {
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Link
              key={project.id}
              to="/proyectos"
              className="block border-2 border-black bg-card shadow-[6px_6px_0_black] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
            >
              {/* Header with ID and Status */}
              <div className="flex items-center justify-between bg-foreground text-background px-4 py-2">
                <span className="font-mono text-xs font-bold">
                  {project.id}
                </span>
                <StatusBadge status={project.status} />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                  {project.category}
                </p>

                {/* Title */}
                <h3 className="font-black text-xl mb-4 leading-tight">
                  {project.title}
                </h3>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Building2 size={16} />
                    <span>{project.institution}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{project.region}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-muted-foreground">Ejecución</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted border border-black">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                  <span className="font-mono font-bold">
                    {project.budget}
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {project.startDate} — {project.endDate}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

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