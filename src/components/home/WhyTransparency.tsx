import { whyTransparencyData } from "@/data/mockData"
import { Eye, Scale, Users } from "lucide-react"

const iconComponents = {
  IconEye: Eye,
  IconScale: Scale,
  IconUsers: Users,
}

export function WhyTransparency() {
  return (
    <section className="bg-muted py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p className="text-xs font-bold text-[#2C6E3F] uppercase tracking-widest mb-4 text-center">
          POR QUÉ IMPORTA
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 leading-tight">
          La transparencia no es opcional.
          <br />
          Es un derecho ciudadano.
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyTransparencyData.map((item, index) => {
            const IconComponent = iconComponents[item.icon as keyof typeof iconComponents]
            
            return (
              <div
                key={index}
                className="border-2 border-black p-6 bg-card shadow-[6px_6px_0_black] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-secondary border-2 border-black flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent size={24} />}
                </div>

                {/* Title */}
                <h3 className="font-black text-xl mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-black/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Made with Bob
