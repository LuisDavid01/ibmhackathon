import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react'

export const Route = createFileRoute('/proyectos')({
  component: RouteComponent,
})

interface Project {
  id: string
  name: string
  description: string
  location: string
  startDate: string
  endDate: string
  budget: number
  progress: number
  image: string
  comments: number
  status: 'En Progreso' | 'Completado' | 'Planificación' | 'Pausado'
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Carretera Nacional Ruta 32',
    description: 'Ampliación y mejoramiento de la carretera que conecta San José con Limón',
    location: 'San José - Limón',
    startDate: '2024-01-15',
    endDate: '2026-12-31',
    budget: 45000000,
    progress: 68,
    image: '/placeholder-road.jpg',
    comments: 24,
    status: 'En Progreso'
  },
  {
    id: '2',
    name: 'Hospital Regional de Limón',
    description: 'Construcción de nuevo hospital con tecnología de punta y 200 camas',
    location: 'Limón Centro',
    startDate: '2023-06-01',
    endDate: '2025-08-30',
    budget: 78000000,
    progress: 45,
    image: '/placeholder-hospital.jpg',
    comments: 56,
    status: 'En Progreso'
  },
  {
    id: '3',
    name: 'Acueducto Metropolitano',
    description: 'Modernización del sistema de distribución de agua potable',
    location: 'Área Metropolitana',
    startDate: '2024-03-01',
    endDate: '2025-11-30',
    budget: 32000000,
    progress: 82,
    image: '/placeholder-water.jpg',
    comments: 18,
    status: 'En Progreso'
  },
  {
    id: '4',
    name: 'Parque Nacional Corcovado',
    description: 'Restauración y conservación de senderos y áreas protegidas',
    location: 'Península de Osa',
    startDate: '2023-01-10',
    endDate: '2024-12-15',
    budget: 8500000,
    progress: 95,
    image: '/placeholder-park.jpg',
    comments: 42,
    status: 'En Progreso'
  },
  {
    id: '5',
    name: 'Centro Educativo San José',
    description: 'Construcción de complejo educativo con capacidad para 1500 estudiantes',
    location: 'San José Este',
    startDate: '2024-02-01',
    endDate: '2026-01-31',
    budget: 25000000,
    progress: 35,
    image: '/placeholder-school.jpg',
    comments: 31,
    status: 'En Progreso'
  },
  {
    id: '6',
    name: 'Puente Río Grande',
    description: 'Construcción de puente vehicular y peatonal sobre el Río Grande',
    location: 'Puntarenas',
    startDate: '2023-09-01',
    endDate: '2024-06-30',
    budget: 12000000,
    progress: 100,
    image: '/placeholder-bridge.jpg',
    comments: 15,
    status: 'Completado'
  },
  {
    id: '7',
    name: 'Tren Eléctrico Fase 2',
    description: 'Extensión del sistema de tren eléctrico hacia el oeste del valle',
    location: 'San José - Alajuela',
    startDate: '2025-01-01',
    endDate: '2027-12-31',
    budget: 95000000,
    progress: 15,
    image: '/placeholder-train.jpg',
    comments: 89,
    status: 'Planificación'
  },
  {
    id: '8',
    name: 'Planta de Tratamiento',
    description: 'Nueva planta de tratamiento de aguas residuales con tecnología avanzada',
    location: 'Cartago',
    startDate: '2024-04-01',
    endDate: '2025-10-31',
    budget: 18500000,
    progress: 52,
    image: '/placeholder-plant.jpg',
    comments: 27,
    status: 'En Progreso'
  }
]

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [budgetFilter, setBudgetFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter

      const matchesLocation = locationFilter === 'all' || 
        project.location.toLowerCase().includes(locationFilter.toLowerCase())

      const matchesBudget = 
        budgetFilter === 'all' ||
        (budgetFilter === 'low' && project.budget < 20000000) ||
        (budgetFilter === 'medium' && project.budget >= 20000000 && project.budget < 50000000) ||
        (budgetFilter === 'high' && project.budget >= 50000000)

      return matchesSearch && matchesStatus && matchesLocation && matchesBudget
    })
  }, [searchTerm, statusFilter, locationFilter, budgetFilter])

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'Completado':
        return 'default'
      case 'En Progreso':
        return 'secondary'
      case 'Planificación':
        return 'outline'
      case 'Pausado':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-lg">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Catálogo de Proyectos
              </h1>
              <p className="text-muted-foreground">
                {filteredProjects.length} proyectos encontrados
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos por nombre, descripción o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters Row */}
              <div className="grid md:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    Estado
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background text-sm"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completado">Completado</option>
                    <option value="Planificación">Planificación</option>
                    <option value="Pausado">Pausado</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Ubicación
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background text-sm"
                  >
                    <option value="all">Todas las ubicaciones</option>
                    <option value="san josé">San José</option>
                    <option value="limón">Limón</option>
                    <option value="cartago">Cartago</option>
                    <option value="puntarenas">Puntarenas</option>
                    <option value="alajuela">Alajuela</option>
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Presupuesto
                  </label>
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background text-sm"
                  >
                    <option value="all">Todos los rangos</option>
                    <option value="low">Menos de ₡20M</option>
                    <option value="medium">₡20M - ₡50M</option>
                    <option value="high">Más de ₡50M</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Vista
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Display */}
        {viewMode === 'table' ? (
          /* Table View */
          <Card className="shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground">Proyecto</TableHead>
                  <TableHead className="text-primary-foreground">Ubicación</TableHead>
                  <TableHead className="text-primary-foreground">Fechas</TableHead>
                  <TableHead className="text-primary-foreground">Presupuesto</TableHead>
                  <TableHead className="text-primary-foreground">Progreso</TableHead>
                  <TableHead className="text-primary-foreground">Estado</TableHead>
                  <TableHead className="text-center text-primary-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground mb-1">
                            {project.name}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {project.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(project.startDate)}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(project.endDate)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <DollarSign className="w-4 h-4 text-primary" />
                        {formatCurrency(project.budget)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="ml-1 text-xs">{project.comments}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          /* Cards View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-primary-foreground/50" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-foreground text-lg line-clamp-2">
                          {project.name}
                        </h3>
                        <Badge variant={getStatusVariant(project.status)} className="flex-shrink-0 ml-2">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{formatCurrency(project.budget)}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalle
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {project.comments}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros o el término de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setLocationFilter('all')
                  setBudgetFilter('all')
                }}
              >
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Made with Bob
