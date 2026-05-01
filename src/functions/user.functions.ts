import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { UserInsert } from '@/types'
import { createServerFn } from '@tanstack/react-start'

// Query functions

export const getUsuarios = createServerFn({ method: 'GET' })
  .inputValidator((data: {limit: number, offset: number}) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getUsuarios(data.limit, data.offset)
  })

// Mutation functions

export const crearUsuarios = createServerFn({ method: 'POST' })
  .inputValidator((data: UserInsert) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.createUser(data)
  })

// Note: updateUser and deleteUser will be implemented when backend supports them
// For now, these are placeholders that return appropriate messages

export const actualizarUsuario = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string, data: Partial<UserInsert> }) => data)
  .handler(async ({ data }) => {
    // TODO: Implement when backend MUTATIONS.updateUser is available
    return {
      success: false,
      message: 'Actualización de usuarios no disponible aún'
    }
  })

export const eliminarUsuario = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    // TODO: Implement when backend MUTATIONS.deleteUser is available
    return {
      success: false,
      message: 'Eliminación de usuarios no disponible aún'
    }
  })
