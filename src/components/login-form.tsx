import { cn } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,

} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { toast } from 'sonner'
import { authClient} from '@/lib/auth-client'


const formSchema = z.object({
	email: z.string().email('invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters.')
		.max(32, 'Password must be at most 32 characters.'),
})

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
					callbackURL: '/dashboard',
				},
				{
					onSuccess: () => {
						toast.success('Sesión iniciada')
					},
					onError: (ctx) => {
						if (ctx.error.status === 403) {
							toast.error('Porfavor, verifique su correo')
							return
						}
						toast.error(ctx.error.message)
					},
				},
			)
		},
	})

	async function resetPasswordClient() {
		const emailSchema = z.object({
			email: z.string().email('invalid email address'),
		})

		const email = form.getFieldValue('email')
		const validatedEmail = emailSchema.safeParse({ email })
		if (!validatedEmail.success) {
			console.log(validatedEmail.error, email)
			toast.error(`Porfavor, revise su correo ${validatedEmail.error.message}`)
			return
		}
		await authClient.requestPasswordReset({
			email: email,
			redirectTo: '/resetPassword',
		})
		toast.success('Se ha enviado un correo para resetear la contraseña')
	}
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form
						className="min-w-0 p-6 md:p-8"
						id="login-form"
						onSubmit={(e) => {
							e.preventDefault()
							form.handleSubmit()
						}}
					>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Wellcome</h1>
								<p className="text-balance text-muted-foreground">
									Enterprise login
								</p>
							</div>

							<form.Field
								name="email"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="m@example.com"
												className=""
												aria-invalid={isInvalid}
												type="email"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>

							<form.Field
								name="password"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<div className="flex items-center">
												<FieldLabel htmlFor="password">Password</FieldLabel>
												<Button
													variant={'link'}
													className="ml-auto text-sm"
													onClick={resetPasswordClient}
												>
													Forgot your password?
												</Button>
											</div>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="enter secure password please..."
												className=""
												aria-invalid={isInvalid}
												type="password"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>

							<Field>
								<Button type="submit">Login</Button>
							</Field>


						</FieldGroup>
					</form>
					<div className="relative hidden bg-muted md:block">
						<img
							src="/placeholder.svg"
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	)
}