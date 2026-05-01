

import { z } from 'zod'

export type UserInsert = {
    email: string,
    name: string,
    password: string,
    role: "admin" | "user",
}

export type DataPagination<T> = {
    data?: T[],
    total: number,
    limit: number,
    offset: number,
    totalPages: number,
}

export type ServerFNResponse = {
    success: boolean,
    message: string,
    error?: string,
    errors?: Record<string, string[]>,
}

// Zod Schema for Project
export const ProyectSchema = z.object({
    name: z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'Nombre inválido' }).min(1, 'El nombre no debe estar vacío').max(255, 'El nombre no debe exceder 255 caracteres'),
    description: z.string({ required_error: 'La descripción es requerida', invalid_type_error: 'Descripción inválida' }).min(1, 'La descripción no debe estar vacía').max(1000, 'La descripción no debe exceder 1000 caracteres'),
    company: z.string({ required_error: 'La empresa es requerida', invalid_type_error: 'Empresa inválida' }).min(1, 'La empresa no debe estar vacía').max(255, 'La empresa no debe exceder 255 caracteres'),
    location: z.string({ required_error: 'La ubicación es requerida', invalid_type_error: 'Ubicación inválida' }).min(1, 'La ubicación no debe estar vacía').max(255, 'La ubicación no debe exceder 255 caracteres'),
    municipalidad: z.string({ required_error: 'La municipalidad es requerida', invalid_type_error: 'Municipalidad inválida' }).min(1, 'La municipalidad no debe estar vacía').max(255, 'La municipalidad no debe exceder 255 caracteres'),
    budget: z.number({ required_error: 'El presupuesto es requerido', invalid_type_error: 'Presupuesto inválido' }).min(0, 'El presupuesto debe ser mayor o igual a 0'),
})

// Infer type from Zod schema
export type ProyectData = z.infer<typeof ProyectSchema>