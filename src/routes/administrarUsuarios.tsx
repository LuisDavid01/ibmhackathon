import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

export const Route = createFileRoute('/administrarUsuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen bg-background">
      {/* SIDEBAR - LEFT PANEL */}
      <aside className="w-80 bg-card border-r border-border flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Panel de Usuarios</h2>
          <Button className="w-full rounded-xl transition-all flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            <span>Nuevo Usuario</span>
          </Button>
        </div>

        {/* User List - Empty State Ready */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No hay usuarios para mostrar
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <header className="bg-card border-b border-border p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">Administrar Usuarios</h1>
            <p className="text-muted-foreground mb-6">Gestiona los usuarios del sistema, sus roles y permisos</p>
            
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Buscar usuarios por nombre o email..."
                  className="w-full pl-10 h-12 rounded-xl"
                />
              </div>
              
              <select className="px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background">
                <option>Todos los roles</option>
                <option>Administrador</option>
                <option>Usuario</option>
              </select>
              
              <select className="px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>
        </header>

        {/* USERS GRID - Empty State */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
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
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No hay usuarios disponibles
                </h3>
                <p className="text-muted-foreground">
                  Los usuarios aparecerán aquí cuando se conecte al backend
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* SIDE PANEL - RIGHT (User Detail Preview) */}
      <aside className="w-96 bg-card border-l border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-foreground mb-6">Detalles del Usuario</h2>
        
        {/* Empty State */}
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-3xl mx-auto mb-4">
            ?
          </div>
          <p className="text-muted-foreground text-sm">
            Selecciona un usuario para ver sus detalles
          </p>
        </div>
      </aside>
    </div>
  )
}

// Made with Bob
