import { ratelimit } from "@/lib/redis";
import { runAgent } from "@/server/ai/agent.server"
import { tools } from "@/server/ai/tools/index.server"
import { createServerFn } from "@tanstack/react-start"
import {
  getRequestHeader,

} from '@tanstack/react-start/server'
export const clientAgent = createServerFn({ method: 'POST' })
  .inputValidator((data: { message: string, conversationHistory?: any[] }) => data)
  .handler(async ({ data }) => {
    try {
      const ip = getRequestHeader('x-forwarded-for') ?? "anonymous";

      const { success } = await ratelimit.limit(ip);

      if (!success) {
        throw new Error("ratelimit reached");

      }

      const { message, conversationHistory = [] } = data

      // Run the AI agent with the user's message
      // runAgent now returns AIMessage[] with only the new messages generated in this session
      const newMessages = await runAgent({
        userMessage: message,
        prevMessages: conversationHistory,
        tools: tools
      })

      // retorna los nuevos mensajes para actualizar el estado del ciente de react
      console.log(newMessages)
      return {
        success: true,
        data: newMessages,
        message: 'Consulta procesada exitosamente'
      }
    } catch (error) {
  if (error instanceof Error) {
    console.log("error", error.message);

    if (error.message === "ratelimit reached") {
      console.log("Rate limit detectado");

      return {
        success: false,
        data: [],
        message: "limit reached please try again later",
        error: 'Rate limit alcanzado'
      };
    }
  }

  // fallback
  return {
    success: false,
    data: [],
    message: 'Error al procesar la consulta',
    error: 'un error ha ocurrido al procesar la consulta al agente'
  };
}
  })
