import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/administrarUsuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/administrarUsuarios"!</div>
}
