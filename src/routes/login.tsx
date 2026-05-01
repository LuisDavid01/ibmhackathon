import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Database, Eye, EyeOff, FileText, Lock, Mail, Shield, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

interface LoginFormData {
  email: string
  password: string
}

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // TanStack Form
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }: { value: LoginFormData }) => {
      setIsLoading(true)
      setAuthError(null)

      try {
        await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
            callbackURL: '/dashboard',
          },
          {
            onSuccess: () => {
              toast.success('Sesión iniciada correctamente')
            },
            onError: (ctx) => {
              if (ctx.error.status === 403) {
                setAuthError('Por favor, verifique su correo electrónico')
                toast.error('Por favor, verifique su correo electrónico')
                return
              }
              setAuthError(ctx.error.message || 'Error al iniciar sesión')
              toast.error(ctx.error.message || 'Error al iniciar sesión')
            },
          }
        )
      } catch (error) {
        setAuthError('Error al iniciar sesión')
        toast.error('Error al iniciar sesión')
      } finally {
        setIsLoading(false)
      }
    },
  })

  const handleForgotPassword = async () => {
    const emailValue = form.getFieldValue('email')
    
    if (!emailValue) {
      toast.error('Por favor ingrese su correo electrónico')
      return
    }

    try {
      await authClient.requestPasswordReset({
        email: emailValue,
        redirectTo: '/resetPassword',
      })
      toast.success('Se ha enviado un correo para restablecer la contraseña')
    } catch (error) {
      toast.error('Error al enviar el correo')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Acceso Institucional
          </h1>
          <p className="text-muted-foreground">
            Plataforma de Transparencia Gubernamental
          </p>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Form */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Iniciar Sesión
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Acceda al panel administrativo
                  </p>
                </div>

                {/* Info Alert */}
                <Alert className="mb-6">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-1">Acceso Restringido</p>
                    <p className="text-xs">
                      El acceso está restringido a personal autorizado.
                      Todas las actividades son monitoreadas y registradas.
                    </p>
                  </AlertDescription>
                </Alert>

                {/* Error Alert */}
                {authError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                  }}
                  className="space-y-5"
                >
                  {/* Email Field */}
                  <form.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return 'El correo electrónico es requerido'
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                          return 'Correo electrónico inválido'
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Correo Electrónico
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            placeholder="usuario@gobierno.cr"
                            className="pl-10 h-11"
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Password Field */}
                  <form.Field
                    name="password"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return 'La contraseña es requerida'
                        if (value.length < 8)
                          return 'La contraseña debe tener al menos 8 caracteres'
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor="password">
                          Contraseña
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-11"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-input focus:ring-ring"
                      />
                      <span className="text-sm text-foreground">
                        Mantener sesión iniciada
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
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
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Guía de seguridad
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Database className="w-4 h-4" />
                      Política de datos
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Branding */}
              <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-primary/80 p-12 text-primary-foreground">
                <div className="max-w-sm text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-full mb-6">
                      <Shield className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Transparencia y Rendición de Cuentas
                    </h3>
                    <p className="opacity-90 leading-relaxed">
                      Sistema seguro para la gestión y seguimiento de proyectos
                      gubernamentales. Promoviendo la transparencia y la
                      participación ciudadana.
                    </p>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Acceso Seguro</p>
                        <p className="text-sm opacity-80">
                          Autenticación de dos factores
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Auditoría Completa</p>
                        <p className="text-sm opacity-80">
                          Registro de todas las actividades
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Datos Protegidos</p>
                        <p className="text-sm opacity-80">
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
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 Gobierno de Costa Rica. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

// Made with Bob
