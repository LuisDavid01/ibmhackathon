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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l18 0" />
                <path d="M5 21v-14l8 -4v18" />
                <path d="M19 21v-10l-6 -4" />
                <path d="M9 9l0 .01" />
                <path d="M9 12l0 .01" />
                <path d="M9 15l0 .01" />
                <path d="M9 18l0 .01" />
              </svg>
              <span className="text-lg font-black">TransparenciaCR</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma oficial de seguimiento y transparencia de proyectos públicos en Costa Rica.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
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
                  to="/participar"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Participar
                </Link>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Estadísticas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Términos de Uso
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Licencia de Datos
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accesibilidad
                </button>
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
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soporte Técnico
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Reportar Problema
                </button>
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
