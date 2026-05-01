import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'En Progreso':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Planificación':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Pausado':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E8F5E9] to-[#F5F5F5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E7D32] rounded-full shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Catálogo de Proyectos
              </h1>
              <p className="text-gray-600">
                {filteredProjects.length} proyectos encontrados
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos por nombre, descripción o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                />
              </div>

              {/* Filters Row */}
              <div className="grid md:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    Estado
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white text-sm"
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
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Ubicación
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white text-sm"
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
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Presupuesto
                  </label>
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white text-sm"
                  >
                    <option value="all">Todos los rangos</option>
                    <option value="low">Menos de ₡20M</option>
                    <option value="medium">₡20M - ₡50M</option>
                    <option value="high">Más de ₡50M</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Vista
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={viewMode === 'table' ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className={viewMode === 'cards' ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
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
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2E7D32] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Proyecto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Ubicación</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Fechas</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Presupuesto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Progreso</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProjects.map((project, index) => (
                    <tr 
                      key={project.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 mb-1">
                              {project.name}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {project.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.startDate)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.endDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                          <DollarSign className="w-4 h-4 text-[#2E7D32]" />
                          {formatCurrency(project.budget)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(project.progress)} transition-all duration-300`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          /* Cards View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <Card key={project.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white/50" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-2">
                          {project.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)} flex-shrink-0 ml-2`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <DollarSign className="w-4 h-4 text-[#2E7D32]" />
                        <span className="font-semibold">{formatCurrency(project.budget)}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-semibold text-gray-800">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(project.progress)} transition-all duration-300`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
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
                  className={currentPage === page ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
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
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros o el término de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setLocationFilter('all')
                  setBudgetFilter('all')
                }}
                className="bg-[#2E7D32] hover:bg-[#1B5E20]"
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
