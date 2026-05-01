import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Users,
  FileText,
  Shield
} from 'lucide-react'

export const Route = createFileRoute('/participar')({
  component: RouteComponent,
})

interface ParticipacionFormData {
  nombre: string
  correo: string
  tipoComentario: string
  proyectoRelacionado: string
  comentario: string
}

function RouteComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // TanStack Form
  const form = useForm({
    defaultValues: {
      nombre: '',
      correo: '',
      tipoComentario: '',
      proyectoRelacionado: '',
      comentario: '',
    },
    onSubmit: async ({ value }: { value: ParticipacionFormData }) => {
      setIsSubmitting(true)

      // Simulate API call - replace with actual backend call when ready
      setTimeout(() => {
        setIsSubmitting(false)
        setShowSuccess(true)
        toast.success('¡Opinión enviada exitosamente!')
        
        // Reset form
        form.reset()

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000)
      }, 1500)
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-lg">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Participación Ciudadana
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Su opinión es importante para nosotros. Comparta sus sugerencias,
            reportes o comentarios de forma anónima y segura.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Anónimo</h3>
              <p className="text-sm text-muted-foreground">
                Su identidad está protegida
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparente</h3>
              <p className="text-sm text-muted-foreground">
                Todas las opiniones son revisadas
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Efectivo</h3>
              <p className="text-sm text-muted-foreground">
                Sus comentarios generan cambios
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-200">¡Opinión Recibida!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Gracias por su participación. Su opinión ha sido registrada y
              será revisada por nuestro equipo. Le notificaremos sobre cualquier
              actualización relacionada.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form Card */}
        <Card className="shadow-2xl">
          <CardContent className="p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Formulario de Participación
              </h2>
              <p className="text-sm text-muted-foreground">
                Los campos marcados con <span className="text-destructive">*</span> son obligatorios
              </p>
            </div>

            {/* Info Alert */}
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Información Importante</AlertTitle>
              <AlertDescription>
                Sus datos personales son opcionales. Si desea recibir seguimiento
                sobre su comentario, por favor proporcione su correo electrónico.
              </AlertDescription>
            </Alert>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              {/* Optional Fields Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <form.Field name="nombre">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="nombre">
                        Nombre (Opcional)
                      </Label>
                      <Input
                        id="nombre"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Su nombre completo"
                        className="h-11"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Correo */}
                <form.Field
                  name="correo"
                  validators={{
                    onChange: ({ value }) => {
                      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                        return 'Correo electrónico inválido'
                      return undefined
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="correo">
                        Correo Electrónico (Opcional)
                      </Label>
                      <Input
                        id="correo"
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="correo@ejemplo.com"
                        className="h-11"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Required Fields Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tipo de Comentario */}
                <form.Field
                  name="tipoComentario"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return 'Debe seleccionar un tipo de comentario'
                      return undefined
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="tipoComentario">
                        Tipo de Comentario <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sugerencia">Sugerencia</SelectItem>
                          <SelectItem value="reporte">Reporte</SelectItem>
                          <SelectItem value="queja">Queja</SelectItem>
                          <SelectItem value="felicitacion">Felicitación</SelectItem>
                          <SelectItem value="consulta">Consulta</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Proyecto Relacionado */}
                <form.Field name="proyectoRelacionado">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="proyectoRelacionado">
                        Proyecto Relacionado (Opcional)
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Ninguno específico" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Ninguno específico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Comentario */}
              <form.Field
                name="comentario"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'El comentario es requerido'
                    if (value.length < 10)
                      return 'El comentario debe tener al menos 10 caracteres'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="comentario">
                      Comentario <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="comentario"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Escriba aquí su opinión, sugerencia o comentario..."
                      rows={6}
                      className="resize-none"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Mínimo 10 caracteres. Sea específico y constructivo.
                    </p>
                  </div>
                )}
              </form.Field>

              {/* Privacy Notice */}
              <div className="p-4 bg-muted rounded-lg border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Al enviar este formulario, usted acepta que su opinión sea procesada
                  de acuerdo con nuestra política de privacidad. Sus datos personales
                  (si los proporciona) serán utilizados únicamente para dar seguimiento
                  a su comentario y no serán compartidos con terceros.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Enviar Opinión Anónima
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Tiene preguntas? Consulte nuestra{' '}
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              guía de participación ciudadana
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
