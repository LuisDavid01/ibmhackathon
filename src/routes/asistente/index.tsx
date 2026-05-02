import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from '@/components/chat/ChatPage'
import { Navbar } from '@/components/home/Navbar'

export const Route = createFileRoute('/asistente/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <ChatPage />
    </>
  )
}
