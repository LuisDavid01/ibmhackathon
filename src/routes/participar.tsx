import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/participar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/participar"!</div>
}
