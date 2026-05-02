import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { Bot, Check } from "lucide-react"

export function AIChatPromo() {
  return (
    <section className="bg-foreground py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-6">
            {/* Badge */}
            <span className="inline-block bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
              NUEVO
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Pregunta cualquier cosa sobre proyectos del gobierno.
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed">
              Nuestro asistente de IA te ayuda a entender presupuestos, contratos y avances
              de cualquier proyecto público en segundos. Sin tecnicismos, en lenguaje claro.
            </p>

            {/* CTA Button */}
            <Link to="/asistente">
            <Button 
              size="lg"
              variant={"outline"}
              className="text-black"
            >
              Probar el asistente IA
            </Button>
            </Link>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-green-900" strokeWidth={3} />
                </div>
                <span className="text-white/90">Consultas en lenguaje natural</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-green-900" strokeWidth={3} />
                </div>
                <span className="text-white/90">Datos en tiempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-green-900" strokeWidth={3} />
                </div>
                <span className="text-white/90">Sin tecnicismos</span>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0_black] p-4 max-w-sm w-full">
              {/* Chat Header */}
              <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-3">
                <div className="w-8 h-8 bg-secondary border-2 border-black flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <span className="font-bold text-sm">Asistente TransparenciaCR</span>
                <span className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
              </div>

              {/* Chat Messages */}
              <div className="space-y-3">
                {/* User Message */}
                <div className="bg-black/5 rounded p-2 text-xs">
                  ¿Cuánto lleva ejecutado el proyecto de carretera Ruta 27?
                </div>

                {/* Bot Response */}
                <div className="bg-secondary border border-black p-2 text-xs ml-4">
                  El proyecto Ruta 27 tiene un presupuesto de ₡48.200M y ha ejecutado el 67% al 
                  primer trimestre 2024. El avance está dentro del cronograma previsto.
                </div>

                {/* User Message */}
                <div className="bg-black/5 rounded p-2 text-xs">
                  ¿Qué instituciones están involucradas?
                </div>

                {/* Bot Response */}
                <div className="bg-secondary border border-black p-2 text-xs ml-4">
                  Participan MOPT (Ministerio de Obras Públicas) y CONAVI...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Made with Bob
