import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/home/Navbar"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { crearComment } from "@/functions/comments.functions"
import { NeoBrutalInput } from "@/components/dashboard/NeoBrutalInput"
import { NeoBrutalTextarea } from "@/components/dashboard/NeoBrutalTextarea"
import { NeoBrutalButton } from "@/components/dashboard/NeoBrutalButton"
import { AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react"

export const Route = createFileRoute("/denuncias")({
  component: DenunciasPage,
})

function DenunciasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DenunciasHero />
      <DenunciasFormSection />
    </div>
  )
}

function DenunciasHero() {
  return (
    <section className="relative bg-foreground text-background border-b-2 border-border pt-24 pb-16 px-6 overflow-hidden">
      <AlertTriangle
        size={192}
        className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5"
        strokeWidth={1}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
          Reporta <span className="bg-primary text-primary-foreground px-3 py-1">Irregularidades</span>
        </h1>
        <p className="text-xl text-background/80 max-w-2xl font-mono">
          Tu voz importa. Reporta de forma anónima cualquier irregularidad en proyectos públicos.
        </p>
      </div>
    </section>
  )
}

function DenunciasFormSection() {
  const [submitted, setSubmitted] = useState(false)

  const mutation = useMutation({
    mutationFn: crearComment,
    onSuccess: () => {
      setSubmitted(true)
    },
  })

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({ data: value })
    },
  })

  if (submitted) {
    return (
      <section className="bg-primary text-primary-foreground py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <CheckCircle2 size={96} className="mx-auto mb-6" strokeWidth={2} />
          <h2 className="text-4xl font-black mb-4">¡Denuncia Recibida!</h2>
          <p className="text-xl font-mono mb-8">
            Tu reporte ha sido enviado de forma anónima. Será revisado por nuestro equipo.
          </p>
          <NeoBrutalButton
            onClick={() => setSubmitted(false)}
            className="bg-background text-foreground"
          >
            Enviar Otra Denuncia
          </NeoBrutalButton>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-muted border-2 border-border p-8 shadow-[8px_8px_0px_0px_hsl(var(--border))]">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">
              Formulario de Denuncia
            </h2>
            
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              <form.Field name="title">
                {(field) => (
                  <NeoBrutalInput
                    label="Título"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Breve descripción del problema"
                    required
                  />
                )}
              </form.Field>

              <form.Field name="content">
                {(field) => (
                  <NeoBrutalTextarea
                    label="Descripción Detallada"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Describe la irregularidad con el mayor detalle posible..."
                    rows={8}
                    required
                    className="min-h-[200px]"
                  />
                )}
              </form.Field>

              <NeoBrutalButton
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-foreground text-background"
              >
                {mutation.isPending ? "Enviando..." : "Enviar Denuncia Anónima"}
              </NeoBrutalButton>

              {mutation.isError && (
                <p className="text-destructive font-mono text-sm">
                  Error al enviar la denuncia. Intenta nuevamente.
                </p>
              )}
            </form>
          </div>

          {/* Info Panel */}
          <DenunciasInfoPanel />
        </div>
      </div>
    </section>
  )
}

function DenunciasInfoPanel() {
  return (
    <div className="bg-muted border-2 border-border p-8 shadow-[8px_8px_0px_0px_hsl(var(--border))]">
      <div className="flex items-center gap-4 mb-6">
        <ShieldCheck size={48} className="text-primary" strokeWidth={2} />
        <h3 className="text-2xl font-black uppercase tracking-tight">
          Garantía de Anonimato
        </h3>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
          <p className="text-sm">
            <strong className="font-bold">100% Anónimo:</strong> No recopilamos ninguna información personal identificable.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
          <p className="text-sm">
            <strong className="font-bold">Sin Registro:</strong> No necesitas crear una cuenta para reportar.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
          <p className="text-sm">
            <strong className="font-bold">Protección Legal:</strong> Tu identidad está protegida por ley.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
          <p className="text-sm">
            <strong className="font-bold">Revisión Profesional:</strong> Cada reporte es analizado por nuestro equipo.
          </p>
        </div>
      </div>

      <div className="bg-background border-2 border-border p-4">
        <p className="font-mono text-xs text-muted-foreground mb-2">
          ESTADÍSTICA
        </p>
        <p className="text-3xl font-black font-mono">
          1,247
        </p>
        <p className="text-sm text-muted-foreground">
          Denuncias recibidas este año
        </p>
      </div>
    </div>
  )
}

// Made with Bob