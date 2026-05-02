import { runAgent } from "@/server/ai/agent.server"
import { tools } from "@/server/ai/tools/index.server"
import { createServerFn } from "@tanstack/react-start"

export const clientAgent = createServerFn({ method: 'POST' })
  .inputValidator((data: { message: string, conversationHistory?: any[] }) => data)
  .handler(async ({ data }) => {
    try {
      const { message, conversationHistory = [] } = data
      
      // Run the AI agent with the user's message
      // runAgent now returns AIMessage[] with only the new messages generated in this session
      const newMessages = await runAgent({
        userMessage: message,
        prevMessages: conversationHistory,
        tools: tools
      })

      return {
        success: true,
        data: newMessages,
        message: 'Consulta procesada exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Error al procesar la consulta',
        error: 'un error ha ocurrido al procesar la consulta al agente'
      }
    }
  })
