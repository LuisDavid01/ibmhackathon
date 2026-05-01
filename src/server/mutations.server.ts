import { auth } from "@/lib/auth";
import type { ServerFNResponse, UserInsert, ProyectData } from "@/types";
import { ProyectSchema } from "@/types";
import {
    getRequest,
} from '@tanstack/react-start/server'
import { db } from "./db";
import { proyects } from "./db/schema";
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
}