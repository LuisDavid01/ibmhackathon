import { auth } from "@/lib/auth";
import type { ServerFNResponse, UserInsert, ProyectData, ProjectChangeData, CommentData } from "@/types";
import { ProyectSchema, ProjectChangeSchema, CommentSchema } from "@/types";
import {
    getRequest,
} from '@tanstack/react-start/server'
import { db } from "./db";
import { proyects, proyect_changes, comments_table } from "./db/schema";
import { eq } from "drizzle-orm";

export const MUTATIONS = {
    // user mutations

    async createUser (data: UserInsert): Promise<ServerFNResponse>{
        const newUser = await auth.api.createUser({
            body: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        })
        if (!newUser) {
            return {
                success: false,
                message: "Error creating user, please try again",
            }
        }
        return {
            success: true,
            message: "User created successfully",
        }   
    },

    // proyect mutations

    async createProyect(data: ProyectData): Promise<ServerFNResponse> {
        try {
            // Validate with Zod
            const validationResult = ProyectSchema.safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el proyecto',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Insert into database
            const newProyect = await db
                .insert(proyects)
                .values(validationResult.data)
                .returning()

            if (!newProyect || newProyect.length === 0) {
                return {
                    success: false,
                    message: "Error creando el proyecto, por favor intenta de nuevo",
                }
            }

            return {
                success: true,
                message: "Proyecto creado exitosamente",
            }
        } catch (error) {
            console.error('Error creating proyect:', error);
            return {
                success: false,
                message: "Error creando el proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async updateProyect(id: number, data: Partial<ProyectData>): Promise<ServerFNResponse> {
        try {
            // Validate with Zod (partial validation)
            const validationResult = ProyectSchema.partial().safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el proyecto',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Update in database
            const updatedProyect = await db
                .update(proyects)
                .set(validationResult.data)
                .where(eq(proyects.id, id))
                .returning()

            if (!updatedProyect || updatedProyect.length === 0) {
                return {
                    success: false,
                    message: "Proyecto no encontrado o no se pudo actualizar",
                }
            }

            return {
                success: true,
                message: "Proyecto actualizado exitosamente",
            }
        } catch (error) {
            console.error('Error updating proyect:', error);
            return {
                success: false,
                message: "Error actualizando el proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async deleteProyect(id: number): Promise<ServerFNResponse> {
        try {
            // Delete from database
            const deletedProyect = await db
                .delete(proyects)
                .where(eq(proyects.id, id))
                .returning()

            if (!deletedProyect || deletedProyect.length === 0) {
                return {
                    success: false,
                    message: "Proyecto no encontrado",
                }
            }

            return {
                success: true,
                message: "Proyecto eliminado exitosamente",
            }
        } catch (error) {
            console.error('Error deleting proyect:', error);
            return {
                success: false,
                message: "Error eliminando el proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    // project_changes mutations

    async createProjectChange(data: ProjectChangeData): Promise<ServerFNResponse> {
        try {
            // Validate with Zod
            const validationResult = ProjectChangeSchema.safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el cambio del proyecto',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Insert into database
            const newChange = await db
                .insert(proyect_changes)
                .values(validationResult.data)
                .returning()

            if (!newChange || newChange.length === 0) {
                return {
                    success: false,
                    message: "Error creando el cambio del proyecto, por favor intenta de nuevo",
                }
            }

            return {
                success: true,
                message: "Cambio del proyecto creado exitosamente",
            }
        } catch (error) {
            console.error('Error creating project change:', error);
            return {
                success: false,
                message: "Error creando el cambio del proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async updateProjectChange(id: number, data: Partial<ProjectChangeData>): Promise<ServerFNResponse> {
        try {
            // Validate with Zod (partial validation)
            const validationResult = ProjectChangeSchema.partial().safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el cambio del proyecto',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Update in database
            const updatedChange = await db
                .update(proyect_changes)
                .set(validationResult.data)
                .where(eq(proyect_changes.id, id))
                .returning()

            if (!updatedChange || updatedChange.length === 0) {
                return {
                    success: false,
                    message: "Cambio del proyecto no encontrado o no se pudo actualizar",
                }
            }

            return {
                success: true,
                message: "Cambio del proyecto actualizado exitosamente",
            }
        } catch (error) {
            console.error('Error updating project change:', error);
            return {
                success: false,
                message: "Error actualizando el cambio del proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async deleteProjectChange(id: number): Promise<ServerFNResponse> {
        try {
            // Delete from database
            const deletedChange = await db
                .delete(proyect_changes)
                .where(eq(proyect_changes.id, id))
                .returning()

            if (!deletedChange || deletedChange.length === 0) {
                return {
                    success: false,
                    message: "Cambio del proyecto no encontrado",
                }
            }

            return {
                success: true,
                message: "Cambio del proyecto eliminado exitosamente",
            }
        } catch (error) {
            console.error('Error deleting project change:', error);
            return {
                success: false,
                message: "Error eliminando el cambio del proyecto",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    // comments mutations

    async createComment(data: CommentData): Promise<ServerFNResponse> {
        try {
            // Validate with Zod
            const validationResult = CommentSchema.safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el comentario',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Insert into database
            const newComment = await db
                .insert(comments_table)
                .values(validationResult.data)
                .returning()

            if (!newComment || newComment.length === 0) {
                return {
                    success: false,
                    message: "Error creando el comentario, por favor intenta de nuevo",
                }
            }

            return {
                success: true,
                message: "Comentario creado exitosamente",
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            return {
                success: false,
                message: "Error creando el comentario",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async updateComment(id: number, data: Partial<CommentData>): Promise<ServerFNResponse> {
        try {
            // Validate with Zod (partial validation)
            const validationResult = CommentSchema.partial().safeParse(data)
            if (!validationResult.success) {
                console.log('validation failed', validationResult.error);
                return {
                    success: false,
                    message: 'Error validando el comentario',
                    errors: validationResult.error.flatten().fieldErrors,
                }
            }

            // Update in database
            const updatedComment = await db
                .update(comments_table)
                .set(validationResult.data)
                .where(eq(comments_table.id, id))
                .returning()

            if (!updatedComment || updatedComment.length === 0) {
                return {
                    success: false,
                    message: "Comentario no encontrado o no se pudo actualizar",
                }
            }

            return {
                success: true,
                message: "Comentario actualizado exitosamente",
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            return {
                success: false,
                message: "Error actualizando el comentario",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },

    async deleteComment(id: number): Promise<ServerFNResponse> {
        try {
            // Delete from database
            const deletedComment = await db
                .delete(comments_table)
                .where(eq(comments_table.id, id))
                .returning()

            if (!deletedComment || deletedComment.length === 0) {
                return {
                    success: false,
                    message: "Comentario no encontrado",
                }
            }

            return {
                success: true,
                message: "Comentario eliminado exitosamente",
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            return {
                success: false,
                message: "Error eliminando el comentario",
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    },
}