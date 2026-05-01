export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-3">Transparencia Costa Rica</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma oficial para el seguimiento de proyectos municipalidades públicas en Costa Rica.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[#2E7D32]">Acerca de</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Contacto</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Términos de uso</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contacto</h3>
            <p className="text-sm text-muted-foreground">
              info@transparencia.go.cr<br />
              Tel: +506 2222-3333
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 Gobierno de Costa Rica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

// Made with Bob
