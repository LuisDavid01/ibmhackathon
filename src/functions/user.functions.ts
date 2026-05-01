import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { UserInsert } from '@/types'
import { createServerFn } from '@tanstack/react-start'



export const getUsuarios = createServerFn({ method: 'GET' })
  .inputValidator((data: {limit: number, offset: number}) => data)
  .handler(async ({ data }) => {

    return await QUERIES.getUsuarios(data.limit, data.offset)
  })

  export const crearUsuarios = createServerFn({ method: 'POST' })
  .inputValidator((data: UserInsert) => data)
  .handler(async ({ data }) => {

    return await MUTATIONS.createUser(data)
  })
