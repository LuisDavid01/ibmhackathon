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
    
    getProyects: async function (
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
    ): Promise<DataPagination<any>> {
        try {
            // Build where conditions
            const conditions = []
            
            if (filters?.name) {
                conditions.push(ilike(proyects.name, `%${filters.name}%`))
            }
            if (filters?.municipality) {
                conditions.push(ilike(proyects.municipalidad, `%${filters.municipality}%`))
            }
            if (filters?.location) {
                conditions.push(ilike(proyects.location, `%${filters.location}%`))
            }
            if (filters?.dateFrom) {
                conditions.push(eq(proyects.startedAt, new Date(filters.dateFrom)))
            }
            if (filters?.dateTo) {
                conditions.push(eq(proyects.startedAt, new Date(filters.dateTo)))
            }
            if (filters?.budgetMin !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMin))
            }
            if (filters?.budgetMax !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMax))
            }

            // Get total count
            const totalQuery = db.select({ count: count() }).from(proyects)
            if (conditions.length > 0) {
                totalQuery.where(or(...conditions))
            }
            const totalResult = await totalQuery
            const total = totalResult[0]?.count || 0

            // Get paginated data
            const dataQuery = db
                .select()
                .from(proyects)
                .orderBy(desc(proyects.startedAt))
                .limit(limit)
                .offset(offset)
            
            if (conditions.length > 0) {
                dataQuery.where(or(...conditions))
            }
            
            const data = await dataQuery

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

    getProyectsOrderedByBudget: async function (limit: number): Promise<any[]> {
        try {
            const data = await db
                .select()
                .from(proyects)
                .orderBy(desc(proyects.budget))
                .limit(limit)

            return data
        } catch (error) {
            throw error
        }
    },

    getProjectStatistics: async function (): Promise<{
        totalBudget: number,
        activeProjects: number,
        totalProjects: number,
        municipalities: number
    }> {
        try {
            // Get total projects count
            const totalResult = await db.select({ count: count() }).from(proyects)
            const totalProjects = totalResult[0]?.count || 0

            // Get active projects count (status = 'in progress')
            const activeResult = await db
                .select({ count: count() })
                .from(proyects)
                .where(eq(proyects.status, 'in progress'))
            const activeProjects = activeResult[0]?.count || 0

            // Get all projects to calculate total budget and unique municipalities
            const allProjects = await db.select().from(proyects)
            
            const totalBudget = allProjects.reduce((sum, project) => sum + Number(project.budget), 0)
            const uniqueMunicipalities = new Set(allProjects.map(p => p.municipalidad))
            const municipalities = uniqueMunicipalities.size

            return {
                totalBudget,
                activeProjects,
                totalProjects,
                municipalities
            }
        } catch (error) {
            throw error
        }
    },

    // AI Tool queries - New tools for listing projects

    listProjectsWithoutChanges: async function (filters?: {
        municipality?: string,
        name?: string,
        budgetMin?: number,
        budgetMax?: number,
        company?: string
    }): Promise<any> {
        try {
            // Build where conditions for projects
            const conditions = []
            
            if (filters?.name) {
                conditions.push(ilike(proyects.name, `%${filters.name}%`))
            }
            if (filters?.municipality) {
                conditions.push(ilike(proyects.municipalidad, `%${filters.municipality}%`))
            }
            if (filters?.company) {
                conditions.push(ilike(proyects.company, `%${filters.company}%`))
            }
            if (filters?.budgetMin !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMin))
            }
            if (filters?.budgetMax !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMax))
            }

            // LEFT JOIN to find projects without changes
            const query = db
                .select({
                    id: proyects.id,
                    name: proyects.name,
                    description: proyects.description,
                    company: proyects.company,
                    location: proyects.location,
                    municipality: proyects.municipalidad,
                    budget: proyects.budget,
                    status: proyects.status,
                    startedAt: proyects.startedAt,
                    changeId: proyect_changes.id,
                })
                .from(proyects)
                .leftJoin(proyect_changes, eq(proyects.id, proyect_changes.proyectId))

            if (conditions.length > 0) {
                query.where(or(...conditions))
            }

            const results = await query

            // Filter only projects without changes (changeId is null)
            const projectsWithoutChanges = results
                .filter(row => row.changeId === null)
                .map(row => ({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    company: row.company,
                    location: row.location,
                    municipality: row.municipality,
                    budget: row.budget,
                    status: row.status,
                    startedAt: row.startedAt,
                    hasChanges: false
                }))

            if (projectsWithoutChanges.length === 0) {
                return {
                    found: false,
                    message: 'No se encontraron proyectos sin cambios con los filtros especificados'
                }
            }

            return {
                found: true,
                count: projectsWithoutChanges.length,
                projects: projectsWithoutChanges
            }
        } catch (error) {
            throw error
        }
    },

    listProjectsWithChanges: async function (filters?: {
        municipality?: string,
        name?: string,
        budgetMin?: number,
        budgetMax?: number,
        company?: string
    }): Promise<any> {
        try {
            // Build where conditions
            const conditions = []
            
            if (filters?.name) {
                conditions.push(ilike(proyects.name, `%${filters.name}%`))
            }
            if (filters?.municipality) {
                conditions.push(ilike(proyects.municipalidad, `%${filters.municipality}%`))
            }
            if (filters?.company) {
                conditions.push(ilike(proyects.company, `%${filters.company}%`))
            }
            if (filters?.budgetMin !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMin))
            }
            if (filters?.budgetMax !== undefined) {
                conditions.push(eq(proyects.budget, filters.budgetMax))
            }

            // INNER JOIN to get only projects with changes
            const results = await db
                .select({
                    projectId: proyects.id,
                    projectName: proyects.name,
                    projectDescription: proyects.description,
                    projectCompany: proyects.company,
                    projectLocation: proyects.location,
                    projectMunicipalidad: proyects.municipalidad,
                    projectBudget: proyects.budget,
                    projectStatus: proyects.status,
                    projectStartedAt: proyects.startedAt,
                    changeId: proyect_changes.id,
                    changeBudgetSpent: proyect_changes.budgetSpent,
                    changeCreatedAt: proyect_changes.createdAt,
                })
                .from(proyects)
                .innerJoin(proyect_changes, eq(proyects.id, proyect_changes.proyectId))
                .where(conditions.length > 0 ? or(...conditions) : undefined)
                .orderBy(desc(proyects.startedAt))

            if (results.length === 0) {
                return {
                    found: false,
                    message: 'No se encontraron proyectos con cambios con los filtros especificados'
                }
            }

            // Group by project and calculate aggregations
            const projectsMap = new Map()
            
            results.forEach(row => {
                if (!projectsMap.has(row.projectId)) {
                    projectsMap.set(row.projectId, {
                        id: row.projectId,
                        name: row.projectName,
                        description: row.projectDescription,
                        company: row.projectCompany,
                        location: row.projectLocation,
                        municipality: row.projectMunicipalidad,
                        budget: row.projectBudget,
                        status: row.projectStatus,
                        startedAt: row.projectStartedAt,
                        changesCount: 0,
                        totalBudgetSpent: 0,
                        lastChangeDate: null,
                    })
                }

                const project = projectsMap.get(row.projectId)
                project.changesCount += 1
                project.totalBudgetSpent += Number(row.changeBudgetSpent)
                
                // Track the most recent change date
                if (!project.lastChangeDate || new Date(row.changeCreatedAt) > new Date(project.lastChangeDate)) {
                    project.lastChangeDate = row.changeCreatedAt
                }
            })

            // Convert map to array and add calculated fields
            const projectsWithChanges = Array.from(projectsMap.values()).map(project => ({
                ...project,
                budgetRemaining: Number(project.budget) - project.totalBudgetSpent,
                budgetUsedPercentage: ((project.totalBudgetSpent / Number(project.budget)) * 100).toFixed(2) + '%'
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

    listProjectChangesByProjectName: async function (projectName: string): Promise<any> {
        try {
            const searchPattern = `%${projectName}%`

            // JOIN to get project and its changes
            const results = await db
                .select({
                    projectId: proyects.id,
                    projectName: proyects.name,
                    projectDescription: proyects.description,
                    projectBudget: proyects.budget,
                    changeId: proyect_changes.id,
                    changeTitle: proyect_changes.changeTitle,
                    changeDetails: proyect_changes.details,
                    changeBudgetSpent: proyect_changes.budgetSpent,
                    changeState: proyect_changes.changeState,
                    changeCreatedAt: proyect_changes.createdAt,
                    changeUpdatedAt: proyect_changes.updatedAt,
                    changeUserId: proyect_changes.userId,
                })
                .from(proyects)
                .innerJoin(proyect_changes, eq(proyects.id, proyect_changes.proyectId))
                .where(ilike(proyects.name, searchPattern))
                .orderBy(desc(proyect_changes.createdAt))

            if (results.length === 0) {
                return {
                    found: false,
                    message: `No se encontró ningún proyecto con el nombre "${projectName}" o no tiene cambios registrados`
                }
            }

            // Get project info from first result
            const projectInfo = {
                projectId: results[0].projectId,
                projectName: results[0].projectName,
                projectDescription: results[0].projectDescription,
                projectBudget: results[0].projectBudget,
            }

            // Calculate total budget spent
            const totalBudgetSpent = results.reduce((sum, row) => sum + Number(row.changeBudgetSpent), 0)

            // Map changes
            const changes = results.map(row => ({
                id: row.changeId,
                changeTitle: row.changeTitle,
                details: row.changeDetails,
                budgetSpent: row.changeBudgetSpent,
                changeState: row.changeState,
                createdAt: row.changeCreatedAt,
                updatedAt: row.changeUpdatedAt,
                userId: row.changeUserId,
            }))

            return {
                found: true,
                ...projectInfo,
                totalChanges: changes.length,
                totalBudgetSpent,
                budgetRemaining: Number(projectInfo.projectBudget) - totalBudgetSpent,
                budgetUsedPercentage: ((totalBudgetSpent / Number(projectInfo.projectBudget)) * 100).toFixed(2) + '%',
                changes
            }
        } catch (error) {
            throw error
        }
    },
}