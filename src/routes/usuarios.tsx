import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/usuarios')({
  component: RouteComponent,
})

// Types
interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Funcionario' | 'Usuario'
  status: 'Activo' | 'Inactivo'
  lastAccess: string
  avatar?: string
}

// Mock Data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@gobierno.cr',
    role: 'Admin',
    status: 'Activo',
    lastAccess: '2026-05-01',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@gobierno.cr',
    role: 'Funcionario',
    status: 'Activo',
    lastAccess: '2026-04-30',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@gobierno.cr',
    role: 'Funcionario',
    status: 'Activo',
    lastAccess: '2026-04-29',
  },
  {
    id: '4',
    name: 'José Hernández',
    email: 'jose.hernandez@ciudadano.cr',
    role: 'Usuario',
    status: 'Activo',
    lastAccess: '2026-04-28',
  },
  {
    id: '5',
    name: 'Laura Pérez',
    email: 'laura.perez@gobierno.cr',
    role: 'Funcionario',
    status: 'Inactivo',
    lastAccess: '2026-03-15',
  },
  {
    id: '6',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@ciudadano.cr',
    role: 'Usuario',
    status: 'Activo',
    lastAccess: '2026-04-27',
  },
]

function RouteComponent() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Activo' | 'Inactivo'>('all')
  
  // Form state
  const [formData, setFormData] = useState<Omit<User, 'id' | 'lastAccess'>>({
    name: '',
    email: '',
    role: 'Usuario',
    status: 'Activo',
  })

  // Filtered users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handlers
  const handleCreateUser = () => {
    setModalMode('create')
    setFormData({
      name: '',
      email: '',
      role: 'Usuario',
      status: 'Activo',
    })
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setModalMode('edit')
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setIsModalOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== userId))
      if (selectedUser?.id === userId) {
        setSelectedUser(null)
      }
    }
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' as 'Activo' | 'Inactivo' }
        : u
    ))
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (modalMode === 'create') {
      const newUser: User = {
        ...formData,
        id: Date.now().toString(),
        lastAccess: new Date().toISOString().split('T')[0],
      }
      setUsers([newUser, ...users])
    } else if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...formData }
          : u
      ))
    }
    
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Funcionario': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Usuario': return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusBadgeColor = (status: User['status']) => {
    return status === 'Activo' 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* LEFT SIDEBAR */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Usuarios</h2>
            <Button 
              onClick={handleCreateUser}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-lg shadow-sm transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Usuario
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {users.slice(0, 10).map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedUser?.id === user.id
                      ? 'bg-[#2E7D32] text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                      selectedUser?.id === user.id
                        ? 'bg-white/20 text-white'
                        : 'bg-[#2E7D32] text-white'
                    }`}>
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className={`text-xs truncate ${
                        selectedUser?.id === user.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
              <p className="text-gray-600">Administra los usuarios del sistema</p>
            </div>

            {/* FILTERS */}
            <Card className="mb-6 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <svg 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('all')}
                      className={statusFilter === 'all' ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
                    >
                      Todos
                    </Button>
                    <Button
                      variant={statusFilter === 'Activo' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('Activo')}
                      className={statusFilter === 'Activo' ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
                    >
                      Activos
                    </Button>
                    <Button
                      variant={statusFilter === 'Inactivo' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('Inactivo')}
                      className={statusFilter === 'Inactivo' ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : ''}
                    >
                      Inactivos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* USERS LIST */}
            <div className="grid gap-4">
              {filteredUsers.map(user => (
                <Card 
                  key={user.id} 
                  className="shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {getInitials(user.name)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(user.status)}`}>
                            {user.status}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Último acceso: {new Date(user.lastAccess).toLocaleDateString('es-CR')}
                          </span>
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
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleStatus(user.id)
                          }}
                          className={user.status === 'Activo' 
                            ? 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
                            : 'hover:bg-green-50 hover:text-green-600 hover:border-green-300'
                          }
                        >
                          {user.status === 'Activo' ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteUser(user.id)
                          }}
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredUsers.length === 0 && (
                <Card className="shadow-sm">
                  <CardContent className="p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-600 text-lg">No se encontraron usuarios</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === 'create' ? 'Nuevo Usuario' : 'Editar Usuario'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg"
                    placeholder="correo@ejemplo.cr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    <option value="Usuario">Usuario</option>
                    <option value="Funcionario">Funcionario</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
                  >
                    {modalMode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Made with Bob
