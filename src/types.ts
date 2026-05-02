

import type OpenAI from 'openai'
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

// Zod Schema for ProjectChange
export const ProjectChangeSchema = z.object({
    proyectId: z.number({ required_error: 'El ID del proyecto es requerido', invalid_type_error: 'ID del proyecto inválido' }),
    changeTitle: z.string({ required_error: 'El título del cambio es requerido', invalid_type_error: 'Título inválido' }).min(1, 'El título no debe estar vacío').max(255, 'El título no debe exceder 255 caracteres'),
    userId: z.string({ required_error: 'El ID del usuario es requerido', invalid_type_error: 'ID del usuario inválido' }),
    details: z.string({ required_error: 'Los detalles son requeridos', invalid_type_error: 'Detalles inválidos' }).min(1, 'Los detalles no deben estar vacíos').max(2000, 'Los detalles no deben exceder 2000 caracteres'),
    budgetSpent: z.number({ required_error: 'El presupuesto gastado es requerido', invalid_type_error: 'Presupuesto gastado inválido' }).min(0, 'El presupuesto gastado debe ser mayor o igual a 0'),
})

// Infer type from Zod schema
export type ProjectChangeData = z.infer<typeof ProjectChangeSchema>

// Zod Schema for Comment
export const CommentSchema = z.object({
    title: z.string({ required_error: 'El título es requerido', invalid_type_error: 'Título inválido' }).min(1, 'El título no debe estar vacío').max(255, 'El título no debe exceder 255 caracteres'),
    content: z.string({ required_error: 'El contenido es requerido', invalid_type_error: 'Contenido inválido' }).min(1, 'El contenido no debe estar vacío').max(5000, 'El contenido no debe exceder 5000 caracteres'),
})

// Infer type from Zod schema
export type CommentData = z.infer<typeof CommentSchema>





// types for ai

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}