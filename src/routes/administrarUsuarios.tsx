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

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* User Item 1 - Active */}
          <div className="p-4 rounded-xl bg-primary/10 border-l-4 border-primary hover:bg-primary/20 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">María González</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <Badge>Administrador</Badge>
          </div>

          {/* User Item 2 */}
          <div className="p-4 rounded-xl bg-card hover:bg-muted cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Carlos Ramírez</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <Badge variant="secondary">Coordinador</Badge>
          </div>

          {/* User Item 3 */}
          <div className="p-4 rounded-xl bg-card hover:bg-muted cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Ana Martínez</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <Badge variant="outline">Voluntario</Badge>
          </div>

          {/* User Item 4 */}
          <div className="p-4 rounded-xl bg-card hover:bg-muted cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Luis Fernández</h3>
              <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
            </div>
            <Badge variant="outline">Voluntario</Badge>
          </div>

          {/* User Item 5 */}
          <div className="p-4 rounded-xl bg-card hover:bg-muted cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Sofia López</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <Badge variant="secondary">Coordinador</Badge>
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
                <option>Coordinador</option>
                <option>Voluntario</option>
              </select>
              
              <select className="px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>
        </header>

        {/* USERS GRID */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Card 1 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    MG
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">María González</h3>
                    <p className="text-sm text-muted-foreground">maria.gonzalez@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge>Administrador</Badge>
                  <Badge variant="default">Activo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Card 2 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-lg">
                    CR
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">Carlos Ramírez</h3>
                    <p className="text-sm text-muted-foreground">carlos.ramirez@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">Coordinador</Badge>
                  <Badge variant="default">Activo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Card 3 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    AM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">Ana Martínez</h3>
                    <p className="text-sm text-muted-foreground">ana.martinez@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">Voluntario</Badge>
                  <Badge variant="default">Activo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Card 4 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-lg">
                    LF
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">Luis Fernández</h3>
                    <p className="text-sm text-muted-foreground">luis.fernandez@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">Voluntario</Badge>
                  <Badge variant="destructive">Inactivo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Card 5 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    SL
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">Sofia López</h3>
                    <p className="text-sm text-muted-foreground">sofia.lopez@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">Coordinador</Badge>
                  <Badge variant="default">Activo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Card 6 */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-lg">
                    JM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">Juan Morales</h3>
                    <p className="text-sm text-muted-foreground">juan.morales@email.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">Voluntario</Badge>
                  <Badge variant="default">Activo</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* SIDE PANEL - RIGHT (User Detail Preview) */}
      <aside className="w-96 bg-card border-l border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-foreground mb-6">Detalles del Usuario</h2>
        
        {/* User Avatar and Name */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-3xl mx-auto mb-4">
            MG
          </div>
          <h3 className="text-2xl font-bold text-foreground">María González</h3>
          <p className="text-muted-foreground">maria.gonzalez@email.com</p>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Nombre Completo</label>
            <p className="text-foreground font-medium">María González</p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Email</label>
            <p className="text-foreground font-medium">maria.gonzalez@email.com</p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Rol</label>
            <Badge>Administrador</Badge>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Estado</label>
            <Badge variant="default">Activo</Badge>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Último Acceso</label>
            <p className="text-foreground font-medium">01 Mayo 2026, 14:30</p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-1">Fecha de Registro</label>
            <p className="text-foreground font-medium">15 Enero 2026</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button className="w-full rounded-xl">
            Editar Usuario
          </Button>
          <Button variant="destructive" className="w-full rounded-xl">
            Eliminar Usuario
          </Button>
        </div>
      </aside>
    </div>
  )
}

// Made with Bob
