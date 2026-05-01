import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Navigate } from "@tanstack/react-router"

export function Navbar() {

  const { data: session } = authClient.useSession()
   
	async function logout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess() {
					Navigate({ to: '/login' })
				},
			},
		})
	}
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            CR
          </div>
          <div>
            <div className="text-sm font-semibold">Transparencia Costa Rica</div>
            <div className="text-xs text-muted-foreground">Proyectos Públicos</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Inicio
          </Link>
          <Link 
            to="/proyectos" 
            className="text-sm font-medium hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Proyectos
          </Link>
         {session?.user?.id ? (
						<>
							<Link
								to="/usuarios"
								className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								Entrar a tu espacio
							</Link>

							<Button
								size="sm"
								onClick={logout}
							>
								Cerrar Sesión
							</Button>
						</>

					) : (
						<>

							<Link
								to='/login'
							>
								<Button size="sm">Iniciar Sesión</Button>

							</Link>
						</>
					)}


          <Link 
            to="/participar" 
            className="text-sm font-medium hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Participar
          </Link>
          <Link 
            to="/login" 
            className="text-sm font-medium hover:text-primary transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Acceso Institucional
          </Link>
        </div>
        <Link to="/login">
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </nav>
  )
}

// Made with Bob