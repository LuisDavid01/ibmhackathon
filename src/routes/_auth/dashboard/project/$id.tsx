import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { NeoBrutalButton } from '@/components/dashboard/NeoBrutalButton'
import { NeoBrutalInput } from '@/components/dashboard/NeoBrutalInput'
import { NeoBrutalSelect } from '@/components/dashboard/NeoBrutalSelect'
import { NeoBrutalBadge } from '@/components/dashboard/NeoBrutalBadge'
import { NeoBrutalModal } from '@/components/dashboard/NeoBrutalModal'
import { NeoBrutalTextarea } from '@/components/dashboard/NeoBrutalTextarea'
import { History, Trash2, Edit } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProyectoById, actualizarProyecto } from '@/functions/project.functions'
import { 
  getProjectChangesByProjectId, 
  crearProjectChange, 
  actualizarProjectChange,
  eliminarProjectChange 
} from '@/functions/projectChanges.functions'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { ProyectData, ProjectChangeData } from '@/types'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_auth/dashboard/project/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: session } = authClient.useSession()
  const [isCreateChangeModalOpen, setIsCreateChangeModalOpen] = useState(false)
  const [editingChange, setEditingChange] = useState<any | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  // Fetch project
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', Number(id)],
    queryFn: () => getProyectoById({ data: { id: Number(id) } }),
  })

  // Fetch changes
  const { data: changesData, isLoading: isLoadingChanges } = useQuery({
    queryKey: ['project-changes', Number(id)],
    queryFn: () => getProjectChangesByProjectId({ data: { proyectId: Number(id), limit: 100, offset: 0 } }),
  })

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: (data: Partial<ProyectData>) => 
      actualizarProyecto({ data: { id: Number(id), data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', Number(id)] })
      toast.success('Proyecto actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar el proyecto')
    },
  })

  // Create change mutation
  const createChangeMutation = useMutation({
    mutationFn: (data: ProjectChangeData) => crearProjectChange({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-changes', Number(id)] })
      setIsCreateChangeModalOpen(false)
      toast.success('Cambio registrado exitosamente')
    },
    onError: () => {
      toast.error('Error al registrar el cambio')
    },
  })

  // Update change mutation
  const updateChangeMutation = useMutation({
    mutationFn: ({ changeId, data }: { changeId: number; data: Partial<ProjectChangeData> }) =>
      actualizarProjectChange({ data: { id: changeId, data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-changes', Number(id)] })
      setEditingChange(null)
      toast.success('Cambio actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar el cambio')
    },
  })

  // Delete change mutation
  const deleteChangeMutation = useMutation({
    mutationFn: (changeId: number) => eliminarProjectChange({ data: { id: changeId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-changes', Number(id)] })
      setDeleteConfirmId(null)
      toast.success('Cambio eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar el cambio')
    },
  })

  if (isLoadingProject) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="font-mono text-muted-foreground">CARGANDO...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="font-mono text-muted-foreground">PROYECTO NO ENCONTRADO</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Section 1: Edit Project */}
      <div className="border-b-2 border-border">
        {/* Header */}
        <div className="bg-foreground text-background px-8 py-6">
          <div className="font-mono text-xs text-background/60 mb-2">
            DASHBOARD / PROYECTOS / #PRY-{String(project.id).padStart(5, '0')}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase">{project.name}</h1>
              <div className="mt-2">
                <NeoBrutalBadge status={project.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="px-8 py-8 bg-background">
          <EditProjectForm
            project={project}
            onSubmit={(data) => updateProjectMutation.mutate(data)}
            onCancel={() => navigate({ to: '/dashboard' })}
            isSubmitting={updateProjectMutation.isPending}
          />
        </div>
      </div>

      {/* Section 2: Changes CRUD */}
      <div>
        {/* Header */}
        <div className="relative px-8 py-6 bg-muted border-b-2 border-border flex items-center justify-between overflow-hidden">
          <div>
            <div className="font-mono text-xs tracking-widest text-muted-foreground">
              REGISTRO DE CAMBIOS
            </div>
            <h2 className="text-2xl font-black uppercase">Historial de Modificaciones</h2>
          </div>
          <History className="absolute right-8 top-4 size-24 opacity-5" />
          <NeoBrutalButton onClick={() => setIsCreateChangeModalOpen(true)} size="sm">
            Registrar Cambio
          </NeoBrutalButton>
        </div>

        {/* Changes Table */}
        <div className="px-8 py-4">
          {isLoadingChanges ? (
            <div className="text-center py-8 font-mono text-muted-foreground">
              CARGANDO...
            </div>
          ) : !changesData?.data || changesData.data.length === 0 ? (
            <div className="text-center py-8 font-mono text-muted-foreground">
              NO HAY CAMBIOS REGISTRADOS
            </div>
          ) : (
            <table className="w-full border-collapse border-2 border-border">
              <thead className="bg-foreground text-background">
                <tr>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                    #
                  </th>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                    Descripción
                  </th>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                    Tipo
                  </th>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                    Fecha
                  </th>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                    Presupuesto
                  </th>
                  <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {changesData.data.map((change: any, index: number) => (
                  <tr
                    key={change.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="font-mono text-xs text-muted-foreground px-4 py-3">
                      #{change.id}
                    </td>
                    <td className="px-4 py-3 font-semibold">{change.changeTitle}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs uppercase">{change.changeState}</span>
                    </td>
                    <td className="font-mono text-sm px-4 py-3">
                      {new Date(change.createdAt).toLocaleDateString()}
                    </td>
                    <td className="font-mono px-4 py-3">
                      ₡{change.budgetSpent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingChange(change)}
                          className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                          title="Editar cambio"
                        >
                          <Edit className="size-4" />
                        </button>
                        {deleteConfirmId === change.id ? (
                          <button
                            onClick={() => deleteChangeMutation.mutate(change.id)}
                            className="border-2 border-destructive rounded-none px-2 py-1.5 font-mono text-xs text-destructive hover:bg-destructive/10 transition-colors"
                            disabled={deleteChangeMutation.isPending}
                          >
                            ¿CONFIRMAR?
                          </button>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(change.id)}
                            className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                            title="Eliminar cambio"
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
      </div>

      {/* Create Change Modal */}
      <NeoBrutalModal
        isOpen={isCreateChangeModalOpen}
        onClose={() => setIsCreateChangeModalOpen(false)}
        title="Registrar Cambio"
      >
        <ChangeForm
          projectId={Number(id)}
          userId={session?.user?.id || ''}
          onSubmit={(data) => createChangeMutation.mutate(data)}
          onCancel={() => setIsCreateChangeModalOpen(false)}
          isSubmitting={createChangeMutation.isPending}
        />
      </NeoBrutalModal>

      {/* Edit Change Modal */}
      <NeoBrutalModal
        isOpen={!!editingChange}
        onClose={() => setEditingChange(null)}
        title="Editar Cambio"
      >
        {editingChange && (
          <ChangeForm
            projectId={Number(id)}
            userId={session?.user?.id || ''}
            initialData={editingChange}
            onSubmit={(data) => updateChangeMutation.mutate({ changeId: editingChange.id, data })}
            onCancel={() => setEditingChange(null)}
            isSubmitting={updateChangeMutation.isPending}
          />
        )}
      </NeoBrutalModal>
    </DashboardLayout>
  )
}

interface EditProjectFormProps {
  project: any
  onSubmit: (data: Partial<ProyectData>) => void
  onCancel: () => void
  isSubmitting: boolean
}

function EditProjectForm({ project, onSubmit, onCancel, isSubmitting }: EditProjectFormProps) {
  const form = useForm({
    defaultValues: {
      name: project.name,
      description: project.description,
      company: project.company,
      location: project.location,
      municipalidad: project.municipalidad,
      budget: project.budget,
      status: project.status,
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
            />
          )}
        </form.Field>

        <form.Field name="location">
          {(field) => (
            <NeoBrutalInput
              label="Ubicación"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="municipalidad">
          {(field) => (
            <NeoBrutalInput
              label="Municipalidad"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <div className="col-span-2">
              <NeoBrutalSelect
                label="Estado"
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
                rows={4}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 mt-6">
        <NeoBrutalButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </NeoBrutalButton>
        <NeoBrutalButton type="button" variant="ghost" onClick={onCancel}>
          Volver
        </NeoBrutalButton>
      </div>
    </form>
  )
}

interface ChangeFormProps {
  projectId: number
  userId: string
  initialData?: any
  onSubmit: (data: ProjectChangeData) => void
  onCancel: () => void
  isSubmitting: boolean
}

function ChangeForm({ projectId, userId, initialData, onSubmit, onCancel, isSubmitting }: ChangeFormProps) {
  const form = useForm({
    defaultValues: {
      changeTitle: initialData?.changeTitle || '',
      changeState: initialData?.changeState || 'preparacion',
      details: initialData?.details || '',
      budgetSpent: initialData?.budgetSpent || 0,
    },
    onSubmit: async ({ value }) => {
      onSubmit({
        ...value,
        proyectId: projectId,
        userId: userId,
      })
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
      <div className="space-y-4">
        <form.Field name="changeTitle">
          {(field) => (
            <NeoBrutalInput
              label="Descripción del cambio"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Descripción"
            />
          )}
        </form.Field>

        <form.Field name="changeState">
          {(field) => (
            <NeoBrutalSelect
              label="Tipo de cambio"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              options={[
                { value: 'preparacion', label: 'PREPARACIÓN' },
                { value: 'ejecucion', label: 'EJECUCIÓN' },
                { value: 'revision', label: 'REVISIÓN' },
                { value: 'completado', label: 'COMPLETADO' },
              ]}
            />
          )}
        </form.Field>

        <form.Field name="budgetSpent">
          {(field) => (
            <NeoBrutalInput
              label="Presupuesto gastado (₡)"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              placeholder="0"
            />
          )}
        </form.Field>

        <form.Field name="details">
          {(field) => (
            <NeoBrutalTextarea
              label="Notas adicionales"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Detalles del cambio"
              rows={4}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 mt-6">
        <NeoBrutalButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </NeoBrutalButton>
        <NeoBrutalButton type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </NeoBrutalButton>
      </div>
    </form>
  )
}

// Made with Bob
