import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { ProyectData } from '@/types'
import { createServerFn } from '@tanstack/react-start'
import { runAgent } from '@/server/ai/agent.server'
import { tools } from '@/server/ai/tools/index.server'

// Query functions

export const getProyectos = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProyects(data.limit, data.offset)
  })

export const getProyectoById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProyectById(data.id)
  })

export const buscarProyectos = createServerFn({ method: 'GET' })
  .inputValidator((data: { searchTerm: string, limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.searchProyects(data.searchTerm, data.limit, data.offset)
  })

// Mutation functions

export const crearProyecto = createServerFn({ method: 'POST' })
  .inputValidator((data: ProyectData) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.createProyect(data)
  })

export const actualizarProyecto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number, data: Partial<ProyectData> }) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.updateProyect(data.id, data.data)
  })

export const eliminarProyecto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.deleteProyect(data.id)
  })

// AI Agent function

export const consultarProyectoConIA = createServerFn({ method: 'POST' })
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
        messages: newMessages,
        message: 'Consulta procesada exitosamente'
      }
    } catch (error) {
      console.error('Error in consultarProyectoConIA:', error)
      return {
        success: false,
        messages: [],
        message: 'Error al procesar la consulta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  })

// Made with Bob
