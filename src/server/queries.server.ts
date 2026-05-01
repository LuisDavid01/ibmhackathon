import { auth } from "@/lib/auth"
import { db } from "./db"
import {
    getRequest,
} from '@tanstack/react-start/server'
import type { DataPagination } from "@/types"
import type { User } from "better-auth"
import { proyects } from "./db/schema"
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
}