import { Link } from "@tanstack/react-router"

export function Footer() {
  return (
    <footer className="bg-background border-t-2 border-black">
      <div className="container mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="TransparenciaCR" className="h-6 w-6" />
              <span className="text-lg font-black">TransparenciaCR</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma oficial de seguimiento y transparencia de proyectos públicos en Costa Rica.
            </p>
            <div className="flex items-center gap-3">
             
            </div>
          </div>

          {/* Column 2 - Plataforma */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              PLATAFORMA
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/proyectos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Explorar Proyectos
                </Link>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Asistente IA
                </button>
              </li>
              <li>
                <Link 
                  to="/denuncias"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  reporta malas conductas
                </Link>
              </li>

            </ul>
          </div>

          

          {/* Column 4 - Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              CONTACTO
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:info@transparencia.go.cr"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@transparencia.go.cr
                </a>
              </li>
              <li>
                <a 
                  href="tel:+50622223333"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +506 2222-3333
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2026 Gobierno de Costa Rica. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs">
            Datos Abiertos · Licencia CC BY 4.0
          </p>
        </div>
      </div>
    </footer>
  )
}

// Made with Bob
