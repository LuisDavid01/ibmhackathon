import { Link, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, Users, MessageCircle, Home, LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-border bg-background flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-border p-6">
          <img src="/logo.png" alt="TransparenciaCR" className="h-8 w-8 mb-2" />
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            TRANSPARENCIA
          </div>
          <h1 className="text-xl font-black uppercase">
            Costa <span className="bg-primary text-primary-foreground px-1">Rica</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <NavLink to="/dashboard" icon={<LayoutDashboard className="size-5" />}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/usuarios" icon={<Users className="size-5" />}>
            Usuarios
          </NavLink>
          <NavLink to="/dashboard/comentarios" icon={<MessageCircle className="size-5" />}>
            Comentarios
          </NavLink>
          <NavLink to="/" icon={<Home className="size-5" />}>
            Inicio
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t-2 border-border p-4">
          {session?.user && (
            <div className="mb-3">
              <div className="font-mono text-xs text-muted-foreground">
                {session.user.email}
              </div>
              <div className="font-mono text-xs font-bold">
                {session.user.name}
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 border-2 border-border rounded-none bg-background font-mono text-sm uppercase tracking-wide hover:bg-muted transition-colors"
          >
            <LogOut className="size-4" />
            Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

interface NavLinkProps {
  to: string
  icon: React.ReactNode
  children: React.ReactNode
}

function NavLink({ to, icon, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 border-b border-border font-mono text-sm uppercase tracking-wide transition-colors hover:bg-muted"
    >
      {icon}
      {children}
    </Link>
  )
}

// Made with Bob
