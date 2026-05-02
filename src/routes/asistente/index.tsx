import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/asistente/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/asistente/ aqui va el asistente de ia"!</div>
}
