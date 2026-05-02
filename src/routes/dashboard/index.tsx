import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { NeoBrutalButton } from '@/components/dashboard/NeoBrutalButton'
import { NeoBrutalInput } from '@/components/dashboard/NeoBrutalInput'
import { NeoBrutalSelect } from '@/components/dashboard/NeoBrutalSelect'
import { NeoBrutalBadge } from '@/components/dashboard/NeoBrutalBadge'
import { NeoBrutalModal } from '@/components/dashboard/NeoBrutalModal'
import { NeoBrutalTextarea } from '@/components/dashboard/NeoBrutalTextarea'
import { FolderOpen, Eye, Trash2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProyectos, crearProyecto, eliminarProyecto } from '@/functions/project.functions'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { ProyectData } from '@/types'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  // Fetch projects
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects', 0, 100],
    queryFn: () => getProyectos({ data: { limit: 100, offset: 0 } }),
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: ProyectData) => crearProyecto({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setIsCreateModalOpen(false)
      toast.success('Proyecto creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear el proyecto')
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => eliminarProyecto({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setDeleteConfirmId(null)
      toast.success('Proyecto eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar el proyecto')
    },
  })

  // Filter projects
  const filteredProjects = projectsData?.data?.filter((project: any) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="relative border-b-2 border-border bg-background px-8 py-6 flex items-center justify-between overflow-hidden">
        <div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            GESTIÓN DE PROYECTOS
          </div>
          <h1 className="text-4xl font-black uppercase">Proyectos Públicos</h1>
          <div className="font-mono text-sm text-muted-foreground mt-1">
            {projectsData?.total || 0} proyectos registrados
          </div>
        </div>
        <FolderOpen className="absolute right-8 top-0 size-32 opacity-5" />
        <NeoBrutalButton onClick={() => setIsCreateModalOpen(true)}>
          Nuevo Proyecto
        </NeoBrutalButton>
      </div>

      {/* Filters */}
      <div className="bg-muted border-b-2 border-border px-8 py-4 flex gap-4 items-center">
        <NeoBrutalInput
          placeholder="BUSCAR PROYECTO..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <NeoBrutalSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'TODOS' },
            { value: 'pending', label: 'PENDING' },
            { value: 'in progress', label: 'IN PROGRESS' },
            { value: 'done', label: 'DONE' },
            { value: 'canceled', label: 'CANCELED' },
          ]}
          className="w-48"
        />
      </div>

      {/* Table */}
      <div className="px-8 py-6">
        {isLoading ? (
          <div className="text-center py-12 font-mono text-muted-foreground">
            CARGANDO...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 font-mono text-muted-foreground">
            NO HAY PROYECTOS
          </div>
        ) : (
          <table className="w-full border-collapse border-2 border-border">
            <thead className="bg-foreground text-background">
              <tr>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  #ID
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Nombre
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Institución
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Presupuesto
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Estado
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Fecha Inicio
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project: any, index: number) => (
                <tr
                  key={project.id}
                  className={`border-b-2 border-border hover:bg-muted transition-colors ${
                    index % 2 === 0 ? 'even:bg-muted/30' : ''
                  }`}
                >
                  <td className="font-mono text-xs text-muted-foreground px-4 py-3">
                    #PRY-{String(project.id).padStart(5, '0')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate({ to: `/dashboard/project/${project.id}` })}
                      className="font-semibold hover:underline text-left"
                    >
                      {project.name}
                    </button>
                  </td>
                  <td className="px-4 py-3">{project.company}</td>
                  <td className="font-mono px-4 py-3">
                    ₡{project.budget.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <NeoBrutalBadge status={project.status} />
                  </td>
                  <td className="font-mono text-sm px-4 py-3">
                    {new Date(project.startedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate({ to: `/dashboard/project/${project.id}` })}
                        className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                        title="Ver proyecto"
                      >
                        <Eye className="size-4" />
                      </button>
                      {deleteConfirmId === project.id ? (
                        <button
                          onClick={() => deleteMutation.mutate(project.id)}
                          className="border-2 border-destructive rounded-none px-2 py-1.5 font-mono text-xs text-destructive hover:bg-destructive/10 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          ¿CONFIRMAR?
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                          title="Eliminar proyecto"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <NeoBrutalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nuevo Proyecto"
      >
        <CreateProjectForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </NeoBrutalModal>
    </DashboardLayout>
  )
}

interface CreateProjectFormProps {
  onSubmit: (data: ProyectData) => void
  onCancel: () => void
  isSubmitting: boolean
}

function CreateProjectForm({ onSubmit, onCancel, isSubmitting }: CreateProjectFormProps) {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      company: '',
      location: '',
      municipalidad: '',
      budget: 0,
      status: 'pending' as const,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="grid grid-cols-2 gap-6">
        <form.Field name="name">
          {(field) => (
            <div className="col-span-2">
              <NeoBrutalInput
                label="Nombre del proyecto"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Nombre del proyecto"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="company">
          {(field) => (
            <NeoBrutalInput
              label="Institución responsable"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Institución"
            />
          )}
        </form.Field>

        <form.Field name="budget">
          {(field) => (
            <NeoBrutalInput
              label="Presupuesto asignado (₡)"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              placeholder="0"
            />
          )}
        </form.Field>

        <form.Field name="location">
          {(field) => (
            <NeoBrutalInput
              label="Ubicación"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Ubicación"
            />
          )}
        </form.Field>

        <form.Field name="municipalidad">
          {(field) => (
            <NeoBrutalInput
              label="Municipalidad"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Municipalidad"
            />
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <div className="col-span-2">
              <NeoBrutalSelect
                label="Estado inicial"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as any)}
                options={[
                  { value: 'pending', label: 'PENDING' },
                  { value: 'in progress', label: 'IN PROGRESS' },
                  { value: 'done', label: 'DONE' },
                  { value: 'canceled', label: 'CANCELED' },
                ]}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className="col-span-2">
              <NeoBrutalTextarea
                label="Descripción"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Descripción del proyecto"
                rows={4}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 mt-6">
        <NeoBrutalButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
        </NeoBrutalButton>
        <NeoBrutalButton type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </NeoBrutalButton>
      </div>
    </form>
  )
}

// Made with Bob
