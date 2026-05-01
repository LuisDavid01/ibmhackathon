import { auth } from "@/lib/auth"
import { db } from "./db"
import {
    getRequest,
} from '@tanstack/react-start/server'
import type { DataPagination } from "@/types"
import type { User } from "better-auth"

export const QUERIES = {
    getUsuarios:
        async function (limit: number, offset: number):Promise<DataPagination<User>> {
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
        }
}