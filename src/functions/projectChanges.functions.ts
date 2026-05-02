import { ensureSession } from '@/lib/auth.functions'
import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { ProjectChangeData } from '@/types'
import { createServerFn } from '@tanstack/react-start'

// Query functions

export const getProjectChanges = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProjectChanges(data.limit, data.offset)
  })

export const getProjectChangeById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProjectChangeById(data.id)
  })

export const getProjectChangesByProjectId = createServerFn({ method: 'GET' })
  .inputValidator((data: { proyectId: number, limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProjectChangesByProjectId(data.proyectId, data.limit, data.offset)
  })

export const buscarProjectChanges = createServerFn({ method: 'GET' })
  .inputValidator((data: { searchTerm: string, limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.searchProjectChanges(data.searchTerm, data.limit, data.offset)
  })

// Mutation functions

export const crearProjectChange = createServerFn({ method: 'POST' })
  .inputValidator((data: ProjectChangeData) => data)
  .handler(async ({ data }) => {
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    return await MUTATIONS.createProjectChange(data)
  })

export const actualizarProjectChange = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number, data: Partial<ProjectChangeData> }) => data)
  .handler(async ({ data }) => {
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    return await MUTATIONS.updateProjectChange(data.id, data.data)
  })

export const eliminarProjectChange = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
        const session = await ensureSession();
    if(session.user.role !== 'admin') {
      throw new Error('No tienes permiso para crear usuarios')
    }
    return await MUTATIONS.deleteProjectChange(data.id)
  })

// Made with Bob