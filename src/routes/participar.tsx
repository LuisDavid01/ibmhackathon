import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

interface FormData {
  nombre: string
  correo: string
  tipoComentario: string
  proyectoRelacionado: string
  comentario: string
}

function RouteComponent() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    tipoComentario: '',
    proyectoRelacionado: '',
    comentario: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.tipoComentario || !formData.comentario) {
      toast.error('Por favor complete los campos requeridos')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      toast.success('¡Opinión enviada exitosamente!')
      
      // Reset form
      setFormData({
        nombre: '',
        correo: '',
        tipoComentario: '',
        proyectoRelacionado: '',
        comentario: '',
      })

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E8F5E9] to-[#F5F5F5] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32] rounded-full mb-4 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Participación Ciudadana
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Su opinión es importante para nosotros. Comparta sus sugerencias, 
            reportes o comentarios de forma anónima y segura.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E7D32]/10 rounded-full mb-3">
                <Shield className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Anónimo</h3>
              <p className="text-sm text-gray-600">
                Su identidad está protegida
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E7D32]/10 rounded-full mb-3">
                <MessageSquare className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Transparente</h3>
              <p className="text-sm text-gray-600">
                Todas las opiniones son revisadas
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E7D32]/10 rounded-full mb-3">
                <FileText className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Efectivo</h3>
              <p className="text-sm text-gray-600">
                Sus comentarios generan cambios
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 mb-1">
                  ¡Opinión Recibida!
                </h4>
                <p className="text-sm text-green-700">
                  Gracias por su participación. Su opinión ha sido registrada y 
                  será revisada por nuestro equipo. Le notificaremos sobre cualquier 
                  actualización relacionada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Formulario de Participación
              </h2>
              <p className="text-sm text-gray-600">
                Los campos marcados con <span className="text-red-500">*</span> son obligatorios
              </p>
            </div>

            {/* Info Alert */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Información Importante</p>
                  <p className="text-blue-700">
                    Sus datos personales son opcionales. Si desea recibir seguimiento 
                    sobre su comentario, por favor proporcione su correo electrónico.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Optional Fields Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                    Nombre (Opcional)
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Su nombre completo"
                    className="h-11 border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                  />
                </div>

                {/* Correo */}
                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-sm font-medium text-gray-700">
                    Correo Electrónico (Opcional)
                  </Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="correo@ejemplo.com"
                    className="h-11 border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              {/* Required Fields Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tipo de Comentario */}
                <div className="space-y-2">
                  <Label htmlFor="tipoComentario" className="text-sm font-medium text-gray-700">
                    Tipo de Comentario <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="tipoComentario"
                    name="tipoComentario"
                    value={formData.tipoComentario}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="reporte">Reporte</option>
                    <option value="queja">Queja</option>
                    <option value="felicitacion">Felicitación</option>
                    <option value="consulta">Consulta</option>
                  </select>
                </div>

                {/* Proyecto Relacionado */}
                <div className="space-y-2">
                  <Label htmlFor="proyectoRelacionado" className="text-sm font-medium text-gray-700">
                    Proyecto Relacionado (Opcional)
                  </Label>
                  <select
                    id="proyectoRelacionado"
                    name="proyectoRelacionado"
                    value={formData.proyectoRelacionado}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white"
                  >
                    <option value="">Ninguno específico</option>
                    <option value="proyecto-1">Carretera Nacional Ruta 32</option>
                    <option value="proyecto-2">Hospital Regional de Limón</option>
                    <option value="proyecto-3">Acueducto Metropolitano</option>
                    <option value="proyecto-4">Parque Nacional Corcovado</option>
                    <option value="proyecto-5">Centro Educativo San José</option>
                    <option value="proyecto-6">Puente Río Grande</option>
                  </select>
                </div>
              </div>

              {/* Comentario */}
              <div className="space-y-2">
                <Label htmlFor="comentario" className="text-sm font-medium text-gray-700">
                  Comentario <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleInputChange}
                  placeholder="Escriba aquí su opinión, sugerencia o comentario..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all resize-none"
                  required
                />
                <p className="text-xs text-gray-500">
                  Mínimo 10 caracteres. Sea específico y constructivo.
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 leading-relaxed">
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
                  className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
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
          <p className="text-sm text-gray-600">
            ¿Tiene preguntas? Consulte nuestra{' '}
            <a href="#" className="text-[#2E7D32] hover:text-[#1B5E20] font-medium">
              guía de participación ciudadana
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
