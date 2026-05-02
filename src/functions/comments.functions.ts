import { MUTATIONS } from '@/server/mutations.server'
import { QUERIES } from '@/server/queries.server'
import type { CommentData } from '@/types'
import { createServerFn } from '@tanstack/react-start'

// Query functions

export const getComments = createServerFn({ method: 'GET' })
  .inputValidator((data: { limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getComments(data.limit, data.offset)
  })

export const getCommentById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getCommentById(data.id)
  })



export const buscarComments = createServerFn({ method: 'GET' })
  .inputValidator((data: { searchTerm: string, limit: number, offset: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.searchComments(data.searchTerm, data.limit, data.offset)
  })

// Mutation functions

export const crearComment = createServerFn({ method: 'POST' })
  .inputValidator((data: CommentData) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.createComment(data)
  })



// Made with Bob