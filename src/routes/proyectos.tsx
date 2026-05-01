import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  Building2,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { getProyectos } from '@/functions/project.functions'

export const Route = createFileRoute('/proyectos')({
  component: RouteComponent,
})

interface Project {
  id: number
  name: string
  description: string
  company: string
  location: string
  municipalidad: string
  budget: number
  startedAt: Date
  updatedAt: Date
}

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [budgetFilter, setBudgetFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch projects with TanStack Query
  const {
    data: projectsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects', { limit: 100, offset: 0 }],
    queryFn: () => getProyectos({ data: { limit: 100, offset: 0 } }),
  })

  const projects = (projectsData?.data || []) as Project[]

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.company.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = locationFilter === 'all' || 
        project.location.toLowerCase().includes(locationFilter.toLowerCase())

      const matchesBudget = 
        budgetFilter === 'all' ||
        (budgetFilter === 'low' && project.budget < 20000000) ||
        (budgetFilter === 'medium' && project.budget >= 20000000 && project.budget < 50000000) ||
        (budgetFilter === 'high' && project.budget >= 50000000)

      return matchesSearch && matchesLocation && matchesBudget
    })
  }, [projects, searchTerm, locationFilter, budgetFilter])

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setLocationFilter('all')
    setBudgetFilter('all')
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
                {isLoading ? 'Cargando...' : `${filteredProjects.length} proyectos encontrados`}
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
                  placeholder="Buscar proyectos por nombre, descripción, ubicación o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters Row */}
              <div className="grid md:grid-cols-4 gap-4">
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
                    <option value="heredia">Heredia</option>
                    <option value="guanacaste">Guanacaste</option>
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

                {/* Clear Filters */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground opacity-0">
                    Actions
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ERROR STATE */}
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar proyectos. Por favor, intente nuevamente.
            </AlertDescription>
          </Alert>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Cargando proyectos...</p>
            </CardContent>
          </Card>
        )}

        {/* Projects Display */}
        {!isLoading && !isError && (
          <>
            {viewMode === 'table' ? (
              /* Table View */
              <Card className="shadow-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-primary-foreground">Proyecto</TableHead>
                      <TableHead className="text-primary-foreground">Ubicación</TableHead>
                      <TableHead className="text-primary-foreground">Empresa</TableHead>
                      <TableHead className="text-primary-foreground">Presupuesto</TableHead>
                      <TableHead className="text-primary-foreground">Fecha Inicio</TableHead>
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
                            <div>
                              <div>{project.location}</div>
                              <div className="text-xs text-muted-foreground">{project.municipalidad}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{project.company}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <DollarSign className="w-4 h-4 text-primary" />
                            {formatCurrency(project.budget)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.startedAt)}
                          </div>
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
                          <h3 className="font-bold text-foreground text-lg line-clamp-2 mb-2">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div>{project.location}</div>
                              <div className="text-xs text-muted-foreground">{project.municipalidad}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span>{project.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{formatCurrency(project.budget)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{formatDate(project.startedAt)}</span>
                          </div>
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
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page: number
                    if (totalPages <= 5) {
                      page = i + 1
                    } else if (currentPage <= 3) {
                      page = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i
                    } else {
                      page = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}
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
                    {projects.length === 0 
                      ? 'No hay proyectos disponibles en este momento'
                      : 'Intenta ajustar los filtros o el término de búsqueda'}
                  </p>
                  {projects.length > 0 && (
                    <Button onClick={handleClearFilters}>
                      Limpiar Filtros
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Made with Bob
