import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: ProjectDetailPage })

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface Project {
  id: string
  title: string
  subtitle: string
  status: 'En Ejecución' | 'Planificación' | 'Completado' | 'Suspendido'
  physicalProgress: number
  totalInvestment: number
  beneficiaries: number
  description: string
  backgroundImage: string
  responsibleEntity: string
  location: { lat: number; lng: number; address: string }
}

interface Milestone {
  id: string
  title: string
  date: string
  status: 'completed' | 'active' | 'pending'
}

interface BudgetCategory {
  name: string
  assigned: number
  executed: number
  percentage: number
}

interface ActivityUpdate {
  id: string
  user: string
  role: string
  message: string
  timestamp: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
}

interface TechnicalVersion {
  version: string
  date: string
  notes: string
}

interface RelatedProject {
  id: string
  title: string
  image: string
  status: string
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockProject: Project = {
  id: "1",
  title: "Ampliación del Puente sobre el Río Virilla (Ruta 32)",
  subtitle: "Mejora de infraestructura vial para reducir tiempos de viaje y aumentar la seguridad",
  status: "En Ejecución",
  physicalProgress: 68,
  totalInvestment: 22400000,
  beneficiaries: 45000,
  description: "Este proyecto consiste en la ampliación y modernización del puente sobre el Río Virilla en la Ruta 32, una de las arterias viales más importantes del país. La obra incluye la construcción de dos carriles adicionales, mejoras en la iluminación, sistemas de drenaje modernos y la implementación de tecnología para monitoreo estructural en tiempo real. El proyecto beneficiará directamente a más de 45,000 usuarios diarios y contribuirá significativamente a la reducción de congestionamiento vehicular en la zona metropolitana.",
  backgroundImage: "https://images.unsplash.com/photo-1587850850969-e8d906a22c6b?w=1200",
  responsibleEntity: "MOPT / CONAVI",
  location: {
    lat: 9.9281,
    lng: -84.0907,
    address: "Ruta 32, San José, Costa Rica"
  }
}

const mockMilestones: Milestone[] = [
  { id: "1", title: "Aprobación de planos", date: "15 Ene 2024", status: "completed" },
  { id: "2", title: "Movimiento de tierras", date: "28 Feb 2024", status: "completed" },
  { id: "3", title: "Cimentación", date: "15 Abr 2024", status: "active" },
  { id: "4", title: "Instalaciones", date: "30 Jun 2024", status: "pending" },
  { id: "5", title: "Entrega final", date: "15 Sep 2024", status: "pending" }
]

const mockBudget: BudgetCategory[] = [
  { name: "Materiales", assigned: 8500000, executed: 6200000, percentage: 73 },
  { name: "Mano de obra", assigned: 7200000, executed: 5100000, percentage: 71 },
  { name: "Equipamiento", assigned: 4500000, executed: 2800000, percentage: 62 },
  { name: "Gestión", assigned: 2200000, executed: 1500000, percentage: 68 }
]

const mockActivities: ActivityUpdate[] = [
  {
    id: "1",
    user: "Ing. María Rodríguez",
    role: "Supervisora de Obra",
    message: "Se completó la instalación de vigas principales del tramo norte. Avance según cronograma.",
    timestamp: "Hace 2 horas"
  },
  {
    id: "2",
    user: "Arq. Carlos Méndez",
    role: "Director de Proyecto",
    message: "Reunión con MOPT para revisión de especificaciones técnicas. Todo aprobado.",
    timestamp: "Hace 1 día"
  },
  {
    id: "3",
    user: "Ing. Ana Solís",
    role: "Ingeniera Civil",
    message: "Pruebas de resistencia de concreto superaron los estándares requeridos.",
    timestamp: "Hace 3 días"
  }
]

const mockDocuments: Document[] = [
  { id: "1", name: "Planos Estructurales v3.2", type: "PDF", size: "12.4 MB" },
  { id: "2", name: "Estudio de Impacto Ambiental", type: "PDF", size: "8.7 MB" },
  { id: "3", name: "Presupuesto Detallado 2024", type: "XLSX", size: "2.1 MB" },
  { id: "4", name: "Cronograma Actualizado", type: "PDF", size: "1.8 MB" }
]

const mockVersions: TechnicalVersion[] = [
  { version: "v2.1", date: "28 Abr 2024", notes: "Actualización de cronograma y presupuesto" },
  { version: "v2.0", date: "15 Mar 2024", notes: "Revisión estructural aprobada" },
  { version: "v1.5", date: "10 Feb 2024", notes: "Ajustes en especificaciones técnicas" }
]

const mockRelatedProjects: RelatedProject[] = [
  {
    id: "2",
    title: "Modernización Ruta 27",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    status: "En Ejecución"
  },
  {
    id: "3",
    title: "Puente Río Grande",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
    status: "Planificación"
  },
  {
    id: "4",
    title: "Ampliación Circunvalación Norte",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    status: "En Ejecución"
  }
]

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold">
            CR
          </div>
          <div>
            <div className="text-sm font-semibold">Transparencia Costa Rica</div>
            <div className="text-xs text-muted-foreground">Proyectos Públicos</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Proyectos</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Presupuesto</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Reportes</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Contacto</a>
        </div>
        <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
          Iniciar Sesión
        </Button>
      </div>
    </nav>
  )
}

function HeroSection({ project }: { project: Project }) {
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

function StatusBadge({ status }: { status: string }) {
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

function InfoCard({ label, value, showProgress, progress }: { 
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

function ProgressBar({ percentage, className = "", showLabel = false }: { 
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

function Timeline({ milestones }: { milestones: Milestone[] }) {
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

function BudgetChart({ categories }: { categories: BudgetCategory[] }) {
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

function ActivityFeed({ activities }: { activities: ActivityUpdate[] }) {
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

function SidebarCard({ title, children, action }: { 
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

function ProjectCard({ project }: { project: RelatedProject }) {
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

function MapPlaceholder() {
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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ProjectDetailPage() {
  const [showOpinionForm, setShowOpinionForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <HeroSection project={mockProject} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción General */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción General</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockProject.description}
                </p>
              </CardContent>
            </Card>

            {/* Cronograma de Hitos */}
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Hitos</CardTitle>
                <CardDescription>Seguimiento de las etapas principales del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline milestones={mockMilestones} />
              </CardContent>
            </Card>

            {/* Ejecución Presupuestaria */}
            <Card>
              <CardHeader>
                <CardTitle>Ejecución Presupuestaria</CardTitle>
                <CardDescription>Distribución y avance del presupuesto por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetChart categories={mockBudget} />
              </CardContent>
            </Card>

            {/* Bitácora de Actualizaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Bitácora de Actualizaciones</CardTitle>
                <CardDescription>Últimas actividades y novedades del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={mockActivities} />
              </CardContent>
            </Card>

            {/* Información Técnica y Versiones */}
            <Card>
              <CardHeader>
                <CardTitle>Información Técnica y Versiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVersions.map((version) => (
                    <div key={version.version} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32]/10 text-xs font-semibold text-[#2E7D32]">
                        {version.version}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{version.notes}</div>
                        <div className="text-xs text-muted-foreground mt-1">{version.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Participación Ciudadana */}
            <SidebarCard 
              title="Participación Ciudadana"
              action={
                <Button 
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={() => setShowOpinionForm(!showOpinionForm)}
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

            {/* Ubicación del Proyecto */}
            <SidebarCard title="Ubicación del Proyecto">
              <MapPlaceholder />
              <div className="mt-3 text-sm">
                <p className="font-medium">{mockProject.location.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordenadas: {mockProject.location.lat}, {mockProject.location.lng}
                </p>
              </div>
            </SidebarCard>

            {/* Documentos Relacionados */}
            <SidebarCard title="Documentos Relacionados">
              <div className="space-y-2">
                {mockDocuments.map((doc) => (
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

            {/* Entidad Responsable */}
            <SidebarCard title="Entidad Responsable">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <div className="font-semibold">{mockProject.responsibleEntity}</div>
                  <div className="text-xs text-muted-foreground">Ministerio de Obras Públicas y Transportes</div>
                </div>
              </div>
            </SidebarCard>
          </div>
        </div>

        {/* Proyectos Relacionados */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Proyectos Relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockRelatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-3">Transparencia Costa Rica</h3>
              <p className="text-sm text-muted-foreground">
                Plataforma oficial para el seguimiento de proyectos públicos en Costa Rica.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Enlaces</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-[#2E7D32]">Acerca de</a></li>
                <li><a href="#" className="hover:text-[#2E7D32]">Contacto</a></li>
                <li><a href="#" className="hover:text-[#2E7D32]">Términos de uso</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contacto</h3>
              <p className="text-sm text-muted-foreground">
                info@transparencia.go.cr<br />
                Tel: +506 2222-3333
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2026 Gobierno de Costa Rica. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Made with Bob
