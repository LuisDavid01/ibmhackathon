import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-6 pt-24 pb-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="border-2 border-black bg-white text-sm font-bold px-4 py-1 rounded-full">
              Sistema Nacional de Transparencia
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
            Conoce en qué se
            <br />
            gasta tu{" "}
            <span className="inline-block bg-black text-secondary px-3 py-1">
              dinero.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
            Accede a información detallada sobre cada proyecto público en Costa Rica.
            Presupuestos, avances y resultados en tiempo real.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/proyectos">
              <Button 
                size="lg"
                className="bg-primary text-white border-2 border-black font-bold text-lg px-8 py-6 shadow-[4px_4px_0_black] hover:shadow-[6px_6px_0_black] hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                Explorar Proyectos
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-black font-bold text-lg px-8 py-6 hover:bg-black hover:text-white transition-all"
            >
              Hablar con la IA
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm font-mono text-black/60">
            <span className="font-bold">438 Proyectos</span>
            <span>·</span>
            <span className="font-bold">₡2.1T Fiscalizados</span>
            <span>·</span>
            <span className="font-bold">87 Instituciones</span>
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute top-32 left-10 opacity-10 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div className="absolute top-48 right-16 opacity-10 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-32 opacity-10 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          </svg>
        </div>
      </div>
    </section>
  )
}

// Made with Bob
