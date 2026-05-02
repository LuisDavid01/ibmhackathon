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

    // AI Tool queries
    
    lookProyectWithInfo: async function (projectName: string, location: string): Promise<any> {
        try {
            const searchNamePattern = `%${projectName}%`
            const searchLocationPattern = `%${location}%`

            // Search for projects with their changes using LEFT JOIN
            const results = await db
                .select({
                    // Project fields
                    projectId: proyects.id,
                    projectName: proyects.name,
                    projectDescription: proyects.description,
                    projectCompany: proyects.company,
                    projectLocation: proyects.location,
                    projectMunicipalidad: proyects.municipalidad,
                    projectBudget: proyects.budget,
                    projectStartedAt: proyects.startedAt,
                    // Change fields (can be null if no changes)
                    changeId: proyect_changes.id,
                    changeTitle: proyect_changes.changeTitle,
                    changeDetails: proyect_changes.details,
                    changeCreatedAt: proyect_changes.createdAt,
                    changeBudgetSpent: proyect_changes.budgetSpent,
                    changeUserId: proyect_changes.userId,
                })
                .from(proyects)
                .leftJoin(proyect_changes, eq(proyects.id, proyect_changes.proyectId))
                .where(
                    or(
                        ilike(proyects.name, searchNamePattern),
                        ilike(proyects.location, searchLocationPattern)
                    )
                )
                .orderBy(desc(proyects.startedAt), desc(proyect_changes.createdAt))
                .limit(100) // Limit total rows to prevent excessive data

            if (results.length === 0) {
                return {
                    found: false,
                    message: 'No se encontró ningún proyecto con ese nombre o ubicación'
                }
            }

            // Group results by project
            const projectsMap = new Map()
            
            results.forEach(row => {
                if (!projectsMap.has(row.projectId)) {
                    projectsMap.set(row.projectId, {
                        id: row.projectId,
                        name: row.projectName,
                        description: row.projectDescription,
                        company: row.projectCompany,
                        location: row.projectLocation,
                        municipalidad: row.projectMunicipalidad,
                        budget: row.projectBudget,
                        startedAt: row.projectStartedAt,
                        changes: [],
                        totalBudgetSpent: 0,
                    })
                }

                // Add change if exists
                if (row.changeId) {
                    const project = projectsMap.get(row.projectId)
                    project.changes.push({
                        id: row.changeId,
                        changeTitle: row.changeTitle,
                        details: row.changeDetails,
                        createdAt: row.changeCreatedAt,
                        budgetSpent: row.changeBudgetSpent,
                        userId: row.changeUserId,
                    })
                    project.totalBudgetSpent += Number(row.changeBudgetSpent)
                }
            })

            // Convert map to array and add calculated fields
            const projectsWithChanges = Array.from(projectsMap.values()).map(project => ({
                ...project,
                budgetRemaining: Number(project.budget) - project.totalBudgetSpent,
                changesCount: project.changes.length,
                budgetUsedPercentage: ((project.totalBudgetSpent / Number(project.budget)) * 100).toFixed(2)
            }))

            return {
                found: true,
                count: projectsWithChanges.length,
                projects: projectsWithChanges
            }
        } catch (error) {
            throw error
        }
    },
}