import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/proyectos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/proyectos"!</div>
}
