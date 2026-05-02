import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { getSession } from '@/lib/auth.functions'


export const Route = createFileRoute('/login')({
  beforeLoad: async ({ location }) => {
      const session = await getSession();
      if (session) {
        throw redirect({
          to: "/dashboard"
        });
      }
      return

    },
  component: RouteComponent,
})

interface LoginFormData {
  email: string
  password: string
}

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
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
              toast.success('Acceso autorizado')
            },
            onError: (ctx) => {
              if (ctx.error.status === 403) {
                setAuthError('VERIFICACIÓN REQUERIDA: Confirme su correo electrónico')
                toast.error('Verificación de correo requerida')
                return
              }
              setAuthError('ACCESO DENEGADO: Credenciales inválidas')
              toast.error('Credenciales inválidas')
            },
          }
        )
      } catch (error) {
        setAuthError('ERROR DEL SISTEMA: Intente nuevamente')
        toast.error('Error del sistema')
      } finally {
        setIsLoading(false)
      }
    },
  })

  const handleForgotPassword = async () => {
    const emailValue = form.getFieldValue('email')
    
    if (!emailValue) {
      toast.error('Ingrese su correo electrónico')
      return
    }

    try {
      await authClient.requestPasswordReset({
        email: emailValue,
        redirectTo: '/resetPassword',
      })
      toast.success('Solicitud de restablecimiento enviada')
    } catch (error) {
      toast.error('Error al procesar solicitud')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Institutional Header */}
        <div className="border-2 border-black  p-6 mb-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-xs tracking-widest mb-1">
                TransparenciaCR
              </div>

            </div>
            <img src="/logo.png" alt="Logo" className="h-12 w-12 " />
          </div>
        </div>

        {/* Main Authentication Container */}
        <div className="border-2 border-t-0 border-black bg-card">
          {/* Checkpoint Header */}
          <div className="border-b-2 border-black bg-background p-4">
            <div className="font-mono text-xs tracking-widest text-muted-foreground">
              CHECKPOINT DE AUTENTICACIÓN
            </div>
            <div className="font-black text-xl uppercase mt-1">
              Acceso Restringido
            </div>
          </div>

        

          {/* Error Alert */}
          {authError && (
            <div className="border-b-2 border-black bg-destructive/10 p-4">
              <div className="font-mono text-xs font-bold text-destructive uppercase tracking-wide">
                ⚠ ERROR DE AUTENTICACIÓN
              </div>
              <p className="text-sm mt-1 text-destructive font-bold">
                {authError}
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="p-8 space-y-6"
          >
            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Campo requerido'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Formato de correo inválido'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    Correo Electrónico Institucional
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="usuario@gobierno.cr"
                    className="w-full border-2 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:ring-0 focus:border-primary bg-background"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-mono font-bold">
                      ERROR: {field.state.meta.errors[0]}
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
                  if (!value) return 'Campo requerido'
                  if (value.length < 8)
                    return 'Mínimo 8 caracteres requeridos'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    Contraseña de Acceso
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="••••••••••••"
                      className="w-full border-2 border-black px-4 py-3 pr-12 font-mono text-sm focus:outline-none focus:ring-0 focus:border-primary bg-background"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 border-2 border-black p-1 bg-background hover:bg-muted transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-mono font-bold">
                      ERROR: {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-mono uppercase tracking-wide hover:underline font-bold"
              >
                Restablecer Contraseña →
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground border-2 border-black font-black text-sm uppercase tracking-widest py-4 shadow-[4px_4px_0_black] hover:shadow-[6px_6px_0_black] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0_black] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Verificando Credenciales...
                </span>
              ) : (
                'Verificar Credenciales'
              )}
            </button>
          </form>

          
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            © 2026 GOBIERNO DE COSTA RICA · TODOS LOS DERECHOS RESERVADOS
          </p>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            LEY DE PROTECCIÓN DE DATOS PERSONALES N° 8968
          </p>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
