import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { Bot } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-muted py-28 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Robot Icon */}
          <div className="w-20 h-20 bg-primary border-2 border-black flex items-center justify-center shadow-[4px_4px_0_black]">
            <Bot size={40} className="text-white" strokeWidth={2.5} />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-2xl">
            ¿Tienes dudas sobre algún proyecto?
            <br />
            Pregúntale a la IA.
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Nuestro asistente inteligente puede responder cualquier pregunta sobre presupuestos,
            avances, contratos y más. En lenguaje claro, sin tecnicismos.
          </p>

          {/* CTA Button */}
          <Link to="/asistente">
          <Button 
            size="lg"
            className="bg-primary text-white border-2 border-black font-bold text-lg px-10 py-7 shadow-[6px_6px_0_black] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
          >
            Iniciar conversación
          </Button>
          </Link>

          {/* Features Text */}
          <p className="text-xs font-mono text-muted-foreground pt-2">
            Gratuito · Sin registro · Disponible 24/7
          </p>
        </div>
      </div>
    </section>
  )
}

// Made with Bob