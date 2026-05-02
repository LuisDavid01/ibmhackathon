import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } from '@/functions/user.functions'
import type { UserInsert } from '@/types'
import { AlertCircle, Loader2, Trash2 } from 'lucide-react'

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
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<ExtendedUser | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch users with TanStack Query
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', { limit: 100, offset: 0 }],
    queryFn: () => getUsuarios({ data: { limit: 100, offset: 0 } }),
  })

  // Cast users to ExtendedUser type
  const users = (usersData?.data || []) as ExtendedUser[]

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: (userData: UserInsert) => crearUsuarios({ data: userData }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setIsModalOpen(false)
        form.reset()
      }
    },
  })

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (data: { id: string; data: Partial<UserInsert> }) =>
      actualizarUsuario({ data }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setIsModalOpen(false)
        form.reset()
      }
    },
  })

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => eliminarUsuario({ data: { id } }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setIsDeleteDialogOpen(false)
        setUserToDelete(null)
        if (selectedUser?.id === userToDelete?.id) {
          setSelectedUser(null)
        }
      }
    },
  })

  // TanStack Form
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user' as UserRole,
    },
    onSubmit: async ({ value }: { value: UserFormData }) => {
      if (modalMode === 'create') {
        createUserMutation.mutate(value)
      } else if (modalMode === 'edit' && selectedUser) {
        const { password, ...updateData } = value
        updateUserMutation.mutate({
          id: selectedUser.id,
          data: updateData,
        })
      }
    },
  })

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Handlers
  const handleCreateUser = () => {
    setModalMode('create')
    form.reset()
    setIsModalOpen(true)
  }

  const handleEditUser = (user: ExtendedUser) => {
    setModalMode('edit')
    setSelectedUser(user)
    form.setFieldValue('name', user.name)
    form.setFieldValue('email', user.email)
    form.setFieldValue('role', (user.role as UserRole) || 'user')
    setIsModalOpen(true)
  }

  const handleDeleteClick = (user: ExtendedUser) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadgeVariant = (
    role: string
  ): 'default' | 'secondary' | 'outline' => {
    switch (role) {
      case 'admin':
        return 'default'
      case 'user':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* LEFT SIDEBAR */}
        <aside className="w-80 bg-card border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Usuarios
            </h2>
            <Button
              onClick={handleCreateUser}
              className="w-full rounded-lg shadow-sm transition-all"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nuevo Usuario
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-2">
                {users.slice(0, 10).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedUser?.id === user.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                          selectedUser?.id === user.id
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{user.name}</div>
                        <div
                          className={`text-xs truncate ${
                            selectedUser?.id === user.id
                              ? 'opacity-80'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {user.role || 'user'}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gestión de Usuarios
              </h1>
              <p className="text-muted-foreground">
                Administra los usuarios del sistema
              </p>
            </div>

            {/* FILTERS */}
            <Card className="mb-6 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <Input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-lg"
                      />
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
                  Error al cargar usuarios. Por favor, intente nuevamente.
                </AlertDescription>
              </Alert>
            )}

            {/* LOADING STATE */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {/* USERS LIST */}
            {!isLoading && !isError && (
              <div className="grid gap-4">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                          {getInitials(user.name)}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {user.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {user.email}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant={getRoleBadgeVariant(
                                user.role || 'user'
                              )}
                            >
                              {user.role || 'user'}
                            </Badge>
                            {user.createdAt && (
                              <Badge variant="outline">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Registrado:{' '}
                                {new Date(user.createdAt).toLocaleDateString(
                                  'es-CR'
                                )}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditUser(user)
                            }}
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(user)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* EMPTY STATE */}
                {filteredUsers.length === 0 && (
                  <Card className="shadow-sm">
                    <CardContent className="p-12 text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-muted-foreground text-lg">
                        No se encontraron usuarios
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CREATE/EDIT MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {modalMode === 'create' ? 'Nuevo Usuario' : 'Editar Usuario'}
            </DialogTitle>
            <DialogDescription>
              {modalMode === 'create'
                ? 'Crea un nuevo usuario en el sistema'
                : 'Modifica la información del usuario'}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            {/* Name Field */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El nombre es requerido'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nombre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Nombre completo"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El email es requerido'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Email inválido'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="correo@ejemplo.cr"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password Field (only for create) */}
            {modalMode === 'create' && (
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'La contraseña es requerida'
                    if (value.length < 8)
                      return 'Mínimo 8 caracteres'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Contraseña <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="••••••••"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            )}

            {/* Role Field */}
            <form.Field name="role">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as UserRole)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuario</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Error Message */}
            {(createUserMutation.isError || updateUserMutation.isError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {modalMode === 'create'
                    ? createUserMutation.error?.message || 'Error al crear usuario'
                    : updateUserMutation.error?.message || 'Error al actualizar usuario'}
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={createUserMutation.isPending || updateUserMutation.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createUserMutation.isPending || updateUserMutation.isPending}
              >
                {(createUserMutation.isPending || updateUserMutation.isPending) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : modalMode === 'create' ? (
                  'Crear Usuario'
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea eliminar al usuario{' '}
              <span className="font-semibold">{userToDelete?.name}</span>?
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          {deleteUserMutation.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {deleteUserMutation.error?.message || 'Error al eliminar usuario'}
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setUserToDelete(null)
              }}
              disabled={deleteUserMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar Usuario
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Made with Bob
