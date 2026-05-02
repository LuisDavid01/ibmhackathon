import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { NeoBrutalButton } from '@/components/dashboard/NeoBrutalButton'
import { NeoBrutalInput } from '@/components/dashboard/NeoBrutalInput'
import { NeoBrutalSelect } from '@/components/dashboard/NeoBrutalSelect'
import { NeoBrutalModal } from '@/components/dashboard/NeoBrutalModal'
import { Users, Trash2, Edit } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } from '@/functions/user.functions'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { UserInsert } from '@/types'

export const Route = createFileRoute('/dashboard/usuarios')({
  component: RouteComponent,
})

type UserRole = 'admin' | 'user'

interface UserFormData {
  name: string
  email: string
  password: string
  role: UserRole
}

interface ExtendedUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
  createdAt: Date
  updatedAt: Date
  role?: string | null
  banned?: boolean | null
  banReason?: string | null
  banExpires?: Date | null
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<ExtendedUser | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Fetch users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', { limit: 100, offset: 0 }],
    queryFn: () => getUsuarios({ data: { limit: 100, offset: 0 } }),
  })

  const users = (usersData?.data || []) as ExtendedUser[]

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (userData: UserInsert) => crearUsuarios({ data: userData }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setIsCreateModalOpen(false)
        toast.success('Usuario creado exitosamente')
      } else {
        toast.error(response.message)
      }
    },
    onError: () => {
      toast.error('Error al crear el usuario')
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: Partial<UserInsert> }) =>
      actualizarUsuario({ data }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setEditingUser(null)
        toast.success('Usuario actualizado exitosamente')
      } else {
        toast.error(response.message)
      }
    },
    onError: () => {
      toast.error('Error al actualizar el usuario')
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => eliminarUsuario({ data: { id } }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setDeleteConfirmId(null)
        toast.success('Usuario eliminado exitosamente')
      } else {
        toast.error(response.message)
      }
    },
    onError: () => {
      toast.error('Error al eliminar el usuario')
    },
  })

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="relative border-b-2 border-border bg-background px-8 py-6 flex items-center justify-between overflow-hidden">
        <div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            GESTIÓN DE USUARIOS
          </div>
          <h1 className="text-4xl font-black uppercase">Usuarios del Sistema</h1>
          <div className="font-mono text-sm text-muted-foreground mt-1">
            {usersData?.total || 0} usuarios registrados
          </div>
        </div>
        <Users className="absolute right-8 top-0 size-32 opacity-5" />
        <NeoBrutalButton onClick={() => setIsCreateModalOpen(true)}>
          Nuevo Usuario
        </NeoBrutalButton>
      </div>

      {/* Filters */}
      <div className="bg-muted border-b-2 border-border px-8 py-4 flex gap-4 items-center">
        <NeoBrutalInput
          placeholder="BUSCAR USUARIO..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <NeoBrutalSelect
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          options={[
            { value: 'all', label: 'TODOS' },
            { value: 'admin', label: 'ADMIN' },
            { value: 'user', label: 'USER' },
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
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 font-mono text-muted-foreground">
            NO HAY USUARIOS
          </div>
        ) : (
          <table className="w-full border-collapse border-2 border-border">
            <thead className="bg-foreground text-background">
              <tr>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Nombre
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Email
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Rol
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Fecha Registro
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b-2 border-border hover:bg-muted transition-colors ${
                    index % 2 === 0 ? 'even:bg-muted/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-semibold">{user.name}</td>
                  <td className="font-mono text-sm px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block border-2 rounded-none font-mono text-xs px-2 py-0.5 uppercase tracking-wide ${
                      user.role === 'admin' 
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted text-muted-foreground border-muted-foreground'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="font-mono text-sm px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                        title="Editar usuario"
                      >
                        <Edit className="size-4" />
                      </button>
                      {deleteConfirmId === user.id ? (
                        <button
                          onClick={() => deleteMutation.mutate(user.id)}
                          className="border-2 border-destructive rounded-none px-2 py-1.5 font-mono text-xs text-destructive hover:bg-destructive/10 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          ¿CONFIRMAR?
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(user.id)}
                          className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                          title="Eliminar usuario"
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
        title="Nuevo Usuario"
      >
        <UserForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </NeoBrutalModal>

      {/* Edit Modal */}
      <NeoBrutalModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Editar Usuario"
      >
        {editingUser && (
          <UserForm
            initialData={editingUser}
            onSubmit={(data) => updateMutation.mutate({ id: editingUser.id, data })}
            onCancel={() => setEditingUser(null)}
            isSubmitting={updateMutation.isPending}
            isEdit
          />
        )}
      </NeoBrutalModal>
    </DashboardLayout>
  )
}

interface UserFormProps {
  initialData?: ExtendedUser
  onSubmit: (data: UserInsert) => void
  onCancel: () => void
  isSubmitting: boolean
  isEdit?: boolean
}

function UserForm({ initialData, onSubmit, onCancel, isSubmitting, isEdit }: UserFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      role: (initialData?.role as UserRole) || 'user',
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        const { password, ...updateData } = value
        onSubmit(updateData as UserInsert)
      } else {
        onSubmit(value)
      }
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
        <form.Field name="name">
          {(field) => (
            <NeoBrutalInput
              label="Nombre"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nombre completo"
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <NeoBrutalInput
              label="Email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="correo@ejemplo.cr"
            />
          )}
        </form.Field>

        {!isEdit && (
          <form.Field name="password">
            {(field) => (
              <NeoBrutalInput
                label="Contraseña"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••"
              />
            )}
          </form.Field>
        )}

        <form.Field name="role">
          {(field) => (
            <NeoBrutalSelect
              label="Rol"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as UserRole)}
              options={[
                { value: 'user', label: 'USUARIO' },
                { value: 'admin', label: 'ADMINISTRADOR' },
              ]}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 mt-6">
        <NeoBrutalButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Usuario'}
        </NeoBrutalButton>
        <NeoBrutalButton type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </NeoBrutalButton>
      </div>
    </form>
  )
}

// Made with Bob
