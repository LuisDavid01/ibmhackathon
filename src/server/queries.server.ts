import { auth } from "@/lib/auth"
import { db } from "./db"
import {
    getRequest,
} from '@tanstack/react-start/server'
import type { DataPagination } from "@/types"
import type { User } from "better-auth"
import { proyects, proyect_changes, comments_table } from "./db/schema"
import { eq, ilike, or, count, desc } from "drizzle-orm"

export const QUERIES = {
    // user queries

    getUsuarios:
        async function (limit: number, offset: number):Promise<DataPagination<User>> {
            try {
            const req = getRequest()
            const users = await auth.api.listUsers(
                {
                    query:{},
                    // This endpoint requires session cookies.
                    headers: req.headers,
                }

            )

            return {
                data: users.users,
                total: users.total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(users.total / limit),
            }
        } catch(error){
            throw error
        }
        },


    // proyect queries
    
    getProyects: async function (limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            // Get total count
            const totalResult = await db.select({ count: count() }).from(proyects)
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const data = await db
                .select()
                .from(proyects)
                .orderBy(desc(proyects.startedAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    getProyectById: async function (id: number): Promise<any> {
        try {
            const result = await db
                .select()
                .from(proyects)
                .where(eq(proyects.id, id))
                .limit(1)

            return result[0]
        } catch (error) {
            throw error
        }
    },

    searchProyects: async function (searchTerm: string, limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            const searchPattern = `%${searchTerm}%`

            // Get total count with search
            const totalResult = await db
                .select({ count: count() })
                .from(proyects)
                .where(
                    or(
                        ilike(proyects.name, searchPattern),
                        ilike(proyects.company, searchPattern),
                        ilike(proyects.location, searchPattern),
                        ilike(proyects.municipalidad, searchPattern)
                    )
                )
            const total = totalResult[0]?.count || 0

            // Get paginated data with search
            const data = await db
                .select()
                .from(proyects)
                .where(
                    or(
                        ilike(proyects.name, searchPattern),
                        ilike(proyects.company, searchPattern),
                        ilike(proyects.location, searchPattern),
                        ilike(proyects.municipalidad, searchPattern)
                    )
                )
                .orderBy(desc(proyects.startedAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    // project_changes queries

    getProjectChanges: async function (limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            // Get total count
            const totalResult = await db.select({ count: count() }).from(proyect_changes)
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const data = await db
                .select()
                .from(proyect_changes)
                .orderBy(desc(proyect_changes.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    getProjectChangeById: async function (id: number): Promise<any> {
        try {
            const result = await db
                .select()
                .from(proyect_changes)
                .where(eq(proyect_changes.id, id))
                .limit(1)

            return result[0]
        } catch (error) {
            throw error
        }
    },

    getProjectChangesByProjectId: async function (proyectId: number, limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            // Get total count
            const totalResult = await db
                .select({ count: count() })
                .from(proyect_changes)
                .where(eq(proyect_changes.proyectId, proyectId))
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const data = await db
                .select()
                .from(proyect_changes)
                .where(eq(proyect_changes.proyectId, proyectId))
                .orderBy(desc(proyect_changes.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    searchProjectChanges: async function (searchTerm: string, limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            const searchPattern = `%${searchTerm}%`

            // Get total count with search
            const totalResult = await db
                .select({ count: count() })
                .from(proyect_changes)
                .where(
                    or(
                        ilike(proyect_changes.changeTitle, searchPattern),
                        ilike(proyect_changes.details, searchPattern)
                    )
                )
            const total = totalResult[0]?.count || 0

            // Get paginated data with search
            const data = await db
                .select()
                .from(proyect_changes)
                .where(
                    or(
                        ilike(proyect_changes.changeTitle, searchPattern),
                        ilike(proyect_changes.details, searchPattern)
                    )
                )
                .orderBy(desc(proyect_changes.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    // comments queries

    getComments: async function (limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            // Get total count
            const totalResult = await db.select({ count: count() }).from(comments_table)
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const data = await db
                .select()
                .from(comments_table)
                .orderBy(desc(comments_table.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    getCommentById: async function (id: number): Promise<any> {
        try {
            const result = await db
                .select()
                .from(comments_table)
                .where(eq(comments_table.id, id))
                .limit(1)

            return result[0]
        } catch (error) {
            throw error
        }
    },

    getCommentsByOwnerId: async function (ownerId: string, limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            // Get total count
            const totalResult = await db
                .select({ count: count() })
                .from(comments_table)
                .where(eq(comments_table.ownerId, ownerId))
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const data = await db
                .select()
                .from(comments_table)
                .where(eq(comments_table.ownerId, ownerId))
                .orderBy(desc(comments_table.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },

    searchComments: async function (searchTerm: string, limit: number, offset: number): Promise<DataPagination<any>> {
        try {
            const searchPattern = `%${searchTerm}%`

            // Get total count with search
            const totalResult = await db
                .select({ count: count() })
                .from(comments_table)
                .where(
                    or(
                        ilike(comments_table.title, searchPattern),
                        ilike(comments_table.content, searchPattern)
                    )
                )
            const total = totalResult[0]?.count || 0

            // Get paginated data with search
            const data = await db
                .select()
                .from(comments_table)
                .where(
                    or(
                        ilike(comments_table.title, searchPattern),
                        ilike(comments_table.content, searchPattern)
                    )
                )
                .orderBy(desc(comments_table.createdAt))
                .limit(limit)
                .offset(offset)

            return {
                data: data,
                total: total,
                limit: limit,
                offset: (offset / limit) + 1,
                totalPages: Math.ceil(total / limit),
            }
        } catch (error) {
            throw error
        }
    },
}