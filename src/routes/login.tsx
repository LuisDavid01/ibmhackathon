import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, Shield, FileText, Database } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: '/dashboard',
        },
        {
          onSuccess: () => {
            toast.success('Sesión iniciada correctamente')
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.error('Por favor, verifique su correo electrónico')
              return
            }
            toast.error(ctx.error.message || 'Error al iniciar sesión')
          },
        }
      )
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Por favor ingrese su correo electrónico')
      return
    }

    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: '/resetPassword',
      })
      toast.success('Se ha enviado un correo para restablecer la contraseña')
    } catch (error) {
      toast.error('Error al enviar el correo')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E8F5E9] to-[#F5F5F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32] rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Acceso Institucional
          </h1>
          <p className="text-gray-600">
            Plataforma de Transparencia Gubernamental
          </p>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Form */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Iniciar Sesión
                  </h2>
                  <p className="text-sm text-gray-600">
                    Acceda al panel administrativo
                  </p>
                </div>

                {/* Info Alert */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">Acceso Restringido</p>
                      <p className="text-xs text-gray-600">
                        El acceso está restringido a personal autorizado. 
                        Todas las actividades son monitoreadas y registradas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@gobierno.cr"
                        className="pl-10 h-11 border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11 border-gray-300 focus:border-[#2E7D32] focus:ring-[#2E7D32] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#2E7D32] border-gray-300 rounded focus:ring-[#2E7D32]"
                      />
                      <span className="text-sm text-gray-700">
                        Mantener sesión iniciada
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-[#2E7D32] hover:text-[#1B5E20] font-medium transition-colors"
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verificando...
                      </span>
                    ) : (
                      'Entrar al Panel Administrativo'
                    )}
                  </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-[#2E7D32] transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Guía de seguridad
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-[#2E7D32] transition-colors"
                    >
                      <Database className="w-4 h-4" />
                      Política de datos
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Branding */}
              <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] p-12 text-white">
                <div className="max-w-sm text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                      <Shield className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Transparencia y Rendición de Cuentas
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Sistema seguro para la gestión y seguimiento de proyectos 
                      gubernamentales. Promoviendo la transparencia y la 
                      participación ciudadana.
                    </p>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Acceso Seguro</p>
                        <p className="text-sm text-white/80">
                          Autenticación de dos factores
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Auditoría Completa</p>
                        <p className="text-sm text-white/80">
                          Registro de todas las actividades
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Datos Protegidos</p>
                        <p className="text-sm text-white/80">
                          Cumplimiento normativo garantizado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Notice */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2026 Gobierno de Costa Rica. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

// Made with Bob
