import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold">
            CR
          </div>
          <div>
            <div className="text-sm font-semibold">Transparencia Costa Rica</div>
            <div className="text-xs text-muted-foreground">Proyectos Públicos</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Proyectos</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Presupuesto</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Reportes</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Contacto</a>
        </div>
        <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
          Iniciar Sesión
        </Button>
      </div>
    </nav>
  )
}

// Made with Bob