import { ensureSession } from '@/lib/auth.functions'
import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { ProyectData } from '@/types'
import { createServerFn } from '@tanstack/react-start'


// Query functions

export const getProyectos = createServerFn({ method: 'GET' })
  .inputValidator((data: {
    limit: number,
    offset: number,
    filters?: {
      name?: string,
      municipality?: string,
      location?: string,
      dateFrom?: string,
      dateTo?: string,
      budgetMin?: number,
      budgetMax?: number
    }
  }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProyects(data.limit, data.offset, data.filters)
  })

export const getProyectosOrderedByBudget = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProyectsOrderedByBudget(data.limit)
  })

export const getProyectStatistics = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await QUERIES.getProjectStatistics()
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
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    console.log("creando proyecto")
    return await MUTATIONS.createProyect(data)
  })

export const actualizarProyecto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number, data: Partial<ProyectData> }) => data)
  .handler(async ({ data }) => {
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    return await MUTATIONS.updateProyect(data.id, data.data)
  })

export const eliminarProyecto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    return await MUTATIONS.deleteProyect(data.id)
  })


// Made with Bob
